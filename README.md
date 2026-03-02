# Vue 3 Reactivity Deep Dive ⚡️

An interactive learning playground designed to demystify Vue 3's fine-grained reactivity system. This project visualizes how dependency tracking, triggering, and scheduling work under the hood, helping developers shift their mental model from "re-render everything" to "update only what changed".

## 🎯 Project Goals

- **Visualize Reactivity**: See exactly when and why a component updates using the `ReactivityVisualizer`.
- **Compare Mental Models**: Contrast Vue's "Push" based reactivity (fine-grained dependency tracking) with React's "Pull" based model (component re-renders).
- **Understand References**: Deep dive into `ref()` vs `reactive()` and when to use which.
- **Master Effects**: Learn how `computed` properties cache values and how `watch`ers schedule side effects.

## 🚀 Key Features & Modules

### 1. Ref vs Reactive (`/ref-vs-reactive`)
Explore the fundamental differences between `ref()` (value wrappers) and `reactive()` (ES6 Proxies). Visualize how unwrapping works in templates and the limitations of destructuring reactive objects.

### 2. Computed Flow (`/computed`)
Understand the lazy evaluation and caching mechanism of computed properties. See how a computed property only re-evaluates when its dependencies change, preventing expensive recalculations.

### 3. Watcher Flush Timing (`/watchers`)
A demonstration of the Vue scheduler. Visualize the difference between:
- `flush: 'pre'` (default) - watcher runs before DOM update.
- `flush: 'post'` - watcher runs after DOM update.
- `flush: 'sync'` - watcher runs synchronously immediately.

### 4. React vs Vue Comparison (`/react-comparison`)
A side-by-side visualization of how state changes propagate:
- **React (Pull Model):** State change typically triggers a re-render of the component and potentially its children.
- **Vue (Push Model):** State change triggers only the precise effects (DOM updates) that depend on that specific piece of state.

## 🛠 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com)
- **Core**: [Vue 3](https://vuejs.org) (Composition API)
- **Language**: TypeScript

## 📦 Setup & Installation

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 💻 Development Server

Start the development server on `http://localhost:3001`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🧠 The Mental Shift

The core philosophy this project demonstrates is:

> **In Vue, your component's `setup()` function runs only once.**

Unlike other frameworks where the component body re-executes on every state change, Vue sets up a dependency graph once. When a reactive value changes, the notifications are sent directly to the observers (computed properties, watchers, or the DOM renderer) without re-running the component logic.

---

*Built for educational purposes to help master Vue 3.*
