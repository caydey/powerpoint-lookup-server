<template>
  <div class="text-center">
    <h1>Lookup: {{ $route.params.category }}</h1>
    <router-link to="/">Home</router-link>
    <div class="container text-center">
      <search-box @submit="queryApi" @clear="clearSlides"></search-box>
      <slides-view
        v-if="matchingSlides.length > 0"
        :matchingSlides="matchingSlides"
      ></slides-view>
      <category-stats
        v-else-if="errorMessage == '' && statsLoaded"
        :stats="
          stats.categories.find((c) => c.category == $route.params.category)
        "
      ></category-stats>

      <error-message
        v-if="errorMessage != ''"
        :message="errorMessage"
      ></error-message>

      <previous-searches
        :searches="prevSearches"
        :activeConnections="activeConnections"
      ></previous-searches>
    </div>
  </div>
</template>


<style scoped>
h1 {
  color: rgb(78, 89, 155);
  font-size: 40px;
  margin: 6px;
}
</style>

<script>
// import socketClient from "@/socketClient";

import { mapGetters } from "vuex";

import SearchBox from "@/components/SearchBox.vue";
import SlidesView from "@/components/SlidesView.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import PreviousSearches from "@/components/PreviousSearches.vue";

import Api from "@/api.js";

import CategoryStats from "@/components/CategoryStats.vue";

var lastSearch;

export default {
  name: "App",
  components: {
    SearchBox,
    SlidesView,
    ErrorMessage,
    PreviousSearches,
    CategoryStats,
  },
  methods: {
    queryApi: function (search) {
      // dont send api request for something already showing
      if (search === lastSearch) return;

      this.clearSlides();
      if (search === "") {
        this.errorMessage = "no search specified";
        return;
      }
      Api.search(search, this.$route.params.category, (err, slides) => {
        console.log(slides);
        if (err) {
          this.clearSlides();
          this.errorMessage = err || "error";
          return;
        }

        this.matchingSlides = slides;
      });
    },
    clearSlides: function () {
      this.matchingSlides = [];
      this.errorMessage = "";
      this.lastSearch = "";
    },
  },
  data() {
    return {
      matchingSlides: [],
      errorMessage: "",
      prevSearches: [],
      activeConnections: 0,
      CategoryStats: {},
    };
  },
  computed: {
    ...mapGetters({
      stats: "stats/stats",
      statsLoaded: "stats/loaded",
    }),
  },
};
</script>

