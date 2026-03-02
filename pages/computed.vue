<template>
  <div class="page-container">
    <section class="content-block">
      <h1>Computed Properties</h1>
      <p class="lead">
        Computed properties are the "smart caching" layer of Vue applications. They allow you to derive state declaratively without manual dependency management.
      </p>

      <div class="feature-list">
        <div class="feature">
          <span class="icon">🧠</span>
          <div class="details">
            <h3>Lazy Evaluation</h3>
            <p>The code inside a computed property <strong>does not run</strong> until something actually tries to read its value (like the template).</p>
          </div>
        </div>
        
        <div class="feature">
          <span class="icon">📦</span>
          <div class="details">
            <h3>Smart Caching</h3>
            <p>If the dependencies haven't changed since the last run, Vue returns the previously calculated value immediately. No expensive recalculation.</p>
          </div>
        </div>
      </div>

      <div class="code-concept">
        <h3>The "Dirty Flag" Concept</h3>
        <p>
          Internally, a Computed Ref has a flag <code>_dirty</code>.
        </p>
        <ol>
          <li><strong>Dependency Change:</strong> When <code>firstName</code> changes, it notifies the Computed Ref.</li>
          <li><strong>Mark Dirty:</strong> The Computed Ref sets <code>_dirty = true</code>. <strong>It does not re-calculate yet.</strong></li>
          <li><strong>Trigger:</strong> The Computed Ref tells the Component "Hey, I might have changed".</li>
          <li><strong>Re-render:</strong> The Component asks the Computed Ref for its value.</li>
          <li><strong>Execute:</strong> Seeing <code>_dirty: true</code>, the Computed Ref runs its logic, updates the cache, and sets <code>_dirty: false</code>.</li>
        </ol>
      </div>
    </section>

    <div class="divider"></div>

    <section class="demo-wrapper">
      <h2>Interactive Demo 1: Basic Computed Flow</h2>
      <p>Modify the dependencies below and watch the "Result" flash only when necessary.</p>
      <ComputedFlow />
    </section>
  </div>
</template>

<script setup lang="ts">
import ComputedFlow from '~/components/ComputedFlow.vue'
</script>

<style scoped>
.feature-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.icon { font-size: 2rem; }
.details h3 { margin: 0 0 0.5rem 0; }
.details p { margin: 0; color: #666; font-size: 0.95rem; }

.code-concept {
  background: #2d3436;
  color: #dfe6e9;
  padding: 2rem;
  border-radius: 8px;
}

.code-concept h3 { margin-top: 0; color: #74b9ff; }
.code-concept ol { margin: 0; padding-left: 1.5rem; }
.code-concept li { margin-bottom: 0.5rem; line-height: 1.6; }

.divider {
  height: 1px;
  background: #e0e0e0;
  margin: 3rem 0;
}
</style>
