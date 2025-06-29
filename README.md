# β VerifyMe β Age & Identity Verification System ν΄

**VerifyMe** is a web-based age and identity verification tool built for demonstration purposes using **simulated Aadhar cards** and **live webcam selfies**. It performs OCR to extract DOB and uses face recognition to verify identity β all locally in the browser and backend, without relying on any government APIs.

---

## ν΄§ Tech Stack Summary

| Layer     | Technology/Libraries Used                                      |
|-----------|---------------------------------------------------------------|
| Frontend  | HTML5, CSS3, Bootstrap 5, Vanilla JS (Webcam API)             |
| Backend   | Python 3.11, Flask, Jinja2                                     |
| Face/OCR  | OpenCV, Pillow, `face_recognition`, dlib, pytesseract, Tesseract |
| Utilities | NumPy, base64, datetime                                        |
| Security  | HTTPS (recommended), `.env` for secrets                       |

---

## ν²‘ Features

- β Upload Aadhar card (image or PDF)
- β Extract DOB using OCR
- β Calculate age and determine if 18+
- β Capture live selfie using webcam
- β Match selfie with Aadhar photo via face embeddings
- β Display match confidence score (e.g., 93.5%)
- β Blur detection for image quality feedback
- β Multilingual OCR support (e.g., Hindi, Tamil)
- β Secure environment config using `.env`
- β HTTPS-ready for secure deployment

---

## ν³Έ Sample Screenshots

### 1. Upload Aadhar Card

\`\`\`html
<input type="file" id="aadharUpload" accept="image/*,application/pdf">
\`\`\`

### 2. Capture Selfie

\`\`\`javascript
navigator.mediaDevices.getUserMedia({ video: true })
\`\`\`

### 3. Verification Summary

> βVerifiedβ or βNot Verifiedβ shown based on confidence threshold and age.  
> Match confidence (e.g., \`92%\`) is displayed.

---

## νΊ How to Run the Project Locally

### ν³¦ 1. Clone the Repository

\`\`\`bash
git clone https://github.com/tanya-2004/verifyme
cd verifyme
\`\`\`

### ν΄§ 2. Install Dependencies

Make sure you have **Python 3.11** and **Tesseract OCR** installed.

\`\`\`bash
pip install -r requirements.txt
\`\`\`

Install Tesseract:

- **Ubuntu**:
  \`\`\`bash
  sudo apt install tesseract-ocr
  \`\`\`
- **Windows**: [Download here](https://github.com/tesseract-ocr/tesseract/wiki)

### νΌ 3. Set Environment Variables

Create a \`.env\` file:

\`\`\`env
FLASK_ENV=development
SECRET_KEY=your_secret_key_here
\`\`\`

### βΆοΈ 4. Run the Flask Server

\`\`\`bash
python app.py
\`\`\`

Visit: [http://localhost:5000](http://localhost:5000)

---

## ν³ Project Structure

\`\`\`bash
verifyme/
βββ static/
β   βββ styles.css
βββ templates/
β   βββ index.html
β   βββ result.html
βββ uploads/
β   βββ temp image storage
βββ app.py
βββ requirements.txt
βββ README.md
βββ verifyme.exe       # β Executable Binary for Windows
\`\`\`

> β \`verifyme.exe\` created using PyInstaller:

\`\`\`bash
pyinstaller --onefile app.py
\`\`\`

---

## νΎ Bonus Features Implemented

- β Match confidence score shown as percentage
- β Multilingual OCR (\`--lang hin\`, etc.)
- β Blur detection using Laplacian variance
- β Webcam capture quality checks
- β \`.env\` for secure secret config
- β Executable \`.exe\` for quick launch (Windows only)

---

## ν΄ Security Notes

- νΊ« No image data is stored
- β Use **HTTPS** in production (e.g., Flask-Talisman)
- β οΈ For demo purposes only β do **not** use real Aadhar data

---

## ν³½ Demo Video & Presentation

- ν΄ [Demo Video (Google Drive / YouTube)](https://your-demo-link-here)
- ν³ [Project Presentation (PPT)](https://your-ppt-link-here)

---

## νΏ Submission Checklist

- β GitHub repo with working code
- β README with setup & run instructions
- β Demo video and presentation PPT
- β Executable binary (\`verifyme.exe\`)
- β Bonus features implemented

---

## νΉββοΈ Built with β€οΈ by

**PlayersWhoCode**
