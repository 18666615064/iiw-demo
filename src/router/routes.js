const routes = [{
  path: '/',
  component: () =>
    import('layouts/main.vue')
}, {
  path: '/code',
  component: () =>
    import('layouts/coding.vue'),
  children: [{
    path: '',
    component: () =>
      import('pages/code/codeedit.vue')
  }]
}, {
  path: '/thread',
  component: () =>
    import('pages/thread.vue')
}, {
  path: '/transfer',
  component: () =>
    import('layouts/transfer.vue'),
  children: [{
    path: '/transfer/waterMeter',
    name: 'waterMeter',
    component: () =>
      import('pages/demo/waterMeter.vue')
  }]
}, {
  path: '/test',
  component: () =>
    import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    component: () =>
      import('pages/demo/test.vue')
  }]
}, {
  path: '/loading/:id',
  component: () =>
    import('layouts/loading.vue')
}, {
  path: '/smoke',
  name: 'smoke',
  component: () =>
    import('pages/demo/smoke.vue')
}]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () =>
      import('pages/Error404.vue')
  })
}
export default routes
