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
      style={{
        borderRadius: 'var(--radius-full)',
        borderColor: 'var(--color-stone-200)',
        color: 'var(--color-stone-700)',
      }}
      className={cn(
        "font-geist tracking-tight hover-suggestion",
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
