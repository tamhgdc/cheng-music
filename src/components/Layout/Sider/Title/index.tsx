import React, { memo } from 'react'

import './index.less'

interface Iprops {
    title: string
}

const MenuTitle:React.FC<Iprops> = memo((props: { title: string }) => (
    <div className='silder-title'>
        {props.title}
    </div>
    ))

export default MenuTitle
