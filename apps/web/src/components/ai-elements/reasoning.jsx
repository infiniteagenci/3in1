import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

const Reasoning = ({ children, isStreaming = false, className, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [wasStreaming, setWasStreaming] = React.useState(false);

  React.useEffect(() => {
    if (isStreaming) {
      setIsOpen(true);
      setWasStreaming(true);
    } else if (wasStreaming && isOpen) {
      // Close after a delay when streaming is finished
      const timer = setTimeout(() => setIsOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isStreaming, isOpen, wasStreaming]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("rounded-lg border border-purple-200 bg-purple-50/50 p-4", className)}
      {...props}
    >
      {children}
    </Collapsible>
  )
}

const ReasoningTrigger = ({ title = "✨ Reflecting...", ...props }) => {
  return (
    <CollapsibleTrigger
      className="flex items-center justify-between w-full font-medium transition-colors hover:underline text-left text-purple-700"
      {...props}
    >
      <span className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-500 text-white text-xs">
          💭
        </span>
        {title}
      </span>
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-200 shrink-0 text-purple-700 ${
          props.open ? "rotate-180" : ""
        }`}
      />
    </CollapsibleTrigger>
  )
}

const ReasoningContent = ({ className, ...props }) => (
  <CollapsibleContent
    className={cn("mt-4 pt-4 border-t border-purple-200 text-sm text-purple-900", className)}
    {...props}
  />
)

export { Reasoning, ReasoningTrigger, ReasoningContent, Collapsible, CollapsibleTrigger, CollapsibleContent }