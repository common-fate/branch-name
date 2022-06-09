export interface CleanOptions {
  maxLength?: number
  removeTrailingDash?: boolean
  lowercase: boolean
}

export const clean = (
  s: string,
  options: CleanOptions = {lowercase: true}
): string => {
  let output = s

  if (output.startsWith('refs/heads/')) {
    output = output.split('refs/heads/')[1]
  }

  output = output.replace(/[^\w]/g, '-')

  if (options?.maxLength !== undefined) {
    output = output.slice(0, options.maxLength)
  }

  if (options?.removeTrailingDash && output.endsWith('-')) {
    output = output.slice(0, -1)
  }

  if (options.lowercase) {
    output = output.toLocaleLowerCase()
  }

  return output
}
