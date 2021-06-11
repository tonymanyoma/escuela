const routes = [

  {


    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [


      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue'),
      },

      {
        path: '/register',
        name: 'register',
        component: () => import('pages/Register.vue'),
        meta: {
          auth: false
        }
      },


      {
        path: '/info',
        name: 'info',
        component: () => import('pages/Info.vue'),
        beforeEnter: (to, from, next) => {
          const token = window.localStorage.getItem('token');
          if (token != null) {
            next();
          } else {
            next('');
          }
        }
      },

      {
        path: '/home',
        name: 'home',
        component: () => import('src/pages/Home.vue'),
        beforeEnter: (to, from, next) => {
          const token = window.localStorage.getItem('token');
          if (token != null) {
            next();
          } else {
            next('');
          }
        }
      },





    ],

  },







]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
