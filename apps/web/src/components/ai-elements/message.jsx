import * as React from "react"
import { cn } from "@/lib/utils"

const Message = React.forwardRef(({ from, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex gap-3 mb-4",
      from === "user" ? "justify-end" : "justify-start",
      className
    )}
    {...props}
  />
))

Message.displayName = "Message"

const MessageContent = React.forwardRef(({ from, className, ...props }, ref) => {
  const isUser = from === "user";

  return (
    <div
      ref={ref}
      style={{
        borderRadius: isUser
          ? 'var(--radius-xl) var(--radius-xl) var(--radius-sm) var(--radius-xl)'
          : 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
        background: isUser
          ? 'linear-gradient(to bottom right, var(--color-accent-purple), var(--color-accent-blue))'
          : 'white',
        color: isUser ? 'white' : 'var(--color-stone-800)',
        border: isUser ? 'none' : '1px solid var(--color-stone-200)',
      }}
      className={cn(
        "max-w-[80%] px-4 py-3 shadow-sm font-geist",
        className
      )}
      {...props}
    />
  );
})

MessageContent.displayName = "MessageContent"

export { Message, MessageContent }
