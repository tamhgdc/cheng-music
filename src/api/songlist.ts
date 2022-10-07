import axios from '../utils/axios'

import {
 ISonglist, IGetSonglistsRequest, ICategory, ICategories, Track, ILyric, IMusic, ITopList,
} from './types/songlist'

// eslint-disable-next-line no-shadow
export enum NewSongType {
    ALL = 0,
    CN = 7,
    EU = 96,
    JP = 8,
    KR = 16
}

type GetSongListFn = (id:string) => Promise<ISonglist>
type GetUserSonglistFn = (uid:number) => Promise<{create: ISonglist[]; collect: ISonglist[] }>
type GetRHighQualityFn = (cat:string) => Promise<ISonglist>
type GetHighSongListsFn = (params:IGetSonglistsRequest) => Promise<{playlists:ISonglist[], total:number}>
type GetSonglistHotCatsFn = ()=> Promise<ICategory[]>
type GetCategoriesFn = ()=> Promise<ICategories>
type GetRecommendDailyFn = ()=> Promise<Track[]>
type GetLyricFn = (id:number)=> Promise<ILyric>
type GetRelatedSongFn = (id:number)=> Promise<IMusic[]>
type GetRelatedSongListFn = (id:number)=> Promise<ISonglist[]>
type GetNewSongListFn = (type?: NewSongType)=> Promise<IMusic[]>
type GetTopListFN = ()=> Promise<ITopList[]>

/* 获取歌单列表 */
const getSongList:GetSongListFn = async (id) => {
    const res = await axios({
        url: '/playlist/detail',
        params: {
            id,
        },
    })
    return res.playlist
}

/* 获取用户喜爱的歌单和收藏的歌单 */
const getUserSonglist: GetUserSonglistFn = async (uid) => {
    const res = await axios({
        url: '/user/playlist',
        params: {
            uid,
            limit: 100,
        },
    })

    const playlist: ISonglist[] = res.playlist || []

    /* 我的歌单 */
    const create = playlist.filter(({ creator }) => uid === creator.userId)
    /* 收藏的歌单 */
    const collect = playlist.filter(({ creator }) => uid !== creator.userId)

    return {
        create,
        collect,
    }
}

/* 获取每日推荐歌曲，需要登录 */
const getRecommendDaily:GetRecommendDailyFn = async () => {
    const res = await axios({
        url: '/recommend/songs',
    })
    return res.data.dailySongs
}

/* 获取精品歌单头部 */
const getRHighQuality :GetRHighQualityFn = async (cat = '全部') => {
    const res = await axios({
        url: '/top/playlist/highquality',
        params: {
            cat,
            limit: 1,
        },
    })
    return res?.playlists?.[0]
}

/* 获取精品歌单部分 */

const getHighSonglists: GetHighSongListsFn = async ({
 cat, order, limit = 100, offset = 0, 
}) => {
    const res = await axios({
      url: '/top/playlist',
      params: {
        cat,
        order,
        limit,
        offset,
      },
    })
    return res
  }

/* 获取热门标签 */
  const getSonglistHotCats: GetSonglistHotCatsFn = async () => {
    const res = await axios({
      url: '/playlist/hot',
    })
  
    return res.tags
  }

const getCategories:GetCategoriesFn = async () => {
      const res = await axios({
          url: '/playlist/catlist',
      })
      return {
        categories: res.categories,
        sub: res.sub,
      }
  }

/* 获取相似歌单 */
const getRelatedSongList:GetRelatedSongListFn = async (id:number) => {
    const res = await axios({
        url: '/simi/playlist',
        params: {
            id,
        },
    })
    return res.playlists
}

/* 获取相似歌曲 */
const getRelatedSong:GetRelatedSongFn = async (id:number) => {
    const res = await axios({
        url: '/simi/song',
        params: {
            id,
        },
    })
    return res.songs
}

/* 获取歌曲单词 */
const getLyric:GetLyricFn = async (id:number) => {
    const res = await axios({
        url: '/lyric',
        params: {
            id,
        },
    })
    return res
}

/* 获取最新音乐榜单 */
const getNewSongList:GetNewSongListFn = async (type = NewSongType.ALL) => {
    const res = await axios({
        url: '/top/song',
        params: {
            type,
        },
    })
    return res.data
}

/* 获取排行榜简要 */
const getTopList:GetTopListFN = async () => {
    const res = await axios({
        url: '/toplist/detail',
    })

    return res.list
}

export default {
    getSongList,
    getUserSonglist,
    getRecommendDaily,
    getRHighQuality,
    getHighSonglists,
    getSonglistHotCats,
    getCategories,
    getLyric,
    getRelatedSong,
    getRelatedSongList,
    getNewSongList,
    getTopList,
}
