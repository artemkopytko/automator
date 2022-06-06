<template>
  <Toast
    v-if="toastIsVisible"
    :toastClass="toastClass"
    :title="toastTitle"
    :time="toastTime"
    :text="toastText"
  />
  <div class="authentication-wrapper authentication-basic container-p-y">
    <div class="authentication-inner">
      <!-- Register -->
      <div class="card">
        <div class="card-body">
          <!-- Logo -->
          <div class="app-brand justify-content-center">
            <span class="app-brand-text demo text-body fw-bolder"
              >Space Profit 🚀</span
            >
          </div>
          <!-- /Logo -->

          <div id="formAuthentication" class="mb-3">
            <div class="mb-3">
              <label for="email" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="email"
                v-model="username"
                name="email-username"
                placeholder="Enter your email or username"
                autofocus=""
              />
            </div>
            <div class="mb-3 form-password-toggle">
              <div class="d-flex justify-content-between">
                <label class="form-label" for="password">Password</label>
              </div>
              <div class="input-group input-group-merge">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  name="password"
                  v-model="password"
                  placeholder="············"
                  aria-describedby="password"
                />
                <span class="input-group-text cursor-pointer"
                  ><i class="bx bx-hide"></i
                ></span>
              </div>
            </div>
            <div class="mb-3">
              <button
                class="btn btn-primary d-grid w-100"
                @click="auth"
                :disabled="!username || !password"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- /Register -->
    </div>
  </div>
</template>

<script>
import Toast from '@/components/Utils/ToastComponent.vue'

export default {
  name: 'LoginView',
  data () {
    return {
      username: '',
      password: '',
      toastIsVisible: false
    }
  },
  methods: {
    showToast (type, title, time, text) {
      this.toastClass = type ? 'bg-' + type : ''
      this.toastTitle = title
      this.toastTime = time
      this.toastText = text
      this.toastIsVisible = true

      setTimeout(() => {
        this.toastIsVisible = false
      }, 3000)
    },

    async auth () {
      try {
        const response = await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })

        // console.log({ response })

        if (response.data.success) {
          // console.log('redirect')
          // console.log(response.data.token)

          this.$router.push(this.$route.query.next || '/')
        } else {
          // console.log(response)
          this.showToast('danger', 'Error', 'now', 'Invalid username or password')
        }
      } catch (err) {
        // console.log(err)
        this.showToast('danger', 'Error', 'now', 'Invalid username or password')
      }

      // const config = {
      //   method: 'post',
      //   url: '/api/v1/login',
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Content-Type': 'application/json'
      //   },
      //   data: {
      //     username: this.username,
      //     password: this.password
      //   }
      // }

      // try {
      //   const resp = await axios(config)
      //   console.log(resp)
      //   if (resp.data.success) {
      //     localStorage.authToken = resp.data.token
      //     this.$router.push(this.$route.query.redirect || '/')
      //   }
      // } catch (error) {
      //   console.log(error)
      //   this.showToast('danger', 'Error', 'now', error.response.data.msg)
      // }
    }
  },
  components: {
    Toast
  }
}
</script>
