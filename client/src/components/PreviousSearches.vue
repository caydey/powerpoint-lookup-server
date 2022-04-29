<template>
  <div>
    <div class="bottom container" >
      <label class="handle" for="chkBox">
        <font-awesome-icon v-if="checked" icon="angle-down"/>
        <font-awesome-icon v-else icon="angle-up"/>
      </label>
      <input id="chkBox" type="checkbox" v-model="checked">
      <div class="logsHandler">
        <div class="logsContainer">
          <div class="counter">
            <span>online: {{activeConnections}}</span>
          </div>
          <div class="logs">
            <p v-for="(search) in searches" :key="search">
              {{search.sender}}: {{search.keywords}}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-show="checked" class="expand"></div>
  </div>
</template>

<style scoped>
.counter {
  position: fixed;
  right: 24px;
}
.counter span {
  color: lightblue;
}
.expand {
  height: 220px;
}
.logsContainer {
  color: white;
  padding: 8px;
  padding-top: 4px;
  padding-right: 6px;
  padding-bottom: 0;
  background-color: black;
  border-radius: 20px 20px 0 0;
  border: 2px solid rgb(28,89,165);
  border-bottom: none;
}

.logs {
  height: 200px;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
/* chrome hide scrollbar */
.logs::-webkit-scrollbar {
  display: none;
}

.logs p {
  margin: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.handle {
  color: black;
  cursor: pointer;
  background-color: rgb(28,89,165);
  width: 60px;
  border-radius: 10px 10px 0 0;
  margin: auto;
  display: block;
}
/* hide input checkbox */
.handle + input {
  display: none;
}
.handle + input + .logsHandler {
  max-height: 0px;
  transition: max-height 0.2s;
}
.handle + input:checked + .logsHandler {
  max-height: 300px; /* something bigger than 200+20px */
  transition: max-height 0.2s;
}

</style>

<script>

export default {
  name: 'PreviousSearches',
  props: [
    'searches',
    'activeConnections'
  ],
  methods: {
  },
  components: {
  },
  data() {
    return {
      checked: false
    }
  },
  mounted() {
    
  }
}
</script>
