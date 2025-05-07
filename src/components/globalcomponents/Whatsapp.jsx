import { color } from 'framer-motion'
import React from 'react'
import Icon from 'react-icons-kit'
import { whatsapp } from 'react-icons-kit/icomoon/whatsapp'
export const Whatsapp = () => {
    const topmostIcon = {
        height: '20px',
        width: '20px',
        textAlign: 'center',
        color: '#1ac45e',

    }
    const topmostIconDiv = {
        height: '37px',
        width: '37px',
        position: 'fixed',
        bottom: '50px',
        right: '2px',
        zIndex: '10',
        padding:'3px',
        border:'3px solid #ffa200',
        borderRadius:'7px',
        boxSizing:'border-box',
        boxShadow:'0 0 5px #000',
        backgroundColor: '#fff' 
    }
    return (
        <a href="https://wa.me/+250788305310" target='_blank'>
            <div style={topmostIconDiv}  className='whatsappIcon' title="Reach out to us to help you">
                <Icon size={'25px'} style={topmostIcon} className='' icon={whatsapp} />
            </div>
        </a>
    )
}
