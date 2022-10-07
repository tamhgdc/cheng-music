import react from 'react'
import { IsongComment } from '~/api/types/comment'

const useLikeUpdate = (commentData: IsongComment | undefined) => {
    const onUpDateCidLiked = (index:number, liked:boolean, hot:boolean) => {
        const type = hot ? 'hotComments' : 'comments'
        const isAdd = liked ? 1 : -1
        if (commentData) {
            commentData[type][index].likedCount += isAdd
            commentData[type][index].liked = liked
            commentData[type] = [...commentData[type]]
        }
    }

    return {
        onUpDateCidLiked,
    }
}

export default useLikeUpdate
