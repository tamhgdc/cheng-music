import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import { Table } from 'antd'
import dayjs from 'dayjs'
import { DownloadOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { musicUrl } from '~/constants/url'
import { fommatArtist } from '~/utils/format'
import { IMusic } from '~/api/types/songlist'
import useStores from '~/hooks/useStores'

interface IProps {
    data?: IMusic[]
}

  const ResList: React.FC<IProps> = ({ data }) => {
  const { Music } = useStores()

  const onDoubleClick = (e:IMusic) => {
   Music.playMusic(e.id, e.duration / 1000, {
    picUrl: e.album.artist?.img1v1Url || '', 
    name: e.name, 
    id: e.album.id, 
    author: fommatArtist(e.artists),
  })
 }

 const columns: ColumnsType<IMusic> = [
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
      title: '音乐标题',
      key: 'name',
      width: '45%',
      ellipsis: true,
      render: (value, record, index: number) => (
          <div className='music-title'>
              <a href={`${musicUrl}${record.id}.mp3`} download>
                  <DownloadOutlined className='download-icon' onClick={(e) => console.log(record)} />
              </a>
              <span className='music-name' title={record?.name}>{record?.name}</span>
              {record?.fee === 1 && <span className='icon-vip'>vip</span>}
          </div>
      ),
    },
    {
      title: '歌手',
      key: 'ar',
      width: '15%',
      ellipsis: true,
      render: (value, { artists }, index: number) => (
        artists.map((item) => <Link to='/' key={item.name} className='text-gray'>{`${item.name}`}</Link>)
        ),
    },
    {
      title: '专辑',
      key: 'al',
      dataIndex: ['al', 'name'],
      width: '20%',
      ellipsis: true,
      render: (value, { album }, index: number) => <Link to='/' className='text-gray'>{album.name}</Link>,
    },
    {
        title: '时长',
        key: 'dt',
        width: '10%',
        render: (value, { duration }, index: number) => <span className='text-gray'>{dayjs(duration).format('mm:ss')}</span>,
    },
  ]

   return (
       <Table<IMusic> 
         rowKey='id'
         columns={columns} 
         dataSource={data} 
         className='music-table'
         pagination={false}  
         onRow={(record) => ({
         onDoubleClick: (event) => { onDoubleClick(record) },
        })} />
)
}

export default observer(ResList)
