import Image from "next/image";

export default function Home() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-40 lg:pb-48 xl:col-span-6">
          <div className="mx-auto max-w-lg lg:mx-0">
            <div className="hidden sm:mt-32 sm:flex lg:mt-16">
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Code is opensource at.{" "}
                <a
                  href="https://github.com/Dofften/pawaIT"
                  className="font-semibold whitespace-nowrap text-[#31AED4]"
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  my github <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <h1 className="mt-24 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:mt-10 sm:text-7xl">
              interactive Q&A system
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              A full stack interactive Q & A system kind of like chatgpt that
              uses Gemini built with Python, FastAPI, and Next.js.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="/chat"
                className="rounded-md bg-[#31AED4] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#31AED4]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31AED4]"
              >
                Try it out
              </a>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1698006150156-3779d5c2306c?q=80&w=557&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-3/2 w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  );
}
