import React, { memo, useCallback } from 'react'
import { useAsyncFn } from 'react-use'

import recommentApi from '~/api/recomment'
import { Comments } from '~/api/types/comment'
import List from '../List'
import Pagination from '../../Pagination'

interface IProps {
    id: number | string
    total?: number
    comments?: Comments[]
    hotComments?: Comments[]
    moreHot?: boolean
    more?: boolean
    type?: number
    onChangePage: any
    onUpDateCidLiked: (index:number, liked:0|1, hot: boolean)=>void
}

const CommentList: React.FC<IProps> = memo(({
 total, comments = [], more, type = 2, onChangePage, id, hotComments = [], onUpDateCidLiked,
}) => {
        const [, setCommentLikeFn] = useAsyncFn(recommentApi.setCommentLike)

        const setCommentLike = (cid:number, index:number, liked: 0 | 1, hot:boolean) => {
                setCommentLikeFn(id, cid, type, liked)
                /* 让父组件更新当前的数据 */
                onUpDateCidLiked(index, liked, hot)
        }
        
        /* 改变页码 */
    const OnchangePageFn = useCallback((page:number) => {
        onChangePage(page)
    }, [total, id])
       
     return (
         <div>
             
             {hotComments?.length > 0 && (
                 <>
                     <div className='comment-title'>
                         精彩评论
                     </div>
                     <List comments={hotComments} onLike={setCommentLike} hot />
                 </>
             )}

             {comments?.length > 0 && (
                 <>
                     <div className='comment-title'>
                         最新评论
                         {`(${total})`}
                     </div>
                     <List comments={comments} onLike={setCommentLike} hot={false} />
                 </>
             )}

             <Pagination total={total} OnchangePageFn={OnchangePageFn} />
         </div>
)
 })

export default CommentList
