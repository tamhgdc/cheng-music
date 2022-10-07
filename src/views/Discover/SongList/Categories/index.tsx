import React, { memo, useState } from 'react'
import cn from 'classnames'

import { Popover } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { ICategory, ICategories } from '../../../../api/types/songlist'
import './index.less'

interface IProps{
    cats?: ICategories
    hotcats?: ICategory[]
    selectedCat?: string
    onCatSelect: (cat:string) => void
}

const Categories: React.FC<IProps> = memo(({
 hotcats, cats, selectedCat, onCatSelect, 
}) => {
    const [currentCat, setCurrentCat] = useState(selectedCat || '全部')

    const handleCatSelect = (cat:string) => {
        onCatSelect(cat)
        setCurrentCat(cat)
    }

    /* 类别菜单 */
    const renderCats = () => (  
        <div className='cate-left'>
            {/* 全部歌单 */}
            <div className='cate-all'>
                <span 
                  className={cn('cate-title', currentCat === '全部' && 'active')}
                  onClick={() => handleCatSelect('全部')}>
                    全部歌单
                </span>
            </div>
            <div>
                {
                Object.entries(cats?.categories || {}).map(([key, value]) => {
                    /* 过滤子类别 */
                    const subCats = cats?.sub.filter(({ category }) => category === Number(key))
                    return (
                        <div className='cate-block' key={key}>
                            <div className='cate-label'>
                                {value as string}
                            </div>
                            <div className='cate-tags'>
                                {subCats?.map(({ name }) => (
                                    <div 
                                      className={cn('cate-tag', currentCat === name && 'active')} 
                                      key={name}
                                      onClick={() => handleCatSelect(name)}>
                                        {name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                   })
                }
            </div>
        </div>
        )

    return (
        <div className='cate-gories'>
            <Popover content={renderCats()} placement='bottomLeft' trigger='click'>
                <span className='cate-btn'>
                    {currentCat}
                    <RightOutlined />
                </span>
            </Popover>
            <div className='cate-tags'>
                {
                hotcats?.map(({ name }) => (
                    <div key={name} className={cn('cate-tag', currentCat === name && 'active')} onClick={() => handleCatSelect(name)}>
                        {name}
                    </div>
                ))
            }
            </div>
        </div>
)
 })

export default Categories
