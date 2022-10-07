import React, { useState, useEffect, useRef } from 'react'
import { useAsyncFn, useDebounce, useClickAway } from 'react-use'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { Input, Skeleton } from 'antd'
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons'
import useStores from '~/hooks/useStores'
import serachApi from '~/api/search'
import HotItem from './HotItem'
import Suggest from './Suggest'
import './index.less'

 const SearchPut = () => {
    const ref = useRef<HTMLDivElement| null>(null)
    const [searchShow, setSearchShow] = useState(false)
    const [suggestShow, setSuggestShow] = useState(false)
    const [value, setValue] = useState('')
    const { push } = useHistory()
    const { Search } = useStores()
    const { searchHistoryList } = Search

    const [hotList, getSearchHotListFn] = useAsyncFn(serachApi.getSearchHot)
    const [suggestWord, suggestWordFn] = useAsyncFn(serachApi.getSuggestWord)
    
    useEffect(() => {
        getSearchHotListFn()
    }, [])

    /* 防抖搜索 */
    useDebounce(
        () => {
          if (value) { suggestWordFn(value) }
        },
        500,
        [value],
    )

    const hideWindow = () => {
        setSearchShow(false)
        setSuggestShow(false)
    }

    useClickAway(ref, () => {
        hideWindow()
    })

    const onSearchWords = (keywords:string) => {
        Search.addHistory(keywords)
        hideWindow()
        push(`/search/${keywords}`)
    }

    const searchSuggest = (e:React.ChangeEvent<HTMLInputElement>) => {
        const val = (e.target.value as unknown as string).trim()
        setValue(val)

        if (val) {
            setSearchShow(false)
            setSuggestShow(true)
       } else {
            setSearchShow(true)
       }
    }

    const toggleSearch = () => {
        // eslint-disable-next-line no-unused-expressions
        value !== '' ? setSuggestShow(true) : setSearchShow(true)
    }

    return (
        <div className='search-box'>
            <Input
              value={value}
              placeholder='搜索' 
              className='search-input'
              prefix={<SearchOutlined />}
              onChange={searchSuggest}
              onFocus={toggleSearch} />
            {
                (searchShow || suggestShow) && (
                <div className='search-block' ref={ref}>
                    {
                        searchShow ? (
                        /* 热搜榜 */
                            <>  
                                {searchHistoryList.length > 0 && (
                                <div className='search-history'>
                                    <div className='search-title'>
                                        搜索历史
                                        <DeleteOutlined onClick={() => Search.clearHistory()} />
                                    </div>
                                    <div className='history-words'>
                                        {searchHistoryList.map((name) => (
                                            <div key={name} className='history-word' onClick={() => onSearchWords(name)}>
                                                {name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                )}          
                                <div className='search-hot'>
                                    <div className='search-title'>热搜榜</div>
                                    <div className='serach-word'>
                                        {!hotList.loading && hotList.value?.map(({ first }, index) => (
                                            <HotItem 
                                              key={first}
                                              index={index + 1} 
                                              name={first}
                                              onSearchWords={onSearchWords} />
                         ))}
                                    </div>
                                </div>
                            </>
                        )
                        /* 搜索建议 */
                        : (
                            <>
                                {suggestWord.value ? (
                                    <Suggest 
                                      data={suggestWord.value} 
                                      keywords={value}
                                      onSearchWords={onSearchWords} />
                                )
                                : <Skeleton />}
                            </>
                        )
                    }
                </div>
            )
            }
        </div>
    )
}

export default observer(SearchPut)
