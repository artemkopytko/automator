<template>
  <div class="row">
    <div class="col mb-3">
      <label :for="id" class="form-label">{{ text }}</label>
      <input
        :type="type"
        :id="id"
        :name="name"
        class="form-control"
        :placeholder="placeholder"
        :required="required"
        v-model="fieldsModel"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'text', 'placeholder', 'type', 'required', 'fields', 'i'],
  computed: {
    fieldsModel: {
      get () {
        return this.fields[this.i].bind
      },
      set (value) {
        const updated = this.fields
        updated[this.i].bind = value

        this.$emit('update:fields', updated)
      }
    }
  },
  mounted () {
    console.log('mouted field')
  }
}
</script>

<style scoped>
</style>
