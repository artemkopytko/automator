import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DigitalOceanView from '@/views/DigitalOceanView.vue'
import DomainsMonitorView from '@/views/DomainsMonitorView.vue'
import HestiaView from '@/views/HestiaView.vue'
import IframeCheckerView from '@/views/IframeCheckerView.vue'
import LinksCheckerView from '@/views/LinksCheckerView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/digital_ocean',
    name: 'digital_ocean',
    component: DigitalOceanView
  },
  {
    path: '/domains_monitor',
    name: 'domainsMonitor',
    component: DomainsMonitorView
  },
  {
    path: '/hestia',
    name: 'hestia',
    component: HestiaView
  },
  {
    path: '/links_checker',
    name: 'linksChecker',
    component: LinksCheckerView
  },
  {
    path: '/iframe_checker',
    name: 'iframeChecker',
    component: IframeCheckerView
  }
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

export default router
