<template>
  <div class="page-container">
    <section class="content-block">
      <h1>React vs Vue: Mental Models</h1>
      <p class="lead">
        The biggest confusion for developers switching frameworks is "When does my code run?".
      </p>

      <div class="comparison-table">
        <div class="col react">
          <div class="header">
            <span class="logo">⚛️</span>
            <h3>React</h3>
          </div>
          <div class="concept">
            <h4>Snapshot Strategy</h4>
            <p>"The state changed. Re-run the entire function to generate a new frame."</p>
          </div>
          <div class="mechanic">
            <strong>Mechanism:</strong> Comparison by Value (VDOM Diffing)
          </div>
          <div class="implication">
            <strong>Optimization:</strong> Manual. You must use <code>useMemo</code>, <code>useCallback</code> to prevent children from re-running unnecessarily.
          </div>
        </div>

        <div class="col vue">
          <div class="header">
            <span class="logo">💚</span>
            <h3>Vue</h3>
          </div>
          <div class="concept">
            <h4>Dependency Strategy</h4>
            <p>"The state changed. Notify exactly who is listening to this state."</p>
          </div>
          <div class="mechanic">
            <strong>Mechanism:</strong> Mutable Graph (Proxy Observables)
          </div>
          <div class="implication">
            <strong>Optimization:</strong> Automatic. The component knows its own dependencies. Parent updates rarely force specific child updates unless props change.
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="demo-wrapper">
      <h2>Interactive Demo</h2>
      <p>Compare the visual update "flash". Note how React flashes the whole tree (by default), while Vue is surgical.</p>
      <ReactComparison />
    </section>
  </div>
</template>

<style scoped>
.comparison-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

.col {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.col.react { border-top: 5px solid #61dafb; }
.col.vue { border-top: 5px solid #42b983; }

.header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.header h3 { margin: 0; }

.logo {
  font-size: 1.5rem;
  margin-bottom: 0;
}

.concept, .mechanic, .implication {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f1f1;
}

.concept h4 { margin-top: 0; color: #2c3e50; }
.concept p { font-style: italic; color: #555; }

.implication { background: #fffdf9; color: #444; font-size: 0.95rem; }

.divider {
  height: 1px;
  background: #e0e0e0;
  margin: 3rem 0;
}
</style>
