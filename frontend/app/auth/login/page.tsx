"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Unbounded } from "next/font/google";

const unboundedSans = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded-sans",
  display: "swap",
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.push("/chat");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to login");
      }

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", data.user.username);
        router.push("/chat");
        return;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex flex-1 h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <div
              className={`${unboundedSans.className} antialiased text-lg font-bold text-[#31AED4] text-center`}
            >
              Pawa IT
            </div>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <div className="col-span-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="username"
                  autoComplete="username"
                  aria-label="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-[#31AED4] sm:text-sm/6"
                />
              </div>
              <div className="-mt-px">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="password"
                  autoComplete="current-password"
                  aria-label="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-[#31AED4] sm:text-sm/6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <svg
                      fill="none"
                      viewBox="0 0 14 14"
                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-checked:opacity-100"
                      />
                      <path
                        d="M3 7H11"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-indeterminate:opacity-100"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-[#31AED4] px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-[#31AED4]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31AED4]"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>
          <p className="text-center text-sm/6 text-gray-500">
            Not a registered user?{" "}
            <a
              href="/auth/register"
              className="font-semibold text-[#31AED4] hover:text-[#31AED4]/80"
            >
              Click here to register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
