import React from 'react'
import { useColItemContext } from '../../Global/GlobalDataContentx';

function DetailedReport() {
    const { selectedItem } = useColItemContext(); // Get the selected item from the context

  return (
    <div>
         <h3>Selected Item: {selectedItem}</h3>

    </div>
  )
}

export default DetailedReport