import { onBeforeUnmount, onMounted, ref } from 'vue'

/** id of the section currently in view (scroll spy for the header navigation). */
export function useActiveSection(ids: string[]) {
  const active = ref<string>()
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) active.value = entry.target.id
      },
      // A section is active while it crosses the upper third of the viewport.
      { rootMargin: '-30% 0px -60% 0px' }
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })
  onBeforeUnmount(() => observer?.disconnect())

  return active
}
