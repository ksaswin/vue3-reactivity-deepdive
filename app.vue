<template>
  <div class="app-layout">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <div class="logo">
        <span class="vue-logo">Vue</span> Reactivity
      </div>
      <nav>
        <ul>
          <li v-for="link in routes" :key="link.path">
            <NuxtLink :to="link.path" active-class="active">
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <header class="top-bar">
        <div class="breadcrumbs">
          Deep Dive / <span class="current-crumb">{{ currentTitle }}</span>
        </div>
      </header>

      <div class="page-content">
        <NuxtPage />
      </div>

      <!-- Bottom Navigation Controls -->
      <div class="nav-controls">
        <NuxtLink 
          v-if="prevPage" 
          :to="prevPage.path" 
          class="nav-btn prev"
        >
          &larr; {{ prevPage.title }}
        </NuxtLink>
        <div v-else class="spacer"></div>

        <NuxtLink 
          v-if="nextPage" 
          :to="nextPage.path" 
          class="nav-btn next"
        >
          {{ nextPage.title }} &rarr;
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTutorialNav } from './composables/useTutorialNav'

const { routes } = useTutorialNav()
const route = useRoute()

const currentIndex = computed(() => {
  return routes.findIndex(r => r.path === route.path)
})

const currentTitle = computed(() => {
  return routes[currentIndex.value]?.title || 'Deep Dive'
})

const prevPage = computed(() => {
  if (currentIndex.value > 0) return routes[currentIndex.value - 1]
  return null
})

const nextPage = computed(() => {
  if (currentIndex.value < routes.length - 1) return routes[currentIndex.value + 1]
  return null
})
</script>

<style>
/* Global Resets */
:root {
  --primary: #42b983;
  --sidebar-w: 260px;
  --text: #2c3e50;
  --bg-color: #f8f9fa;
  --border: #e0e0e0;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: var(--text);
  background: var(--bg-color);
}

* { box-sizing: border-box; }

.app-layout {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: var(--sidebar-w);
  background: white;
  border-right: 1px solid var(--border);
  position: fixed;
  height: 100vh;
  padding: 1.5rem;
  overflow-y: auto;
}

.logo {
  font-size: 1.2rem;
  font-weight: 900;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #35495e;
}

.vue-logo {
  color: var(--primary);
  font-size: 1.5rem;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar nav li {
  margin-bottom: 0.5rem;
}

.sidebar nav a {
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #607d8b;
  border-radius: 6px;
  transition: all 0.2s;
  font-size: 0.95rem;
  font-weight: 500;
}

.sidebar nav a:hover {
  background: #f0fdf4;
  color: var(--primary);
}

.sidebar nav a.active {
  background: #e6fffa;
  color: var(--primary);
  border-left: 3px solid var(--primary);
}

/* Main Content */
.main-content {
  margin-left: var(--sidebar-w);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-bar {
  background: white;
  border-bottom: 1px solid var(--border);
  padding: 1rem 2rem;
  color: #666;
  font-size: 0.9rem;
}

.current-crumb {
  color: var(--text);
  font-weight: bold;
}

.page-content {
  flex: 1;
  padding: 2rem 3rem;
  max-width: 1000px;
}

/* Footer Nav */
.nav-controls {
  padding: 2rem 3rem;
  border-top: 1px solid var(--border);
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--text);
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: white;
  transition: all 0.2s;
}

.nav-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.nav-btn.next {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.nav-btn.next:hover {
  background: #3aa876;
}

.spacer { width: 10px; }
</style>
