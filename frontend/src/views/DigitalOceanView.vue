<template>
  <Toast
    v-if="toastIsVisible"
    :toastClass="toastClass"
    :title="toastTitle"
    :time="toastTime"
    :text="toastText"
  />

  <h4 class="fw-bold py-3 mb-4">Digital Ocean</h4>

  <div class="card">
    <h5 class="card-header">Accounts</h5>
    <div class="table-responsive text-nowrap">
      <table class="table">
        <thead>
          <tr>
            <th>Account name</th>
            <th>Domains</th>
            <th>Control Panel</th>
            <th>Status</th>
            <th>Manage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="accounts.length > 0" class="table-border-bottom-0">
          <tr v-for="account in accounts" :key="account.id">
            <td>
              <strong>{{ account.name }}</strong>
            </td>
            <td>{{ account.domainsCount ? account.domainsCount : "None" }}</td>
            <td>
              {{ account.controlPanel ? account.controlPanel : "Not set" }}
            </td>
            <td>
              <span class="badge bg-label-primary me-1" v-if="account.status"
                >Active</span
              >
              <span class="badge bg-label-danger me-1" v-else>Disabled</span>
            </td>
            <td>
              <router-link
                :to="{
                  name: 'digital_ocean_manage',
                  params: { id: account.id },
                }"
              >
                <i class="text-success fa-solid fa-play"></i>
              </router-link>
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
                  <a class="dropdown-item" disabled href="javascript:void(0);" style="pointer-events: none; cursor: default;"
                    ><i class="bx bx-edit-alt me-1"></i> Edit (in dev)</a
                  >
                  <a
                    class="dropdown-item"
                    href="javascript:void(0);"
                    @click="deleteAccount(account.id)"
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
        data-bs-toggle="modal"
        data-bs-target="#modalCenter"
      >
        Add Account
      </button>
    </div>
  </div>

  <ModalCenter
    title="Add Account"
    action="Add"
    :fields="fields"
    :createAccount="createAccount"
    v-model="fields"
  />
</template>

<script>
import axios from 'axios'
import ModalCenter from '@/components/Modals/ModalCenter.vue'
import Toast from '@/components/Utils/ToastComponent.vue'

export default {
  name: 'DigitalOceanView',
  data () {
    return {
      accounts: [],
      toastIsVisible: false,
      toastClass: '', // bg-primary bg-secondary bg-success bg-danger bg-warning
      toastTitle: '',
      toastTime: '',
      toastText: '',
      fields: [
        {
          id: 'accountName',
          name: 'name',
          placeholder: 'Enter Account Name',
          text: 'Account Name',
          type: 'text',
          required: true,
          bind: ''
        },
        {
          id: 'accessToken',
          name: 'accessToken',
          placeholder: 'Enter Access Token',
          text: 'Access Token',
          type: 'text',
          required: true,
          bind: ''
        }
      ]
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
    async getAccounts () {
      const config = {
        method: 'get',
        url: 'http://localhost:5000/api/v1/do_accounts',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
      try {
        const response = await axios(config)
        this.accounts = response.data.data

        // console.log(response.data)
        // console.log(this.accounts)
      } catch (error) {
        console.log(error)
        this.showToast(
          'danger',
          'Error',
          'now',
          'An error occured. Try again.'
        )
      }
    },
    async createAccount () {
      const formData = {}

      this.fields.forEach((element, index) => {
        formData[element.name] = element.bind
        console.log({ element, index })
      })

      console.log({ formData })
      const data = JSON.stringify(formData)
      console.log(data)

      const config = {
        method: 'post',
        url: 'http://localhost:5000/api/v1/do_accounts',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        data: data
      }
      try {
        // const response =
        await axios(config)
        // this.accounts = response.data.data
        // console.log(response.data)
        this.showToast(
          'primary',
          'Success',
          'now',
          'Account added'
        )

        this.getAccounts()
        // console.log(this.accounts)
      } catch (error) {
        this.showToast(
          'danger',
          'Error',
          'now',
          'An error occured. Try again.'
        )
        console.log(error)
      }

      console.log('Account created')
    },
    async deleteAccount (id) {
      const isOk = confirm('Are you sure?')

      if (!isOk) return

      const axios = require('axios')

      const config = {
        method: 'delete',
        url: 'http://localhost:5000/api/v1/do_accounts/' + id,
        headers: {}
      }

      try {
        await axios(config)
        this.showToast(
          'primary',
          'Success',
          'now',
          'Account #' + id + ' deleted'
        )
        this.getAccounts()
      } catch (error) {
        this.showToast(
          'danger',
          'Error',
          'now',
          'An error occured. Try again.'
        )
        console.log(error)
      }
    }
  },
  mounted: function () {
    this.getAccounts()
  },
  components: {
    ModalCenter,
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
