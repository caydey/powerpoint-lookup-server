<template>
  <div class="container text-center">
    <h1>PowerPoint Lookup Server</h1>
    <search-box @submit="queryApi" @clear="clearSlides"></search-box>
    <slides-view
      v-if="matchingSlides.length > 0"
      :matchingSlides="matchingSlides"
    ></slides-view>
    <slides-stats
      :stats="slidesStats"
      v-else-if="errorMessage == ''"
    ></slides-stats>

    <error-message
      v-if="errorMessage != ''"
      :message="errorMessage"
    ></error-message>

    <previous-searches
      :searches="prevSearches"
      :activeConnections="activeConnections"
    ></previous-searches>
  </div>
</template>


<style>
html body {
  background-color: rgb(20, 22, 27);
}
/* font-awesome-icon */
</style>

<style scoped>
h1 {
  color: rgb(78, 89, 155);
  font-size: 40px;
  margin: 6px;
}
</style>

<script>
import socketClient from './socketClient';

import SearchBox from './components/SearchBox.vue';
import SlidesView from './components/SlidesView.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import PreviousSearches from './components/PreviousSearches.vue';

import LookupApi from './lookupApi.js'

import SlidesStats from './components/SlidesStats.vue'

import { SLIDES_LOCATION } from './config'


var errorMessage = "";
var matchingSlides = [];

var prevSearches = [];
var activeConnections = 0;
var lastSearch;

export default {
  name: 'App',
  components: {
    SearchBox,
    SlidesView,
    ErrorMessage,
    PreviousSearches,
    SlidesStats
  },
  methods: {
    queryApi: function(search) {
      // dont send api request for something already showing
      if (search === lastSearch) return

      this.clearSlides();
      if (search === '') {
        this.errorMessage = "no search specified";
        return
      }
      LookupApi.search(search, (err, { slides }) => {
        if (err) {
          this.clearSlides();
          this.errorMessage = err || "error"
          return
        }

        this.matchingSlides = slides.map((slide) => {
          return {
            title: slide.title,
            number: slide.number,
            location: `${SLIDES_LOCATION}${slide.title}/${slide.number}.jpg`
          }
        })
      })
    },
    clearSlides: function() {
      this.matchingSlides = [];
      this.errorMessage = "";
      this.lastSearch = ''
    }
  },
  data() {
    return {
      matchingSlides: matchingSlides,
      errorMessage: errorMessage,
      prevSearches: prevSearches,
      activeConnections: activeConnections,
      slidesStats: {}
    }
  },
  mounted() {
    const MAX_HISTORY = 60;
    const BACK_CHECK = 4;
    socketClient.setSearchesListener((search) => {
      // dont log duplicates send BACK_CHECK messages ago
      const splitPos = (BACK_CHECK < this.prevSearches.length) ? BACK_CHECK : this.prevSearches.length;
      const slice = this.prevSearches.slice(0, splitPos);
      if (!slice.includes((s) =>
        (s.sender === search.sender && s.query === search.query)
      )) {
        this.prevSearches.unshift(search);
      }
      // keep logs length to MAX_HISTORY
      while (this.prevSearches.length > MAX_HISTORY) {
        this.prevSearches.pop();
      }
    });
    socketClient.setActiveListener((activeConnections) => {
      this.activeConnections = activeConnections;
    });


    LookupApi.stats((err, stats) => {
      if (err) {
        return
      }
      this.slidesStats = stats
    })
  }
}
</script>

