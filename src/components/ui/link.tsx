import * as React from "react";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-center",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:from-cyan-600 hover:to-blue-600 border border-white/20",
        secondary:
          "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 shadow-lg shadow-white/10",
        destructive:
          "bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-colors font-semibold disabled:opacity-50 border border-red-500/20",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LinkProps
  extends Omit<RouterLinkProps, "to">,
    VariantProps<typeof linkVariants> {
  to: string;
  className?: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, to, ...props }, ref) => {
    return (
      <RouterLink
        to={to}
        className={cn(linkVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Link.displayName = "Link";

export { Link, linkVariants };
