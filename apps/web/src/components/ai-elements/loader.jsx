import * as React from "react"
import { cn } from "@/lib/utils"

const Loader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 px-4 py-3", className)}
    {...props}
  >
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
    <span className="text-sm text-gray-500">Spirit is thinking...</span>
  </div>
))

Loader.displayName = "Loader"

export { Loader }
