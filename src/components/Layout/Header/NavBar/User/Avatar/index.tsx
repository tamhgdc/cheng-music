import React, { memo } from 'react'

import './index.less'

import { Avatar as AvatarComponent } from 'antd'
import { UserOutlined } from '@ant-design/icons'

interface Iprops{
    picurl?:string
}

const Avatar:React.FC<Iprops> = memo(({ picurl }) => (
    <div className='avatar'>
        <AvatarComponent size={30} icon={<UserOutlined />} src={picurl || ''} />
    </div>
    ))

export default Avatar
