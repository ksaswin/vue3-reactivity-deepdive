export const useTutorialNav = () => {
  const routes = [
    { path: '/', title: 'Introduction' },
    { path: '/ref-vs-reactive', title: '1. Ref vs Reactive' },
    { path: '/computed', title: '2. Computed Properties' },
    { path: '/watchers', title: '3. Watchers & Side Effects' },
    { path: '/react-comparison', title: '4. React vs Vue' }
  ]

  return { routes }
}
