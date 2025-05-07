import React, { createContext, useState } from 'react'
import { useContext } from 'react'

export const CollectTypeContext = createContext()
export  const CollectTypeProvider = ({ children }) => {
     const [collect_type, setCollect_type] = useState('assorted')
    
    return (
        <CollectTypeContext.Provider value={{collect_type, setCollect_type}}>
            {children}
        </CollectTypeContext.Provider>
    )
}
export const useCollectTypeContext = () => useContext(CollectTypeContext);