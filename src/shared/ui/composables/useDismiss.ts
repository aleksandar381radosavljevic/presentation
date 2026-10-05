import { onBeforeUnmount, watch, type Ref } from 'vue'

export type DismissReason = 'escape' | 'outside'

/**
 * Closes a floating layer on Escape or on a pointer down outside all `refs` while `open` is true.
 */
export function useDismiss(
  open: Ref<boolean>,
  refs: Ref<HTMLElement | null | undefined>[],
  onDismiss: (reason: DismissReason) => void
) {
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onDismiss('escape')
  }
  const onPointerDown = (e: PointerEvent) => {
    const target = e.target as Node
    if (!refs.some((r) => r.value?.contains(target))) onDismiss('outside')
  }
  const detach = () => {
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('pointerdown', onPointerDown, true)
  }

  watch(open, (isOpen) => {
    detach()
    if (isOpen) {
      document.addEventListener('keydown', onKeydown)
      document.addEventListener('pointerdown', onPointerDown, true)
    }
  })
  onBeforeUnmount(detach)
}
