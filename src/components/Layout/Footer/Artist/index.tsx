import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import './index.less'

interface IProps {
    name: string
    id: number
}

const Arist: React.FC<IProps> = memo(({ name, id }) => (
    <Link to='/' className='artist'>
        {name}
    </Link>
))

export default Arist
