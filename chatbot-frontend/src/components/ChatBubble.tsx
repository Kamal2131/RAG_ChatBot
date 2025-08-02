import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  role: "user" | "bot";
  message: string;
}

export const ChatBubble = ({ role, message }: ChatBubbleProps) => {
  const isUser = role === "user";

  return (
    <div className={cn("w-full flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] px-4 py-2 rounded-xl text-sm shadow-sm whitespace-pre-wrap",
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-black rounded-bl-none"
        )}
      >
        {message}
      </div>
    </div>
  );
};
