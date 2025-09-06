"use client";
import { useState } from "react";

export default function Textarea({
  conversationId,
  onMessageSent,
}: {
  conversationId?: number;
  onMessageSent: (message: any) => void;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const body: Record<string, any> = { content };
      if (conversationId !== undefined) {
        body.conversation_id = conversationId;
      }
      const res = await fetch("http://localhost:8000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        console.error("Failed to send message");
        return;
      }

      const data = await res.json();
      onMessageSent(data); // update parent
      setContent(""); // clear input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="chat" className="sr-only">
        Your prompt
      </label>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-200/95">
        <textarea
          id="chat"
          rows={1}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-[#31AED4]/80 focus:border-[#31AED4]/80"
          placeholder="Your prompt..."
        ></textarea>
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-[#31AED4] rounded-full cursor-pointer hover:bg-[#31AED4]/20"
        >
          <svg
            className="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Send prompt</span>
        </button>
      </div>
    </form>
  );
}
