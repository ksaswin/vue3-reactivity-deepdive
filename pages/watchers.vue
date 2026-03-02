<template>
  <div class="page-container">
    <section class="content-block">
      <h1>Watchers & Side Effects</h1>
      <p class="lead">
        Computed properties calculate data. <strong>Watchers perform actions.</strong> They are the bridge between reactive state and the "outside world" (DOM, APIs, LocalStorage).
      </p>

      <h3>The Flush Timing</h3>
      <p>When does your watcher run relative to the DOM update?</p>

      <div class="timing-timeline">
        <div class="step">
          <div class="marker pre">Pre</div>
          <div class="info">
            <h4>flush: 'pre' (Default)</h4>
            <p>Runs <strong>before</strong> the DOM updates. Don't try to access updated HTML elements here.</p>
          </div>
        </div>
        
        <div class="line"></div>

        <div class="step">
          <div class="marker dom">DOM Update</div>
          <div class="info">
            <p><em>Vue updates the DOM...</em></p>
          </div>
        </div>

        <div class="line"></div>

        <div class="step">
          <div class="marker post">Post</div>
          <div class="info">
            <h4>flush: 'post'</h4>
            <p>Runs <strong>after</strong> the DOM updates. Safe for accessing updated elements (e.g., scrolling to bottom of list).</p>
          </div>
        </div>
      </div>

    </section>

    <div class="divider"></div>

    <section class="demo-wrapper">
      <h2>Interactive Demo 1: Basic Watcher</h2>
      <p>Drag the slider. The standard watcher logs the side effects.</p>
      <WatcherLog />
    </section>

    <div class="divider"></div>

    <section class="demo-wrapper">
      <h2>Interactive Demo 2: Flush Timing</h2>
      <p>See the execution order of different flush types.</p>
      <WatcherFlushDemo />
    </section>
  </div>
</template>

<style scoped>
.timing-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  background: white;
  padding: 2rem;
  border-radius: 8px;
}

.step {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
}

.marker {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
}

.marker.pre { background: #f39c12; }
.marker.dom { background: #95a5a6; border-radius: 4px; height: 40px; }
.marker.post { background: #27ae60; }

.line {
  width: 2px;
  height: 30px;
  background: #ddd;
  margin: 0.5rem 0;
}

.info h4 { margin: 0 0 0.2rem 0; }
.info p { margin: 0; color: #7f8c8d; font-size: 0.9rem; }

.divider {
  height: 1px;
  background: #e0e0e0;
  margin: 3rem 0;
}
</style>
