<template>
  <div class="container text-center">
    <h1>{{ website_title }}</h1>
    <search-box @submit="queryApi" @clear="clearSlides"></search-box>
    <slides-view v-if="matchingSlides.length > 0" :matchingSlides="matchingSlides"></slides-view>
    <error-message v-if="errorMessage != ''" :message="errorMessage"></error-message>
    <previous-searches :searches="prevSearches" :activeConnections="activeConnections"></previous-searches>
  </div>
</template>


<style>
html body {
  background-color: rgb(20,22,27);
}
/* font-awesome-icon */

</style>

<style scoped>
h1 {
  color: rgb(78,89,155);
  font-size: 40px;
  margin: 6px;
}
</style>

<script>
import axios from 'axios';
import socketClient from './socketClient';
import { API_QUERY, STATIC_HOST } from './config.js';

import SearchBox from './components/InputKeywords.vue';
import SlidesView from './components/SlidesView.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import PreviousSearches from './components/PreviousSearches.vue';
var errorMessage = "";
var matchingSlides = [];

var prevSearches = [];
var activeConnections = 0;
var lastSearch;

const website_title = process.env.VUE_APP_WEBSITE_TITLE || "Slide Lookup";
document.title = website_title
export default {
  name: 'App',
  components: {
    SearchBox,
    SlidesView,
    ErrorMessage,
    PreviousSearches
  },
  methods: {
    queryApi: function(keywords) {
      // dont send api request for something already showing
      if (keywords.join() === lastSearch) return
      lastSearch = keywords.join();

      this.clearSlides();
      if (keywords.length === 0) {
        this.errorMessage = "no search specified";
      } else {
        axios.post(API_QUERY, {keywords: keywords}).then((res) => {
          if (res.data.slides.length == 0) {
            this.errorMessage = "not found"
          } else {
            res.data.slides.forEach(slide => { // hard-disc-01
              var ss = slide.split("-") // hard,disk,01
              var title = ss.slice(0,ss.length-1).join("-") // hard-disk
              var page = Number(ss[ss.length-1])  // 1
              var path = `${STATIC_HOST}slides/${escape(slide)}.jpg`  // /slides/hard-disc-01.jpg
              this.matchingSlides.push({
                title: title,
                page: page,
                path: path
              })
            });
          }
        }).catch((err) => {
          this.clearSlides();
          if (err.response.data) {
            this.errorMessage = err.response.data.message
          } else {
            this.errorMessage = "error"
          }
        })
      }
    },
    clearSlides: function() {
      this.matchingSlides = [];
      this.errorMessage = "";
    }
  },
  data() {
    return {
      matchingSlides: matchingSlides,
      errorMessage: errorMessage,
      prevSearches: prevSearches,
      activeConnections: activeConnections,
      website_title: website_title
    }
  },
  mounted() {
    const MAX_HISTORY = 60;
    const BACK_CHECK = 4;
    socketClient.setSearchesListener((search) => {
      // dont log duplicates send BACK_CHECK messages ago
      const splitPos = (BACK_CHECK < this.prevSearches.length) ? BACK_CHECK : this.prevSearches.length;
      const slice = this.prevSearches.slice(0, splitPos);
      if (!slice.some((s) =>
        (s.sender === search.sender && s.keywords === search.keywords)
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
  }
}
</script>

