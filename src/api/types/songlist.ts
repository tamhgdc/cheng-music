// eslint-disable-next-line no-shadow
enum ORDER {
  HOT = 'hot',
  NEW = 'new',
}
export interface IGetSonglistsRequest {
  cat?: string
  order?: ORDER
  limit?: number
  offset?: number
}

/* 所有榜单内容摘要 */
export interface ITracks{
  first:string 
  second:string
}
export interface ITopList{
  tracks: ITracks[]
  id: number
  name: string
  coverImgUrl: string
  playCount: number
  updateTime: number
  trackCount: number
}

// 热门标签响应

export interface ICategory{
  activity: boolean
  category: number
  hot: boolean
  name: string
  type: number
}

// 评论用户信息
export interface UserInfo {
  nickname: string
  userId: number
  avatarUrl: string
}

export interface BeRepliedUser{
  nickname: string
  beRepliedCommentId: number
  avatarUrl: string
}

/* 歌单标签类别 */
export interface ICategories {
  categories: any
  sub: ICategory[]
}

/* 歌单开始 */
export interface ISonglist {
  adType: number
  backgroundCoverId: number
  cloudTrackCount: number
  commentCount: number
  coverImgUrl: string
  picUrl?: string
  createTime: number
  copywriter?: string
  creator: {
    avatarUrl: string
    nickname: string
    userId: number
  }
  description: string
  highQuality: boolean
  id: number
  name: string
  newImported: boolean
  opRecommend: boolean
  ordered: boolean
  playCount: number
  privacy: number
  shareCount: number
  specialType: number
  status: number
  subscribed: boolean
  subscribedCount: number
  subscribers: []
  tags: string[]
  trackCount: number
  trackIds: []
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: Track[]
  updateTime: number
  userId: number
}
  
export interface Track {
    name: string
    id: number
    pst: number
    t: number
    ar: Ar[]
    alia: any[]
    pop: number
    st: number
    rt: string
    fee: number
    v: number
    crbt?: any
    cf: string
    al: Al
    dt: number
    h: H
    m?: H
    l: H
    a?: any
    cd: string
    no: number
    rtUrl?: any
    ftype: number
    rtUrls: any[]
    djId: number
    copyright: number
    Sid: number
    mark: number
    originCoverType: number
    originSongSimpleData?: OriginSongSimpleDatum
    single: number
    noCopyrightRcmd?: any
    rtype: number
    rurl?: any
    mst: number
    cp: number
    mv: number
    publishTime: number
}
  
  interface OriginSongSimpleDatum {
    songId: number
    name: string
    artists: IArtist[]
    albumMeta: IArtist
  }

  export interface IAlbum {
    artist?: IArtist
    artists?: IArtist[]
    blurPicUrl?: string
    copyrightId?: number
    description?: string
    id: number
    mark?: number
    name: string
    picId?: number
    picUrl: string
    publishTime?: number
    size?: number
    status?: number
    subType?: string
    type?: string
  }
  export interface IMusic {
    [x: string]: any;
    album: IAlbum
    alias?: string[]
    artists: IArtist[]
    copyrightId?: number
    duration: number
    fee?: number
    ftype?: number
    id: number
    mark?: number
    mvid?: number
    name: string
    status?: number
    picUrl?: string
  }
  
  export interface IArtist {
    albumSize: number
    id: number
    img1v1Id: number
    img1v1Url: string
    musicSize: number
    name: string
    picId: number
    picUrl: string
    topicPerson: number
    alia?: string[]
    alias?: string[]
  }
  
  interface H {
    br: number
    fid: number
    size: number
    vd: number
  }
  
  interface Al {
    id: number
    name: string
    picUrl: string
    tns: any[]
    picStr: string
    pic: number
  }
  
  interface Ar {
    id: number
    name: string
    tns: any[]
    alias: any[]
  }

  /* 歌单结束 */

    /* 歌词类型数据 */
export interface ILyric {
  code: number
  lrc: {
    version: number
    lyric: string
  }
}
