import React, { memo } from 'react'

import { formatTimer } from '../../../../utils/format'
import './index.less'

interface IProps {
    sumTime : number
    currentTime: number
}

const AudioTimer: React.FC<IProps> = memo(({ sumTime, currentTime }) => (
    <div className='audio-timer'>
        {formatTimer(currentTime)}
        {' '}
        /
        {' '}
        {formatTimer(sumTime)}
    </div>
))

export default AudioTimer
