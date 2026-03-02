<template>
  <div class="content-wrapper">
    <h1>Vue Reactivity Deep Dive</h1>
    <p class="intro">
      This application is designed to help you visually understand the inner workings of Vue 3's reactivity system.
    </p>
    
    <div class="card-grid">
      <div class="card">
        <h3>🎯 Goal</h3>
        <p>Understand how tracking and triggering works under the hood.</p>
      </div>
      <div class="card">
        <h3>⚡ Performance</h3>
        <p>Learn why Vue's fine-grained reactivity is efficient.</p>
      </div>
      <div class="card">
        <h3>🧠 Mental Model</h3>
        <p>Shift from "Re-render everything" to "Update dependency".</p>
      </div>
    </div>

    <div class="actions">
      <NuxtLink to="/ref-vs-reactive" class="start-btn">Start the Deep Dive →</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  max-width: 800px;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.intro {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border-top: 4px solid #42b983;
}

.card h3 {
  margin-top: 0;
  color: #2c3e50;
}

.start-btn {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.2s, background 0.2s;
}

.start-btn:hover {
  background: #3aa876;
  transform: translateY(-2px);
}
</style>
