export default function Chatbubble({
  side = "left",
  message,
  name,
  time,
  status,
}: {
  side?: "left" | "right";
  message?: string;
  name?: string;
  time?: string;
  status?: string;
}) {
  const isLeft = side === "left";
  return (
    <div
      className={`flex items-start gap-2.5 ${isLeft ? "" : "flex-row-reverse"}`}
    >
      <div className={`flex flex-col gap-1 w-3/5 ${isLeft ? "" : "items-end"}`}>
        <div
          className={`flex items-center space-x-2 rtl:space-x-reverse ${
            isLeft ? "" : "flex-row-reverse"
          }`}
        >
          <span className="text-sm font-semibold text-gray-900">
            {name || "Frank Omondi"}
          </span>
          <span className="text-sm font-normal text-gray-500">
            {time || "00:00"}
          </span>
        </div>
        <div
          className={`flex flex-col leading-1.5 p-4 border-gray-200 ${
            isLeft
              ? "bg-[#31AED4] rounded-e-xl rounded-es-xl"
              : "bg-[#31AED4] rounded-s-xl rounded-ee-xl text-white"
          }`}
        >
          <p className="text-sm font-normal break-words text-white">
            {" "}
            {message || "Message could not be found for some reason"}
          </p>
        </div>
        {status && (
          <span className="text-sm font-normal text-gray-500">{status}</span>
        )}
      </div>
    </div>
  );
}
