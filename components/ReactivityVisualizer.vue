<template>
  <div class="visualizer" :class="{ flashed: isFlashed }">
    <div class="label">{{ label }}</div>
    <div class="value">
      <slot :val="value">{{ value }}</slot>
    </div>
    <div class="update-count">Updates: {{ count }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  value: any
  label: string
}>()

const isFlashed = ref(false)
const count = ref(0)
let timeout: NodeJS.Timeout

watch(() => props.value, () => {
  count.value++
  isFlashed.value = true
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    isFlashed.value = false
  }, 400)
}, { deep: true })
</script>

<style scoped>
.visualizer {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
  background: white;
  min-width: 150px;
}

.visualizer.flashed {
  background-color: #ffe066;
  border-color: #ffd700;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.label {
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.value {
  font-family: monospace;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.update-count {
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: #999;
}
</style>
