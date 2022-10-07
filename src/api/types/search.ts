import { IArtist, IAlbum, ISonglist } from '../types/songlist'
// eslint-disable-next-line no-shadow
export enum SearchType{
    SINGLE = 1, // 单曲
    ALBUM = 10, // 专辑
    SINGER = 100, // 歌手
    SONGLIST = 1000, // 歌单
    USER = 1002, // 用户
}

export interface ITab {
    title: string
    type: SearchType
    tag: string
    key: string
}

export interface ISearchHot {
    first: string
    second: number
}

export interface ISerachSuggestWordRes {
    albums:IAlbum[]
    artists:IArtist[]
    order:string[]
    songs: ISonglist[]
}
