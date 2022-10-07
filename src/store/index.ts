import React from 'react'
import User from './user/index'
import Music from './music/index'
import Search from './serach/index'

const stores = React.createContext({
    User: new User(),
    Music: new Music(),
    Search: new Search(),
})

export default stores
