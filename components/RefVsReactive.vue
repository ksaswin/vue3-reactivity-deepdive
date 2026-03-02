<template>
  <div class="demo-section">
    <h2>1. Ref vs Reactive</h2>
    <p class="description">
      <strong>Ref</strong> handles primitives (and objects) by wrapping them in a <code>.value</code> property.<br>
      <strong>Reactive</strong> creates a deeply reactive proxy of an object.
    </p>

    <div class="playground">
      <!-- REF EXAMPLE -->
      <div class="card">
        <h3>Using ref()</h3>
        <div class="code-block">const count = ref({{ count }})</div>
        
        <div class="controls">
          <button @click="incrementRef">count.value++</button>
        </div>

        <ReactivityVisualizer :value="count" label="Ref Value" />
      </div>

      <!-- REACTIVE EXAMPLE -->
      <div class="card">
        <h3>Using reactive()</h3>
        <div class="code-block">const state = reactive({ count: {{ state.count }} })</div>
        
        <div class="controls">
          <button @click="incrementReactive">state.count++</button>
        </div>

        <ReactivityVisualizer :value="state.count" label="Reactive Prop" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Ref Example
const count = ref(0)
const incrementRef = () => {
  count.value++
}

// Reactive Example
const state = reactive({
  count: 0
})
const incrementReactive = () => {
  console.log('Ref:', count)
  state.count++
}
</script>

<style scoped>
.demo-section {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 2rem;
}

h2 { margin-bottom: 0.5rem; }
.description { margin-bottom: 1.5rem; color: #555; }

.playground {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.code-block {
  background: #2d2d2d;
  color: #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  margin-bottom: 1rem;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1rem;
}

button:hover { background: #3aa876; }
</style>
