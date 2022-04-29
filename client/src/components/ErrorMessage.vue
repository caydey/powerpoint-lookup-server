<template>
  <div class="container text-center mt-3 p-2 bg-danger" id="error">
    <span>
      Error: {{ message }}
    </span>
  </div>
</template>


<style scoped>
#error {
  border-radius: 10px;
  width: 400px;
  color: black;
}
</style>


<script>
export default {
  name: 'ErrorMessage',
  components: {
  },
  props: [
    'message'
  ]
}
</script>
