export function titleCase(str = '') {
  return str
    .toLowerCase()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function cleanInstruction(step = '') {
  return step.replace(/^Step:?\s*\d+\s*/i, '').trim()
}