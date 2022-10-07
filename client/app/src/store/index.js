import { createStore } from 'vuex'
import stats from './modules/stats'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    stats
  },
  strict: debug
})
