import React, { memo } from 'react'

import './index.less'

import { CaretDownOutlined } from '@ant-design/icons'

interface IProps {
    username?: string
    id?: number
}

const Name:React.FC<IProps> = memo(({ username, id }) => (
    <div className='name'>
        {username ? (
            <span>{username}</span>
        ) 
        : (
            <>
                未登录
            </>
        )}
        <CaretDownOutlined style={{ marginLeft: '4px' }} />
    </div>
    ))

export default Name
