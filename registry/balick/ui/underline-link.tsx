import { cn } from "@/lib/utils"

/**
 * Classes that draw the underline. Apply them to your router's link
 * component (for example Next.js `Link`) to get the same effect.
 */
export const underlineLinkClassName =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:100%_100%] bg-no-repeat box-decoration-clone pb-px transition-[background-size] duration-300 ease-out hover:bg-[length:100%_1px] hover:bg-[position:0%_100%] focus-visible:bg-[length:100%_1px] focus-visible:bg-[position:0%_100%] motion-reduce:transition-none"

/**
 * A link whose underline draws in from the left on hover and focus, and
 * leaves to the right. It follows the text across line breaks.
 */
export function UnderlineLink({ className, ...props }: React.ComponentProps<"a">) {
  return <a className={cn(underlineLinkClassName, className)} {...props} />
}
