<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'
import MenuList from './MenuList.vue'
import { focusMenuItem, type MenuAction, type MenuItem } from './menu'
import { useDismiss } from '../../composables/useDismiss'

export interface DropdownMenuProps {
  /** Same items as ContextMenu: actions (icon, shortcut, danger, checked), separators, group labels. */
  items: MenuItem[]
  /** Accessible menu name; defaults to the trigger's name. */
  label?: string
  placement?: 'bottom-start' | 'bottom-end'
}

const props = withDefaults(defineProps<DropdownMenuProps>(), { placement: 'bottom-start' })
const open = defineModel<boolean>('open', { default: false })
defineSlots<{
  /**
   * Trigger — bind `triggerProps` on a focusable element:
   * `<template #trigger="{ triggerProps }"><Button v-bind="triggerProps">Akcije</Button></template>`
   */
  trigger(scope: { triggerProps: Record<string, unknown> }): unknown
}>()

const anchor = ref<HTMLElement>()
const menu = ref<InstanceType<typeof MenuList>>()
const menuId = useId()
const triggerId = useId()

const menuEl = computed(() => menu.value?.root)
const triggerEl = () => anchor.value?.querySelector<HTMLElement>(`#${CSS.escape(triggerId)}`)

const show = async (where: 'first' | 'last') => {
  open.value = true
  await nextTick()
  focusMenuItem(menuEl.value, where)
}
const close = (returnFocus: boolean) => {
  open.value = false
  if (returnFocus) triggerEl()?.focus()
}
useDismiss(open, [anchor], (reason) => close(reason === 'escape'))

const triggerProps = computed(() => ({
  id: triggerId,
  'aria-haspopup': 'menu',
  'aria-expanded': open.value,
  'aria-controls': open.value ? menuId : undefined,
  onClick: () => (open.value ? close(false) : show('first')),
  onKeydown: (e: KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const where = e.key === 'ArrowUp' ? 'last' : 'first'
    if (open.value) focusMenuItem(menuEl.value, where)
    else show(where)
  }
}))

const onSelect = (item: MenuAction) => {
  close(true)
  item.onSelect?.()
}
</script>

<template>
  <!-- Click menu (WAI-ARIA menu button): Enter/Space/↓ opens and focuses the first item, ↑ the last;
       Escape and Tab close it and return focus to the trigger. -->
  <div ref="anchor" :class="$style.anchor">
    <slot name="trigger" :trigger-props="triggerProps" />
    <MenuList
      v-if="open"
      :id="menuId"
      ref="menu"
      :items="props.items"
      :label="label"
      :labelled-by="label ? undefined : triggerId"
      :class="[$style.menu, $style[placement]]"
      @select="onSelect"
      @tab="close(true)"
    />
  </div>
</template>

<style module>
.anchor {
  position: relative;
  display: inline-flex;
}
.menu {
  position: absolute;
  top: calc(100% + 4px);
}
.bottom-start {
  left: 0;
}
.bottom-end {
  right: 0;
}
</style>
