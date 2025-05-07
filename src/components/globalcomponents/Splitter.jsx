import React from 'react'

export const Splitter = () => {
  return (
    <div className={`d-none d-md-block splitter  `} style={{marginTop:'60px'}}> </div>
  )
}
export const SplitterOnPrint = () => {
  return (
    <div className={`d-md-block splitterOnPrint showOnPrint  `} style={{marginTop:'0px', display:'none'}}> </div>
  )
}
export const SmallSplitter = () => {
  return (
    <div className={`d-none d-md-block splitter  `} style={{marginTop:'30px'}}> </div>
  )
}
export const SmallerSplitter = () => {
  return (
    <div className={`d-none d-md-block splitter  `} style={{marginTop:'15px'}}> </div>
  )
}
