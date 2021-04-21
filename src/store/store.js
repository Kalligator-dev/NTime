import { createStore } from 'vuex'

import newPlan from './modules/new'
import timeT from './modules/data'

const store = createStore({
    modules: {
        newPlan,
        timeT
    }
})

export default store;