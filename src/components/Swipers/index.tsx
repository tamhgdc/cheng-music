/* eslint-disable react/jsx-no-target-blank */
import React, { memo } from 'react'

import './index.less'

import { Carousel, Image, Spin } from 'antd'
import { IBanner } from '../../api/types/recomment'

interface SwiperProps {
    banners?: IBanner[]
}

const Swipers: React.FC<SwiperProps> = memo(({ banners }) => (
    <div className='swipers'>
        <Carousel autoplay effect='fade'>
            {
                banners?.map((item) => (
                    <div className='swiper-card' key={item.pic}>
                        <a href={item.url} target='_blank'>                        
                            <Image 
                              preview={false} 
                              src={item.pic} 
                              title={item.typeTitle} 
                              width='100%' 
                              placeholder={<Spin />} 
                              loading='lazy' />
                            <i style={{ backgroundColor: item.titleColor }}>
                                {item.typeTitle}
                            </i>
                        </a>
                    </div>
                ))
      }
        </Carousel>
    </div>
))

export default Swipers
