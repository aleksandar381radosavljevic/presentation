/** Breakpoints — same as the `breakpoint` tokens (CSS can't read them in @media, so they live here too). */
export const BREAKPOINTS = ['base', 'sm', 'md', 'lg', 'xl'] as const
export type Breakpoint = (typeof BREAKPOINTS)[number]

/** A value or a per-breakpoint object, mobile-first: `{ base: 1, md: 2 }`. */
export type Responsive<T> = T | Partial<Record<Breakpoint, T>>

function isResponsiveObject<T>(value: Responsive<T>): value is Partial<Record<Breakpoint, T>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Expands a Responsive value into a full per-breakpoint map (a missing one inherits the smaller).
 * `{ base: 1, lg: 3 }` → `{ base: 1, sm: 1, md: 1, lg: 3, xl: 3 }`.
 */
export function resolveResponsive<T>(
  value: Responsive<T> | undefined,
  fallback: T
): Record<Breakpoint, T> {
  const out = {} as Record<Breakpoint, T>
  let last = fallback
  for (const bp of BREAKPOINTS) {
    const v =
      value === undefined
        ? undefined
        : isResponsiveObject(value)
          ? value[bp]
          : bp === 'base'
            ? value
            : undefined
    if (v !== undefined) last = v
    out[bp] = last
  }
  return out
}

/** Converts a Responsive value into CSS custom properties: `--{prefix}-base`, `--{prefix}-sm`… */
export function responsiveVars<T>(
  prefix: string,
  value: Responsive<T> | undefined,
  fallback: T,
  format: (v: T) => string
): Record<string, string> {
  const resolved = resolveResponsive(value, fallback)
  const vars: Record<string, string> = {}
  for (const bp of BREAKPOINTS) vars[`--${prefix}-${bp}`] = format(resolved[bp])
  return vars
}

/** Spacing steps from the tokens (`space-*`). */
export type SpaceStep = 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12 | 16
export const space = (step: SpaceStep): string =>
  step === 0 ? '0px' : `var(--space-${String(step).replace('.', '\\.')})`
