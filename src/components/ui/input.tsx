import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      data-slot="input"
      className={cn(
        'border-input file:text-foreground placeholder:text-muted-foreground ring-ring/10 outline-ring/50 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:focus-visible:ring-0',
        className,
      )}
      type={type}
      {...props}
    />
  )
}

export { Input }
