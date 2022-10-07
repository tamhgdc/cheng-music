import React, { Fragment, memo } from 'react'
import { useHistory } from 'react-router-dom'
import Icon, {
 AudioFilled, UserOutlined, SaveOutlined, DotChartOutlined,
} from '@ant-design/icons'

import { ISerachSuggestWordRes } from '~/api/types/search'
import { IMusic } from '~/api/types/songlist'
import { IDictionary } from '~/typings/global'
import './index.less'
import { fommatArtist } from '~/utils/format'
import useStores from '~/hooks/useStores'

interface IProps {
    data: ISerachSuggestWordRes
    keywords: string
    onSearchWords: (keywords:string)=>void
}

interface SearchType {
    name: string
    path: string
    icon: React.FC
}

const Types:IDictionary<SearchType> = {
    songs: {
        name: '单曲',
        path: '/',
        icon: AudioFilled,
    },
    artists: {
        name: '歌手',
        path: '/',
        icon: UserOutlined,
    },
    albums: {
        name: '专辑',
        path: '/',
        icon: SaveOutlined,
    },
    playlists: {
        name: '歌单',
        path: '/',
        icon: DotChartOutlined,
    },
}

const Suggest: React.FC<IProps> = memo(({ data, keywords, onSearchWords }) => {
    const { Music } = useStores()
    const { push } = useHistory()
    const playMusic = (item: IMusic) => {
        if (item.fee) {
            Music.playMusic(item.id, item.duration / 1000, {
                picUrl: item.album.picUrl, 
                name: item.name, 
                id: item.album.id, 
                author: fommatArtist(item.artists),
            })
        }
        if (item?.bookCount) {
            push(`/songlists/${item.id}`)
        }
    }

    const toSearchPage = () => {
        onSearchWords(keywords)
    }

    return (
        <div className='suggest'>
            <div className='suggest-title' onClick={toSearchPage}>
                {`搜"${keywords}"相关的结果 >`}
            </div>
            {
             Object.values(data.order || {}).map((name) => (
                 <Fragment key={name}>
                     <div className='suggest-name'>
                         <Icon component={Types[name].icon} />
                         {Types[name].name}
                     </div>
                     {data[name].map((item: IMusic) => (
                         <div className='suggest-item' key={item.id} onClick={() => playMusic(item)}>
                             {item.name}
                             {item.artists && (
                             <span>
                                 <span className='line'>-</span>
                                 {item.artists?.map((ar) => ar.name).join('/')}
                             </span>
                        )}
                         </div>
                ))}
                 </Fragment>
        ))
        }
        </div>
)
 })

export default Suggest
