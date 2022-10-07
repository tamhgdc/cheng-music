import React, {
 memo, useEffect, useState, useRef, 
} from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import './index.less'

interface Iprops {
    lines: [number, string][]
    title: string
    artist: string
    time: number
    paused: boolean
}

const HIGHLIGHT_LYRIC_TOP = 160
const LYRIC_LINE_HEIGHT = 30

const LyricText: React.FC<Iprops> = memo(({
 lines, title, artist, time, paused,
}) => {
    const [line, setLine] = useState(0)
    const lyricRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (!paused) {
            window.requestAnimationFrame(() => {
                const audioTime = time || 0
                /* 查找当前该移动到的索引 */
                const lineIndex = lines?.findIndex(([times], index) => {
                    const prevTime = index - 1 >= 0 ? lines[index - 1][0] : times
                    const nextTime = index + 1 < lines.length ? lines[index + 1][0] : times
                    if (prevTime <= audioTime && nextTime >= audioTime) {
                        return true
                    }
                    return false
                })
                if (lineIndex > -1) {
                    /* 移动高度 */
                    const scrollHeight = LYRIC_LINE_HEIGHT * lineIndex - HIGHLIGHT_LYRIC_TOP
                    lyricRef.current?.scrollTo({
                        top: scrollHeight < 0 ? 0 : scrollHeight,
                        behavior: 'smooth',
                    })
                    setLine(lineIndex)
                }
            })
        }
    }, [time, line])
    return (
        <div className='lyric'>
            <div className='lyric-title'>
                {title}
            </div>
            <div className='lyric-artist'>
                歌手: 
                <Link to='/'>{artist}</Link>
            </div>
            <div className='lyric-cover' ref={lyricRef}>
                {lines?.map((item, index) => (
                    <div className={cn('lyric-line', index === line && 'active')}>
                        {item[1]}
                    </div>
            ))}
            </div>
        </div>
)
 })

export default LyricText
