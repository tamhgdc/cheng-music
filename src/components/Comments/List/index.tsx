import React, { memo } from 'react'
import cn from 'classnames'

import { Comment, Avatar } from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Comments } from '~/api/types/comment'
import './index.less'

dayjs.extend(relativeTime)

interface IProps {
    comments?: Comments[]
    hot: boolean
    onLike: (cid:number, index:number, liked:0|1, hot:boolean) =>void
}

const List: React.FC<IProps> = memo(({ comments = [], onLike, hot }) => {
    /* 点赞 */
    const handleLick = (item: Comments) => {
        const { liked, commentId } = item
        const cindex = comments?.findIndex(({ commentId: cid }) => cid === commentId)
        if (liked) {
            onLike(commentId, cindex || 0, 0, hot)
        } else {
            onLike(commentId, cindex || 0, 1, hot)
        }
    }

    return (
        <div className='comment-list'>
            {comments?.map((item) => (
                <Comment
                  key={item?.commentId}
                  author={<a href='/'>{item?.user.nickname}</a>}
                  datetime={(
                      <span>{dayjs(item?.time).fromNow(true)}</span>
              )}
                  avatar={(
                      <Avatar
                        src={item?.user.avatarUrl}
                        alt={item?.user.nickname} />
                  )}
                  actions={[
                    //   点赞
                      <span className='comment-action' onClick={() => handleLick(item)}>
                          <LikeOutlined className={cn(item?.liked && 'liked')} />
                          {item?.likedCount > 0 && item?.likedCount}
                      </span>,
                  ]}
                  content={(
                      <p>
                          {item?.content}
                      </p>
                  )}>
                    {/* 子评论 */}
                    {item?.beReplied.map((child) => (
                        <Comment
                          key={child?.user.beRepliedCommentId}
                          author={<a href='/'>{`@${child?.user.nickname}`}</a>}
                          avatar={(
                              <Avatar
                                src={child?.user.avatarUrl}
                                alt={child?.user.nickname} />
                                          )}
                          content={(
                              <p>
                                  {child?.content}
                              </p>
                                          )} />
                      ))}
                </Comment>
              ))}
        </div>
)
 })

export default List
