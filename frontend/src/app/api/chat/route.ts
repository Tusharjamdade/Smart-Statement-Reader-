
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextRequest } from "next/server";


// export async function POST(req:NextRequest) {
//     const header = await req.json();
//     const search = header.search;
//     const API_KEY:string = process.env.GEMINI_API_KEY || "";
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     let prompt = search;
//     if(search.length > 10){
//         prompt =  search  + " .Answer in 4 lines";
//     }
//     const result = await model.generateContent(prompt);
//     const responseText = result.response.text()
//     return Response.json({
//         responseText
//     })
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { extractText, question } = await req.json();
    if (!extractText || !question) {
      return Response.json({ error: "Missing text or question" }, { status: 400 });
    }

    // Limit extracted text to first 50 words
    const limitedText = extractText.split(" ").slice(0, 50).join(" ");

    const API_KEY: string = process.env.GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Constructing a meaningful prompt
    const prompt = `Based on the following text:\n\n"${limitedText}"\n\nAnswer this question: ${question} (Limit answer to 4 lines)`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    return Response.json({ responseText });
  } catch (error) {
    return Response.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
