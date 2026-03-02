<template>
  <div class="demo-section">
    <h2>2. Computed Properties & Caching</h2>
    <p class="description">
      Computed properties are cached based on their <strong>reactive dependencies</strong>. 
      They only re-evaluate when a dependency they use changes.
    </p>
    <div class="original">
      <label>Original State</label>
      <div class="code-block">
        reactive({ firstName: 'John', lastName: 'Doe', age: 30 })
      </div>
    </div>

    <div class="flow-container">
      <div class="inputs-row">
        <div class="input-group">
          <label>First Name</label>
          <input v-model="state.firstName" type="text" />
        </div>

        <div class="operator">+</div>

        <div class="input-group">
          <label>Last Name</label>
          <input v-model="state.lastName" type="text" />
        </div>
      </div>

      <div class="divider-text">
        <span>Non-Dependency (Ignored)</span>
      </div>

      <div class="inputs-row secondary">
        <div class="input-group">
          <label>Age</label>
          <input v-model="state.age" type="number" min="0" max="100" />
          <span class="hint">Changing this won't trigger update!</span>
        </div>
      </div>

      <div class="arrow">⬇️ Reactivity Flow ⬇️</div>

      <div class="result">
        <label>Computed Result</label>
        <div class="code-block">
          const fullName = computed(() => `${state.firstName} ${state.lastName}`)
        </div>
        
        <div class="result-box" :key="computationInfo.timestamp">
          <span class="value">{{ computationInfo.value }}</span>
          <span class="badge">Updated: {{ formatTime(computationInfo.timestamp) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const state = reactive({
  firstName: 'John',
  lastName: 'Doe',
  age: 30
})

const computationInfo = computed(() => {
  return {
    value: `${state.firstName} ${state.lastName}`,
    timestamp: Date.now()
  }
})

function formatTime(ts: number) {
  const d = new Date(ts)
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`
}
</script>

<style scoped>
.demo-section {
  padding: 2rem;
  background: #eef2f5;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.flow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.inputs-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

.inputs-row.secondary {
  opacity: 0.8;
  border-top: 1px dashed #ccc;
  padding-top: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: bold;
  font-size: 0.9rem;
  color: #555;
}

.input-group .hint {
  font-size: 0.8rem;
  color: #888;
  font-style: italic;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 150px;
}

.operator {
  font-size: 2rem;
  font-weight: bold;
  color: #666;
}

.divider-text {
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

.arrow {
  color: #42b983;
  font-weight: bold;
  letter-spacing: 2px;
}

.result, .original {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.result-box {
  background: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 300px;
  transition: transform 0.2s;
}

.result-box .value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.result-box .badge {
  background: #42b983;
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

.code-block {
  background: #2d2d2d;
  color: #ccc;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  font-family: monospace;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  max-width: 100%;
  white-space: pre-wrap;
}
</style>
