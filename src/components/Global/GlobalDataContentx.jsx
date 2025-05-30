import React, { createContext, useContext, useEffect, useState } from 'react'
import Utils from './Utils';
import CurrentDate from './CurrentDate';



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
  const [defaultMeasureUnit, setDefaultMeasureUnit] = useState(''); //received cargo or purchase
  const [itemOrCargo, setitemOrCargo] = useState('item'); //received cargo or purchase
  const [showcanvaOne, setshowcanvaOne] = useState(false); //To show side menu
  const [searchTableVisible, setSearchTableVisible] = useState(false); //To show side menu
  const [searchItemValue, setSearchItemValue] = useState()
  const [searchItemValueTwo, setSearchItemValueTwo] = useState()
  const [searchTableVisible2, setSearchTableVisible2] = useState(false)

  const [showSelected, setShowSelected] = useState(false)
  const [showSelectedTwo, setShowSelectedTwo] = useState(false)

  //these are use on the OPS sub menu navigation
  const [trucksProcesses, setTrucksProcesses] = useState([])
  const [warehouseProcesses, setWarehouseProcesses] = useState([])
  const [vesselProcesses, setVesselProcesses] = useState([])
  const [chosenProcess, setChosenProcess] = useState()//the name of the process
  const [chosenProcessId, setChosenProcessId] = useState() // the id of the process
  const [chosenProcessCategory, setChosenProcessCategory] = useState()

  const [arrivalPage, setArrivalPage] = useState(true)
  const [tallyPage, setTallyPage] = useState(false)
  const [purchasePage, setPurchasePage] = useState(false)
  const [salePage, setSalePage] = useState(false)
  const [invoicePage, setInvoicePage] = useState(false)
  const [receiptPage, setReceiptPage] = useState(false)
  const [exitPage, setExitPage] = useState(false)

  //for any vessel and any truck the below are their ids
  const [sourceId, setSourceId] = useState()
  const [destId, setdestId] = useState()
  const [arrival_id, setArrival_id] = useState(0)
  const [reportType, setReportType] = useState('')

  const [TestState, setTestState] = useState('Default Value')
  const [userMenuType, setUserMenuType] = useState()

  //these are the cards properties used on reporting and dashboard
  const [cardBg, setCordBg] = useState('bg-light')
  const [cardIconShow, setIconShow] = useState(true)
  const [cardHeight, setIconHeight] = useState('140px')
  const [colSize, setColSize] = useState(3)
  const [colWidth, setColWidth] = useState('94%')
  const [colSizeTwo, setColSizeTwo] = useState('94%')
  const [modalSize, setModalSize] = useState('75%')

  const [showModal, setShowModal] = useState(false)// show the modal, it can be used anywhere
  const [modalTitle, setMOdalTitle] = useState('')// Modal Title to be dynamic
  const [arrivalInvModal, setArrivalInvModal] = useState('arrival')// this is create to differentiate what the modal will do
  // at the end, it switches the button for printing the arrival or for calculating the invoice costs, it start by default by 'arrival'

  const [dataTodisplayInModal, setDataTodisplayInModal] = useState('')


  //the below are use on the arrival and it helps picking the arrival note and populates the
  const [clientByArrival, setClientByArrival] = useState({
    name: '', surname: '', tin_number: '', telephone: ''
  })

  const [obj, setObj] = useState({})
  const [HandlingObj, setHandlingObj] = useState({})

  /* #region --------used in the arrival_note and OtherToolBarItems components to help filtering */
  const [checkAll, setcheckAll] = useState(true)

  const [myRecords, setMyRecords] = useState(false)
  const [process, setProcess] = useState(false)
  /* #endregion */

  /* #region ----tracking the pressed key in the textbox ---- */
  const [pressedKey, setPressedKey] = useState('');

  const [commonArray,setCommonArray]=useState([])
  
   const [commonsDate, setCommonSDate] = useState(CurrentDate.todaydate())
    const [commoneDate, setCommoneDate] = useState(CurrentDate.todaydate())





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
  function formatDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const updateSelectedItem = (item) => {
    setSelectedItem(item);
  };
  const weitypeLabels = (num) => {
    return (num == 1) ? 'sacs & bags' :
      (num == 2 ? 'jerry cans' :
        (num == 3 ? 'Laden cartons' : ''))
  }

  const setupBycolor = () => {
    document.body.style.backgroundColor = Utils.skinBg1()
  }
  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden'
  }
  return (
    <ColItemContext.Provider value={{
      obj, setObj,
      selectedItem, updateSelectedItem, setSelectedItem,
      pressedKey, handleKeyPress, formatDateFn,
      nDate, setNdate, dc, ds, purchaseMenu, setPurchaseMenu, saleMenu, setSaleMenu, recPurchase, setRecPurchase,
      defaultMeasureUnit, setDefaultMeasureUnit, itemOrCargo, setitemOrCargo,
      showcanvaOne, setshowcanvaOne, //show offCanvas menu
      //search item by tying
      searchTableVisible, setSearchTableVisible, searchItemValue, setSearchItemValue, searchTableVisible2, setSearchTableVisible2,
      showSelected, setShowSelected, showSelectedTwo, setShowSelectedTwo, //use on filtering
      //the below are use on the ops sub menunavigation
      trucksProcesses, setTrucksProcesses, warehouseProcesses, setWarehouseProcesses, vesselProcesses, setVesselProcesses,
      chosenProcess, setChosenProcess, chosenProcessCategory, setChosenProcessCategory, chosenProcessId, setChosenProcessId,
      sourceId, setSourceId, destId, setdestId, arrival_id, setArrival_id,

      // this below is located at the /startproc page
      arrivalPage, setArrivalPage, tallyPage, setTallyPage, purchasePage, setPurchasePage, salePage, setSalePage,
      invoicePage, setInvoicePage, receiptPage, setReceiptPage, exitPage, setExitPage,

      //arrival and client details
      clientByArrival, setClientByArrival, weitypeLabels,
      //navigating the dashboard reports
      reportType, setReportType,
      formatDate,
      TestState, setTestState, //to be deleted,
      userMenuType, setUserMenuType,//used on the navbar(LevelOne) to switch user and client
      cardIconShow, setIconShow, cardBg, setCordBg, cardHeight, setIconHeight, colSize, setColSize, colWidth, setColWidth, colSizeTwo, setColSizeTwo, //to show toggle and bgcolor the icon on dashboard and report pages, 
      modalSize, setModalSize, showModal, setShowModal, modalTitle, setMOdalTitle,
      setupBycolor, //currently used on manin menu pages only
      disableBodyScroll, arrivalInvModal, setArrivalInvModal,
      dataTodisplayInModal, setDataTodisplayInModal, // this holds the data type to be displayed in the modal, so is for now the report and dashboard data
      HandlingObj, setHandlingObj,
      checkAll, setcheckAll, myRecords, setMyRecords,process, setProcess,
      commonArray,setCommonArray,commonsDate, setCommonSDate,commoneDate, setCommoneDate
    }}>
      {children}
    </ColItemContext.Provider>
  );
};

// Custom hook to use the context
export const useColItemContext = () => useContext(ColItemContext);







