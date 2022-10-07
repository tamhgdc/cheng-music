import axios from '~/utils/axios'
import { IMv } from './types/mv'

type GetRecommendMvFn = ()=> Promise<IMv[]>

/* 获取推荐MV */
const getRecommendMv: GetRecommendMvFn = async () => {
    const res = await axios({
        url: '/personalized/mv',
    })
    return res.result
}

export default {
    getRecommendMv,
}
