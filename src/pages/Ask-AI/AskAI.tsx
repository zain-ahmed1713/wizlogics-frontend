import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hi there! I'm an AI assistant. How can I help you today?",
      role: "assistant",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAI, setSelectedAI] = useState("gemini");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleSendMessageGemini = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      content: inputMessage,
      role: "user",
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const chatHistory = updatedMessages
        .map((msg) => `${msg.role === "user" ? "User:" : "AI:"}${msg.content}`)
        .join("\n");

      const result = await model.generateContent(chatHistory);
      const response = result.response;
      const aiResponse = {
        id: Date.now(),
        content: response.text(),
        role: "assistant",
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage = {
        id: Date.now(),
        content:
          "Sorry, there was an error processing your message with Gemini.",
        role: "assistant",
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessageOpenAI = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      content: inputMessage,
      role: "user",
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = {
        id: Date.now(),
        content: response.data.choices[0].message.content.trim(),
        role: "assistant",
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("OpenAI API Error:", error);
      const errorMessage = {
        id: Date.now(),
        content: "Sorry, OpenAI API is currently disabled.",
        role: "assistant",
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage =
    selectedAI === "gemini" ? handleSendMessageGemini : handleSendMessageOpenAI;

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="w-full py-8">
        <h2 className="text-4xl font-bold text-center text-white">Ask AI</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`
                max-w-[70%] 
                p-3 
                rounded-lg 
                ${
                  msg.role === "assistant"
                    ? "bg-gray-200 text-black"
                    : "bg-blue-500 text-white"
                }
              `}
            >
              <p>
                <span className="font-semibold">
                  {msg.role === "assistant" ? "AI: " : "You: "}
                </span>
                {msg.content}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-black p-3 rounded-lg">
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="py-20 flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-l-lg bg-[#1b2937] text-white"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className={`
            ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } 
            text-white p-2 rounded-r-lg
          `}
        >
          <Send size={26} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
