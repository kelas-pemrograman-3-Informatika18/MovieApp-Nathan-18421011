import Vue from 'vue'
import VueRouter from 'vue-router'
import { LocalStorage } from 'quasar'
import routes from './routes'

Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authAdmin)) {
      if (localStorage.getItem('dataUser') === null || localStorage.getItem('dataUser') === 'undefined') {
        next({
          name: 'loginPage'
        })
      } else {
        const dataSession = LocalStorage.getItem('dataUser')
        if (dataSession.level === 1) {
          next()
        } else {
          next({
            name: 'loginPage'
          })
        }
      }
    } else if (to.matched.some(record => record.meta.authUser)) {
      if (localStorage.getItem('dataUser') === null || localStorage.getItem('dataUser') === 'undefined') {
        next({
          name: 'loginPage'
        })
      } else {
        const dataSession = LocalStorage.getItem('dataUser')
        if (dataSession.level === 2) {
          next()
        } else {
          next({
            name: 'loginPage'
          })
        }
      }
    } else {
      next()
    }
  })

  return Router
}
