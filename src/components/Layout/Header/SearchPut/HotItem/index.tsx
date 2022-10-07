import React, { memo } from 'react'

import './index.less'

interface IProps{
    name: string
    index: number
    onSearchWords: (keywords:string)=>void
}

const HotItem: React.FC<IProps> = memo(({ name, index, onSearchWords }) => {
    const toSearchPath = () => {
        onSearchWords(name)
    }

    return (
        <div className='hot-item' onClick={toSearchPath}>
            <div className='item-index'>
                {index}
            </div>
            <div className='item-name'>
                {name}
            </div>
        </div>
)
 })

export default HotItem
