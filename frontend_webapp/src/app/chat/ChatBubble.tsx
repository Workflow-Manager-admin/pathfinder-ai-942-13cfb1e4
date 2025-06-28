import React from "react";

type BubbleProps = {
  message: string;
  from: "user" | "assistant";
  timestamp: string;
};

/**
 * ChatBubble shows a single message in the chat thread, styled based on sender.
 */
export function ChatBubble({ message, from, timestamp }: BubbleProps) {
  // Style bubbles: user right (primary), assistant left (gray)
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl shadow
          ${isUser
            ? "bg-indigo-600 text-white rounded-tr-sm"
            : "bg-gray-100 text-gray-900 rounded-tl-sm"
          }
        `}
        title={new Date(timestamp).toLocaleTimeString()}
      >
        <div className="whitespace-pre-line break-words">{message}</div>
        <div className={`text-xs mt-1 opacity-70 ${isUser ? "text-indigo-100" : "text-gray-500"}`}>
          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}
