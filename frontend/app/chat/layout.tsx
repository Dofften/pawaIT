import Sidebar from "@/components/sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <main className="h-full">
        <div className="flex h-screen">
          <div className="w-1/6 flex-shrink-0">
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
