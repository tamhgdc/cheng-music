import React, { memo } from 'react'

import { Result, Button } from 'antd'
import { useHistory } from 'react-router'

const NotFound: React.FC = memo(() => {
    const { replace } = useHistory()
    const buttonColor = {
        borderColor: 'var(--primary-color)',
        backgroundColor: 'var(--primary-color)',
      }
   return (
       <Result
         status='404'
         title='404'
         subTitle='对不起，您访问的页面不存在。'
         extra={<Button type='primary' style={buttonColor} onClick={(e) => replace('/')}>返回主页</Button>} />
)
   })

export default NotFound
