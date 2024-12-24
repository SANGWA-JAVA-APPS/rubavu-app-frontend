import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import StockRepository from '../services/StockServices/StockRepository';
import StockConn from '../services/StockServices/StockConn';


// FaviconContext setup
const FaviconContext = createContext();

// Hook to use Favicon context in any component
export function useFavicon() {
    return useContext(FaviconContext);
}

// FaviconProvider component to wrap the entire app
export function FaviconProvider({ children }) {

    const [iconName, setIconName] = useState(null);

    useEffect(() => {
        const fetchIconName = async () => {
            console.log('------------------FAv icon called')
            try {
                const currencyName='favicon'
                const response = await axios.get( StockConn.wholePath.name + '/currency/'+currencyName);
                const icon = response.data.value || 'favicon-default';
                setIconName(icon);
                             
                console.log('--------->>>' + icon+'  ----------- response below: ' )
                console.log(response)
                // Set the favicon
                let link = document.querySelector("link[rel~='icon']");
                if (!link) {
                    link = document.createElement("link");
                    link.rel = "icon";
                    document.getElementsByTagName("head")[0].appendChild(link);
                    console.log('--------icon set -------' )
                }
                link.href = `/${icon}.ico`; // Adjust path as needed
            } catch (error) {
                console.error('Error fetching favicon:', error);

                // Use a default if fetch fails
                setIconName('favicon-default');
            }
        };

        fetchIconName();
    }, [iconName]);

    return (
        <FaviconContext.Provider value={{ iconName }}>
            {children}
        </FaviconContext.Provider>
    );
}