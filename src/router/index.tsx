import React from 'react'
import {
    Redirect,
} from 'react-router-dom'

import {
    CloudDownloadOutlined,
    CustomerServiceFilled,
} from '@ant-design/icons'

import Discover from '../views/Discover/index'
import NewSong from '../views/Discover/NewSong'
import Ranking from '../views/Discover/Ranking'
import Recommend from '../views/Discover/Recommend'
import Singer from '../views/Discover/Singer'
import SongList from '../views/Discover/SongList'
import Daily from '../views/Discover/Daily'

const SonglistDetail = React.lazy(() => import('../views/SonglistDetail'))

const Download = React.lazy(() => import('../views/Download'))
const Friend = React.lazy(() => import('../views/Friend'))
const Live = React.lazy(() => import('../views/Live'))
const LocalMusic = React.lazy(() => import('../views/LocalMusic'))
const PrivateFm = React.lazy(() => import('../views/PrivateFm'))

const Video = React.lazy(() => import('../views/Video'))
const Search = React.lazy(() => import('../views/Search'))

const NotFound = React.lazy(() => import('../views/NotFound'))

// 路由配置
export interface RouterConfig {
    path: string
    exact?: boolean
    component?: any
    title: string
    Icon?: React.FC
    render?: ()=> React.ReactNode
    routes?: RouterConfig[]
}

export const menuPath = ['/discover/recommend', '/video', '/friend', '/live', '/privateFm', '/localMusic', '/download']

// 侧边栏显示的路由
export const menuRoutes: RouterConfig[] = [
    {
        path: '/discover',
        title: '发现音乐',
        component: Discover,
        routes: [
            {
                path: '/discover/recommend',
                title: '个性推荐',
                component: Recommend,
            },
            {
                path: '/discover/songlist',
                title: '歌单',
                component: SongList,
            }, {
                path: '/discover/recommend_daily',
                title: '每日歌曲推荐',
                component: Daily,
            }, {
                path: '/discover/ranking',
                title: '排行榜',
                component: Ranking,
            }, {
                path: '/discover/singer',
                title: '歌手',
                component: Singer,
            }, {
                path: '/discover/newsong',
                title: '最新音乐',
                component: NewSong,
            }],
    },
    {
        path: '/video',
        title: '视频',
        component: Video,
    },
    {
        path: '/friend',
        title: '朋友',
        component: Friend,
    },
    {
        path: '/live',
        title: '直播',
        component: Live,
    },
    {
        path: '/privateFm',
        title: '私人FM',
        component: PrivateFm,
    },
    {
        path: '/localMusic',
        title: '本地音乐',
        component: LocalMusic,
        Icon: CustomerServiceFilled,
    },
    {
        path: '/download',
        title: '我的下载',
        component: Download,
        Icon: CloudDownloadOutlined,
    },
]

const routes: RouterConfig[] = [
    {
        path: '/',
        exact: true,
        title: '首页',
        render: () => (<Redirect to='/discover' />),
    },
    ...menuRoutes,
    {
        path: '/songlists/:id',
        title: '歌单',
        component: SonglistDetail,
    },
    {
        path: '/search/:keywords',
        title: '搜索结果页',
        component: Search,
        exact: true,
    },
   {
       path: '*',
       title: '404',
       component: NotFound,
   },
]

export default routes
