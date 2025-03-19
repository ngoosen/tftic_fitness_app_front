export function cleanString(value: string) {
  return value
    .replace("(", "")
    .replace(")", "")
    .toLowerCase();
}
