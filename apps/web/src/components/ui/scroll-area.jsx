import * as React from "react"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-auto", className)}
    {...props}
  >
    {children}
  </div>
))

ScrollArea.displayName = "ScrollArea"

const ScrollBar = React.forwardRef(({ className, orientation = "horizontal", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "horizontal" ? "h-2 w-full border-t border-l border-transparent p-[1px]" : "h-full w-2 border-t border-l border-transparent p-[1px]",
      className
    )}
    {...props}
  />
))

ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }
