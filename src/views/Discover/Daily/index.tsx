import React, { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { observer } from 'mobx-react'

import { Spin, Result, Button } from 'antd'
import MusicList from '~/components/MusicList'
import useStores from '~/hooks/useStores'
import songApi from '~/api/songlist'

import './index.less'

const RecommendDaily = () => {
    const [state, getRecommendSongsFn] = useAsyncFn(songApi.getRecommendDaily)
    const { User, Music } = useStores()

    const { isLogin } = User

    /* 请求推荐歌曲 */
    useEffect(() => {
        if (isLogin) {
            getRecommendSongsFn()
        }
    }, [isLogin])

    const playAll = () => {
        Music.playAll(state.value)
    }

    /* 打开登录框 */
    const handleLoginDiagio = () => {
        User.changeDiaLogShow(true)
    }

    return (
        <div className='daily'>
            <div className='daily-header'>
                <div className='daily-left'>
                    <div className='daily-time'>
                        <div className='time-weekday'>
                            星期四
                        </div>
                        <div className='time-day'>
                            25
                        </div>
                    </div>
                    <div className='daily-title'>
                        <div className='daily-name'>
                            每日歌曲推荐
                        </div>
                        <div className='daily-tips'>
                            根据你的音乐口味生成，每天6:00更新
                        </div>
                    </div>
                </div>
                <div className='play-all' onClick={playAll}>
                    播放全部
                </div>
            </div>
            <div className='daily-tabel'>
                {isLogin ? (
                    <div>
                        {state.loading ? (
                            <Spin />
                        )
                            : (
                                <MusicList data={state.value} />
                            )}
                    </div>
                ) : (
                    <Result
                      title='请先登录哦'
                      extra={(
                          <Button className='daily-btn' onClick={handleLoginDiagio}>
                              登录
                          </Button>
    )} />
)}
            </div>
        </div>
    )
}

export default observer(RecommendDaily)
