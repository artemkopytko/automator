<template>
  <li class="menu-item" :class="{active: isActive}">
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
      if (this.$route.href === this.href) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
