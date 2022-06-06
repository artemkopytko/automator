<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <!-- Menu -->

      <NavigationAside v-if="showSidebar" />
      <!-- / Menu -->

      <!-- Layout container -->
      <div class="layout-page">
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Content -->

          <div class="container-xxl flex-grow-1 container-p-y">
            <router-view />
          </div>
          <!-- / Content -->

          <div class="content-backdrop fade"></div>
        </div>
        <!-- Content wrapper -->
      </div>
      <!-- / Layout page -->
    </div>

    <!-- Overlay -->
    <div class="layout-overlay layout-menu-toggle"></div>
  </div>

  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
</template>

<script>
import NavigationAside from '@/components/Navigation/NavigationAside.vue'

export default {
  components: {
    NavigationAside
  },
  computed: {
    showSidebar () {
      if (this.$route.name === 'login' || this.$route.name === 'signup') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
</style>
