<template>
  <div class="flush-demo">
    <h3>Watcher Flush Timing Interactive Demo</h3>
    <p class="description">
      Click any button to trigger a change. Observe the log order to see when each watcher fires relative to the DOM update.
    </p>

    <div class="controls">
      <div class="button-group">
        <button @click="runTest" :disabled="isRunning">
          {{ isRunning ? 'Running...' : 'Single Mutation' }}
        </button>
        <button @click="runBatchTest" :disabled="isRunning" class="secondary">
          {{ isRunning ? 'Running...' : 'Batch Mutation (x3)' }}
        </button>
      </div>
      <div class="current-value">
        Count: <span ref="domRef">{{ count }}</span>
      </div>
    </div>

    <!-- Log Display -->
    <div class="timeline-log">
      <div v-if="logs.length === 0" class="empty-state">
        Waiting for interaction...
      </div>
      
      <div 
        v-for="(log, i) in logs" 
        :key="log.id"
        class="log-item"
        :class="log.type"
      >
        <div class="log-content">
          <span class="index">{{ i + 1 }}.</span>
          <span class="type-badge">{{ log.type }}</span>
          <span class="message">{{ log.message }}</span>
        </div>
        <div class="dom-snapshot">
          DOM: <span class="dom-value">{{ log.domState }}</span>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item"><span class="dot sync"></span> Sync (Immediate)</div>
      <div class="legend-item"><span class="dot pre"></span> Pre (Before DOM)</div>
      <div class="legend-item"><span class="dot dom"></span> DOM Updated</div>
      <div class="legend-item"><span class="dot post"></span> Post (After DOM)</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUpdated, nextTick } from 'vue'

const count = ref(0)
const logs = ref<{ id: number, type: string, message: string, domState: string }[]>([])
const domRef = ref<HTMLElement | null>(null)
const isRunning = ref(false)
let isCapturing = false

// Internal buffer to hold logs before "playing" them
let logBuffer: { id: number, type: string, message: string, domState: string }[] = []

function queueLog(type: string, message: string) {
  // Capture the current DOM state instantly when the event fires
  const currentDomText = domRef.value ? domRef.value.innerText : '...';
  
  const item = {
    id: Date.now() + Math.random(),
    type,
    message,
    domState: currentDomText
  }

  // Sync watchers and user actions happen immediately
  if (type === 'sync' || type === 'action' || type === 'batch') {
    logs.value.push(item)
  } else {
    // Other events are buffered for playback
    logBuffer.push(item)
  }
}

// 1. Sync Watcher
// Fires synchronously when the value changes, before anything else
watch(count, (val) => {
  queueLog('sync', `Watcher (sync) fired. Value: ${val}`)
}, { flush: 'sync' })

// 2. Pre Watcher (Default)
// Fires before the component updates but after sync watchers
watch(count, (val) => {
  queueLog('pre', `Watcher (pre) fired. Value: ${val}`)
}, { flush: 'pre' })

// 3. Post Watcher
// Fires after the component has updated the DOM
watch(count, (val) => {
  queueLog('post', `Watcher (post) fired. Value: ${val}`)
}, { flush: 'post' })

// Lifecycle hook to confirm DOM update
onUpdated(() => {
  if (isCapturing) {
    queueLog('dom', 'DOM Updated (Component re-rendered)')
  }
})

async function runTest() {
  if (isRunning.value) return
  
  isRunning.value = true
  isCapturing = true
  logs.value = []
  logBuffer = [] // Clear buffer
  
  // Start the chain
  // We manually add the first action to the buffer
  queueLog('action', 'User clicked button (State Change)')
  
  // Actually trigger the change
  count.value++

  // Wait for all synchronous and flush:pre/post watchers to fire
  await nextTick()

  // Stop capturing to avoid logging our own playback updates
  isCapturing = false

  // Start replaying the buffer visually with a delay before the first async step
  setTimeout(processBuffer, 800)
}

async function runBatchTest() {
  if (isRunning.value) return
  
  isRunning.value = true
  isCapturing = true
  logs.value = []
  logBuffer = [] // Clear buffer
  
  // Start the chain
  queueLog('action', 'Batch Operation: count++ called 3 times synchronously')
  
  // Trigger multiple changes synchronously
  queueLog('batch', 'count.value++ (1)')
  count.value++
  queueLog('batch', 'count.value++ (2)')
  count.value++
  queueLog('batch', 'count.value++ (3)')
  count.value++

  // Wait for all synchronous and flush:pre/post watchers to fire
  await nextTick()

  // Stop capturing
  isCapturing = false

  // Start replaying
  setTimeout(processBuffer, 800)
}

function processBuffer() {
  if (logBuffer.length === 0) {
    isRunning.value = false
    return
  }

  const item = logBuffer.shift()
  if (item) {
    logs.value.push(item)
    // 800ms delay between steps for visibility
    setTimeout(processBuffer, 800)
  }
}
</script>

<style scoped>
.flush-demo {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  color: #343a40;
}

.description {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
  font-size: 1rem;
}

button:hover {
  background-color: #3aa876;
}

button.secondary {
  background-color: #339af0;
}
button.secondary:hover {
  background-color: #228be6;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.current-value {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px dashed #dee2e6;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1.1rem;
  color: #495057;
}

.timeline-log {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  height: 428px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #adb5bd;
  font-style: italic;
}

.log-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid #f1f3f5;
  font-family: monospace;
  font-size: 0.85rem;
}

.log-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.dom-snapshot {
  font-size: 0.75rem;
  color: #868e96;
  background: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  min-width: 80px;
  text-align: center;
}

.dom-value {
  font-weight: bold;
  color: #212529;
}

.log-item:last-child {
  border-bottom: none;
}

.index {
  color: #adb5bd;
  min-width: 1.5rem;
  text-align: right;
}

.type-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.7rem;
  text-transform: uppercase;
  min-width: 60px;
  text-align: center;
  display: inline-block;
}

.message {
  flex: 1;
  color: #343a40;
}

/* Specific Badge colors */
.log-item.action { background-color: #f8f9fa; border-left: 4px solid #ced4da; }
.log-item.action .type-badge { background-color: #e9ecef; color: #495057; }

.log-item.sync { background-color: #f3d9fa; border-left: 4px solid #cc5de8; }
.log-item.sync .type-badge { background-color: #eebefa; color: #862e9c; }

.log-item.batch { background-color: #fce2e2; border-left: 4px solid #ff6b6b; }
.log-item.batch .type-badge { background-color: #ffe3e3; color: #c92a2a; }

.log-item.pre { background-color: #e7f5ff; border-left: 4px solid #339af0; }
.log-item.pre .type-badge { background-color: #d0ebff; color: #1971c2; }

.log-item.dom { background-color: #fff9db; border-left: 4px solid #fcc419; }
.log-item.dom .type-badge { background-color: #ffec99; color: #e67700; }

.log-item.post { background-color: #ebfbee; border-left: 4px solid #51cf66; }
.log-item.post .type-badge { background-color: #d3f9d8; color: #2b8a3e; }


/* Legend */
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.8rem;
  color: #868e96;
  padding: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dot.sync { background-color: #cc5de8; }
.dot.pre { background-color: #339af0; }
.dot.dom { background-color: #fcc419; }
.dot.post { background-color: #51cf66; }

</style>
