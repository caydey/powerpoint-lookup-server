<template>
  <div @click="close">
    <img :src="slide.path" :alt="slide.title+'-'+slide.page">
    <div class="cover"></div>
  </div>
</template>


<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
  
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 2;
}
.cover {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
  position: fixed;
  z-index: 1;
}
</style>


<script>
export default {
  name: 'FocusedSlide',
  components: {
  },
  props: [
    'slide'
  ],
  methods: {
    close: function() {
      this.$emit('close');
    }
  }
}
</script>
