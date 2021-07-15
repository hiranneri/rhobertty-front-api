import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import NovaPostagem from '../views/NovaPostagem.vue'
import EditarPostagem from '../views/EditarPostagem'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'login',
    component: Login,
    meta: {
      publica: true
    }
  },
  {
    path: '/home',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path:'/nova-postagem',
    name:'nova-postagem',
    component: NovaPostagem
  },
  {
    path:'/postagem/:id',
    name:'editar-postagem',
    component: EditarPostagem,
    params: true
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((routeTo,routeFrom, next)=>{
  if(!routeTo.meta.publica && !store.state.token){
    return next({path:''})
  }
  next()
})


export default router
