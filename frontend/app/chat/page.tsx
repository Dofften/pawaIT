import Sidebar from "@/components/sidebar";

export default function chat() {
  return (
    <div className="grid min-h-screen h-full grid-flow-col grid-cols-12 grid-rows-12 gap-4">
      <div className="row-span-12 col-span-2">
        <Sidebar />
      </div>

      <div className="col-span-10 row-span-10 bg-amber-600">
        Chat interface, to be list of markdown messages
      </div>
      <div className="col-span-10 row-span-2 bg-red-800">input box</div>
    </div>
  );
}
