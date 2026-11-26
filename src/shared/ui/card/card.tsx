import * as React from "react"
import { cn } from "@/shared/lib/utils"

const Card = ({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) => {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "flex flex-col gap-2.5 rounded-xl border border-border bg-card p-4 text-sm text-card-foreground",
        size === "sm" && "gap-2 p-3",
        className
      )}
      {...props}
    />
  )
};

const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-header"
      className={cn("grid auto-rows-min items-start gap-1", className)}
      {...props}
    />
  )
};

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={cn("text-base leading-snug font-medium", className)}
      {...props}
    />
  )
};

const CardDescription = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
};

const CardAction = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-action"
      className={cn("self-start justify-self-end", className)}
      {...props}
    />
  )
};

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div data-slot="card-content" className={cn(className)} {...props} />
  )
};

const CardFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center border-t border-border pt-3", className)}
      {...props}
    />
  )
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
