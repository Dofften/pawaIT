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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim()) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    setLoading(true);

    try {
      const body: Record<string, any> = { content };
      if (conversationId !== undefined) {
        body.conversation_id = conversationId;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        console.error("Failed to send message");
        return;
      }

      const data = await res.json();
      onMessageSent(data);
      setContent("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
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
          onKeyDown={handleKeyDown}
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-[#31AED4]/80 focus:border-[#31AED4]/80"
          placeholder="Your prompt..."
        ></textarea>
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-[#31AED4] rounded-full cursor-pointer hover:bg-[#31AED4]/20"
        >
          {loading ? (
            // simple spinner
            <svg
              className="animate-spin h-5 w-5 text-[#31AED4]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          )}
          <span className="sr-only">Send prompt</span>
        </button>
      </div>
    </form>
  );
}
