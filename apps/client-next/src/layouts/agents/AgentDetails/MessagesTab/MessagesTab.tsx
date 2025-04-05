import { SquareTerminal } from "lucide-react";
import type { AgentResponse } from "@libs/graphql";
import { formatTimeAgo } from "@libs/utils-client";

export interface MessagesTabProps {
  messages: AgentResponse["messages"];
}

export const MessagesTab = ({ messages }: MessagesTabProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <SquareTerminal size={16} className="text-gray-950" />
                  <span className="text-14/body font-medium text-gray-800">Agent Action</span>
                </div>
                <span className="text-12/body text-gray-500">{formatTimeAgo(message.createdAt)}</span>
              </div>
              <div className="mt-1 rounded-lg bg-gray-50 p-3">
                <p className="whitespace-pre-wrap text-14/body text-gray-700">{message.content}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-2 py-10">
          <p className="text-14/body text-gray-500">No agent activity records found.</p>
        </div>
      )}
    </div>
  );
};
