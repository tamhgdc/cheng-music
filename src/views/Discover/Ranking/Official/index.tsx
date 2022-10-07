import React, { memo, useCallback } from 'react'
import { useAsyncFn } from 'react-use'
import { useHistory } from 'react-router-dom'

import dayjs from 'dayjs'
import zh from 'dayjs/locale/zh-cn.js'
import { CaretRightOutlined } from '@ant-design/icons'
import { Image, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { convertLegacyProps } from 'antd/lib/button/button'
import useStores from '~/hooks/useStores'
import songListApi from '~/api/songlist'
import { ITopList, ITracks } from '~/api/types/songlist'
import EmptyImg from '~/assets/image/empty.png'
import './index.less'
import showConfirm from '../Confirm'

interface IProps{
    data: ITopList
}

const Official: React.FC<IProps> = memo(({ data }) => {
    const [songList, getSongListFn] = useAsyncFn(songListApi.getSongList)
    const { push } = useHistory()
    const { Music } = useStores()

    const columns: ColumnsType<ITracks> = [
        {
          dataIndex: 'index',
          title: '',
          key: 'index',
          width: 40,
          align: 'center',
          render: (value, record, index: number) => (
              <span className='table-index'>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
          ),
        },
        {
          title: '',
          key: 'first',
          width: '45%',
          ellipsis: true,
          render: (value, { first }) => (
              <div className='music-title'>
                  <span className='music-name' title={first}>{first || '未知歌名'}</span>
              </div>
          ),
        },
        {
          title: '',
          key: 'second',
          width: '15%',
          ellipsis: true,
          render: (value, { second }) => (
              <span className='text-gray'>{second}</span>
            ),
        },
      ]

    const onDoubleClick = useCallback(
        async (e: React.MouseEvent<HTMLElement>) => {
              e.stopPropagation()
              await showConfirm()
              getSongListFn(`${data.id}`).then(({ tracks }) => {
                  Music.playAll(tracks)
              })
        },
        [columns, data, songList],
    )

    const toSongLists = (e: React.MouseEvent<HTMLElement>) => {
        push(`/songlists/${data.id}`)
      }
    
    return (
        <div className='official-cover'>
            <div className='official-info' onClick={toSongLists}>
                <Image 
                  src={`${data.coverImgUrl}?param=174y174`} 
                  width={174} 
                  height={174}
                  preview={false}
                  fallback={EmptyImg} />
                <i className='official-update'>
                    {`${dayjs(data.updateTime).locale(zh).format('MM[月]DD[日]')}更新`}
                </i>
                <div className='play-cover'>
                    <CaretRightOutlined />
                </div>
            </div>
            <div className='official-song'>
                <Table<ITracks> 
                  rowKey='first'
                  columns={columns} 
                  dataSource={data.tracks} 
                  pagination={false} 
                  className='music-table'
                  onRow={() => ({
                    onDoubleClick: (e) => { onDoubleClick(e) },
                  })} />
            </div>
        </div>
)
 })

export default Official
