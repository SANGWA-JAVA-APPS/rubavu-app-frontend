import React, { useContext } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'

export default function ComponentTwo() {
    const { TestState } = useContext(ColItemContext)
  return (
    <div>Value: {TestState}</div>
  )
}
