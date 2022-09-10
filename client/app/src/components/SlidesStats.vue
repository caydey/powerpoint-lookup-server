<template>
  <div class="container text-center mt-3 p-2 bg-info" id="stats">
    <h2>
      Source code:
      <a href="https://github.com/caydey/powerpoint-lookup-server"
        >GitHub@caydey</a
      >
    </h2>
    <strong>Created {{ new Date(stats.created).toLocaleString() }}</strong>
    <!-- <h3>Indexed slideshows</h3> -->
    <p v-for="slide in stats.slides" :key="slide.title">
      <span class="title">{{ slide.title }}</span>
      <span class="pages">{{ slide.pages }} pages</span>
    </p>
  </div>
</template>


<style scoped>
#stats {
  border-radius: 10px;
  width: 500px;
  color: black;
}
p,
h3 {
  margin: 0;
}

.title {
  width: 350px;
  display: inline-block;
  text-align: left;
}
.pages {
  width: 100px;
  display: inline-block;
}
</style>


<script>
export default {
  name: 'ErrorMessage',
  components: {
  },
  props: [
    'stats'
  ]
}
</script>
