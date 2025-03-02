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

const conversations = [
  [
    { "message": "Hey, want to meet to exchange the consoles", "me": true },
    { "message": "Yeah I would love to", "me": false },
    { "message": "Awesome! When are you free?", "me": true },
    { "message": "I'm free this evening, around 6 PM. Does that work?", "me": false },
    { "message": "Yeah, that works for me. Where do you want to meet?", "me": true },
    { "message": "How about the coffee shop downtown?", "me": false },
    { "message": "Sounds good. See you there!", "me": true },
    { "message": "Great! I'll bring the console and the accessories.", "me": false },
    { "message": "Perfect. I'll bring mine too. Looking forward to it!", "me": true }
  ],
  [
    { "message": "Hey, are you still interested in exchanging the furniture?", "me": true },
    { "message": "Yeah, definitely! What piece are you looking to trade?", "me": false },
    { "message": "I have a wooden dining table, and I'm looking for a couch.", "me": true },
    { "message": "That works perfectly! I have a couch but need a dining table.", "me": false },
    { "message": "Awesome! When would you like to do the exchange?", "me": true },
    { "message": "I’m free this Saturday afternoon. Does that work for you?", "me": false },
    { "message": "Yeah, that should be fine. Do you want to meet somewhere or do a doorstep exchange?", "me": true },
    { "message": "A doorstep exchange sounds easier. I can bring the couch to your place.", "me": false },
    { "message": "That works for me! I’ll have the table ready for you.", "me": true },
    { "message": "Great! Looking forward to it. See you then!", "me": false }
  ],
  [
    { "message": "Hey, are you still up for exchanging the electronics?", "me": true },
    { "message": "Yeah, for sure! What device do you have again?", "me": false },
    { "message": "I have a gaming laptop, and I’m looking to trade for a tablet.", "me": true },
    { "message": "Nice! I have an iPad Pro that I’m willing to exchange.", "me": false },
    { "message": "That sounds perfect. Is it in good condition?", "me": true },
    { "message": "Yeah, it’s in great shape. Just a few minor scratches on the back. How’s the laptop?", "me": false },
    { "message": "It’s in excellent condition, barely used. Comes with the charger too.", "me": true },
    { "message": "Awesome! When and where do you want to exchange?", "me": false },
    { "message": "How about tomorrow afternoon at the mall food court?", "me": true },
    { "message": "Sounds good to me. See you then!", "me": false }
  ],
  [
    { "message": "Hey, are you still interested in trading your iPhone for gym equipment?", "me": true },
    { "message": "Yeah, I am! What kind of equipment do you have?", "me": false },
    { "message": "I have a set of dumbbells, a weight bench, and a resistance band set.", "me": true },
    { "message": "That sounds good! The iPhone is brand new, still in the box.", "me": false },
    { "message": "Nice! Which model is it?", "me": true },
    { "message": "It's the iPhone 14 Pro, 128GB.", "me": false },
    { "message": "That’s great! My equipment is in excellent condition too.", "me": true },
    { "message": "Awesome! When and where do you want to exchange?", "me": false },
    { "message": "How about tomorrow afternoon at the park near downtown?", "me": true },
    { "message": "That works for me. See you then!", "me": false }
  ]

]

export function Client() {
  const [messages, setMessages] = useState(conversations[0]);

  return (
    <>
      <Panel className="flex flex-col gap-2 p-3">
        {conversations.map((_, i) => (
          <button
            key={`group-${i}`}
            onClick={() => setMessages(conversations[i])}
            className="flex items-center justify-start gap-4 rounded-sm bg-slate-50 p-2 text-left font-medium transition-all duration-200 hover:bg-slate-100 active:bg-slate-300"
          >
            <div className="aspect-square h-10 rounded bg-slate-300" />
            <p>Exchange {i}</p>
          </button>
        ))}
      </Panel>
      <Panel className="grid grid-rows-[auto_3rem] gap-3 overflow-hidden p-2">
        <div className="no-scrollbar flex flex-col gap-4 overflow-y-scroll p-2">
          {messages.map((message, i) => (
            <Message key={`message-${i}`} me={message.me} message={message.message} />
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
