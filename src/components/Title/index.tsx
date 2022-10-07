import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import './index.less'

import { RightOutlined } from '@ant-design/icons'

interface Iprops {
    type?: 'link' | 'default'
    text: string
    url?: string
}

const Title: React.FC<Iprops> = memo(({ type = 'default', text, url = '/' }) => (
    <h3 className='title'>
        {type === 'link' ? (
            <div className='title-link'>
                <Link to={url}>{text}</Link>
                <RightOutlined /> 
            </div>
) 
: (
    <> 
        { text }
    </>
)}
    </h3>
    ))

export default Title
