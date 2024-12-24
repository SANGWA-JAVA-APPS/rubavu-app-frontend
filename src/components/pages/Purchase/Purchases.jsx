import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
import SessionTime from '../../services/SessionTime'
import axios from 'axios'
import Commons from '../../services/Commons'

// import VertNavBar from '../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'

import { Link, Route, Routes, useParams } from 'react-router-dom';
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, ContainerSingleRow, FormFillPane, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputAndSearch, InputRowDate, InputRowNumber, LoadSub } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { ListOptioncolWithDeactivate, TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Delete from '../../services/Delete'
import { ic_refresh as refreshBtn } from 'react-icons-kit/md/ic_refresh'
import { search } from 'react-icons-kit/icomoon/search'
import { ic_line_weight as report } from 'react-icons-kit/md/ic_line_weight'

import Icon from 'react-icons-kit'
import { LocalTableHead, LocalTableHeadCommon, TableRows } from '../../Global/commonForPages/TableCommons'
import { Col, Container, Row } from 'react-bootstrap'
// import { capitalize } from '@mui/material'
import MonthName from '../../Global/MonthName'
import { ic_class_outline as itemIc } from 'react-icons-kit/md/ic_class_outline'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import CustomModalPopup from '../../Global/CustomModalPopup'
import PurchaseForm, { OnlyForm } from './PurchaseForm'
import CurrentDate from '../../Global/CurrentDate'
import { ColItemContext, useDate } from '../../Global/GlobalDataContentx'
import { StockOrBisnessContext } from '../../Global/StockOrBisness'
function Purchase() {
  const [id, setId] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dataChange, setDataChange] = useState(false)
  const [itemsByQty, setItemsByQty] = useState([])
  const [totalcost, setTotalCosts] = useState() // total purchases on the list
  const CountInterval = 5
  const [editingMode, setEditingMode] = useState(false)
  /* #region  ----------------Timer to refresh the search for some time, this happens when the user searches for the item and the difference comes with 'NAN' data on difference */
  // const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  /* #endregion */
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id_id, setId_id] = useState()
  const [date_time, setDate_time] = useState()
  const [nDate, setNdate] = useState(new Date())
  // const { nDate, setNdate } = useDate();

  const [itemsId, setItemsId] = useState()
  const [account, setAccount] = useState()
  const [purchased_qty, setPurchased_qty] = useState(1)
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
  const [unit_cost, setUnit_Cost] = useState()
  const [hwmovements, setHwmovement] = useState([]) //Data List that comes initially
  const [searchByDateArray, setSearchByDateArray] = useState([])
  const [searchListWmovement, setSearchListWmovement] = useState([])
  const [username, setUsername] = useState()
  const [refresher, setRefresher] = useState(false)




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
  const [currencyName, setCurrencyName] = useState('')// this is used on search on the beginning of the form registration
  const { defaultMeasureUnit, setDefaultMeasureUnit } = useContext(ColItemContext)
  const { bizType } = useContext(StockOrBisnessContext)



  /*#endregion SEARCH FIELDS*/
  /* #region--------------SEarch on the Data List item Report --------------------------- */
  const [searchByDate, setSearchByDate] = useState(false)
  const [item, setItem] = useState({})
  const [itemChosen, setItemChosen] = useState(false)

  const [searchProgress2, setSearchProgress2] = useState(false)
  const { recPurchase } = useContext(ColItemContext)
  const { purchaseMenu } = useContext(ColItemContext)

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

  /* #region ----------Start and reset the timer, when someone is typing in the search button------------------------- */
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [nCahrEntered, setNCharEntered] = useState(0)
  const [setopSearch, setStopSearch] = useState(false)

  /* #endregion */

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)


    if (itemsId) {
      if (purchased_qty > 0) {

        var mdl_purchases = {
          id: id, date_time: formatDateFn(nDate), itemsId: itemsId, unit_cost: unit_cost, account: localStorage.getItem('userid'), purchased_qty: purchased_qty, supplier: supplier
        }
        if (id) {

          StockCommons.updatePurchase(id, itemsId, mdl_purchases).then((res) => {
            resetAfterSave()

          })
        } else {

          StockCommons.savePurchases(mdl_purchases, localStorage.getItem('userid'), itemsId, carrier, unit_cost).then((res) => {
            console.log(res.data)
            if (res.data != null) {
              resetAfterSave()
            }
          }).catch((error) => {
            console.log('-----------')
            alert('Error Occured: ' + error)
          })

        }
      } else {
        alert('The purchase quantity has to be greater than 0')
      }

    } else {
      alert('You have to select an item')
    }

  }
  /*#endregion Listing data*/
  /*#region -----------All Records, Deleting and By Id------------------------*/
  const getAllPurchasess = (date1, date2) => {
    const purchaseDatesDTO = {
      date1: date1,
      date2: date2
    }
    StockRepository.findPurchases(purchaseDatesDTO).then((res) => {
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

  const getCurrency = (currencyName) => {
    StockRepository.getSettingByName(currencyName).then((res) => {
      setCurrencyName(res.data.value)
    })
  }
  useEffect(() => {
    getAllPurchasess(CurrentDate.todaydate(), CurrentDate.todaydate())
    getAllHw_movements()
    setDataLoad(true)
    getCurrency("currency")
    setUserType(localStorage.getItem('catname'))

    /* #region ----------Start and reset the timer, when someone is typing in the search button------------------------- */
    let interval;

    if (isActive) {
      // Start the timer
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds >= 19) {
            setIsActive(false)
            return 0
          } else {
            // searchOnThirdSecond()
          }
          return seconds + 1
        }

        );

      }, 1000);
    }

    // Clean up the interval when the timer is stopped or component unmounts
    return () => clearInterval(interval);
    /* #endregion */

  }, [refresher, isActive]);



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

    } else if (startDate !== 'NaN-NaN-NaN' && endDate !== 'NaN-NaN-NaN') {
      let SearchByDateOnly = {
        startDate: startDate,
        endDate: endDate
      }
      setPurchasess([])
      getAllPurchasess(startDate, endDate)
      StockRepository.findHw_movement(SearchByDateOnly).then((res) => {
        setHwmovement([])
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
    setName('')
    setRefresher(!refresher)

  }
  /*#endregion Listing data*/
  /*#region -----------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }

  const resetAfterSave = () => {
    document.getElementById("Form").reset();


    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setItemsId("")
    setAccount("")
    setPurchased_qty("")
    setSupplier("")
    setDataChange(!dataChange)
    setRefresher(!refresher)

    setShowLoader(true)
  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setItemsId("")
    setAccount("")
    setPurchased_qty("")
    setSupplier("")
    setRefresher(!refresher)
    setClearBtn(false)
    setHeight(0)
    setShowLoader(false)
  }
  /*#endregion Listing data*/
  /*#region -----------SEARCH ON THE FORM  ------------*/
  const searchDone = (id, name, balance, unit_cost) => {

    setUnit_Cost(unit_cost)
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
    handleReset()

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
  const searchForItemByName = () => {
    console.log('--------The search initiated Commmon');

    if (searchItemValue === '') {
      alert('You have to enter the value to search')
    } else {
      setCompletedSearch(false)
      setSearchProgress(true) // Go and show the progress bar,
      StockRepository.findItemssbyname(searchItemValue).then(res => {
        setItemssbyname(res.data)
        setResultTableVisible(true)
        setSearchProgress(false)
      })
    }
  }
  /*#endregion SEARCH ON THE FORM*/


  /*#region Printing */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /*#endregion Listing data*/


  const [content, setContent] = useState()
  const [modalShow, setModalShow] = useState(false)


  const setContentHandler = () => {
    // setContent(<OnlyForm />)
    setModalShow(true)
  }
  const hideEvent = () => {
    setModalShow(false)
  }
  const [totalCostState, setTotalCostState] = useState(0)

  var TotalCost1 = 0
  var TotalCost = 0;

  const blurhandler = () => {
    setStopSearch(true)
    setIsActive(false)// this is the flag that makes the timer start
  }
  const searchOnThirdSecond = () => {
    if (searchItemValue) {//if the user has typed in something
      // if (searchItemValue.length >= 2) {//atleast 2 characters
      // if (seconds % CountInterval === 0) {
      setCompletedSearch(false)
      setSearchProgress(true) // Go and show the progress bar,
      StockRepository.findItemssbyname(searchItemValue).then(res => {
        setItemssbyname(res.data)
        setResultTableVisible(true)
        setSearchProgress(false)
      })
      // }
      // }
    }
  }

  const sendRequestOnThirdChar = (e) => {
    const newValue = e.target.value;
    setSearchItemValue(newValue)
    setIsActive(true)
    if (newValue.length === 0) {
      setNCharEntered(0)
      // handleReset()
      setResultTableVisible(false)

    } else if (newValue.length >= 3) {
      // if (nCahrEntered >= 2) {// if the user has typed in 3 characters atleast
      searchOnThirdSecond()
      // }
    }
  }
  const getPurchaseById = (id) => {

    StockRepository.findPurhcaseLinesById(id).then((res) => {
      console.log('-------------')
      console.log(res.data)
      setEditingMode(true) // this hides the search input  because he will not need to edit the item name and he will not need to enter some values
      setHeight('auto')
      setSearchedItemChosen(true)// show the other two fields
      setSearchItemValue(res.data.itemName)
      setItemsId(res.data.itemsId)
      console.log('item: ' + res.data.itemsId + ' purchase id: ' + id)
      setUnit_Cost(res.data.unit_cost)
      setPurchased_qty(res.data.purchased_qty)
      setId(res.data.id)
      setClearBtn(true)
    })
  }
  const delPurchaseById = () => {

  }

  const formatDateFn = (date) => {
    const selectedDate = new Date(date)
    // Ensure two-digit month and day (e.g., 2024-02-05)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(selectedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <PagesWapper>

      {/* Seconds {seconds} <span style={{ color: (seconds % 3 == 0) ? 'red' : 'black' }}> color</span>
      {`>>`} value {searchItemValue} - characters entered: {nCahrEntered} - isActive:{isActive?'true':'false'}
      ---  division%3: {seconds % CountInterval} */}

      <CustomModalPopup
        title="Add Purchases"
        content={<OnlyForm />}
        show={modalShow}
        onHide={() => hideEvent()} />
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerSingleRow clearBtn={clearBtn} form={purchaseMenu} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />

          {editingMode &&
            <Row className="d-flex justify-content-end">
              <Col md={11}  ><h3 className="beerskin1"> {searchItemValue} </h3></Col>
            </Row>}
          <FormFillPane onSubmitHandler={onSubmitHandler}>
            {/* <Container>
              <a href='#' onClick={() => setContentHandler()}>Popup</a>
            </Container> */}
            {!editingMode &&
              <InputAndSearch val={searchItemValue}
                changedContent={(e) => sendRequestOnThirdChar(e)}
                handle={() => searchForItemByName()}
                blurhandler={blurhandler} label='Item' name='item'>
                <div className='row offset-6 fw-bold'>
                  <span >
                    {completeitemName && <>

                      <span className='fw-bold text-decoration-underline p-1' style={{ textTransform: 'uppercase ', backgroundColor: '#ccc' }} >
                        {searchedNameLabel}:
                      </span>
                      &nbsp;  {completeitemName}

                      &nbsp; &nbsp;  <span className='fw-bold text-decoration-underline p-1' style={{ textTransform: 'uppercase ', backgroundColor: '#ccc' }} >
                        {searchedQtyLabel}:
                      </span>
                      &nbsp; {searchedQtyVal}
                    </>
                    }

                  </span>
                </div>
                <LoadSub showmoreload={searchProgress} /> {/* Show progress upon clicking te deploy button*/}

                {/* The first search table */}
                {resultTableVisible &&
                  <TableOpen changedbgColor={1} >
                    <TableHead changedbgColor={1}>
                      <LocalTableHead userType={userType} />

                      {userType !== 'admin' && <td className='delButton'>Select</td>}
                    </TableHead>
                    <tbody>
                      {itemssbyname.map((item, index) => {
                        var color = index > 0 && (itemssbyname[index - 1].name !== item.name ? 'change' : 'v')
                        var styl = color == 'change' ? 'green' : 'transparent'
                        var txt = color == 'change' ? '#fff' : '#000'
                        return <TableRows searchDone={() => searchDone(item.id, item.name, item.balance, item.unit_cost)} item={item} delhandle={() => delItemsById(item.id, item.name)} userType={userType} />
                      }
                      )}
                    </tbody>
                  </TableOpen>
                }
              </InputAndSearch>
            }

            <InputRowDate nDate={nDate} label="Date" name="Date" handle={(nDate) => setNdate(nDate)} />
            {searchedItemChosen && <>{/*This is the variable that toggles the on and off the the two fields upon click on the search button*/}

              {bizType === 'business' && <InputRowNumber name='Unit Cost' val={unit_cost} handle={(e) => setUnit_Cost(e.target.value)} label='unitcost' />}
              <InputRowNumber name='Quantity' val={purchased_qty} handle={(e) => setPurchased_qty(e.target.value)} label='lblpurchased_qty' />
            </>
            }
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormFillPane>
          {/* <FormSidePane /> */}
        </ContainerSingleRow>
      </AnimateHeight >
      <ContainerRow mt='3'>
        <ListToolBar logeuserType={localStorage.getItem('catname')}
          listTitle={`${recPurchase} History`} height={height} entity={purchaseMenu}
          changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)}
          handlePrint={handlePrint} searchHeight={searchHeight} salesPurchaseFilters={true} >
        </ListToolBar>
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} refreshClick={refreshClick} />
        </SearchformAnimation>
        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <LoadSub showmoreload={searchProgress} /> {/* Show progress upon clicking te deploy button*/}

          {/* The  second search table, searching itemOnly */}
          {secondResultTableVisible &&
            <>
              <h3 style={{ color: 'green' }}>Search Result</h3>
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
                    <li> <span className='fw-bold white-text'>Balance: </span>   {item.balance}</li>
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
          {/* --------------------purchases */}
          <h3 className='fw-bold mt-3'> Today Total   {purchaseMenu}s <span style={{ color: '#000', fontSize: '25px' }} className='p-1 button_skin4'>
            {!bizType === 'business' && defaultMeasureUnit}
            {

              purchasess.map((pc) => {

                let total = 0;
                if (bizType === 'stock') {
                  total = parseInt(pc.purchased_qty)
                } else {
                  total = parseInt(parseInt(pc.unit_cost) * parseInt(pc.purchased_qty))
                }
                
                TotalCost1 += parseInt(total)

              })
            }
            {TotalCost1.toLocaleString()}  {bizType === 'stock' && defaultMeasureUnit}

          </span>    </h3>
          <TableOpen>
            <TableHead>
              <td> Item </td>
              <td> Quantity </td>
              {bizType === 'business' && <td> Unit Cost </td>}
              <td> Date </td>
              <td> Done By </td>

              {bizType === 'business' && <td className='cashCol'> Total</td>}
              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>

              {purchasess.map((pc, index) => {
                var total =(bizType==='business')? pc.unit_cost * pc.purchased_qty :pc.purchased_qty
                TotalCost += total

                return (
                  <tr key={index}>
                    <td>{pc.itemName}</td>
                    <td>{pc.purchased_qty.toLocaleString()}  {bizType === 'stock' && defaultMeasureUnit}</td>
                    {bizType === 'business' && <td>{pc.unit_cost.toLocaleString()}</td>}
                    <td>{pc.date_time}</td>
                    <td>  {(!pc.user_name || pc.user_name === 'null') ? <span style={{ color: 'red' }}>deleted</span>
                      : pc.user_name + ' ' + pc.user_surname}  </td>
                    {bizType === 'business' &&
                      <td className='cashCol'> {currencyName} {total.toLocaleString()}</td>
                    }
                    {userType == 'admin' &&
                      <ListOptioncolWithDeactivate removeOthers='disable' getEntityById={() => getPurchaseById(pc.id)}
                        delEntityById={() => delPurchaseById(pc.id)} />

                    }
                  </tr>

                )
              })}
              <tr>
                <td className=' ' colSpan={7} >
                  <Row className='d-flex justify-content-end   '>
                    <Col md={6} style={{ textAlign: 'right' }}>
                      <span className='grandTotal   '> Total {bizType === 'business' && currencyName} {TotalCost.toLocaleString()}  {bizType === 'stock' && defaultMeasureUnit}</span>
                    </Col>
                  </Row>
                </td>

              </tr>

            </tbody>
          </TableOpen>
          <Container>
            {Utils.PurchaseSalesTitle('Movements')}
          </Container>
          {/* -------------------- Warehouse movements */}
          <TableOpen>
            <TableHeadView userType={userType} searchByDate={searchByDate} />
            <tbody>
              {hwmovements.map((Hw_movement) => (
                <RowsLoop n={n} Hw_movement={Hw_movement}
                  searchByDate={searchByDate}
                  userType={userType} getHw_movementById={getHw_movementById}
                  delHw_movementById={delHw_movementById} />)
              )}

            </tbody>
          </TableOpen>

          {/* search results table (Search by date*/}
          {/* <TableOpen>
            <TableHeadView userType={userType} searchByDate={searchByDate} />
            <tbody>

              {searchByDateArray.map((Hw_movement) => (
                <RowsLoop n={n} Hw_movement={Hw_movement}
                  searchByDate={searchByDate}
                  userType={userType} getHw_movementById={getHw_movementById}
                  delHw_movementById={delHw_movementById} />)
              )}

            </tbody>
          </TableOpen> */}


          {/* Search results table  */}
          {/* <TableOpen>
            <TableHeadView userType={userType} searchByDate={searchByDate} />
            <tbody>
              {searchListWmovement.map((wmvt) => {
                <RowsLoop n={n} Hw_movement={wmvt}
                  searchByDate={searchByDate} getitemReport={getitemReport}
                  userType={userType} getHw_movementById={getHw_movementById}
                  delHw_movementById={delHw_movementById} />
              })}
            </tbody>
          </TableOpen> */}

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
  const { dc, ds } = useContext(ColItemContext);
  const pchased_sold = dc(Hw_movement.in_out)
  const diff = pchased_sold == 'Purchased' ? later - prev : prev - later
  const { bizType } = useContext(StockOrBisnessContext)
  const { defaultMeasureUnit, setDefaultMeasureUnit } = useContext(ColItemContext)
  n += 1
  return (<tr key={n}>
    {/* <td>{Hw_movement.id}   </td> */}
    <td>{Hw_movement.reference}   </td>
    <td>{Hw_movement.date_time}   </td>
    {/* the below, the mdl_itemsname comes when made a search, another comes on load */}
    <td>{Hw_movement.name !== undefined ? Hw_movement.name
      : Hw_movement.itemname} </td>
    <td style={{ background: ds(Hw_movement.in_out, bizType) }}>
      {dc(Hw_movement.in_out, bizType)}   {bizType === 'stock' && defaultMeasureUnit} </td>
    <td>{Hw_movement.current_qty}   {bizType === 'stock' && defaultMeasureUnit}  </td>
    <td>{pchased_sold}  <span style={{ color: 'blue' }}> {diff} </span></td>
    <td>{Hw_movement.remaining}  {bizType === 'stock' && defaultMeasureUnit}    </td>
    <td>{Hw_movement.user !== undefined ? Hw_movement.user : Hw_movement.email}   </td>

    {searchByDate &&

      <td>
        <a href='#'>  <Icon onClick={() => getitemReport(Hw_movement.id)} size={20} icon={report} />   </a>
      </td>

    }
    {userType == 'admin' && <ListOptioncol getEntityById={() => getHw_movementById(Hw_movement.id)} delEntityById={() => delHw_movementById(Hw_movement.id)} />}
  </tr>)
}


export default Purchase

