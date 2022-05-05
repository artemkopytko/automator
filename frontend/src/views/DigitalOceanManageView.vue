<template>
  <Toast
    v-if="toastIsVisible"
    :toastClass="toastClass"
    :title="toastTitle"
    :time="toastTime"
    :text="toastText"
  />

  <h4 class="fw-bold py-3 mb-4">
    <span class="text-muted fw-light">Digital Ocean /</span>
    Account {{ account.name }}
  </h4>

  <ul class="nav nav-pills mb-3 nav-fill" role="tablist">
    <li class="nav-item">
      <button
        type="button"
        class="nav-link active"
        role="tab"
        data-bs-toggle="tab"
        data-bs-target="#navs-pills-justified-home"
        aria-controls="navs-pills-justified-home"
        aria-selected="true"
      >
        <i class="tf-icons bx bx-home"></i> General
      </button>
    </li>
    <li class="nav-item">
      <button
        type="button"
        class="nav-link"
        role="tab"
        data-bs-toggle="tab"
        data-bs-target="#navs-pills-justified-profile"
        aria-controls="navs-pills-justified-profile"
        aria-selected="false"
      >
        <i class="tf-icons bx bx-user"></i> Domains
      </button>
    </li>
    <!-- <li class="nav-item">
              <button
                type="button"
                class="nav-link"
                role="tab"
                data-bs-toggle="tab"
                data-bs-target="#navs-pills-justified-messages"
                aria-controls="navs-pills-justified-messages"
                aria-selected="false"
              >
                <i class="tf-icons bx bx-message-square"></i> Messages
              </button>
            </li> -->
  </ul>

  <div class="card">
    <h5 class="card-header">Account Details</h5>

    <div class="col-12">
      <div class="nav-align-top mb-4">
        <div class="">
          <div
            class="tab-pane fade active show"
            id="navs-pills-justified-home"
            role="tabpanel"
          >
            <div class="card-body">
              <form
                id="formAccountSettings"
                method="POST"
                onsubmit="return false"
              >
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="accountName" class="form-label">Account Name</label>
                    <input
                      class="form-control"
                      type="text"
                      id="accountName"
                      autofocus=""
                      v-model="account.name"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="accessToken" class="form-label">Access Token</label>
                    <input
                      class="form-control"
                      type="text"
                      name="accessToken"
                      id="accessToken"
                      v-model="account.accessToken"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label" for="country">Control Panel</label>
                    <select id="country" class="select2 form-select" disabled>
                      <option value="">Select Panel</option>
                      <option value="">Hestia</option>
                      <option value="">Hestia</option>
                      <option value="">Hestia</option>
                    </select>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="language" class="form-label">Status</label>
                    <select id="language" class="select2 form-select" disabled>
                      <option value="">Select Status</option>
                      <option value="en">Active</option>
                      <option value="fr">Archived</option>
                    </select>
                  </div>
                </div>
                <div class="mt-2">
                  <button type="submit" class="btn btn-primary me-2" disabled>
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="navs-pills-justified-profile"
            role="tabpanel"
          >
            <p>
              Donut dragée jelly pie halvah. Danish gingerbread bonbon cookie
              wafer candy oat cake ice cream. Gummies halvah tootsie roll muffin
              biscuit icing dessert gingerbread. Pastry ice cream cheesecake
              fruitcake.
            </p>
            <p class="mb-0">
              Jelly-o jelly beans icing pastry cake cake lemon drops. Muffin
              muffin pie tiramisu halvah cotton candy liquorice caramels.
            </p>
          </div>
          <!-- <div
              class="tab-pane fade"
              id="navs-pills-justified-messages"
              role="tabpanel"
            >
              <p>
                Oat cake chupa chups dragée donut toffee. Sweet cotton candy
                jelly beans macaroon gummies cupcake gummi bears cake chocolate.
              </p>
              <p class="mb-0">
                Cake chocolate bar cotton candy apple pie tootsie roll ice cream
                apple pie brownie cake. Sweet roll icing sesame snaps caramels
                danish toffee. Brownie biscuit dessert dessert. Pudding jelly
                jelly-o tart brownie jelly.
              </p>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Toast from '@/components/Utils/ToastComponent.vue'

export default {
  name: 'DigitalOceanView',
  data () {
    return {
      accountId: this.$route.params.id,
      account: {},
      toastIsVisible: false,
      toastClass: '', // bg-primary bg-secondary bg-success bg-danger bg-warning
      toastTitle: '',
      toastTime: '',
      toastText: ''
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
    async getAccount () {
      const config = {
        method: 'get',
        url: 'http://localhost:5000/api/v1/do_accounts/' + this.accountId,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
      try {
        const response = await axios(config)
        this.account = response.data.data
      } catch (error) {
        console.log(error)
        this.showToast('danger', 'Error', 'now', 'An error occured. Try again.')
      }
    },
    async getAccountDomains () {
      const config = {
        method: 'get',
        url: 'http://localhost:5000/api/v1/do_accounts/' + this.accountId,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
      try {
        const response = await axios(config)
        this.account = response.data.data
      } catch (error) {
        console.log(error)
        this.showToast('danger', 'Error', 'now', 'An error occured. Try again.')
      }
    }
  },
  mounted: function () {
    this.getAccount(this.accountId)
  },
  components: {
    Toast
  }
}
</script>

<style scoped>
.table-responsive.text-nowrap {
  overflow: visible;
}

tr {
  text-align: center;
}
</style>
