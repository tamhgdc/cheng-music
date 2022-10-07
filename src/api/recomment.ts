import axios from '../utils/axios'

import { IBanner, IRecommendList } from './types/recomment'

type GetBannersFn = () => Promise<IBanner[]>
type GetRecommendListFn = ()=> Promise<IRecommendList[]>
type SetLikeFn = (id:number | string, cid:number, type:number, t:1|0)=> Promise<any>

const getBanners: GetBannersFn = async () => {
    const res = await axios({
        url: '/banner',
        params: {
            type: 1,
        },
    })
    return res.banners
}

const getRecommentList: GetRecommendListFn = async () => {
    const res = await axios({
        url: '/personalized',
        params: {
            limit: 10,
        },
    })
    return res.result
}
/* 设置点赞 */
const setCommentLike:SetLikeFn = async (id:number| string, cid:number, type:number, t:0|1) => {
    const res = await axios({
        url: '/comment/like',
        params: {
            id,
            cid,
            t,
            type,
        },
    })
    return res
}

export default {
    getBanners,
    getRecommentList,
    setCommentLike,
}
