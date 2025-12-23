import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const Suggestions = ({ className, children, ...props }) => (
  <div
    className={cn(
      "flex flex-wrap gap-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export const Suggestion = ({
  suggestion,
  onClick,
  className,
  variant = "outline",
  size = "sm",
  children,
  ...props
}) => {
  const handleClick = () => {
    onClick?.(suggestion)
  }

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300",
        className
      )}
      variant={variant}
      size={size}
      {...props}
    >
      {children || suggestion}
    </Button>
  )
}
