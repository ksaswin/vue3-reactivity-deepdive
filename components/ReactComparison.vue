<template>
  <div class="demo-section">
    <h2>4. React vs Vue: The Mental Model</h2>
    <p class="description">
      <strong>React (Pull):</strong> State changes trigger a re-render of the component and all its children. The VDOM diff then figures out what DOM to change.<br>
      <strong>Vue (Push):</strong> Dependency tracking links state directly to DOM updates. Changing state triggers only the specific effects that use it.
    </p>

    <div class="comparison-grid">
      <!-- React Model -->
      <div class="model-column">
        <h3>React Mental Model</h3>
        <p class="sub-text">"Run the function again"</p>
        
        <div class="fake-component-wrapper" :class="{ 'react-flash': reactFlashed }">
            <div class="component-label">&lt;ParentComponent /&gt;</div>
            
            <div class="code-line">
              const [count, setCount] = useState({{ reactCount }})
            </div>

             <div class="children-row">
                <div class="fake-child" :class="{ 'react-flash': reactFlashed }">
                  <div class="child-label">&lt;Child /&gt;</div>
                </div>
                <div class="fake-child" :class="{ 'react-flash': reactFlashed }">
                  <div class="child-label">&lt;Child /&gt;</div>
                </div>
            </div>
        </div>
        
        <button @click="triggerReactUpdate" class="react-btn">setCount(c + 1)</button>
        <p class="note">Visualizing Render Cycle: The component function re-runs. Children re-render (unless memoized).</p>
      </div>

      <!-- Vue Model -->
      <div class="model-column">
        <h3>Vue Mental Model</h3>
        <p class="sub-text">"Surgically update dependency"</p>
        
        <div class="fake-component-wrapper">
            <div class="component-label">&lt;ParentComponent /&gt;</div>
            <div class="code-line">
               const count = ref(
                 <span class="vue-target" :class="{ 'vue-flash': vueFlashed }">{{ vueCount }}</span>
               )
            </div>
            
            <div class="children-row">
                <!-- These do not flash in Vue model -->
                <div class="fake-child">
                   <div class="child-label">&lt;Child /&gt;</div>
                </div>
                <div class="fake-child">
                   <div class="child-label">&lt;Child /&gt;</div>
                </div>
            </div>
        </div>

        <button @click="triggerVueUpdate" class="vue-btn">count.value++</button>
        <p class="note">Visualizing Reactivity: Only the specific text binding updates. Component function setup runs once.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// React Simulation
const reactCount = ref(0)
const reactFlashed = ref(false)

const triggerReactUpdate = () => {
    reactCount.value++
    // In React, setting state triggers re-render of component scope
    reactFlashed.value = true 
    setTimeout(() => reactFlashed.value = false, 400)
}

// Vue Simulation
const vueCount = ref(0)
const vueFlashed = ref(false)

const triggerVueUpdate = () => {
    vueCount.value++
    // In Vue, setting value triggers only the effect (DOM update)
    vueFlashed.value = true
    setTimeout(() => vueFlashed.value = false, 400)
}
</script>

<style scoped>
.demo-section {
  padding: 2rem;
  background: #f0f4f8;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.model-column {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.model-column h3 {
    margin-bottom: 0px;
    color: #333;
}

.sub-text {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 1.5rem;
    font-style: italic;
}

.fake-component-wrapper {
    border: 2px dashed #ccc;
    padding: 1rem;
    border-radius: 8px;
    width: 100%;
    margin-bottom: 1rem;
    transition: background-color 0.2s;
    box-sizing: border-box;
}

.component-label {
    font-family: monospace;
    color: #888;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
}

.code-line {
    font-family: monospace;
    background: #eee;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
}

.children-row {
    display: flex;
    justify-content: space-around;
    gap: 0.5rem;
}

.fake-child {
    border: 1px solid #ddd;
    padding: 0.5rem;
    border-radius: 4px;
    background: #fafafa;
    flex: 1;
    text-align: center;
    transition: background-color 0.2s;
}

.child-label {
    font-family: monospace;
    font-size: 0.7rem;
    color: #999;
}

/* REACT ANIMATION */
.react-flash {
    background-color: #e6f7ff !important;
    border-color: #61dafb !important;
}

.react-btn {
    background: #61dafb;
    color: #000;
}
.react-btn:hover { background: #4fa8c7; }


/* VUE ANIMATION */
.vue-target {
    display: inline-block;
    padding: 0 4px;
    border-radius: 2px;
    transition: background-color 0.2s;
}

.vue-flash {
    background-color: #42b983;
    color: white;
}

.vue-btn {
    background: #42b983; 
    color: white;
}
.vue-btn:hover { background: #3aa876; }


button {
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-family: monospace;
}

.note {
    font-size: 0.8rem;
    color: #666;
    margin-top: 1rem;
    text-align: center;
    line-height: 1.4;
}
</style>
