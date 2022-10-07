import { makeAutoObservable } from 'mobx'
import store from 'store'

class Search {
    // 搜索历史记录
    searchHistoryList: string[]= store.get('_searchHistory') || [] 

    constructor() {
        makeAutoObservable(this)
    }
    /* 添加历史记录 */
    addHistory(keywords: string):void {
       const flag = this.searchHistoryList.includes(keywords)
       if (!flag) {
           this.searchHistoryList.push(keywords)
           store.set('_searchHistory', this.searchHistoryList)
       }
    }
    /* 清空历史记录 */
    clearHistory():void {
        this.searchHistoryList = []
        store.remove('_searchHistory')
    }
}

export default Search
