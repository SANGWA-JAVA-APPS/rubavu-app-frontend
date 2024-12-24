import React from 'react'
import OtherStyles from '../Styles/OtherStyles'

function TableHead(props) {


  return (
    <thead className='databtablehead' style={{backgroundColor: '#6e3000 !important'}} >
      <tr style={OtherStyles.thead()}>
        {props.children}
      </tr>
    </thead>
  )
}

export default TableHead
