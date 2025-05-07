import React, { useContext } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { Button } from 'react-bootstrap'

export const Test = () => {
    const { setTestState } = useContext(ColItemContext)
    return (
        <>
            <div> component 1</div>
            <Button onClick={() => setTestState('component changed')}>Change State</Button>
        </>
    )
}