// "use client"
// import React, { useState } from 'react';

// const Page = () => {
//   return (
//     <div className="flex min-h-screen">
//       {/* Main Content - 9/12 */}
//       <div className="w-9/12 p-8 bg-gray-50">
//         <h1 className="text-2xl font-bold">Main Content Area</h1>
//         <p>Your main page content goes here</p>
//       </div>

//       {/* Chatbot Section - 3/12 */}
//       <div className="w-3/12 border-l bg-white">
//         <ChatBot />
//       </div>
//     </div>
//   );
// };

// const ChatBot = () => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // Add user message
//     setMessages(prev => [...prev, { text: input, isUser: true }]);
//     const userInput = input;
//     setInput('');
//     setIsLoading(true);

//     try {
//       // Replace with your API route
//       const response = await fetch('/api/gemini', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userInput }),
//       });

//       const data = await response.json();
//       setMessages(prev => [...prev, { text: data.response, isUser: false }]);
//     } catch (error) {
//       setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting.", isUser: false }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="p-4 border-b">
//         <h2 className="text-lg font-semibold">AI Assistant</h2>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, i) => (
//           <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
//             <div className={`max-w-xs p-3 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {isLoading && <div className="text-gray-500">Thinking...</div>}
//       </div>

//       <form onSubmit={handleSubmit} className="p-4 border-t">
//         <div className="flex gap-2">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border rounded"
//             disabled={isLoading}
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
// import React, { useState } from "react";

// const Page = () => {
//   return (
//     <div className="flex min-h-screen">
//       {/* Main Content - 9/12 */}
//       <div className="w-9/12 p-8 bg-gray-50">
//         <h1 className="text-2xl font-bold">Upload & Process PDF</h1>
//         <UploadSection />
//       </div>

//       {/* Chatbot Section - 3/12 */}
//       <div className="w-3/12 border-l bg-white">
//         <ChatBot />
//       </div>
//     </div>
//   );
// };

// const UploadSection = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [csvUrl, setCsvUrl] = useState<string | null>(null);
//   const [excelUrl, setExcelUrl] = useState<string | null>(null);
//   const [extractedText, setExtractedText] = useState<string | null>(null);
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
//       setExtractedText(data.text);
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
//         </div>
//       )}

//       {extractedText && (
//         <div className="mt-4 p-2 bg-gray-100 rounded">
//           <h3 className="font-semibold">Extracted Text:</h3>
//           <p className="text-sm max-h-40 overflow-auto">{extractedText}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const ChatBot = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [extractedText, setExtractedText] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || !extractedText) return;

//     setMessages((prev) => [...prev, { text: input, isUser: true }]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: new URLSearchParams({ text: extractedText, question: input }),
//       });

//       const data = await response.json();
//       setMessages((prev) => [...prev, { text: data.answer, isUser: false }]);
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

//       <form onSubmit={handleSubmit} className="p-4 border-t">
//         <div className="flex gap-2">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask about the PDF..."
//             className="flex-1 p-2 border rounded"
//             disabled={isLoading}
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


"use client";
import React, { useState } from "react";

const Page = () => {
  const [extractedText, setExtractedText] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen">
      {/* Main Content - 9/12 */}
      <div className="w-9/12 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold">Upload & Process PDF</h1>
        <UploadSection setExtractedText={setExtractedText} />
      </div>

      {/* Chatbot Section - 3/12 */}
      <div className="w-3/12 border-l bg-white">
        <ChatBot extractedText={extractedText} />
      </div>
    </div>
  );
};

const UploadSection = ({ setExtractedText }: { setExtractedText: (text: string | null) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [csvUrl, setCsvUrl] = useState<string | null>(null);
  const [excelUrl, setExcelUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setCsvUrl(data.csv_url);
      setExcelUrl(data.excel_url);
      setExtractedText(data.text); // Pass extracted text to chatbot
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Upload & Process"}
      </button>

      {csvUrl && excelUrl && (
        <div className="mt-4">
          <h3 className="font-semibold">Download Extracted Data:</h3>
          <a href={`http://localhost:8000${csvUrl}`} className="block text-blue-500" download>
            Download CSV
          </a>
          <a href={`http://localhost:8000${excelUrl}`} className="block text-blue-500" download>
            Download Excel
          </a>
          {/* {extractedText} */}
        </div>
      )}
    </div>
  );
};

const ChatBot = ({ extractedText }: { extractedText: string | null }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!input.trim() || !extractedText) return;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extractText: extractedText, question: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.responseText, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Sorry, there was an error.", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with PDF</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs p-3 rounded-lg ${msg.isUser ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-500">Thinking...</div>}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t"
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the PDF..."
            className="flex-1 p-2 border rounded"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
