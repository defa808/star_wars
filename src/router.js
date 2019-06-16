import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ItemDetails from '@/components/film-page/ItemDetails.vue'
import CharacterDetails from '@/components/character-page/CharacterDetails.vue'
import PageNotFound from '@/components/systems/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { path: '/film/:id', component: ItemDetails },
    { path: '/characters/:id', component: CharacterDetails },
    { path: "*", component: PageNotFound }
  ]
})
