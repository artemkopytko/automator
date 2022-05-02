<template>
  <h4 class="fw-bold py-3 mb-4">Digital Ocean</h4>

  <div class="card">
    <h5 class="card-header">Accounts</h5>
    <div class="table-responsive text-nowrap">
      <table class="table">
        <thead>
          <tr>
            <th>Account name</th>

            <th>Control Panel</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="accounts.length > 0" class="table-border-bottom-0">
          <tr v-for="account in accounts" :key="account.id">
            <td>
              <strong>{{ account.name }}</strong>
            </td>
            <td>{{ account.control_panel }}</td>
            <td>
              <span class="badge bg-label-primary me-1" v-if="account.status">Active</span>
              <span class="badge bg-label-danger me-1" v-else>Disabled</span>
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
                  <a class="dropdown-item" href="javascript:void(0);"
                    ><i class="bx bx-edit-alt me-1"></i> Edit</a>
                  <a class="dropdown-item" href="javascript:void(0);"
                    ><i class="bx bx-trash me-1"></i> Disable</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import data from '@/data/digital_ocean.json'

export default {
  name: 'DigitalOceanView',
  data () {
    return {
      accounts: data
    }
  }
}
</script>

<style scoped>
.table-responsive.text-nowrap {
  overflow: visible;
}
</style>
