import * as React from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from "@/lib/utils"

const Response = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("prose prose-sm max-w-none", className)}
    {...props}
  >
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Style headings
        h1: ({ node, ...props }) => <h1 className="text-lg font-bold mt-4 mb-2 text-[var(--color-stone-900)] font-playfair" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-base font-semibold mt-3 mb-2 text-[var(--color-stone-800)] font-playfair" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-sm font-semibold mt-2 mb-1 text-[var(--color-stone-700)] font-geist" {...props} />,
        // Style paragraphs
        p: ({ node, ...props }) => <p className="mb-2 text-[var(--color-stone-700)] leading-relaxed font-geist" {...props} />,
        // Style lists
        ul: ({ node, ...props }) => <ul className="mb-2 ml-4 list-disc space-y-1 text-[var(--color-stone-700)]" {...props} />,
        ol: ({ node, ...props }) => <ol className="mb-2 ml-4 list-decimal space-y-1 text-[var(--color-stone-700)]" {...props} />,
        li: ({ node, ...props }) => <li className="text-[var(--color-stone-700)]" {...props} />,
        // Style bold/italic
        strong: ({ node, ...props }) => <strong className="font-semibold text-[var(--color-stone-900)]" {...props} />,
        em: ({ node, ...props }) => <em className="italic text-[var(--color-stone-600)] font-crimson" {...props} />,
        // Style links
        a: ({ node, ...props }) => <a className="text-[var(--color-primary)] hover:underline" {...props} />,
        // Style blockquotes
        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-[var(--color-stone-300)] pl-4 italic my-2 text-[var(--color-stone-600)] bg-[var(--color-stone-50)] py-2 font-crimson" {...props} />,
        // Style code
        code: ({ node, inline, ...props }) => inline
          ? <code className="bg-[var(--color-stone-100)] text-[var(--color-stone-800)] px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
          : <code className="block bg-[var(--color-stone-100)] text-[var(--color-stone-800)] p-3 rounded-lg text-sm font-mono overflow-x-auto my-2" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  </div>
))

Response.displayName = "Response"

export { Response }
