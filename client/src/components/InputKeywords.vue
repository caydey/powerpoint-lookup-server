<template>
  <div class="container">
    <div>
      <input type="text" @keyup.enter="submit" placeholder="slide keyword 0" v-model="keywords[0]">
      <input type="text" @keyup.enter="submit" placeholder="slide keyword 1" v-model="keywords[1]">
      <input type="text" @keyup.enter="submit" placeholder="slide keyword 2" v-model="keywords[2]">
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
var keywords = ['','',''];
export default {
  name: 'InputKeywords',
  components: {
  },
  methods: {
    submit: function() {
      const prunedKeywords = keywords.filter((keyword) => (keyword)) // remove all empty strings
      this.$emit('submit', prunedKeywords)
    },
    clear: function() {
      // this.keywords = ['','',''] breaks stuff
      this.keywords[0] = '';
      this.keywords[1] = '';
      this.keywords[2] = '';
      this.$emit('clear');
    }
  },
  data() {
    return {
      keywords: keywords
    }
  }
}
</script>
