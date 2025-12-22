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

const MessageContent = React.forwardRef(({ from, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-w-[80%] rounded-lg px-4 py-3",
      from === "user"
        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-sm"
        : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100",
      className
    )}
    {...props}
  />
))

MessageContent.displayName = "MessageContent"

export { Message, MessageContent }
