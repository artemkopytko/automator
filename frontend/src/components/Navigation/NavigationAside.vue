<template>
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <router-link to="/" class="app-brand-link">
        <span class="app-brand-logo demo"> </span>
        <span class="app-brand-text demo menu-text fw-bolder ms-2"
          >Vue & Node.js</span
        >
      </router-link>

      <a
        href="javascript:void(0);"
        class="
          layout-menu-toggle
          menu-link
          text-large
          ms-auto
          d-block d-xl-none
        "
      >
        <i class="bx bx-chevron-left bx-sm align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
      <!-- Dashboard -->

      <NavigationLink iconClasses="fa-solid fa-table-columns" text="Dashboard" href="/" />
      <NavigationLink iconClasses="fa-brands fa-digital-ocean" text="Digital Ocean" href="/digital_ocean" />
      <NavigationLink iconClasses="fa-solid fa-server" text="Hestia CP" href="/hestia" />
      <NavigationLink iconClasses="fa-solid fa-globe" text="Domains Monitor" href="/domains_monitor" />
      <NavigationLink iconClasses="fa-solid fa-link" text="Links Checker" href="/links_checker" />
      <NavigationLink iconClasses="fa-solid fa-table" text="Iframe Checker" href="/iframe_checker" />

      <!-- Layouts -->
    </ul>
  </aside>
</template>

<script>
import NavigationLink from '@/components/Navigation/NavigationLink.vue'

export default {
  data () {
    return {
      isActive: false
    }
  },
  name: 'NavigationAside',
  components: {
    NavigationLink
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
