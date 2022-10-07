<template>
  <router-view />
</template>


<style>
html body {
  background-color: rgb(20, 22, 27);
}
h1 {
  color: rgb(78, 89, 155);
  font-size: 40px;
  margin: 6px;
}
</style>

<script>
import Api from "./api";

export default {
  setup() {},
  mounted() {
    Api.stats((err, stats) => {
      if (err) {
        console.log("api error");
      }
      this.$store.commit("stats/setStats", stats);
    });
  },
};
</script>
