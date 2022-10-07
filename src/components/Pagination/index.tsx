import React, { memo, useCallback, useState } from 'react'

import { Pagination } from 'antd'
import './index.less'

interface IProps{
    total?: number
    count?: number
    currentPage?: number
    OnchangePageFn: (page:number)=>void
}

const MyPagination: React.FC<IProps> = memo(({
 total = 0, OnchangePageFn, count = 30, currentPage = 1, 
}) => {
    const [current, setCurrent] = useState(currentPage)

    const changePage = useCallback(
        (e:number) => {
            OnchangePageFn(e)
            setCurrent(e)
        },
        [],
    )

    return (
        <div className='pagination'>
            <Pagination
              current={current}
              defaultCurrent={1}
              total={total - (total % count)} 
              defaultPageSize={count} 
              onChange={changePage} 
              showSizeChanger={false} 
              hideOnSinglePage />
        </div>
)
 })

export default MyPagination
