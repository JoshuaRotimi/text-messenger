"use client";
import { FullMessageType } from "@/app/types";
import React, { useState, useRef, useEffect } from "react";
import useConversations from "@/app/hooks/useConversations";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversations();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className={"pt-24"}></div>
    </div>
  );
};

export default Body;
