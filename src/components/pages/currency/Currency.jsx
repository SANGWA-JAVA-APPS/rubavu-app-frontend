


import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
import SessionTime from '../../services/SessionTime'
import axios from 'axios'
import Commons from '../../services/Commons'

// import VertNavBar from '../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'

import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'



import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, ContainerSingleRow, ContainerSingleRowUpdate, FormFillPane, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DesabledInputRow, DropDownInput, EmptyInputRow, InputAndSearch, LoadSub } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Delete from '../../services/Delete'
import { ic_refresh as refreshBtn } from 'react-icons-kit/md/ic_refresh'
import { search } from 'react-icons-kit/icomoon/search'
import { ic_line_weight as report } from 'react-icons-kit/md/ic_line_weight'

import Icon from 'react-icons-kit'
import { LocalTableHead, LocalTableHeadCommon, TableRows } from '../../Global/commonForPages/TableCommons'
import { Col, Row } from 'react-bootstrap'
// import { capitalize } from '@mui/material'
import MonthName from '../../Global/MonthName'
import { ic_class_outline as itemIc } from 'react-icons-kit/md/ic_class_outline'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import { BrandContext } from '../../Global/BrandContext'

function Currency() {
  const [id, setId] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dataChange, setDataChange] = useState(false)

  const [itemsByQty, setItemsByQty] = useState([])


  /* #region  ----------------Timer to refresh the search for some time, this happens when the user searches for the item and the difference comes with 'NAN' data on difference */
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  /* #endregion */

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id_id, setId_id] = useState()
  const [date_time, setDate_time] = useState()
  const [itemsId, setItemsId] = useState()
  const [account, setAccount] = useState()
  const [purchased_qty, setPurchased_qty] = useState(0)
  const [supplier, setSupplier] = useState(1)
  const [in_out, setIn_out] = useState()
  const [remaining, setRemaining] = useState()

  const [current_qty, setCurrent_qty] = useState()


  /*#endregion Listing data*/
  /*#region -----------OTHER FIELDS ------------*/
  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [purchasess, setPurchasess] = useState([]) //Data List
  const [itemss, setItemss] = useState([]) //Data List in combo box
  const [name, setName] = useState()
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [carrier, setCarrier] = useState(1);
  const [accountId, setAccountId] = useState(1);
  const [searchProgress, setSearchProgress] = useState(false)//more as units when clicked the 'deploy' button

  const [clickedSearch, setClickedSearch] = useState(false)
  const [userType, setUserType] = useState()
  const [reference, setReference] = useState(0)
  const [hwmovements, setHwmovement] = useState([]) //Data List that comes initially
  const [searchByDateArray, setSearchByDateArray] = useState([])
  const [searchListWmovement, setSearchListWmovement] = useState([])


  const [username, setUsername] = useState()
  const [refresher, setRefresher] = useState(false)
  const [value, setValue] = useState()
  const { setCurrency } = useContext(BrandContext);  // Access brandName and its setter
  const navigate = useNavigate();
  /*#endregion OTHER FIELDS*/
  /*#region ------------- SEARCH FIELDS--------------------------------------*/
  const [searchedItemChosen, setSearchedItemChosen] = useState(false)// this is to show the two fields that are initially hiden(false), on the selection they appear again
  const [completedSearch, setCompletedSearch] = useState(false)//  
  const [searchItemValue, setSearchItemValue] = useState('')

  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
  const [secondTableitemssbyname, setSecondTableitemssbyname] = useState([]) //Data List searched by name
  const [completeitemName, setCompleteitemName] = useState() //This is the chosen name of item selected from the list from the backend on the result table
  const [resultTableVisible, setResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button
  const [secondResultTableVisible, setSecondResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button

  const [searchedNameLabel, setSearchedNameLabel] = useState('') // this is used on search on the beginning of the form registration
  const [searchedQtyLabel, setSearchedQtyLabel] = useState('') // this is used on search on the beginning of the form registration
  const [searchedQtyVal, setSearchedQtyVal] = useState('')// this is used on search on the beginning of the form registration


  /*#endregion SEARCH FIELDS*/
  /* #region--------------SEarch on the Data List item Report --------------------------- */
  const [searchByDate, setSearchByDate] = useState(false)
  const [item, setItem] = useState({})
  const [itemChosen, setItemChosen] = useState(false)

  const [searchProgress2, setSearchProgress2] = useState(false)
  var n = 0 // this is the number that is given to a key
  const getitemReport = (id) => {
    console.log(id)
    setSearchProgress2(true)
    var mdl_ItemSearchById = {
      type: 'in',
      itemId: id,
      startDate: startDate,
      endDate: endDate,
    }
    StockRepository.findItemLike_ByanItemid(mdl_ItemSearchById).then((res) => { /*To find  the items per month*/
      setItem(res.data.itemObj)
      setSearchListWmovement(res.data.itemRes)
      setItemsByQty(res.data.itemQtyByMonthInYear)
      setSearchProgress(false)
      setSearchProgress2(false)
      setItemChosen(true)

    })

  }
  /* #endregion */

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/



  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)
    if (name && value) {
      var mdl_settings = {
        name: 'currency',
        value: value
      }
      StockCommons.updateSettings(mdl_settings).then((res) => {
        setCurrency(res.data.value)
        navigate('/dashboard'); // Navigates to the "About" page
      })
    } else {
      alert('You have to provide the name of the company')
    }

  }
  /*#endregion Listing data*/
  /*#region -----------All Records, Deleting and By Id------------------------*/

  /* #region ----------Start and reset the timer, when someone is typing in the search button------------------------- */
  const [timer, setTimer] = useState(0); // Timer state in seconds
  const [isRunning2, setIsRunning2] = useState(false); // State to check if the timer is running
  let interval = null;
  const [nCahrEntered, setNCharEntered] = useState(0)
  if (isRunning2) {
    interval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1); // Increment timer by 1 second
    }, 1000); // 1000 milliseconds = 1 second
  } else if (!isRunning2 && timer !== 0) {
    clearInterval(interval); // Stop the timer if it's not running
  }

  /* #endregion */

  const getAllPurchasess = () => {
    StockRepository.findPurchases().then((res) => {
      setPurchasess(res.data);
      setDataLoad(true)
    });
  }
  const getAllHw_movements = () => {
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    StockRepository.findHw_movement(SearchByDateOnly).then((res) => {
      setHwmovement(res.data);
      setDataLoad(true)
    });
  }
  const getAllItemss = () => {
    StockRepository.findItems().then((res) => {
      console.log(res)
      setItemss(res.data.itemss);
      setDataLoad(true)
    });
  }

  useEffect(() => {
    setDataLoad(true)


  }, [isRunning2]);

  const purchaseSwitchTSstockIn = () => {
    return (userType == 'store keeper') ? 'StockIn' : 'Purchase'
  }


  const getHw_movementById = (id) => {
    StockRepository.findHw_movementById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.id)
      setItemsId(res.data.id)
      setIn_out(res.data.id)
      setRemaining(res.data.id)
      setAccount(res.data.id)
      setCurrent_qty(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delHw_movementById = (id) => {
    Utils.Submit(() => {
      Delete.deleteHw_movementById(id, () => { getAllHw_movements() })
    }, () => { })
  }


  const getCommonSearchByDate = (startDate, endDate, name, type) => {

    setSearchByDate(true)
    setSearchProgress(true)
    //The below are the global useStates that have to be set in order to be used on the item search
    setStartDate(startDate)
    setEndDate(endDate)

    var mdl_WhMovtItemLike = {
      startDate: startDate,
      endDate: endDate,
      name: name,
      in_out: 'in'
    }

    if (type === 'Reference') {// this is the reference number taken from dropdown list
      StockRepository.findHw_movementByReference(name).then((res) => {
        if (res.data != null) {
          setSearchProgress(false)
          setSearchByDateArray(res.data)
          console.log('-------------The warehouse by reference----------')
          console.log(res)
          //setWareosueMovementsList(res,Mdl_SearchItemDate_itemName,name)

        }
      })
    } else if (type === 'name' && (startDate !== 'NaN-NaN-NaN' && endDate !== 'NaN-NaN-NaN')) { // this is the name of the item
      setSecondResultTableVisible(false)
      StockRepository.findItemLike_ByDateLike(mdl_WhMovtItemLike).then((res) => {
        if (res.data != null) {
          if (res.data.warehouse_stat === 'not exists') {
            alert('The item could not be found in the stock. Kindly make sure you have entered the correct \n\n1. \'name\' of the item and \n2. the \'date\' range and then search again')
            setSearchProgress(false)
          } else {
            console.log('----------------the searchResult-----------------------')
            console.log(res.data)
            setSearchByDateArray(res.data)
            setSearchProgress(false)
            setClickedSearch(true)
          }
        } else {
          alert('Could not find the data')
        }

      })

    } else if (type === 'name' && (startDate == 'NaN-NaN-NaN' && endDate == 'NaN-NaN-NaN')) {//  no date jus thte item
      setSecondResultTableVisible(true) // to display the second table of the search, there are two tables fof search
      StockRepository.findItemssbyname(name).then(res => {
        setSecondTableitemssbyname(res.data)
        setResultTableVisible(true)
        setSearchProgress(false)
      })

    } else if (type === 'Select Option' && startDate !== 'NaN-NaN-NaN' && endDate !== 'NaN-NaN-NaN') {
      let SearchByDateOnly = {
        startDate: startDate,
        endDate: endDate
      }
      StockRepository.findHw_movement(SearchByDateOnly).then((res) => {
        setHwmovement(res.data);
        setDataLoad(true)
        setSearchProgress(false)
      });
    } else {
      alert('You have to select an option, the name is: ' + name + ' the type is: ' + type)
    }

  }

  const refreshClick = (e) => {
    setSearchProgress(false)

    setRefresher(!refresher)

  }
  /*#endregion Listing data*/
  /*#region -----------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();

    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setItemsId("")
    setAccount("")
    setPurchased_qty("")
    setSupplier("")
    setDataChange(!dataChange)
  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setItemsId("")
    setAccount("")
    setPurchased_qty("")
    setSupplier("")
    setClearBtn(false)
  }
  /*#endregion Listing data*/
  /*#region -----------SEARCH ON THE FORM  ------------*/
  const searchDone = (id, name, balance, sale_cost) => {


    setSearchedItemChosen(true) //show other 2 fields on the form
    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setCompleteitemName(name)
    setResultTableVisible(false)

    //the below are used on search on the beginning of the form filling
    setSearchedNameLabel('NAME')
    setSearchedQtyLabel('Qty')
    setSearchedQtyVal(balance)
    setReference(sale_cost)


  }

  const getItemsRefresh = () => {
    setSearchedItemChosen(true) //show other 2 fields on the form
    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setCompleteitemName(name)
    setResultTableVisible(false)
  }


  const delItemsById = (id, name) => {

    Utils.SubmitWithInfoOnPopup((msg) => {
      Delete.deleteItemsById(id, () => { getItemsRefresh() })
    }, () => { })
  }

  const SearchDone_Table2 = (id, name, balance) => {

    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setCompleteitemName(name)
    setSecondResultTableVisible(false)
    setSearchedNameLabel('NAME')
    setSearchedQtyLabel('Qty')
    setSearchedQtyVal(balance)
  }

  /*#endregion SEARCH ON THE FORM*/


  /*#region Printing */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /*#endregion Listing data*/
  const sendRequestOnThirdChar = (e) => {
    const newValue = e.target.value;
    setSearchItemValue(newValue)
    // alert('third reached')
    if (newValue.length === 0) {
      setNCharEntered(0)
      // handleReset()
      setResultTableVisible(false)
    } else if (newValue.length > 0 && newValue.length < 2) {
      // 
    } else {
      setNCharEntered(newValue.length)

      if (nCahrEntered >= 2) {// if the user has typed in 3 characters atleast
        if (timer % 3 === 0) { // if there is 3 seconds interval
          // if (!searchDone) {// if the user has not clicked yes, to choose a reacor, beacuse of he chooses a record, the system should stop sending a request to backend
          setCompletedSearch(false)
          setSearchProgress(true) // Go and show the progress bar,
          StockRepository.findItemssbyname(searchItemValue).then(res => {
            setItemssbyname(res.data)
            setResultTableVisible(true)
            setSearchProgress(false)
          })
          // }

        }
      }
    }
  }
  const setNameAndValue = (e) => {
    var _name = e.target.value
    setName(_name)
    setValue(_name)
  }
  return (
    <PagesWapper>
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerSingleRowUpdate clearBtn={clearBtn} form='CURRENCY' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormFillPane onSubmitHandler={onSubmitHandler}>

            <InputRow
              val={name} handle={(e) => setNameAndValue(e)} label='Name' name='Name' />


            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormFillPane>
          {/* <FormSidePane /> */}
        </ContainerSingleRowUpdate>
      </AnimateHeight >
      <ContainerRow mt='3'>

        <ListToolBar logeuserType={localStorage.getItem('catname')} defaultLabel='set currency'
          listTitle={`  Currency`} height={height} entity={purchaseSwitchTSstockIn()}
          changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)}
          handlePrint={handlePrint} searchHeight={searchHeight} salesPurchaseFilters={true} >
        </ListToolBar>
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        </SearchformAnimation>
        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <LoadSub showmoreload={searchProgress} /> {/* Show progress upon clicking te deploy button*/}

          {/* The  second search table, searching itemOnly */}
          {secondResultTableVisible &&
            <>  <h3 style={{ color: 'green' }}>Search Result</h3>
              <TableOpen changedbgColor={1} >
                <TableHead changedbgColor={1}>
                  <LocalTableHead />
                  {userType == 'admin' && <td className='delButton'>Option</td>}
                </TableHead>
                <tbody>
                  {secondTableitemssbyname.map((item, index) => {
                    var color = index > 0 && (secondTableitemssbyname[index - 1].name !== item.name ? 'change' : 'v')
                    var styl = color == 'change' ? 'green' : 'transparent'
                    var txt = color == 'change' ? '#fff' : '#000'
                    return <TableRows item={item} searchDone={SearchDone_Table2} />
                  }
                  )}
                </tbody>
              </TableOpen>    </>
          }
          {/* The below is the normal table */}

          {
            searchByDate &&
            <p className='text-success fw-bold' >You can pick the item you wan to view the quantity for and click on the
              <Icon size={20} icon={report} />   icon</p>

          }
          {
            searchProgress2 &&
            <LoadSub showmoreload={searchProgress} />
          }
          {itemChosen &&
            <Row className='d-flex '>
              <Col md={12} className='p-1 itemCard mx-1' >
                <div >
                  <ul>
                    <li> <h4 className='fw-bold'  >

                      {item.name} </h4></li>
                    <li> <span className='fw-bold'>Balance: </span>   {item.balance}</li>
                  </ul>
                </div>
              </Col>

              {itemsByQty.map((m, index) => (
                <Col md={2} key={index} className='itemCard mx-1 my-4 round'>
                  <p style={{ color: '#fa04a4' }} >
                    {m.year}-{MonthName.month(m.month)}
                  </p>
                  <p style={{ color: '#096339' }} ><span className='fw-bold'>    {m.remaining} items </span></p>
                </Col>
              ))}
            </Row>
          }

        </div>
      </ContainerRow>
      {
        !dataLoad && <DataListLoading />
      }

    </PagesWapper >


  )
}

export const TableHeadView = ({ userType, searchByDate }) => {
  return <TableHead>
    {/* <td>id</td> */}
    <td>Ref. No.</td>
    <td>date_time</td>
    <td>item</td>
    <td>Action</td>
    <td>Previous</td>
    <td>Difference</td>
    <td>remaining</td>
    <td>account</td>
    {searchByDate && <td>Report</td>}

    {userType == 'admin' && <td className='delButton'>Option</td>}
  </TableHead>
}

export const RowsLoop = ({ n, Hw_movement, searchByDate, getitemReport, userType, getHw_movementById, delHw_movementById }) => {

  const prev = Hw_movement.current_qty
  const later = Hw_movement.remaining
  const pchased_sold = Hw_movement.in_out === 'in' ? 'Purchased' : 'Sold'
  const diff = pchased_sold == 'Purchased' ? later - prev : prev - later

  n += 1
  return (<tr key={n}>
    {/* <td>{Hw_movement.id}   </td> */}
    <td>{Hw_movement.reference}   </td>
    <td>{Hw_movement.date_time}   </td>
    {/* the below, the mdl_itemsname comes when made a search, another comes on load */}
    <td>{Hw_movement.name !== undefined ? Hw_movement.name
      : Hw_movement.itemname} </td>
    <td>{Hw_movement.in_out === 'in' ? 'Purchase' : 'Sale'}   </td>
    <td>{Hw_movement.current_qty}   </td>
    <td>{pchased_sold}  <span style={{ color: 'blue' }}> {diff} </span></td>
    <td>{Hw_movement.remaining}   </td>
    <td>{Hw_movement.user !== undefined ? Hw_movement.user : Hw_movement.email}   </td>

    {searchByDate &&

      <td>
        <a href='#'>  <Icon onClick={() => getitemReport(Hw_movement.id)} size={20} icon={report} />   </a>
      </td>

    }
    {userType == 'admin' && <ListOptioncol getEntityById={() => getHw_movementById(Hw_movement.id)} delEntityById={() => delHw_movementById(Hw_movement.id)} />}
  </tr>)
}


export default Currency

