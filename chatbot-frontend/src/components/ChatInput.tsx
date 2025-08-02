import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  loading: boolean;
}

export const ChatInput = ({ input, setInput, onSend, loading }: ChatInputProps) => {
  return (
    <div className="w-full bg-white border-t p-4 flex gap-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        className="flex-1 resize-none min-h-[60px]"
      />
      <Button onClick={onSend} disabled={loading || !input.trim()}>
        {loading ? "Thinking..." : "Send"}
      </Button>
    </div>
  );
};
