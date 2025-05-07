import React from 'react'

export function EditTitle(props) {
  const space = {
    marginBottom: "15px",
    fontFamily: "timesNewRoman"

  }
  return (
    <h4 class="boldTitle h4 font-weight-bolder text-uppercase" style={space}>Edit  {props.name}</h4>
  )
}

function Title(props) {
  const space = {
    marginBottom: "15px", fontFamily: "timesNewRoman"
  }
  return (
    <h4 class={`boldTitle   font-weight-bolder ${!props.nocaps ? 'text-uppercase' : ''} `} style={space} > {props.customTitle} {!props.noTitle ? 'Add new ' : ''}{props.name}</h4>
  )

} export default Title

export const NoTitle = (props) => {
  const space = {
    marginBottom: "15px",
    fontFamily: "timesNewRoman"

  }
  return (
    <h4 class="boldTitle h4 font-weight-bolder text-uppercase" style={space} > {props.name}</h4>
  )

}



export function TitleMake(props) {
  const space = {
    marginBottom: "15px",
    fontFamily: "timesNewRoman"

  }
  return (
    <h4 class="boldTitle h4 font-weight-bolder text-uppercase" style={space} >Make {props.name}</h4>
  )
}

