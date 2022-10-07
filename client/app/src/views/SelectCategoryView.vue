<template>
  <div class="mt-3">
    <h1 class="text-center">Slideshow lookup</h1>
    <div v-if="stats" class="container bg-info p-2 rounded">
      <h2 class="text-center">
        Source code:
        <a href="https://github.com/caydey/powerpoint-lookup-server">
          GitHub@caydey
        </a>
      </h2>
      <h5 class="m-0">Select category:</h5>
      <ul>
        <li v-for="c in stats.categories" :key="c.category">
          <router-link :to="c.category">
            {{ c.category }} ({{ c.slides.length }} slides)
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
}
</style>


<script>
// import socketClient from '@/socketClient';
import { mapGetters } from "vuex";

export default {
  name: "SelectCategoryView",
  components: {},
  methods: {},
  computed: {
    ...mapGetters({
      stats: "stats/stats",
    }),
  },
};
</script>

