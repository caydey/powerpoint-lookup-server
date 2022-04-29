<template>
  <div v-if="slide != -1">
    <h2 class="white">
      {{matchingSlides[slide].title}}, page {{matchingSlides[slide].page}}
    </h2>
    <div class="container text-center">
      <div id="slide" class="row justify-content-center">
        <button class="col-1" id="previous" @click="previous">
          <font-awesome-icon icon="angle-left"/>
        </button>
        <img
          class="col-10 img-fluid"
          :src="matchingSlides[slide].path"
          :alt="matchingSlides[slide].title+'-'+matchingSlides[slide].page"
          @click="imgClick"
        >
       <button class="col-1" id="next" @click="next">
          <font-awesome-icon icon="angle-right"/>
        </button>
      </div>
    </div>
    <p class="white">Page: {{slide+1}}/{{matchingSlides.length}}</p>
    <focused-slide v-if="focusedSlide != -1" :slide="matchingSlides[focusedSlide]" @close="focusedSlide = -1"></focused-slide>
  </div>
</template>


<style scoped>
svg {
  color: black;
}
h2 {
  margin: 0;
  margin-top:0;
  padding-bottom: 10px;
}
p {
  margin-top: 8px;
}
.white {
  color: white;
  font-family: monospace;
}
#slide {
  margin:auto;
}
.col-1 {
  width: 30px;
  padding: 0;
  margin: 0;
}

img {
  /* 2000 x 1500 */
  padding-left: 4px;
  padding-right: 4px;
  max-width: 80vh;
  max-height: 60vh;
}

#next, #previous {
  border: none;
  background-color: rgb(78,89,155);
}
#next { 
  float: left;
}
#previous {
  float: right;
}
</style>

<script>
import FocusedSlide from './FocusedSlide.vue';

var slide = 0;
var focusedSlide = -1;
export default {
  name: 'SlidesView',
  components: {
    FocusedSlide
  },
  props: [
    'matchingSlides'
  ],
  methods: {
    previous: function() {
      if (this.slide == 0) {
        this.slide = this.matchingSlides.length-1;
      } else {
        this.slide--;
      }
    },
    next: function() {
      if (this.slide == this.matchingSlides.length-1) {
        this.slide = 0;
      } else {
        this.slide++;
      }
    },
    imgClick: function() {
      this.focusedSlide = this.slide;
    }
  },
  data() {
    return {
      slide: slide,
      focusedSlide: focusedSlide
    }
  },
  watch: {
    matchingSlides: function(newVal) {
      // oldVal; // suppress unused var warning
      if (newVal.length == 0) {
        this.slide = -1;
      }
      this.slide = 0;
      this.focusedSlide = -1;
    }
  }
}
</script>
