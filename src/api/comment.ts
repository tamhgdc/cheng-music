import axios from '~/utils/axios'
import { IsongComment } from './types/comment'

type GetSongCommentFn = (id:string | number, page?:number, limit?:number) => Promise<IsongComment>

/* 获取歌单评论 */
const getSongSComment:GetSongCommentFn = async (id, page = 1, limit = 20) => {
    const res = await axios({
        url: '/comment/playlist',
        params: {
            id,
            limit,
            offset: (page - 1) * limit,
        },
    })
    return res
}

/* 获取该歌曲评论 */
const getSongComment: GetSongCommentFn = async (id, page = 1, limit = 20) => {
    const res = await axios({
        url: '/comment/music',
        params: {
            id,
            limit,
            offset: (page - 1) * limit,
        },
    })
    return res
}

export default {
    getSongSComment,
    getSongComment,
}
