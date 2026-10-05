<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  options: { key: string; label: string }[]
  modelValue: { key: string; label: string }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { key: string; label: string } || undefined): void
}>()

const isVisible = ref(false)
const toggleVisible = () => (isVisible.value = !isVisible.value)
const onChange = (key: string) => {
  const selectedOption = props.options.find((option) => option.key === key)
  emit('update:modelValue', selectedOption)
  toggleVisible()
}
</script>

<template>
  <div class="dropdown">
    <div class="option-label" @click="toggleVisible">
      {{ modelValue.label }}
    </div>
    <div v-if="isVisible" class="dropdown-menu">
      <div
        v-for="option in options"
        :key="option.key"
        class="option-label"
        @click="onChange(option.key)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.option-label {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0000008c;
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown .dropdown-menu {
  display: block;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1;
}

.dropdown .dropdown-menu a {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

.dropdown .dropdown-menu a:hover {
  background-color: #f1f1f1;
}
</style>
