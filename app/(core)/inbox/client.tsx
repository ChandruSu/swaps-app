"use client";

import { Panel } from "@/components/Panel";
import { useState } from "react";

export function Message({ me, message }: { message: string; me: boolean }) {
  return (
    <div className={"flex " + (me ? " justify-end" : "justify-start")}>
      <p
        className={
          "min-w-[30%] max-w-[75%] rounded-lg p-3 shadow " +
          (me ? "bg-sky-300" : "bg-white")
        }
      >
        {message}
      </p>
    </div>
  );
}

export function Client() {
  const [groups, setGroups] = useState([{}, {}]);
  const [messages, setMessages] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  return (
    <>
      <Panel className="flex flex-col gap-2 p-3">
        {groups.map((group, i) => (
          <button
            key={`group-${i}`}
            className="flex items-center justify-start gap-4 rounded-sm bg-slate-50 p-2 text-left font-medium transition-all duration-200 hover:bg-slate-100 active:bg-slate-300"
          >
            <div className="aspect-square h-10 rounded bg-slate-300" />
            <p>Chat {i}</p>
          </button>
        ))}
      </Panel>
      <Panel className="grid grid-rows-[auto_3rem] gap-3 overflow-hidden p-2">
        <div className="no-scrollbar flex flex-col gap-4 overflow-y-scroll p-2">
          {messages.map((message, i) => (
            <Message me={i % 2 === 0} message="This is a message" />
          ))}
        </div>
        <input
          placeholder="Send a message"
          className="rounded-md bg-opacity-20 px-3 py-4 focus:outline-none"
        />
      </Panel>
    </>
  );
}
