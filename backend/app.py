from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os, base64, cv2
from PIL import Image
import numpy as np
import face_recognition
import pytesseract
from datetime import datetime
from io import BytesIO
import re

app = Flask(__name__)
CORS(app)
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-jwt-secret')
jwt = JWTManager(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

with app.app_context():
    db.create_all()

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'message': 'Email and password required'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 400
    password_hash = generate_password_hash(password)
    user = User(email=email, password_hash=password_hash)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Registration successful'}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'message': 'Email and password required'}), 400
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    access_token = create_access_token(identity=email)
    return jsonify({'message': 'Login successful', 'access_token': access_token}), 200

def is_blurry(image_path, threshold=100):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        return True
    laplacian_var = cv2.Laplacian(img, cv2.CV_64F).var()
    return laplacian_var < threshold

@app.route('/verify', methods=['POST'])
@jwt_required()
def verify():
    language = request.form.get('language', 'eng')
    aadhar_path = os.path.join(UPLOAD_FOLDER, 'aadhar.jpg')
    selfie_path = os.path.join(UPLOAD_FOLDER, 'selfie.jpg')
    try:
        # --- Input Validation ---
        allowed_ext = ('.jpg', '.jpeg', '.png')
        if 'aadhar_file' in request.files and request.files['aadhar_file'].filename:
            aadhar_file = request.files['aadhar_file']
            if not aadhar_file.filename.lower().endswith(allowed_ext):
                return "Invalid Aadhar file type.", 400
            aadhar_file.save(aadhar_path)
        elif request.form.get('aadhar_capture'):
            aadhar_data = request.form['aadhar_capture']
            if aadhar_data and ',' in aadhar_data:
                aadhar_data = aadhar_data.split(',')[1]
                aadhar_img = Image.open(BytesIO(base64.b64decode(aadhar_data)))
                aadhar_img.save(aadhar_path)
            else:
                return "No Aadhar image provided.", 400
        else:
            return "No Aadhar image provided.", 400

        selfie_data = request.form.get('selfie_capture')
        if selfie_data and ',' in selfie_data:
            selfie_data = selfie_data.split(',')[1]
            selfie_img = Image.open(BytesIO(base64.b64decode(selfie_data)))
            selfie_img.save(selfie_path)
        else:
            return "No Selfie image provided.", 400

        # --- Blurriness Check ---
        aadhar_blurry = is_blurry(aadhar_path)
        selfie_blurry = is_blurry(selfie_path)
        blurry_feedback = ""
        if aadhar_blurry or selfie_blurry:
            blurry_feedback = "Warning: One or both images appear blurry. Please retake with better lighting and focus."

        # --- OCR for DOB ---
        dob, ocr_text = extract_dob(aadhar_path, language)
        age_status = "DOB not found"
        is_18_plus = False
        age = "Unknown"

        if dob:
            try:
                dob_date = datetime.strptime(dob, "%d-%m-%Y")
                today = datetime.today()
                age_val = (today - dob_date).days // 365
                age = age_val
                is_18_plus = age_val >= 18
                age_status = f"{dob} (Age: {age_val}) - {'18+ ✅' if is_18_plus else '<18 ❌'}"
            except:
                age_status = "Invalid DOB Format"

        # --- Face Matching ---
        aadhar_image = face_recognition.load_image_file(aadhar_path)
        selfie_image = face_recognition.load_image_file(selfie_path)

        aadhar_enc = face_recognition.face_encodings(aadhar_image)
        selfie_enc = face_recognition.face_encodings(selfie_image)

        match_result = "Face not detected in one or both images."
        confidence = 0
        if aadhar_enc and selfie_enc:
            match = face_recognition.compare_faces([aadhar_enc[0]], selfie_enc[0])[0]
            distance = face_recognition.face_distance([aadhar_enc[0]], selfie_enc[0])[0]
            confidence = round((1 - distance) * 100, 2)
            match_result = "Match ✅" if match else "Mismatch ❌"

        # --- Response ---
        response = jsonify({
            "match_result": match_result,
            "confidence": confidence,
            "age_status": age_status,
            "age": age,
            "blurry_feedback": blurry_feedback,
            "ocr_text": ocr_text  
        })

        # --- Delete images after processing (privacy) ---
        try:
            os.remove(aadhar_path)
            os.remove(selfie_path)
        except Exception:
            pass

        return response

    except Exception as e:
        # --- Error Logging (no sensitive data) ---
        print(f"Verification error: {str(e)}")
        # Clean up files if they exist
        try:
            if os.path.exists(aadhar_path):
                os.remove(aadhar_path)
            if os.path.exists(selfie_path):
                os.remove(selfie_path)
        except Exception:
            pass
        return jsonify({"error": "Verification failed. Please try again."}), 500

def extract_dob(image_path, language='eng'):
    # Use pytesseract with language option
    try:
        text = pytesseract.image_to_string(Image.open(image_path), lang=language)
    except Exception as e:
        text = ""
    # Try to find DOB in any common format
    match = re.search(r'(\d{2}[/-]\d{2}[/-]\d{4})', text)
    if match:
        return match.group(1).replace("/", "-"), text
    return None, text

if __name__ == '__main__':
    app.run(debug=True)