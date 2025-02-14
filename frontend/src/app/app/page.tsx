

// "use client";
// import GraphVisualizer from "@/components/settings/GraphVisualizer";
// import React, { useState } from "react";

// const Page = () => {
//   const [extractedText, setExtractedText] = useState<string | null>(null);

//   return (
//     <div className="flex min-h-screen">
//       {/* Main Content - 9/12 */}
//       <div className="w-9/12 p-8 bg-gray-50">
//         <h1 className="text-2xl font-bold">Upload & Process PDF</h1>
//         <UploadSection setExtractedText={setExtractedText} />
//       </div>

//       {/* Chatbot Section - 3/12 */}
//       <div className="w-3/12 border-l bg-white">
//         <ChatBot extractedText={extractedText} />
//       </div>
//     </div>
//   );
// };

// const UploadSection = ({ setExtractedText }: { setExtractedText: (text: string | null) => void }) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [csvUrl, setCsvUrl] = useState<string | null>(null);
//   const [excelUrl, setExcelUrl] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://localhost:8000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setCsvUrl(data.csv_url);
//       setExcelUrl(data.excel_url);
//       setExtractedText(data.text); // Pass extracted text to chatbot
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow rounded-lg">
//       <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-2" />
//       <button
//         onClick={handleUpload}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//         disabled={isLoading}
//       >
//         {isLoading ? "Uploading..." : "Upload & Process"}
//       </button>

//       {csvUrl && excelUrl && (
//         <div className="mt-4">
//           <h3 className="font-semibold">Download Extracted Data:</h3>
//           <a href={`http://localhost:8000${csvUrl}`} className="block text-blue-500" download>
//             Download CSV
//           </a>
//           <a href={`http://localhost:8000${excelUrl}`} className="block text-blue-500" download>
//             Download Excel
//           </a>
//           {/* {extractedText} */}
//           <GraphVisualizer/>
//         </div>
//       )}
//     </div>
//   );
// };

// const ChatBot = ({ extractedText }: { extractedText: string | null }) => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
//     e.preventDefault();
//     if (!input.trim() || !extractedText) return;

//     setMessages((prev) => [...prev, { text: input, isUser: true }]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ extractText: extractedText, question: input }),
//       });

//       const data = await response.json();
//       setMessages((prev) => [...prev, { text: data.responseText, isUser: false }]);
//     } catch (error) {
//       setMessages((prev) => [...prev, { text: "Sorry, there was an error.", isUser: false }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="p-4 border-b">
//         <h2 className="text-lg font-semibold">Chat with PDF</h2>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, i) => (
//           <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
//             <div className={`max-w-xs p-3 rounded-lg ${msg.isUser ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {isLoading && <div className="text-gray-500">Thinking...</div>}
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="p-4 border-t"
//       >
//         <div className="flex gap-2">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask about the PDF..."
//             className="flex-1 p-2 border rounded"
//             disabled={isLoading}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !isLoading) {
//                 handleSubmit(e);
//               }
//             }}
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//             disabled={isLoading}
//           >
//             Send
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Page;




// "use client";
// import { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const Page = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [extractedText, setExtractedText] = useState<string | null>(null);
//   const [csvData, setCsvData] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://localhost:8000/extract-text", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setExtractedText(data.text);
//     } catch (error) {
//       console.error("Error extracting text:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleConvertToCSV = async () => {
//     if (!extractedText) return;
//     setIsLoading(true);

//     try {
//       const API_KEY = "AIzaSyAPDV0ILVEzR5n3oIMgDlJu43-BHbYu7HU";
//       if (!API_KEY) {
//         alert("Missing Gemini API Key!");
//         return;
//       }

//       const genAI = new GoogleGenerativeAI(API_KEY);
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//       const prompt = `Convert this document into CSV with proper headers and formatting:
// - Ensure there are no NULL values.
// - If a value is missing, use techniques like forward-fill (copy previous row's value), backward-fill (copy next row's value), or interpolation to estimate missing values.
// - Maintain proper column structure and coherence.
// - Format the CSV in a structured manner.

// Document Text:
// ${extractedText}`;


//       const result = await model.generateContent(prompt);
//       const csvText = (await result.response.text()).replace(/```csv|```/g, "").trim();

//       setCsvData(csvText);
//     } catch (error) {
//       console.error("Error processing CSV:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const downloadCSV = () => {
//     if (!csvData) return;
//     const blob = new Blob([csvData], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "extracted_data.csv";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="p-8 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">PDF to CSV Converter</h1>

//       <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-2" />
//       <button
//         onClick={handleUpload}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//         disabled={isLoading}
//       >
//         {isLoading ? "Extracting..." : "Extract Text"}
//       </button>

//       {extractedText && (
//         <div className="mt-4 p-4 border rounded bg-gray-100">
//           <h3 className="font-semibold">Extracted Text:</h3>
//           <p className="text-sm whitespace-pre-wrap">{extractedText}</p>

//           <button
//             onClick={handleConvertToCSV}
//             className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Convert to CSV
//           </button>
//         </div>
//       )}

//       {csvData && (
//         <div className="mt-4 p-4 border rounded bg-gray-200">
//           <h3 className="font-semibold">Generated CSV:</h3>
//           <pre className="text-sm whitespace-pre-wrap">{csvData}</pre>
//           <button
//             onClick={downloadCSV}
//             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Download CSV
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;



"use client";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
 
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/extract-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setExtractedText(data.text);
    } catch (error) {
      console.error("Error extracting text:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvertToCSV = async () => {
    if (!extractedText) return;
    setIsLoading(true);

    try {
      const API_KEY = "AIzaSyAPDV0ILVEzR5n3oIMgDlJu43-BHbYu7HU";
      if (!API_KEY) {
        alert("Missing Gemini API Key!");
        return;
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // const prompt = `Extract only relevant information from the document and convert it into a structured CSV format with proper headers and formatting:
      // - Remove unnecessary clutter, redundant text, and irrelevant details.
      // - Ensure no NULL values; use forward-fill, backward-fill, or interpolation if needed.
      // - Maintain a consistent column structure with meaningful data.
      // - Output the final CSV in a clean, structured format.

      // Document Text:
      // ${extractedText}`;
      const prompt = `Extract only relevant information from the document and convert it into a structured CSV format with proper headers and formatting:
      - Remove unnecessary clutter, redundant text, and irrelevant details.
      - Ensure every field has a corresponding header, and no headers exist without values.
      - Fill missing values using forward-fill, backward-fill, or interpolation.
      - Maintain a consistent column structure with meaningful data.
      - Exclude any empty or incomplete records.
      - Output the final CSV in a clean, structured format with properly labeled headers.

      Document Text:
      ${extractedText}`;


      const result = await model.generateContent(prompt);
      const csvText = (await result.response.text()).replace(/```csv|```/g, "").trim();

      setCsvData(csvText);
    } catch (error) {
      console.error("Error processing CSV:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async (input: string) => {
    if (!extractedText || !input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setChatLoading(true);

    try {
      const API_KEY = "AIzaSyAPDV0ILVEzR5n3oIMgDlJu43-BHbYu7HU";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Based on the extracted document text, answer the following query in 4 lines:
      Document Text:
      ${extractedText}

      User Question:
      ${input}`;

      const result = await model.generateContent(prompt);
      const responseText = (await result.response.text()).trim();

      setMessages((prev) => [...prev, { text: responseText, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error generating response", isUser: false }]);
    } finally {
      setChatLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!csvData) return;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "extracted_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
//     <div className="flex min-h-screen bg-background">
//       {/* Main Content - 9/12 */}
//       <div className="w-9/12 p-8 bg-gray-50 bg-background">
//         <h1 className="text-2xl font-bold mb-4">PDF to CSV Converter</h1>
// <div className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
//   <label className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition">
//     <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
//     <span className="text-gray-700 font-medium flex items-center gap-2">
//       📂 Choose a PDF file
//     </span>
//   </label>

//   <button
//     onClick={handleUpload}
//     className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50"
//     disabled={isLoading}
//   >
//     {isLoading ? (
//       <>
//         ⏳ Extracting...
//       </>
//     ) : (
//       <>
//         📄 Extract Text
//       </>
//     )}
//   </button>
// </div>

//         {extractedText && (
//           <div className="mt-4 p-4 border rounded bg-white shadow">
//             <h3 className="font-semibold">Extracted Text:</h3>
//             <p className="text-sm whitespace-pre-wrap">{extractedText}</p>

//             <button
//               onClick={handleConvertToCSV}
//               className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               Convert to CSV
//             </button>
//           </div>
//         )}

//         {csvData && (
//           <div className="mt-4 p-4 border rounded bg-gray-200">
//             <h3 className="font-semibold">Generated CSV:</h3>
//             <pre className="text-sm whitespace-pre-wrap">{csvData}</pre>
//             <button
//               onClick={downloadCSV}
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Download CSV
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Chatbot Section - 3/12 */}
//       <div className="w-3/12 min-h-full border-l bg-white flex flex-col ">
//         <div className="p-4 border-b">
//           <h2 className="text-lg font-semibold">Chat with PDF</h2>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((msg, i) => (
//             <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
//               <div className={`max-w-xs p-3 rounded-lg ${msg.isUser ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           {chatLoading && <div className="text-gray-500">Thinking...</div>}
//         </div>

//         <div className="p-4 border-t">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Ask about the PDF..."
//               className="flex-1 p-2 border rounded"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !chatLoading) {
//                   handleChat(e.currentTarget.value);
//                   e.currentTarget.value = "";
//                 }
//               }}
//             />
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//               onClick={() => {
//                 const input = document.querySelector("input") as HTMLInputElement;
//                 handleChat(input.value);
//                 input.value = "";
//               }}
//               disabled={chatLoading}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
<div className="flex min-h-screen bg-background text-foreground">
  {/* Main Content - 9/12 */}
  <div className="w-9/12 p-8 bg-card shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-4">PDF to CSV Converter</h1>
    <div className="flex flex-col items-center gap-4 p-6 bg-muted shadow-md rounded-lg w-full max-w-md mx-auto">
      <label className="w-full flex items-center justify-center px-4 py-2 bg-accent border border-border rounded-lg shadow-sm cursor-pointer hover:bg-accent-hover transition">
        <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
        <span className="text-foreground font-medium flex items-center gap-2">
          📂 Choose a PDF file
        </span>
      </label>

      <button
        onClick={handleUpload}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "⏳ Extracting..." : "📄 Extract Text"}
      </button>
    </div>

    {extractedText && (
      <div className="mt-4 p-4 border rounded bg-card shadow">
        <h3 className="font-semibold">Extracted Text:</h3>
        <p className="text-sm whitespace-pre-wrap">{extractedText}</p>
        <button
          onClick={handleConvertToCSV}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Convert to CSV
        </button>
      </div>
    )}

    {csvData && (
      <div className="mt-4 p-4 border rounded bg-muted">
        <h3 className="font-semibold">Generated CSV:</h3>
        <pre className="text-sm whitespace-pre-wrap">{csvData}</pre>
        <button
          onClick={downloadCSV}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download CSV
        </button>
      </div>
    )}
  </div>

  {/* Chatbot Section - 3/12 */}
  <div className="w-3/12 min-h-full border-l bg-card flex flex-col">
    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold">Chat with PDF</h2>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-xs p-3 rounded-lg ${msg.isUser ? "bg-blue-500 text-white" : "bg-muted"}`}>
            {msg.text}
          </div>
        </div>
      ))}
      {chatLoading && <div className="text-muted-foreground">Thinking...</div>}
    </div>

    <div className="p-4 border-t">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask about the PDF..."
          className="flex-1 p-2 border rounded bg-input text-foreground"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !chatLoading) {
              handleChat(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={() => {
            const input = document.querySelector("input") as HTMLInputElement;
            handleChat(input.value);
            input.value = "";
          }}
          disabled={chatLoading}
        >
          Send
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Page;
