import React from 'react'
import OtherStyles from '../Styles/OtherStyles'

function TableHead(props) {


  return (
    <thead className='databtablehead diffHeader' style={{backgroundColor: '  !important'}} >
      <tr style={OtherStyles.thead()}>
        {props.children}
      </tr>
    </thead>
  )
}

export default TableHead

export const TableHeadTwo = (props) => {
  return (
    <thead className='databtableheadTwo ' style={{backgroundColor: '  !important'}} >
      <tr style={OtherStyles.thead()}>
        {props.children}
      </tr>
    </thead>
  )
}
