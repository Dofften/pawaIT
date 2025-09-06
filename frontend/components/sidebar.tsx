"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Unbounded } from "next/font/google";

const unboundedSans = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded-sans",
  display: "swap",
});

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [conversations, setConversations] = useState<
    { name: string; href: string }[]
  >([]);
  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username || "User");

    // Fetch conversations for navigation
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch conversations");
          return;
        }

        const data = await res.json();

        const conversationItems = data.map((conv: any) => ({
          id: conv.id,
          name: conv.name || `Conversation ${conv.id}`,
          href: `/chat/${conv.id}`,
        }));

        setConversations(conversationItems);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    router.push("/auth/login");
  };
  return (
    <div className="flex h-full grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gray-200/95 px-6">
      <div className="flex h-16 shrink-0 items-center">
        <div
          className={`${unboundedSans.className} antialiased text-lg font-bold text-[#31AED4]`}
        >
          Pawa IT
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <div>
              <a
                href="/chat"
                className="font-semibold p-2 py-1 text-sm/6 rounded-md text-gray-700 hover:bg-gray-50 hover:text-[#31AED4]/60"
              >
                <span className="truncate flex-1">New Chat</span>
              </a>
            </div>
            <div className="text-xs/6 font-semibold text-gray-400">Chats</div>
            <ul role="list" className="-mx-2 space-y-1">
              {conversations.map((item: any) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={classNames(
                        isActive
                          ? "bg-gray-50 text-[#31AED4]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#31AED4]/60",
                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                      )}
                    >
                      <span className="truncate flex-1">{item.name}</span>
                    </a>
                  </li>
                );
              })}
              {conversations.length === 0 && (
                <li className="text-gray-700 text-sm px-2">
                  <span className="text-gray-700">No conversations yet</span>
                </li>
              )}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">{username || "User"}</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold hover:bg-gray-50 text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
