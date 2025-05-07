import React from 'react'
import { ItemsContainer } from './ItemsContainer'

export const BigSectionTitle = ({ title }) => {
    return (
        <ItemsContainer>
            <h1 className='bigSectionTitle text-center'>{title}</h1>
        </ItemsContainer>
    )
}
