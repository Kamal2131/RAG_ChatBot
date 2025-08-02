import { ChatBubble } from "./ChatBubble";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
}

export const ChatWindow = ({ messages }: ChatWindowProps) => {
  return (
    <div className="flex flex-col space-y-2 overflow-y-auto h-[400px] px-2 py-4 border rounded-md bg-white">
      {messages.map((msg, index) => (
        <ChatBubble key={index} role={msg.role} message={msg.content} />
      ))}
    </div>
  );
};
