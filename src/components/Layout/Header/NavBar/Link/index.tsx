import React, { memo } from 'react'

import './index.less'

import { GithubOutlined } from '@ant-design/icons'

const Link = memo(() => (
    <a className='git-link' href='https://github.com/chengzhenguo1/react-cheng-music'>
        <GithubOutlined />
    </a>
    ))

export default Link
