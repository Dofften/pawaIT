export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <main className="h-full bg-white">{children}</main>
    </div>
  );
}
