<template>
  <div class="demo-section">
    <h2>3. Watchers & Side Effects</h2>
    <p class="description">
      Watchers detect changes and run side effects (like API calls or logging).
    </p>

    <div class="split-view">
      <div class="control-panel">
        <label>Volume Control (Watched Source)</label>
        <div class="range-wrapper">
          <input type="range" v-model.number="volume" min="0" max="100" />
          <span>{{ volume }}%</span>
        </div>
        
        <ReactivityVisualizer :value="volume" label="Source" />
      </div>

      <div class="log-panel">
        <h4>Effects Log (Side Effect)</h4>
        <div class="logs" ref="logContainer">
          <div v-if="logs.length === 0" class="empty">Interract with controls to see logs...</div>
          <div 
            v-for="(log, index) in logs" 
            :key="index" 
            class="log-entry"
          >
            <span class="time">{{ log.time }}</span>
            <span class="message">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const volume = ref(50)
const logs = ref<{time: string, message: string}[]>([])
const logContainer = ref<HTMLElement | null>(null)

watch(volume, (newVal, oldVal) => {
  const date = new Date()
  const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
  
  logs.value.push({
    time: timeStr,
    message: `Changed from ${oldVal} to ${newVal}`
  })

  // Auto scroll
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight
    }
  })
})
</script>

<style scoped>
.demo-section {
  padding: 2rem;
  background: #fff0f0; /* Slight red tint for 'danger/effect' vibe */
  border-radius: 12px;
  margin-bottom: 2rem;
}

.split-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.range-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

input[type=range] {
  flex: 1;
}

.log-panel {
  background: #2d2d2d;
  color: #fff;
  border-radius: 8px;
  padding: 1rem;
  height: 200px;
  display: flex;
  flex-direction: column;
}

h4 { margin: 0 0 0.5rem 0; color: #aaa; font-size: 0.9rem; }

.logs {
  flex: 1;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.85rem;
}

.log-entry {
  border-bottom: 1px solid #444;
  padding: 0.25rem 0;
  display: flex;
  gap: 1rem;
}

.log-entry:last-child {
  color: #42b983; /* Highlight latest */
}

.time { color: #888; }
.empty { color: #666; font-style: italic; }
</style>
