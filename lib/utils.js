/** Simple class name merge — filters falsy values and joins. */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
