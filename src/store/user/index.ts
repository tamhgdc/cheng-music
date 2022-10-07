// user/user.ts
import { makeAutoObservable } from 'mobx'
import store from 'store'
import { ILoginResult } from '~/api/types/auth'

interface IUser {
    showLoginDialog: boolean
    user: ILoginResult
    isLogin: boolean
    changeDiaLogShow: (isShow: boolean)=>void
    loginUser: (data: ILoginResult)=>void
    logoutUser: ()=>void
}

class User implements IUser {
    // 登录框的显示与隐藏
    showLoginDialog = false
    // 用户信息
    user = {}
    isLogin = false

    constructor() {
        makeAutoObservable(this)
        const user = store.get('_user')
        if (user) {
            this.user = user
            this.isLogin = true
        }
    }
    // 登录框的显示与隐藏
    changeDiaLogShow(isShow:boolean):void {
        this.showLoginDialog = isShow
    }

    // 保存登录信息
    loginUser(data:ILoginResult):void {
        this.user = data
        store.set('_user', this.user)
        this.isLogin = true
        this.showLoginDialog = false
    }

    logoutUser():void {
        this.user = {}
        store.remove('_user')
        this.isLogin = false
    }
}

export default User
