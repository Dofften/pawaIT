"use client";
import { use } from "react";
import Textarea from "@/components/textarea";
import Chatbubble from "@/components/chatbubble";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function conversation({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<
    {
      id: number;
      created_at: string;
      role: string;
      parts: { text: string }[];
    }[]
  >([]);
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");
    setUsername(username || "User");

    if (!token) {
      router.push("/auth/login");
    }

    // Fetch messages for conversation
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await fetch(
          `http://localhost:8000/messages?conversation_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch messages");
          router.push("/chat");
          return;
        }

        const data = await res.json();

        const messageItems = data.map((msg: any) => ({
          id: msg.id,
          created_at: msg.created_at,
          role: msg.role,
          parts: msg.parts,
        }));

        setMessages(messageItems);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [router]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div
        className="flex-1 overflow-y-auto bg-white p-4 min-h-0"
        ref={scrollContainerRef}
      >
        <div className="space-y-4">
          {messages.map((msg) => (
            <Chatbubble
              key={msg.id}
              side={msg.role === "user" ? "right" : "left"}
              message={msg.parts.map((p) => p.text).join(" ")}
              name={msg.role === "user" ? username : "Gemini"}
              time={new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              status="delivered"
            />
          ))}
        </div>
      </div>
      <div className="h-24 flex-shrink-0 p-3 bg-white">
        <Textarea
          conversationId={id}
          onMessageSent={(data) => {
            setMessages((prev) => [
              ...prev,
              {
                id: data.message.id,
                created_at: data.message.created_at,
                role: data.message.role,
                parts: data.message.parts,
              },
              {
                id: data.model_response.id,
                created_at: data.model_response.created_at,
                role: data.model_response.role,
                parts: data.model_response.parts,
              },
            ]);
          }}
        />
      </div>
    </div>
  );
}
