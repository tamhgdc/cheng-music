import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react'

import { Slider } from 'antd'
import { formatTimer } from '../../../../utils/format'
import useStores from '../../../../hooks/useStores'

const ProgressBar: React.FC = () => {
    const { Music } = useStores()
    const [time, setTime] = useState(0)

    useEffect(() => {
        setTime(Number(Music.audioInfo.time))
    }, [Music.audioInfo.time])

    /* 滑动进度条 */
    const handleChangeProgress = useCallback(
        (e:number) => {
            setTime(e)
            Music.setPlayProgress(e)
        },
        [],
    )

    return (
        <div>
            <Slider defaultValue={0} onChange={handleChangeProgress} tipFormatter={formatTimer} value={time} max={Music.audioInfo.duration} />
        </div>
)
 }

export default observer(ProgressBar)
