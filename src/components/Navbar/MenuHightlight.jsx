import React from 'react'
import { Container } from 'react-bootstrap'

function MenuHightlight({title}) {
    return (
        <Container  >
            <span className='menuHLight' > {title}</span>
        </Container>
    )
}

export default MenuHightlight