import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'

import { Table, Image } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { fommatArtist } from '~/utils/format'
import { IMusic } from '~/api/types/songlist'
import useStores from '~/hooks/useStores'
import emptyImg from '~/assets/image/empty.png'
import './index.less'

interface IProps {
    data?: IMusic[]
}

const NewMusicList: React.FC<IProps> = ({ data }) => {
  const { Music } = useStores()
  
  const onDoubleClick = (e:IMusic) => {
   Music.playMusic(e.id, e.duration / 1000, {
    picUrl: e.album.picUrl, 
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
          <span className='table-index'>{index + 1 < 10 ? `${index + 1}` : index + 1}</span>
      ),
    },
    {
      title: '',
      key: 'name',
      width: '45%',
      ellipsis: true,
      render: (value, record, index: number) => (
          <div className='music-title new-list-title'>
              <div className='music-pic'>
                  <Image 
                    src={`${record.album.picUrl}?param=60y60`} 
                    width={60}
                    height={60}
                    preview={false}
                    fallback={emptyImg} />
                  <div className='play-icon'><CaretRightOutlined /></div>
              </div>
              <span className='music-name' title={record?.name}>{record?.name}</span>
              {record?.fee === 1 && <span className='icon-vip'>vip</span>}
          </div>
      ),
    },
    {
      title: '',
      key: 'ar',
      width: '15%',
      ellipsis: true,
      render: (value, { artists }, index: number) => (
        artists.map((item) => <Link to='/' key={item.name} className='text-gray'>{`${item.name}`}</Link>)
        ),
    },
    {
      title: '',
      key: 'al',
      dataIndex: ['al', 'name'],
      width: '20%',
      ellipsis: true,
      render: (value, { album }, index: number) => <Link to='/' className='text-gray'>{album.name}</Link>,
    },
    {
        title: '',
        key: 'dt',
        width: '10%',
        ellipsis: true,
        render: (value, { duration }, index: number) => <span className='text-gray'>{dayjs(duration).format('mm:ss')}</span>,
    },
  ];
   return (
       <Table<IMusic>
         rowKey='id'
         columns={columns} 
         dataSource={data} 
         pagination={false} 
         className='music-table'  
         onRow={(record) => ({
         onDoubleClick: (event) => { onDoubleClick(record) },
        })} />
)
 }

export default observer(NewMusicList)
