import React, {
 memo, useCallback, useRef, useEffect, 
} from 'react'
import cn from 'classnames'
import { useClickAway, useLocalStorage } from 'react-use'

import './index.less'

// eslint-disable-next-line no-shadow
enum ThemeColors {
    red = '#EC4141',
    blue = '#63C1FC',
    green ='#49A765',
    yellow = '#F7D18E',
    dark = '#292C31',
    pink = '#F1A0C3'
}

interface IProps{
    show: boolean
    onClickAway: (flag:boolean)=>void
}

const Skin: React.FC<IProps> = memo(({ show, onClickAway }) => {
    const skinRef = useRef<HTMLDivElement| null>(null)
    const [value, setValue] = useLocalStorage('--primary-color')

    useEffect(() => {
        if (value) {
            document.documentElement.style.setProperty('--primary-color', value)
        }
    }, [value, setValue])

    useClickAway(skinRef, () => {
        onClickAway(false)
    })

    const setThemeColors = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const bgColor = e.target.style.backgroundColor
        if (e.target.tagName === 'DIV' && bgColor) {
            document.documentElement.style.setProperty('--primary-color', bgColor)
            setValue(bgColor)
        }
    }, [])
    
    return (
        <div className={cn('skin', show && 'skin-show')} onClick={setThemeColors} ref={skinRef}>
            {show && (
            <>
                <div className='skin-title'>
                    主题
                </div>
                <div className='skin-cover'>
                    {Object.keys(ThemeColors).map((key) => (
                        <div 
                          className='skin-block'
                          key={ThemeColors[key]}
                          style={{ backgroundColor: ThemeColors[key] }} />
                ))}
                </div>
            </>
        )}
        </div>
    )
})

export default Skin
