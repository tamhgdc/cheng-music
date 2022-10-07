import React from 'react'
import ReactDOM from 'react-dom'

import '~/styles/variables.css'
import './assets/normalize.css'
import './styles/global.less'
import './styles/media.less'
import 'antd/dist/antd.less'
import App from './views/App'

ReactDOM.render(
    <App />,
  document.getElementById('root'),
)
