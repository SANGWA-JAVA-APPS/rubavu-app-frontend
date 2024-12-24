import React, { useContext } from 'react'
import { BrandContext } from '../../Global/BrandContext';

function AcessBRandName() {
    const { brandName } = useContext(BrandContext);  // Access item1 and its setter


  return (
    <div>AcessBRandName - {brandName} - name is called</div>
  )
}

export default AcessBRandName