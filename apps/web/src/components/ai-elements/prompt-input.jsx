import * as React from "react"
import { cn } from "@/lib/utils"

const PromptInputContext = React.createContext({})

const PromptInput = React.forwardRef(({ onSubmit, children, className, ...props }, ref) => (
  <form
    ref={ref}
    onSubmit={onSubmit}
    className={cn("relative flex items-end gap-2", className)}
    {...props}
  >
    <PromptInputContext.Provider value={{ onSubmit }}>
      {children}
    </PromptInputContext.Provider>
  </form>
))

PromptInput.displayName = "PromptInput"

const PromptInputTextarea = React.forwardRef(({ className, value, rows = 3, ...props }, ref) => (
  <textarea
    ref={ref}
    value={value ?? ''}
    className={cn(
      "w-full resize-none border-2 border-gray-200 rounded-xl px-4 py-3",
      "focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100",
      "transition-colors",
      className
    )}
    rows={rows}
    {...props}
  />
))

PromptInputTextarea.displayName = "PromptInputTextarea"

const PromptInputSubmit = React.forwardRef(({ status = 'ready', className, ...props }, ref) => {
  const { onSubmit } = React.useContext(PromptInputContext)

  return (
    <button
      ref={ref}
      type="submit"
      disabled={status === 'streaming' || props.disabled}
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full",
        "bg-gradient-to-r from-purple-500 to-blue-500 text-white",
        "hover:from-purple-600 hover:to-blue-600",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-all duration-200",
        "shadow-md hover:shadow-lg",
        className
      )}
      {...props}
    >
      {status === 'streaming' ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      )}
    </button>
  )
})

PromptInputSubmit.displayName = "PromptInputSubmit"

export { PromptInput, PromptInputTextarea, PromptInputSubmit }
