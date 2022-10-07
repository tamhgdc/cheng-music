// user/user.ts
import { makeAutoObservable, toJS } from 'mobx'
import store from 'store'
import { MODE } from '~/constants/play'
import { parseMusicUrl } from '~/utils/parseUrl'
import { IMusic, Track } from '~/api/types/songlist'
import {
 MusicType, AuthorType, AudioInfoType, AudioControls,
 } from './type'

const initAuthor = {
    picUrl: '',
    id: 0,
    name: '',
    author: '',
}

const initSong: MusicType = {
    musicId: -1,
    url: '', 
    authorInfo: initAuthor,
    time: 0,
}

interface IMusicStore {
    showLyrics: boolean
    controls: AudioControls | null
    currentSong: MusicType
    audioInfo: AudioInfoType
    playMode: MODE
    playList: MusicType[] 
    historyList: MusicType[]
    playMusic: (musicId: number, time:number, authorInfo:AuthorType)=> void
    playListMusic: (index:number)=> void
    playAll: <T extends Track | IMusic>(data?: T[])=> void
    setMusicState: (flag:boolean) => void
    setHistory: ()=>void
}

class Music implements IMusicStore {
    // 歌词的显示与隐藏
    showLyrics = false
    // 
    controls = null
    // 当前播放歌曲
    currentSong = initSong
    // 歌曲信息
    audioInfo = {
        duration: 0,
        muted: false,
        paused: true,
        time: 0,
    }
    // 播放模式
    playMode = store.get('_playMode') || MODE.PLAY_IN_ORDER
    // 播放列表
    playList = store.get('_playList') || []
    // 播放历史记录
    historyList = store.get('_historyList') || []

    constructor() {
        makeAutoObservable(this)
    }
    // 设置正在播放的歌曲
    playMusic(musicId: number, time:number, authorInfo:AuthorType):void {
        this.currentSong.musicId = musicId
        this.currentSong.url = parseMusicUrl(musicId)
        this.currentSong.authorInfo = authorInfo
        this.setPlayList(toJS({ ...this.currentSong, time }))
    }
    /* 播放列表设置 */
    private setPlayList(data:MusicType):void {
        this.setList('playList', data)
    }
    /* 播放列表的歌曲 */
    playListMusic(index:number): void {
        this.currentSong.musicId = this.playList[index].musicId
        this.currentSong.url = this.playList[index].url
        this.currentSong.authorInfo = this.playList[index].authorInfo
        this.currentSong.time = this.playList[index].time
    }
    /* 添加到全部歌单 */
    playAll<T extends Track | IMusic>(data?: T[]):void {
        /* 清空播放列表 */
        this.playList = []
        store.remove('_playList')

        data?.forEach((item) => {
            const authorInfo = {
                picUrl: (item as Track).al?.picUrl || (item as IMusic).album?.picUrl,
                name: item.name,
                author: (item as Track).ar?.length > 0 ? (item as Track).ar[0].name : (item as IMusic)?.artists[0].name,
                id: (item as Track).ar?.length > 0 ? (item as Track).ar[0].id : (item as IMusic)?.artists[0].id,
            }

            const obj = {
                musicId: item.id,
                url: parseMusicUrl(item.id), 
                time: ((item as Track)?.dt || (item as IMusic).duration) / 1000,
                authorInfo,
            }
            /* 添加到播放列表 */
            this.setPlayList(obj) 
        })
        
        /* 播放歌单第一首 */
        this.currentSong.musicId = this.playList[0].musicId
        this.currentSong.url = parseMusicUrl(this.playList[0].musicId)
        this.currentSong.authorInfo = this.playList[0].authorInfo
    }
    /* 暂停--播放 */
    setMusicState(flag:boolean):void {
        if (flag) {
            this.controls?.play()
        } else {
            this.controls?.pause()
        }
    }
    // 设置历史记录
    setHistory():void {
       if (this.currentSong.musicId === 0) return
       const data = this?.playList.find(({ musicId }) => musicId === this?.currentSong.musicId)
       this.setList('historyList', toJS(data))
    }
    private setList(key:string, data?:MusicType):void {
        /* 查看列表中是否有当前歌曲 */
        const index = (this[key] as MusicType[])?.findIndex((item) => item?.musicId === data?.musicId)
        if (index === -1) {
           const storeList = store.get(`_${key}`) || []
           store.set(`_${key}`, storeList.concat(data))
           this[key] = this[key].concat(data)
        }
    }
    // 切换播放类型
    setPlayMode(type:MODE): void {
        this.playMode = type
        store.set('_playMode', type)
    }
    // 设置播放信息
    setPlayInfo(info:AudioInfoType, controls: AudioControls):void {
        this.audioInfo = info
        this.controls = controls
    }
    // 设置播放进度
    setPlayProgress(timer: number):void {
        this.controls?.seek(timer)
    }
    // 设置播放音量
    setPlayVolume(value:number):void {
        this.controls?.volume(value)
    }
    // 清空播放列表
    clearPlayList(type: string):void {
        if (type === 'playList') {
            this.playList = []
            store.remove('_playList')
            this.controls?.pause()
        } else {
            this.historyList = []
            store.remove('_historyList')
        }
    }
    // 设置歌词页面的显示和隐藏
    toggleLyricsState(flag?: boolean):void {
        this.showLyrics = flag ?? !this.showLyrics
    }
}

export default Music
