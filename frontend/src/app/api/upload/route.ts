import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from "pdf-parse";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

export async function POST(req: NextRequest) {
  try {
    // Check if FormData is present
    if (!req.body) {
      return NextResponse.json({ error: "No request body received" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid file type. Only PDFs are allowed." }, { status: 400 });
    }

    // Read and parse PDF
    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);
    const pdfData = await pdf(data);
    const fullText = pdfData.text.trim();

    if (!fullText) {
      return NextResponse.json({ error: "PDF parsing failed or file is empty" }, { status: 400 });
    }

    // Validate API Key
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    // Call Gemini AI
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Convert this document into CSV with proper headers and formatting:\n${fullText}`;

    const result = await model.generateContent(prompt);
    const csvData = (await result.response.text()).replace(/```csv|```/g, "").trim();

    if (!csvData) {
      return NextResponse.json({ error: "Gemini AI returned empty response" }, { status: 500 });
    }

    return NextResponse.json({ csvData });
  } catch (error: any) {
    console.error("API Error:", error);

    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        message: error.message || "Unknown error occurred", 
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined, 
      },
      { status: 500 }
    );
  }
}
