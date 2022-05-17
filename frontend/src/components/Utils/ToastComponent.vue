<template>
  <div
    class="bs-toast toast toast-placement-ex m-2 fade top-0 end-0 show"
    :class="toastClass"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-delay="2000"
  >
    <div class="toast-header">
      <i class="fa-solid fa-bell"></i>
      <div class="me-auto fw-semibold">{{ title }}</div>
      <small>{{ time }}</small>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['toastClass', 'title', 'time', 'text']
}
</script>

<style scoped>
.toast-header i {
  margin-right: 5px;
}

.bg-success, .bg-success small, .bg-success div, .bg-success i {
  color: black !important;
}
</style>
