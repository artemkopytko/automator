<template>
  <div
    class="modal fade"
    id="modalCenter"
    tabindex="-1"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCenterTitle">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ModalCenterRow
            v-for="(field, i) in fields"
            :key="i"
            :id="field.id"
            :i="i"
            :name="field.name"
            :text="field.name"
            :placeholder="field.placeholder"
            :type="field.type"
            :required="field.required"
            :fields="fields"
            v-model="fieldsModel"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="createAccount">
            {{ action }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalCenterRow from '@/components/Modals/ModalCenterRow.vue'

export default {
  props: ['title', 'action', 'fields', 'createAccount'],
  computed: {
    fieldsModel: {
      get () {
        return this.fields
      },
      set (value) {
        console.log(value)
        this.$emit('update:fields', value)
      }
    }
  },
  components: {
    ModalCenterRow
  },
  mouted () {}
}
</script>

<style scoped>
</style>
