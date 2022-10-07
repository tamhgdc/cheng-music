import { Modal } from 'antd'

const { confirm } = Modal

const showConfirm = ():Promise<any> => new Promise((resolve:any) => {
     confirm({
         title: '替换播放列表',
         content: '"双击播放" 会用当前列表的音乐替换播放列表，是否继续？',
         okText: '继续',
         cancelText: '取消',
         onOk() {
           resolve()
         },
         onCancel() {
           console.log('取消')
         },
       })
})

export default showConfirm
