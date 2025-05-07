import React from 'react'
import { Button, Card } from 'react-bootstrap'

export const CardCompImage = ({ img, title, desc,
    btnText, imgSize, cardSize, btnFill, HideBtn, btnBg, btnEvent,descBottom, getImage }) => {
    return (
        <Card className='scaleOnHoverParent card' style={{ boxShadow: '0 0 2px #000', width: cardSize ? cardSize : '100%' }}>
            <Card.Img onClick={getImage} className="scaleOnHover img-fluid" width={imgSize ? imgSize : '100%'} variant="top" src={img} />
            <Card.Body>
                <Card.Title><b>{title}</b></Card.Title>
                {descBottom && <>
                    <Card.Text>
                        {desc}
                    </Card.Text> </>}
                {!HideBtn &&
                    <Button onClick={btnEvent} className={btnFill ? 'w-100' : ''} style={{ backgroundColor: btnBg }}>{btnText}</Button>
                }

            </Card.Body>
        </Card>
    )
}
