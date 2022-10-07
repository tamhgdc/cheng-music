export interface MusicType {
    musicId: number
    url: string
    time?: number
    authorInfo: AuthorType
}
/* 当前正在播放歌曲的作者信息 */
export interface AuthorType {
    picUrl:string
    id:number
    name:string
    author:string
}
/* 当前正在播放歌曲信息 */
export interface AudioInfoType {
    duration: number
    muted: boolean
    paused: boolean
    time: number
}

export interface AudioControls {
    play: () => Promise<void> | void;
    pause: () => void;
    mute: () => void;
    unmute: () => void;
    volume: (volume: number) => void;
    seek: (time: number) => void;
}
