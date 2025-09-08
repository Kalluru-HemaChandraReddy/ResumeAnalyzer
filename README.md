# Resume Analyzer (React + Node + Gemini AI)

This project is a **Resume Analyzer Web App** that extracts text from resumes (PDFs), sends it to **Google Gemini AI**, and provides structured insights.

---

## 🚀 Features
- Upload resumes (PDF)
- Extract text using `pdf-parse`
- Analyze with Gemini AI
- Show results in **cards**:
  - 🎯 Well Tried
  - 📊 Resume Rating (out of 10)
  - ✅ Key Strengths
  - 📌 Areas to Upskill
- View extracted raw text (collapsible)
- Professional UI with React + CSS
- Footer with **social links**

---

## 🛠 Tech Stack
- **Frontend**: React (Vite) + CSS
- **Backend**: Express.js + Multer + Axios
- **AI**: Google Gemini API
- **File Parsing**: pdf-parse

---

## 📂 Project Structure
resume-analyzer/
│
├── backend/                # Express backend
├── frontend/               # React frontend
│
├── sample_data/            # Test resumes
│   ├── resume1.pdf
│   ├── resume2.pdf
│
├── screenshots/            # UI screenshots
│   ├── upload_page.png
│   ├── results_page.png
│   ├── history_table.png
│   └── details_modal.png
│
├── README.md               # Documentation
└── package.json

# ResumeAnalyzer
