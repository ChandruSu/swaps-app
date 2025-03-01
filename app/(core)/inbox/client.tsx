"use client"

import { Panel } from "@/components/Panel";
import { useState } from "react";

export function Message({ me, message }: { message: string, me: boolean }) {
  return (
    <div className={"flex " + (me ? " justify-end" : "justify-start")}>
      <p className={"p-3 rounded-lg max-w-[75%] min-w-[30%] shadow " + (me ? "bg-sky-300" : "bg-white")}>{message}</p>
    </div>
  )
}

export function Client() {
  const [groups, setGroups] = useState([{}, {}])
  const [messages, setMessages] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}])

  return (
    <>
      <Panel className="flex flex-col gap-2 p-3">
        {groups.map((group, i) => (
          <button key={`group-${i}`} className="bg-slate-50 font-medium hover:bg-slate-100 transition-all duration-200 active:bg-slate-300 rounded-sm p-2 text-left flex items-center justify-start gap-4">
            <div className="bg-slate-300 rounded aspect-square h-10" />
            <p>Chat {i}</p>
          </button>
        ))}
      </Panel>
      <Panel className="grid grid-rows-[auto_3rem] gap-3 p-2 overflow-hidden">
        <div className="flex flex-col overflow-y-scroll no-scrollbar gap-4 p-2">
          {messages.map((message, i) => (
            <Message me={i % 2 === 0} message="This is a message" />
          ))}
        </div>
        <input placeholder="Send a message" className="focus:outline-none rounded-md px-3 py-4 bg-opacity-20" />
      </Panel>
    </>
  )
}