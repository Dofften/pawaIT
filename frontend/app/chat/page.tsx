"use client";
import Textarea from "@/components/textarea";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Unbounded } from "next/font/google";

const unboundedSans = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded-sans",
  display: "swap",
});

export default function chat() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto bg-white p-4 min-h-0">
        <div className="flex justify-center items-center h-96">
          <h1
            className={`${unboundedSans.className} antialiased font-bold text-2xl/9 tracking-tight text-gray-900`}
          >
            How may I help you today?
          </h1>
        </div>
      </div>

      <div className="h-24 flex-shrink-0 p-3 bg-white">
        <Textarea
          onMessageSent={(data) => {
            router.push(`/chat/${data.conversation_id}`);
          }}
        />
      </div>
    </div>
  );
}
