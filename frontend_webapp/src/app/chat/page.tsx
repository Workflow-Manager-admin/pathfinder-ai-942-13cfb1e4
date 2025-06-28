"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { getChatHistory, sendChatMessage, ChatMessageSchema } from "@/services/api";

/**
 * ChatPage renders the chatbot Q&A UI and syncs with backend.
 * Fetches chat history, allows user sending, and displays assistant/user messages.
 */
export default function ChatPage() {
  // In a real app, user_id should be dynamic/authenticated
  const [userId] = useState("demo-user-001");
  const [messages, setMessages] = useState<ChatMessageSchema[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat history on mount
  useEffect(() => {
    setLoadingHistory(true);
    getChatHistory(userId)
      .then(hist => setMessages(hist))
      .catch(err =>
        setError(typeof err?.message === "string" ? err.message : "Could not load chat history.")
      )
      .finally(() => setLoadingHistory(false));
  }, [userId]);

  // PUBLIC_INTERFACE
  /** Called when a user sends a new message/question to the AI assistant. */
  async function handleSend(text: string) {
    setError(null);
    setPending(true);
    const userMsg: ChatMessageSchema = {
      message_id: "temp-" + Date.now(),
      user_id: userId,
      sender: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages(msgs => [...msgs, userMsg]);

    try {
      const result = await sendChatMessage({
        user_id: userId,
        sender: "user",
        content: text,
      });
      setMessages(msgs => [
        ...msgs.filter(m => m.message_id !== userMsg.message_id),
        userMsg, // place user message just in case
        result,
      ]);
    } catch (e: unknown) {
      setMessages(msgs => msgs.filter(m => m.message_id !== userMsg.message_id));
      const errorMsg =
        typeof e === "object" && e !== null && "message" in e && typeof (e as { message: unknown })["message"] === "string"
          ? (e as { message: string }).message
          : "Failed to get assistant response.";
      setError(errorMsg);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="max-w-xl mx-auto flex flex-col h-[calc(100vh-96px)] border rounded-lg shadow bg-white">
      <header className="py-3 px-5 border-b bg-indigo-600 text-white rounded-t-lg">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          🤖 SkillBridge AI Chat
        </h1>
        <p className="text-xs text-indigo-100">Ask anything about learning paths, career, or projects.</p>
      </header>

      <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-gray-50">
        {loadingHistory && (
          <div className="flex flex-col items-center justify-center text-indigo-500 py-10">Loading chat…</div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-2 rounded mb-2">{error}</div>
        )}

        {!loadingHistory && !error && messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">No messages yet. Start the conversation below!</div>
        )}

        {messages.map((msg) => (
          <ChatBubble
            key={msg.message_id}
            message={msg.content}
            from={msg.sender === "user" ? "user" : "assistant"}
            timestamp={msg.timestamp}
          />
        ))}

        <div ref={endRef} />
      </div>
      <ChatInput onSend={handleSend} pending={pending} />
    </section>
  );
}
