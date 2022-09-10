<template>
  <div class="container">
    <div>
      <input
        type="text"
        @keyup.enter="submit"
        placeholder="query"
        v-model="search"
      />
    </div>
    <div>
      <button class="btn bg-warning m-1" @click="clear">Clear</button>
      <button class="btn bg-primary m-1" @click="submit">Search</button>
    </div>
  </div>
</template>


<style scoped>
input {
  border-radius: 6px;
  border: 0;
  margin: 2px;
  padding: 4px;
}
</style>


<script>
export default {
  name: 'InputKeywords',
  components: {
  },
  methods: {
    submit: function() {
      this.$emit('submit', this.search)
    },
    clear: function() {
      this.search = '';
      this.$emit('clear');
    }
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>
