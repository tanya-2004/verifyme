# âœ… VerifyMe â€“ Age & Identity Verification System í´

**VerifyMe** is a web-based age and identity verification tool built for demonstration purposes using **simulated Aadhar cards** and **live webcam selfies**. It performs OCR to extract DOB and uses face recognition to verify identity â€” all locally in the browser and backend, without relying on any government APIs.

---

## í´§ Tech Stack Summary

| Layer     | Technology/Libraries Used                                      |
|-----------|---------------------------------------------------------------|
| Frontend  | HTML5, CSS3, Bootstrap 5, Vanilla JS (Webcam API)             |
| Backend   | Python 3.11, Flask, Jinja2                                     |
| Face/OCR  | OpenCV, Pillow, `face_recognition`, dlib, pytesseract, Tesseract |
| Utilities | NumPy, base64, datetime                                        |
| Security  | HTTPS (recommended), `.env` for secrets                       |

---

## í²¡ Features

- âœ… Upload Aadhar card (image or PDF)
- âœ… Extract DOB using OCR
- âœ… Calculate age and determine if 18+
- âœ… Capture live selfie using webcam
- âœ… Match selfie with Aadhar photo via face embeddings
- âœ… Display match confidence score (e.g., 93.5%)
- âœ… Blur detection for image quality feedback
- âœ… Multilingual OCR support (e.g., Hindi, Tamil)
- âœ… Secure environment config using `.env`
- âœ… HTTPS-ready for secure deployment

---

## í³¸ Sample Screenshots

### 1. Upload Aadhar Card

\`\`\`html
<input type="file" id="aadharUpload" accept="image/*,application/pdf">
\`\`\`

### 2. Capture Selfie

\`\`\`javascript
navigator.mediaDevices.getUserMedia({ video: true })
\`\`\`

### 3. Verification Summary

> â€œVerifiedâ€ or â€œNot Verifiedâ€ shown based on confidence threshold and age.  
> Match confidence (e.g., \`92%\`) is displayed.

---

## íº€ How to Run the Project Locally

### í³¦ 1. Clone the Repository

\`\`\`bash
git clone https://github.com/tanya-2004/verifyme
cd verifyme
\`\`\`

### í´§ 2. Install Dependencies

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

### í¼ 3. Set Environment Variables

Create a \`.env\` file:

\`\`\`env
FLASK_ENV=development
SECRET_KEY=your_secret_key_here
\`\`\`

### â–¶ï¸ 4. Run the Flask Server

\`\`\`bash
python app.py
\`\`\`

Visit: [http://localhost:5000](http://localhost:5000)

---

## í³ Project Structure

\`\`\`bash
verifyme/
â”œâ”€â”€ static/
â”‚   â””â”€â”€ styles.css
â”œâ”€â”€ templates/
â”‚   â”œâ”€â”€ index.html
â”‚   â””â”€â”€ result.html
â”œâ”€â”€ uploads/
â”‚   â””â”€â”€ temp image storage
â”œâ”€â”€ app.py
â”œâ”€â”€ requirements.txt
â”œâ”€â”€ README.md
â””â”€â”€ verifyme.exe       # âœ… Executable Binary for Windows
\`\`\`

> âœ… \`verifyme.exe\` created using PyInstaller:

\`\`\`bash
pyinstaller --onefile app.py
\`\`\`

---

## í¾ Bonus Features Implemented

- âœ… Match confidence score shown as percentage
- âœ… Multilingual OCR (\`--lang hin\`, etc.)
- âœ… Blur detection using Laplacian variance
- âœ… Webcam capture quality checks
- âœ… \`.env\` for secure secret config
- âœ… Executable \`.exe\` for quick launch (Windows only)

---

## í´ Security Notes

- íº« No image data is stored
- âœ… Use **HTTPS** in production (e.g., Flask-Talisman)
- âš ï¸ For demo purposes only â€” do **not** use real Aadhar data

---

## í³½ Demo Video & Presentation

- í´— [Demo Video (Google Drive / YouTube)](https://your-demo-link-here)
- í³Š [Project Presentation (PPT)](https://your-ppt-link-here)

---

## í¿ Submission Checklist

- âœ… GitHub repo with working code
- âœ… README with setup & run instructions
- âœ… Demo video and presentation PPT
- âœ… Executable binary (\`verifyme.exe\`)
- âœ… Bonus features implemented

---

## í¹‹â€â™€ï¸ Built with â¤ï¸ by

**PlayersWhoCode**
