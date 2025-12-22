import * as React from "react"
import { cn } from "@/lib/utils"

const Response = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-relaxed", className)}
    {...props}
  />
))

Response.displayName = "Response"

export { Response }
