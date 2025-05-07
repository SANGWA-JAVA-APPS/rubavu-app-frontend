import React from 'react'
import { TitleSmallDesc } from '../../../globalcomponents/TitleSmallDesc'
import { Client } from '../../../Client/Client'

function Clients() {
  return (<>
    <TitleSmallDesc title="1. Client" desc="Add some Clients" />
    <Client/>
    </>
  )
}

export default Clients