import React, { useCallback } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'

import { Table } from 'antd'
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/es/table'
import { PauseOutlined } from '@ant-design/icons'
import useStores from '~/hooks/useStores'
import { MusicType } from '~/store/music/type'

interface IProps{
    data: MusicType[]
    handleDoubleClick: (item: MusicType)=> void
}

const List: React.FC<IProps> = ({ data, handleDoubleClick }) => {
    const { Music } = useStores()
    const { currentSong } = Music
    
    const onDoubleClick = useCallback(
        (e:MusicType) => {
            handleDoubleClick(e)
        },
        [data],
    )

      const columns: ColumnsType<MusicType> = [
         {
           title: '',
           key: 'authorInfo',
           width: '45%',
           ellipsis: true,
           render: (value, item, index: number) => (
               <div className='music-title'>
                   <span 
                     className={cn('music-name', item?.musicId === currentSong?.musicId && 'active')} 
                     title={item?.authorInfo?.name}>
                       {item?.musicId === currentSong?.musicId && <PauseOutlined />}
                       {item?.authorInfo?.name}
                   </span>
               </div>
           ),
         },
         {
           title: '',
           key: 'musicId',
           width: '35%',
           ellipsis: true,
           render: (value, item, index: number) => (
               <span className={cn('music-author', item?.musicId === currentSong?.musicId && 'active')}>
                   {item?.authorInfo?.author}
               </span>
             ),
         },
         {
             title: '',
             key: 'dt',
             width: '20%',
             render: (value, item, index: number) => <span className='text-gray'>{dayjs.unix(item?.time || 0).format('mm:ss')}</span>,
         },
       ];
        return (
            <Table<MusicType> 
              rowKey='musicId'
              columns={columns} 
              dataSource={data} 
              pagination={false} 
              className='music-table'  
              onRow={(record) => ({
              onDoubleClick: (event) => { onDoubleClick(record) },
             })} />
     )
 }
export default observer(List)
