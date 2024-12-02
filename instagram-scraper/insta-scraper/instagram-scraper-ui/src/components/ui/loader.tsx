import { Loader2 } from "lucide-react"

export function Loader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`flex items-center justify-center space-x-2 ${className}`}
      {...props}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  )
}
