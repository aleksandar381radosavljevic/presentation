import type { Component } from 'vue'

export interface MenuAction {
  type?: 'item'
  id: string
  label: string
  icon?: Component
  /** Shortcut display, e.g. "Ctrl+C" (text only; the app registers the shortcut). */
  shortcut?: string
  disabled?: boolean
  /** Destructive action — red, always last. */
  danger?: boolean
  /** Item with a checkmark (menuitemcheckbox), e.g. "Show archived". */
  checked?: boolean
  onSelect?: () => void
}
export interface MenuSeparator {
  type: 'separator'
  id: string
}
export interface MenuLabel {
  type: 'label'
  id: string
  label: string
}
export type MenuItem = MenuAction | MenuSeparator | MenuLabel

export const isMenuAction = (i: MenuItem): i is MenuAction =>
  i.type === undefined || i.type === 'item'

/* ---------- focus within the menu (pure functions over the DOM) ---------- */
function enabledItems(menu: HTMLElement | null | undefined): HTMLElement[] {
  return menu
    ? Array.from(
        menu.querySelectorAll<HTMLElement>('[role^="menuitem"]:not([aria-disabled="true"])')
      )
    : []
}

export function focusMenuItem(
  menu: HTMLElement | null | undefined,
  where: 'first' | 'last' | 'next' | 'prev'
) {
  const list = enabledItems(menu)
  if (!list.length) {
    menu?.focus()
    return
  }
  const i = list.indexOf(document.activeElement as HTMLElement)
  const target =
    where === 'first'
      ? list[0]
      : where === 'last'
        ? list[list.length - 1]
        : where === 'next'
          ? list[(i + 1) % list.length]
          : list[(i - 1 + list.length) % list.length]
  target.focus({ preventScroll: true })
}

export function focusMenuByChar(menu: HTMLElement, char: string) {
  const list = enabledItems(menu)
  const start = list.indexOf(document.activeElement as HTMLElement) + 1
  const ordered = [...list.slice(start), ...list.slice(0, start)]
  ordered
    .find((el) => el.textContent?.trim().toLowerCase().startsWith(char.toLowerCase()))
    ?.focus({ preventScroll: true })
}
