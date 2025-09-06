import { Unbounded } from "next/font/google";

const unboundedSans = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded-sans",
  display: "swap",
});

const navigation = [
  { name: "I am a large language model", href: "#", current: false },
  { name: "Greetings and Salutations", href: "#", current: true },
  { name: "Ientification, Please. State Name.", href: "#", current: false },
  { name: "Nairobi leadership", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ username }: { username?: string }) {
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
            <div className="text-xs/6 font-semibold text-gray-400">Chats</div>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-[#31AED4]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#31AED4]/60",
                      "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                    )}
                  >
                    <span className="truncate flex-1">{item.name}</span>
                  </a>
                </li>
              ))}
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
          </li>
        </ul>
      </nav>
    </div>
  );
}
