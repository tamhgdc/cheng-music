import { searchCount } from '~/constants/pageCount'
import axios from '~/utils/axios'
import { ISearchHot, SearchType, ISerachSuggestWordRes } from './types/search'

type GetSearchHotFn = ()=> Promise<ISearchHot[]>
type GetSearchResultFn = (keywords: string, type?:SearchType, limit?:number, offset?:number)=> Promise<any>
type GetSuggestWordFn = (keywords:string)=> Promise<ISerachSuggestWordRes>

/* 获取热门搜索列表 */
const getSearchHot: GetSearchHotFn = async () => {
    const res = await axios({
        url: '/search/hot',
    })
    return res.result.hots
}

/* 获取搜索结果 */
const getSerachResult: GetSearchResultFn = async (keywords, type?, limit = searchCount, offset = 0) => {
    const res = await axios({
        url: '/search',
        params: {
            keywords,
            type,
            limit,
            offset,
        },
    })
    return res.result
}

/* 获取联想词匹配结果 */
const getSuggestWord: GetSuggestWordFn = async (keywords) => {
    const res = await axios({
        url: '/search/suggest',
        params: {
            keywords,
        },
    })
    return res.result
}

export default {
    getSearchHot,
    getSerachResult,
    getSuggestWord,
}
