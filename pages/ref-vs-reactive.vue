<template>
  <div class="page-container">
    <section class="content-block">
      <h1>Ref vs Reactive</h1>
      <p class="lead">
        The foundation of Vue 3 is how it intercepts reads and writes to track dependencies.
      </p>

      <div class="theory-grid">
        <div class="theory-card">
          <h3>Ref (<code>ref()</code>)</h3>
          <p><strong>Use for:</strong> Primitives (string, number, boolean) or when replacing whole objects.</p>
          <div class="tech-spec">
            <h4>Under the Hood:</h4>
            <p>It creates an instance of <code>RefImpl</code> class.</p>
            <ul>
              <li><strong>.value (get):</strong> Calls <code>track()</code></li>
              <li><strong>.value (set):</strong> Checks for change, then calls <code>trigger()</code></li>
            </ul>
          </div>
        </div>

        <div class="theory-card">
          <h3>Reactive (<code>reactive()</code>)</h3>
          <p><strong>Use for:</strong> Deeply nested objects where property access matters.</p>
          <div class="tech-spec">
            <h4>Under the Hood:</h4>
            <p>It uses <strong>ES6 Proxy</strong>.</p>
            <ul>
              <li><strong>Get Trap:</strong> Tracks the specific key accessed.</li>
              <li><strong>Set Trap:</strong> Triggers effects dependent on that key.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="alert warning">
        <strong>⚠️ The Destructuring Pitfall:</strong><br>
        <code>const { count } = reactive({ count: 0 })</code> breaks reactivity. You've pulled the primitive <code>0</code> out of the Proxy. The connection is lost.
        Always use <code>toRefs()</code> if you need to destructure.
      </div>
    </section>

    <div class="divider"></div>

    <section class="demo-wrapper">
      <h2>Interactive Demo</h2>
      <RefVsReactive />
    </section>
  </div>
</template>

<style scoped>
/* Page-specific styles to complement global layout */
.content-block { margin-bottom: 3rem; }

.lead {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.theory-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.theory-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.tech-spec {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.tech-spec h4 { margin: 0 0 0.5rem 0; color: #666; }
.tech-spec ul { padding-left: 1.2rem; margin: 0; }
.tech-spec li { margin-bottom: 0.25rem; }

.alert {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.warning {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.divider {
  height: 1px;
  background: #e0e0e0;
  margin: 3rem 0;
}
</style>
<script setup lang="ts">
// Nuxt auto-imports components from /components
</script>
