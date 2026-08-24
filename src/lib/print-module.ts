export function expandDetailsForPrint(details: Array<{ open: boolean }>) {
  const original = details.map((detail) => detail.open);
  details.forEach((detail) => { detail.open = true; });
  return () => details.forEach((detail, index) => { detail.open = original[index]; });
}
