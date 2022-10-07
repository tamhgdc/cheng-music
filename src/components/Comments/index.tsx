import React, { memo } from 'react'

import { Result } from 'antd'
import CommentList from './CommentList'
import { IsongComment } from '~/api/types/comment'
import './index.less'

interface Iprops {
  onChangePage: (page:number) => void
}

const Comment: React.FC<IsongComment&Iprops> = memo(({
 hotComments = [], comments = [], moreHot, id, type, onChangePage, total, onUpDateCidLiked,
 }) => (
     <div>
         {(hotComments?.length > 0 || comments?.length > 0)
            && (
            <CommentList 
              hotComments={hotComments} 
              comments={comments} 
              moreHot={moreHot}
              id={id}
              type={type}
              onChangePage={onChangePage}
              onUpDateCidLiked={onUpDateCidLiked}
              total={total} />
            )}
         {comments?.length < 1 && comments?.length < 1 && <Result status='warning' title='暂无数据' />}
     </div>
))

export default Comment
