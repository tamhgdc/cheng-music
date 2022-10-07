import { UserInfo, BeRepliedUser } from '../types/songlist'

// 点赞
// eslint-disable-next-line no-shadow
export enum LickType {
  SONG = 0,
  MV = 1,
  LIST = 2,
  ALBUM = 3,
  TV = 4,
  MOVIE = 5,
  DYNAMIC =6
}

/* 歌单评论 */
export interface IsongComment {
    total: number
    more: boolean
    moreHot: boolean
    type: number
    id: number | string
    comments: Comments[] // 最新评论
    hotComments: Comments[] // 精彩评论
    [propName: string]: any
  }
export interface Comments {
    user: UserInfo
    content: string
    commentId: number
    time: number 
    likedCount: number
    liked: boolean
    beReplied: {
      beRepliedCommentId: number
      user: BeRepliedUser
      content: string
    }[] // 子评论
}
