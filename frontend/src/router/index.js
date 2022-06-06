import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '@/views/HomeView.vue'
import DigitalOceanView from '@/views/DigitalOceanView.vue'
import DigitalOceanManageView from '@/views/DigitalOceanManageView.vue'
import DomainsMonitorView from '@/views/DomainsMonitorView.vue'
import HestiaView from '@/views/HestiaView.vue'
import IframeCheckerView from '@/views/IframeCheckerView.vue'
import LinksCheckerView from '@/views/LinksCheckerView.vue'
import LoginView from '@/views/LoginView.vue'
// import SignupView from '@/views/SignupView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/digital_ocean',
    name: 'digital_ocean',
    component: DigitalOceanView,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/digital_ocean/:id',
    name: 'digital_ocean_manage',
    component: DigitalOceanManageView,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/domains_monitor',
    name: 'domainsMonitor',
    component: DomainsMonitorView,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/hestia',
    name: 'hestia',
    component: HestiaView,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/links_checker',
    name: 'linksChecker',
    component: LinksCheckerView,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/iframe_checker',
    name: 'iframeChecker',
    component: IframeCheckerView,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }//,
  // {
  //   path: '/signup',
  //   name: 'signup',
  //   component: SignupView
  // }
  /*
   <NavigationLink iconClasses="fa-brands fa-digital-ocean" text="Digital Ocean" href="/digital_ocean" />
      <NavigationLink iconClasses="fa-solid fa-server" text="Hestia CP" href="/hestia" />
      <NavigationLink iconClasses="fa-solid fa-globe" text="Domains Monitor" href="/domains" />
      <NavigationLink iconClasses="fa-solid fa-link" text="Links Checker" href="/checker" />
      <NavigationLink iconClasses="fa-solid fa-table" text="Iframe Checker" href="/iframes" />
   */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.name === 'login' && store.getters.isLoggedIn) {
    next('/')
    return
  }

  if (to.matched.some(record => record.meta.requiresAuthentication)) {
    if (store.getters.isLoggedIn) {
      const verify = await store.dispatch('verifyToken')
      // console.log(verify)

      if (!verify) { next({ path: '/login', query: { next: to.path } }) }
      next()
      return
    }

    // console.log(to.href)

    next({ path: '/login', query: { next: to.path } })
  } else {
    next()
  }
})

export default router
