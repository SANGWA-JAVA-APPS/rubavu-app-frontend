import React, { createContext, useContext, useState } from 'react'



export const ColItemContext = createContext()



/* #region ---- Cental date ---- */
const DateContext = createContext();
export const useDate = () => {
  return useContext(DateContext);
};


/* #endregion */


// Context provider component
export const AppDataContextProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const [nDate, setNdate] = useState(new Date());// initially to be used in purchase component


  const [purchaseMenu, setPurchaseMenu] = useState('Purchase'); // the menu that changes based in the app type: business or stock
  const [saleMenu, setSaleMenu] = useState('Tallyout');
  const [recPurchase, setRecPurchase] = useState('Purchase'); //received cargo or purchase
  const [defaultMeasureUnit, setDefaultMeasureUnit] = useState('Kg'); //received cargo or purchase
  const [itemOrCargo, setitemOrCargo] = useState('item'); //received cargo or purchase
  const [showcanvaOne, setshowcanvaOne] = useState(false); //To show side menu
  const [searchTableVisible, setSearchTableVisible] = useState(false); //To show side menu
  const [searchItemValue, setSearchItemValue] = useState('')
  const [searchTableVisible2, setSearchTableVisible2] = useState(false)


  /* #region ----tracking the pressed key in the textbox ---- */
  const [pressedKey, setPressedKey] = useState('');
  const handleKeyPress = (event) => {
    setPressedKey(event.key);
    if (event.key === 'Enter') {
      if (event.target.name === 'sold_qty') {
        alert('Sending to BAckend')
      }
    }

  };
  /* #endregion */


  const formatDateFn = (date) => {
    const selectedDate = new Date(date)
    // Ensure two-digit month and day (e.g., 2024-02-05)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(selectedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const dc = (Hw_movement, bt) => {/*dynamic content(dc) changing purchase and sale based on 'purchase, sale or damage, when it is damage it becomes red'*/

    if (Hw_movement === 'in') {
      Hw_movement = (bt === 'business') ? 'Purchased' : 'Tally In'
    } else if (Hw_movement === 'out') {
      Hw_movement = (bt === 'business') ? 'sold' : 'Tally Out'
    } else if (Hw_movement === 'damage') {
      Hw_movement = 'damage'
    } else if (Hw_movement === '+adj.') {
      Hw_movement = '+ Adjustment'
    } else if (Hw_movement === '-adj.')
      Hw_movement = '- Adjustment'

    return Hw_movement


  }
  const ds = (Hw_movement) => {/*dynamic style(ds) changing purchase and sale based on 'purchase, sale or damage, when it is damage it becomes red'*/
    return Hw_movement === 'damage' ? '#f2dada  ' : 'none'
  }


  const updateSelectedItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <ColItemContext.Provider value={{
      selectedItem, updateSelectedItem, setSelectedItem,
      pressedKey, handleKeyPress, formatDateFn,
      nDate, setNdate, dc, ds, purchaseMenu, setPurchaseMenu, saleMenu, setSaleMenu, recPurchase, setRecPurchase,
      defaultMeasureUnit, setDefaultMeasureUnit, itemOrCargo, setitemOrCargo,
      showcanvaOne, setshowcanvaOne, //show offCanvas menu
      //search item by tying
      searchTableVisible, setSearchTableVisible, searchItemValue, setSearchItemValue,searchTableVisible2, setSearchTableVisible2
    }}>
      {children}
    </ColItemContext.Provider>
  );
};

// Custom hook to use the context
export const useColItemContext = () => useContext(ColItemContext);



