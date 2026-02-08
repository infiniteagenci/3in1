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

  // Colorful gradients for suggestions
  const gradients = [
    'from-pink-100 to-purple-100 border-pink-200 text-purple-700 hover:from-pink-200 hover:to-purple-200',
    'from-purple-100 to-indigo-100 border-purple-200 text-indigo-700 hover:from-purple-200 hover:to-indigo-200',
    'from-blue-100 to-cyan-100 border-blue-200 text-blue-700 hover:from-blue-200 hover:to-cyan-200',
    'from-rose-100 to-pink-100 border-rose-200 text-rose-700 hover:from-rose-200 hover:to-pink-200',
    'from-amber-100 to-orange-100 border-amber-200 text-amber-700 hover:from-amber-200 hover:to-orange-200',
    'from-emerald-100 to-teal-100 border-emerald-200 text-emerald-700 hover:from-emerald-200 hover:to-teal-200',
  ]

  const gradientIndex = Math.abs(suggestion?.length || 0) % gradients.length
  const gradient = gradients[gradientIndex] || gradients[0]

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "font-geist tracking-tight bg-gradient-to-br transition-all duration-200 hover:shadow-md hover:scale-105",
        gradient,
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
