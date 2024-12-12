import React, { useState } from "react";
import axios from "axios";

const CodePlayground = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const languageTemplates: any = {
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    python3: `print("Hello, World!")`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    nodejs: `console.log("Hello, World!");`,
    c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  };

  const handleExecuteCode = async () => {
    setIsLoading(true);
    setError("");
    setOutput("");

    try {
      const response = await axios.post(
        "/api/users/execute",
        {
          script: code,
          language: language,
          versionIndex: 4,
        },
        {
          withCredentials: true,
        }
      );

      setOutput(response.data.data.output || "Code executed successfully.");
    } catch (err) {
      console.error("Execution error:", err);
      setError("Failed to execute code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(languageTemplates[selectedLanguage]);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full py-8">
        <h2 className="text-4xl font-bold text-center text-white">
          Code Playground
        </h2>
      </div>
      <div className="flex mb-4">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="mr-4 p-2 border rounded"
        >
          {Object.keys(languageTemplates).map((lang) => (
            <option key={lang} value={lang}>
              {lang === "nodejs" ? "JAVASCRIPT" : lang.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          onClick={handleExecuteCode}
          disabled={isLoading}
          className={`
            px-4 py-2 rounded 
            ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }
          `}
        >
          {isLoading ? "Executing..." : "Run Code"}
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-64 p-2 mb-4 border rounded font-mono"
        placeholder="Write your code here..."
      />
      <div className="mt-4">
        <h3 className="font-bold mb-2 text-white">Output:</h3>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
            {error}
          </div>
        )}
        <pre className="bg-gray-100 p-2 rounded overflow-auto">
          {output || "Output will appear here..."}
        </pre>
      </div>
    </div>
  );
};

export default CodePlayground;
