const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdf = require("pdf-parse");
const dotenv = require("dotenv");
const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

// ✅ Use the Generative Language scope instead of just cloud-platform
const auth = new GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/generative-language"],
});

app.post("/upload", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);

    const authClient = await auth.getClient();
    const accessToken = await authClient.getAccessToken();

    const prompt = `
      You are a resume analyzer AI.
      1. Rate this resume on a scale of 1-10.
      2. Summarize key strengths and improvement areas.
      3. Suggest new skills the candidate should learn for upskilling.

      Resume Text:
      ${pdfData.text}
    `;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      message: "File uploaded and analyzed successfully!",
      extractedText: pdfData.text || "⚠️ No text extracted from PDF",
      analysis:
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No analysis returned",
    });
  } catch (err) {
    console.error("PDF/Gemini error:", err.response ? err.response.data : err);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
