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
        @click="getDomainsList"
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
    <div class="col-12">
      <div class="nav-align-top mb-4">
        <div class="">
          <div
            class="tab-pane fade active show"
            id="navs-pills-justified-home"
            role="tabpanel"
          >
          <h5 class="card-header">Account Details</h5>
            <div class="card-body">
              <form
                id="formAccountSettings"
                method="POST"
                onsubmit="return false"
              >
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="accountName" class="form-label"
                      >Account Name</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      id="accountName"
                      autofocus=""
                      v-model="account.name"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="accessToken" class="form-label"
                      >Access Token</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      name="accessToken"
                      id="accessToken"
                      v-model="account.accessToken"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label" for="country"
                      >Control Panel</label
                    >
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

             <h5 class="card-header">Account Droplets</h5>
             <div class="card-body">
                 <div class="table-responsive text-nowrap">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Droplet Name</th>
                    <th>IP Address</th>
                    <th>Health</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody v-if="droplets.length > 0" class="table-border-bottom-0">
                  <tr v-for="(droplet, i) in droplets" :key="droplet.id">
                    <td>{{ ++i }}</td>
                    <td>
                      <strong>{{ droplet.name }}</strong>
                    </td>
                    <td>
                      {{ droplet.ip }}
                    </td>
                    <td>
                      {{ !droplet.locked && droplet.status == 'active' ? 'Good' : 'Bad' }}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button
                          type="button"
                          class="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div class="dropdown-menu" style="">
                          <a
                            class="dropdown-item"
                            disabled
                            href="javascript:void(0);"
                            style="pointer-events: none; cursor: default"
                            ><i class="bx bx-edit-alt me-1"></i> Edit (in
                            dev)</a
                          >
                          <a
                            class="dropdown-item"
                            href="javascript:void(0);"
                            ><i class="bx bx-trash me-1"></i> Delete</a
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
               </div>
          </div>
          <div
            class="tab-pane fade"
            id="navs-pills-justified-profile"
            role="tabpanel"
          >
          <h5 class="card-header">Account Domains</h5>
            <div class="table-responsive text-nowrap">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Domain Name</th>
                    <th>TTL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody v-if="accountDomains.length > 0" class="table-border-bottom-0">
                  <tr v-for="(domain, i) in accountDomains" :key="domain.id">
                    <td>{{ ++i }}</td>
                    <td>
                      <strong>{{ domain.name }}</strong>
                    </td>
                    <td>
                      {{ domain.ttl }}
                    </td>
                    <td>
                      <div class="dropdown">
                        <button
                          type="button"
                          class="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div class="dropdown-menu" style="">
                          <a
                            class="dropdown-item"
                            disabled
                            href="javascript:void(0);"
                            style="pointer-events: none; cursor: default"
                            ><i class="bx bx-edit-alt me-1"></i> Edit (in
                            dev)</a
                          >
                          <a
                            class="dropdown-item"
                            href="javascript:void(0);"
                            ><i class="bx bx-trash me-1"></i> Delete</a
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="m-3">
              <button
                type="button"
                class="btn btn-primary"
              >
                Update List
              </button>
            </div>
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
      droplets: {},
      accountDomains: [],
      domainsFetched: false,
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
        url: '/api/v1/do_accounts/' + this.accountId,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
      try {
        const response = await axios(config)
        this.account = response.data.account
        this.droplets = response.data.droplets
        console.log(this.droplets)
      } catch (error) {
        console.log(error)
        this.showToast('danger', 'Error', 'now', 'An error occured. Try again.')
      }
    },
    async getDomainsList () {
      if (!this.domainsFetched) {
        const config = {
          method: 'get',
          url: '/api/v1/do_accounts/' + this.accountId + '/domains',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
        try {
          this.domainsFetched = true
          const response = await axios(config)
          this.accountDomains = response.data.data
        } catch (error) {
          console.log(error)
          this.showToast(
            'danger',
            'Error',
            'now',
            'An error occured. Try again.'
          )
        }
      }
    },
    async forceUpdateDomains () {
      const config = {
        method: 'get',
        url:
          '/api/v1/do_accounts/' +
          this.accountId +
          'domains/fetch',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
      try {
        await axios(config)
        this.domainsFetched = false
        this.getDomainsList()
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

.tab-pane.fade:not(.show) {
  display: none !important;
}
</style>
