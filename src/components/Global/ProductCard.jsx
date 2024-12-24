import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductCard({ prodName, prodDesc, img,  orderEvent }) {
    return (
        <Card sm={12} xs={12} style={{ width: '16rem' }} >
            <Card.Img style={{ alignSelf: 'center', width: '120px' }} variant="top" src={img} />

                
            <Card.Body>
                <Card.Title>{prodName}</Card.Title>
                <Card.Text>
                    {prodDesc}
                </Card.Text>
                <Button className='gen_btn small_padd  '
                    onClick={() => orderEvent()} variant="primary"> <small>Add item</small></Button>

                <Link className='gen_btn small_width button_skin2 small_padd allround_border'
                    onClick={() => orderEvent()} variant="primary">+</Link>

                <Link  className='gen_btn small_width button_skin3 small_padd allround_border'
                    onClick={() => orderEvent()} >
                        -
                    </Link>
            </Card.Body>
        </Card>
    )
}

export default ProductCard