import React, { useState } from "react";

type ChatInputProps = {
  onSend: (text: string) => void;
  pending: boolean;
};

/**
 * ChatInput renders a form for sending a message/question to the AI assistant.
 */
export function ChatInput({ onSend, pending }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return setTouched(true);
    onSend(value);
    setValue("");
    setTouched(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 border-t bg-white px-4 py-3"
      autoComplete="off"
    >
      <input
        type="text"
        name="chat"
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        className={`flex-1 px-4 py-2 border rounded-full bg-gray-50 outline-none transition-all ${
          touched && !value.trim() ? "border-red-300" : "border-gray-200"
        }`}
        placeholder="Type your question and hit Enter..."
        disabled={pending}
        autoFocus
        aria-label="Type your question to the AI assistant"
      />
      <button
        type="submit"
        disabled={pending || !value.trim()}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {pending ? "..." : "Send"}
      </button>
    </form>
  );
}
