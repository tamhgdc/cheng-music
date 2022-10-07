import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import './index.less'

import { Image, Spin } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { formatCount } from '~/utils/format'

interface IProps {
    name?: string 
    playCount: number
    playType?: string
    picUrl?: string
    pid: string | number
    path: string
}

const Cover: React.FC<IProps> = memo(({
    name, playCount, playType, pid, path, picUrl,
}) => (
    <div className='cover-card'>
        <Link to={`/${path}/${pid}`}>
            <div className='image-cover'>
                <Image 
                  src={`${picUrl}?param=211y211`} 
                  placeholder={<Spin />} 
                  preview={false} 
                  loading='lazy' />
                {/* 播放按钮 */}
                <i className='play-btn'><CaretRightOutlined style={{ color: 'var(--primary-color)' }} /></i>
            </div>
            <p className='cover-info'>{name}</p>
            {/* 热度 */}
            <i className='play-count'>
                <CaretRightOutlined style={{ color: '#fff', fontSize: '14px' }} />
                {formatCount(playCount)}
            </i>
        </Link>
    </div>
))

export default Cover
