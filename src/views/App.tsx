import React, { useCallback, useEffect, Suspense } from 'react'
import { message } from 'antd'
import { useAudio } from 'react-use'
import { observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config'
import { HashRouter, Switch } from 'react-router-dom'

import useStores from '../hooks/useStores'

import { MODE } from '../constants/play'
import { MusicType } from '../store/music/type'
import routes from '../router/index'
import Layout from '../components/Layout'
import MusicDetail from '../components/MusicDetail'

const App: React.FC = function App() {
    const { Music } = useStores()
    const {
    playMode, currentSong, playList,
    } = Music
    const [audio, state, controls, ref] = useAudio({
        src: currentSong.url,
        autoPlay: true,
        onEnded: () => playNextMusic(),
        onPlay: () => setMusicHistoryList(),
        onError: () => {
            if (currentSong.musicId !== -1) { 
                        message.warning('无版权哦！')
                        if (playMode === MODE.SINGLE_CYCLE) {
                            return
                        }
                        playNextMusic()
                    }
            },
      })
      
    useEffect(() => {
        Music.setPlayInfo(state, controls)
    }, [state, ref])
    
    useEffect(() => {
        if (playList.length > 0) {
            Music.playMusic(playList[0].musicId, playList[0].time || 0, playList[0].authorInfo)
        }
    }, [])

    const playNextMusic = useCallback(() => {
        switch (playMode) {
            /* 顺序播放 */
            case MODE.PLAY_IN_ORDER: {
                const idx = playList.findIndex(({ musicId }: MusicType) => musicId === currentSong.musicId)
                if (playList.length > 0) {
                  const nextIdx = idx > -1 ? (idx + 1) % playList.length : 0
                  Music.playListMusic(nextIdx)
                }
                return
            }
            /* 单曲循环 */
            case MODE.SINGLE_CYCLE: {
                controls.play()
                return
            }
            /* 随机播放 */
            case MODE.SHUFFLE_PLAYBACK: {
                if (playList.length) {
                    const randomIdx = Math.floor(Math.random() * playList?.length)
                    Music.playListMusic(randomIdx)
                }
                break
            }
            default:
        }
    }, [currentSong?.musicId, controls, ref, currentSong.url])

    /* 播放开始设置历史记录 */
    const setMusicHistoryList = useCallback(
        () => {
            Music.setHistory()
        },
        [ref, audio, currentSong],
    )

  return (
      <HashRouter>
          <Layout>
              {audio}
              <MusicDetail />
              <Suspense fallback={null}>
                  <Switch>
                      {renderRoutes(routes, { routes })}
                  </Switch>
              </Suspense>
          </Layout>
      </HashRouter>
  )
}

export default observer(App)
