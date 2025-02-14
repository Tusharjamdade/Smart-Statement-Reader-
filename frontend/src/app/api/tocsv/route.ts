import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Read and parse PDF
    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);
    const pdfData = await pdf(data);
    const fullText = pdfData.text;
    console.log(fullText)

    // Initialize Gemini
    const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAPDV0ILVEzR5n3oIMgDlJu43-BHbYu7HU';
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate CSV prompt
    const prompt = `Convert the following document text into a well-structured CSV format. 
      Analyze the content to determine appropriate headers and data organization. 
      Ensure the CSV follows these rules:
      1. First row must be column headers
      2. Subsequent rows contain data
      3. Proper escaping for CSV values
      4. Maintain data integrity
      5. Format numbers and dates consistently
      
      Text content:
      ${fullText}`;

    const result = await model.generateContent(prompt);
    const csvData = await result.response.text();

    // Clean Gemini response
    const cleanCSV = csvData.replace(/```csv|```/g, '').trim();

    return NextResponse.json({ csvData: cleanCSV });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}