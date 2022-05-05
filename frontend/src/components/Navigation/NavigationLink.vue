<template>
  <li class="menu-item" :class="{ active: isActive }">
    <router-link :to="href" class="menu-link">
      <i class="menu-icon" :class="iconClasses"></i>
      <div data-i18n="Analytics">{{ text }}</div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['href', 'iconClasses', 'text'],
  computed: {
    isActive () {
      const routeHref = this.$route.path
      const currentPath = this.href.replace('/', '')

      if (routeHref !== '/' && currentPath) {
        if (routeHref.includes(currentPath)) {
          return true
        } else {
          return false
        }
      } else {
        if (routeHref === '/' && currentPath === '') {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>
