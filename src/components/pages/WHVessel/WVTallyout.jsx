import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
import SessionTime from '../../services/SessionTime'
import axios from 'axios'
import Commons from '../../services/Commons'
import Repository from "../../services/Repository"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
// import UpdatedComponent from '../../Global/HOCForm'
import { Link, Route, Routes, useParams } from 'react-router-dom';
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
// import SideBar from '../../Navbar/SideBar'
// import Dashboard from './Dashboard'
// import About from './About'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowFull, ContainerRowHalf, FormFillPane, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputAndSearch, InputRowDate, InputRowNumber, LoadSub } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { ListOptioncolWithDeactivate, TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Delete from '../../services/Delete'
import Icon from 'react-icons-kit'
import { ic_thumb_up_alt as ok } from 'react-icons-kit/md/ic_thumb_up_alt'
import { LocalTableHead, TableRows } from '../../Global/commonForPages/TableCommons'

import { Fade, Rotate } from 'react-reveal'
import StockRepository from '../../services/StockServices/StockRepository'
import OtherStyles from '../../Styles/OtherStyles'
import StockCommons from '../../services/StockServices/StockCommons'
import { Col, Row } from 'react-bootstrap'
import CurrentDate from '../../Global/CurrentDate'
import { ColItemContext, useColItemContext } from '../../Global/GlobalDataContentx'
import { StockOrBisnessContext } from '../../Global/StockOrBisness'
import WHVesselnavBar from '../../Navbar/WHVesselnavBar'

function WVTallyout() {
    const [id, setId] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
    const [Id_id, setId_id] = useState()
    const [date_time, setDate_time] = useState()
    const [items, setItems] = useState()
    const [sale_unit_cost, setSale_unit_cost] = useState(0)
    const [account, setAccount] = useState(1)
    const [customer, setCustomer] = useState(0)
    const [sold_qty, setSold_qty] = useState(0)
    const [expected_amount, setExpected_amount] = useState(0)
    const [amount_paid, setAmount_paid] = useState(0)
    const [nDate, setNdate] = useState(new Date())

    const [editingMode, setEditingMode] = useState(false)
    //the warehouse movements fields
    const [in_out, setIn_out] = useState()
    const [remaining, setRemaining] = useState()

    const [current_qty, setCurrent_qty] = useState()




    const { formatDateFn } = useColItemContext();
    const { dc, ds } = useContext(ColItemContext);
    /*#endregion Listing data*/
    /*#region ---------- OTHER FIELDS   ---------------------------*/
    const [showLoader, setShowLoader] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [saless, setSaless] = useState([]) //Data List
    const [clearBtn, setClearBtn] = useState(false) //The cancel button

    const [dataLoad, setDataLoad] = useState(false)
    const [height, setHeight] = useState(0);
    const [searchHeight, setSearchHeight] = useState(0);
    const [itemss, setItemss] = useState([]) //Data List in combo box
    const [itemsId, setItemsId] = useState()
    const [profiles, setProfiles] = useState([]) //Data List


    const [hwmovements, setHwmovement] = useState([]) //Data List
    const [searchProgress, setSearchProgress] = useState(false)//more as units when clicked the 'deploy' button
    const [carrier, setCarrier] = useState(1);
    const [name, setName] = useState()
    const [clickedSearch, setClickedSearch] = useState(false)

    const [userType, setUserType] = useState()
    const [username, setUsername] = useState()
    const [reference, setReference] = useState()

    const [searchedNameLabel, setSearchedNameLabel] = useState('') // this is used on search on the beginning of the form registration
    const [searchedQtyLabel, setSearchedQtyLabel] = useState('') // this is used on search on the beginning of the form registration
    const [searchedQtyVal, setSearchedQtyVal] = useState('')// this is used on search on the beginning of the form registration


    /*#endregion OTHER FIELDS */
    /*#region ---------- SEARCH FIELDS--------------------------------------*/
    const [searchedItemChosen, setSearchedItemChosen] = useState(false)// this is to show the two fields that are initially hiden(false), on the selection they appear again
    const [completedSearch, setCompletedSearch] = useState(false)//  
    const [searchItemValue, setSearchItemValue] = useState('')

    const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
    const [secondTableitemssbyname, setSecondTableitemssbyname] = useState([]) //Data List searched by name
    const [completeitemName, setCompleteitemName] = useState() //This is the chosen name of item selected from the list from the backend on the result table
    const [resultTableVisible, setResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button
    const [secondResultTableVisible, setSecondResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button
    const [chosenItemUitCost, setChosenItemUitCost] = useState(0)//more as units when clicked the 'deploy' button

    const [currencyName, setCurrencyName] = useState('')// this is used on search on the beginning of the form registration
    const [refresh, setRefresh] = useState(false)// this is used on search on the beginning of the form registration
    const { bizType } = useContext(StockOrBisnessContext)
    const { saleMenu, setSaleMenu } = useContext(ColItemContext);
    const { defaultMeasureUnit, setDefaultMeasureUnit } = useContext(ColItemContext)

    /*#endregion SEARCH FIELDS*/
    /*#region ---------- SAVING DATA TO DB--------------------------------------*/


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

    const handleStartStop = () => {
        setIsRunning2(!isRunning2); // Toggle the running state
    };

    const handleReset = () => {
        setIsRunning2(false); // Stop the timer
        setTimer(0); // Reset the timer to 0
    };
    /* #endregion */

    const onSubmitHandler = (e) => {
        e.preventDefault()
        setShowLoader(true)
        const formattedDate = formatDateFn(nDate);

        var mdl_sale = {
            date_time: formattedDate
        }

        var mdl_sales_lines = {
            id: id, date_time: formatDateFn(nDate), items: items, sale_unit_cost: reference, account: localStorage.getItem('userid'), customer: customer, amount_paid: amount_paid, expected_amount: expected_amount,
            sold_qty: sold_qty
        }
        if (items) {


            if (id) {
                StockCommons.updateSale(id, items, mdl_sales_lines).then((res) => {
                    resetAfterSave()
                    alert(res.data.stat)
                })
            } else {
                StockCommons.saveSales(mdl_sales_lines, localStorage.getItem('userid'), items, reference).then((res) => {
                    console.log(res.data)
                    if (res.data.stat == 'no sales yet') {
                        alert('There is not enough quantity in the stock, kindly add some quantity first and proceed')
                        setShowLoader(false)
                    } else if (res.data.stat == 'The unit cost is too small') {
                        alert('The unit cost is too small. It has to be greater or equal to: ' + chosenItemUitCost)
                    } else if (res.data.stat == 'not enough') {
                        alert('There is not enough quantity in the stock, kindly do some purchases and proceed')
                        setShowLoader(false)
                    } else if (res.data.stat == 'not unit cost') {
                        alert('The unit cost of the item is not set, you have to set it first ')
                        setShowLoader(false)
                    } else {
                        resetAfterSave()
                    }
                }).catch((error) => {
                    console.log('-----------')
                    alert('Error Occured')
                })
            }
        } else {
            alert('you have to select an item')
        }

        // setEditingMode(true) //  after saving or editing he may need search input so it comes back
    }
    /*#endregion Listing data*/
    /*#region ---------- All Records, Deleting and By Id------------------------*/

    const getAllSaless = (date1, date2) => {
        const salesDateDTO = {
            date1: date1, date2: date2
        }
        StockRepository.findSales(salesDateDTO).then((res) => {
            setSaless(res.data);
            setDataLoad(true)
        });
    }
    const getAllHw_movements = () => {
        let SearchByDateOnly = {
            startDate: startDate,
            endDate: endDate
        }
        StockRepository.findHw_movement(SearchByDateOnly).then((res) => {
            setHwmovement(res.data);
            setDataLoad(true)
            setSearchProgress(false)
        });
    }

    const getAllProfiles = () => {
        StockRepository.findProfile().then((res) => {
            setProfiles(res.data);
            setDataLoad(true)
        });
    }
    const getAllItemss = () => {
        StockRepository.findItems().then((res) => {
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
        Utils.VerifyLogin()

        getAllProfiles()
        getAllHw_movements()


        getAllSaless(CurrentDate.todaydate(), CurrentDate.todaydate())

        setUsername(localStorage.getItem('token'))
        setUserType(localStorage.getItem('catname'))

        //Get Token and catname

        setUserType(localStorage.getItem('catname'))
        getCurrency("currency")

        /* #region ----------Start and reset the timer, when someone is typing in the search button------------------------- */
        let interval = null;

        if (isRunning2) {
            interval = setInterval(() => {
                setTimer((prevTime) => prevTime + 1); // Increment timer by 1 second
            }, 1000); // 1000 milliseconds = 1 second
        } else if (!isRunning2 && timer !== 0) {
            clearInterval(interval); // Stop the timer if it's not running
        }

        return () => clearInterval(interval); // Cleanup interval on component unmount or on next render
        /* #endregion */


    }, [refresh, isRunning2, timer]);


    const saleSwitchTSstockOut = () => {
        return (userType == 'store keeper') ? 'StockOut' : 'Sales'
    }
    const getSalesById = (id, name, itemsId) => {
        StockRepository.findSalesById(id).then((res) => {
            setId(res.data.id)
            setItems(itemsId)
            setClearBtn(true)
            showheight('auto')
            setReference(res.data.sale_unit_cost)
            setSold_qty(res.data.sold_qty)
            setSearchItemValue(name)
            setSearchedItemChosen(true)
            setEditingMode(true) // this hides the search input  because he will not need to edit the item name and he will not need to enter some values
        })
    }
    const getHw_movementById = (id) => {
        StockRepository.findHw_movementById(id).then((res) => {
            setId(res.data.id)
            setDate_time(res.data.id)
            setItems(res.data.id)
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
    const delSalesById = (id) => {
        Utils.Submit(() => {
            Delete.deleteSalesById(id, () => { getAllSaless() })
        }, () => { })
    }
    const delItemsById = (id) => {

        Utils.Submit(() => {
            Delete.deleteItemsById(id, () => { getAllItemss() })
        }, () => { })
    }

    const getCommonSearchByDate = (startDate, endDate, name, type) => {
        setSearchProgress(true)
        var Mdl_SearchItemDate_itemName = {
            startDate: startDate,
            endDate: endDate,
            name: name,
            type: type
        }

        if (type == 'Reference') {// this is the reference number taken from dropdown list
            StockRepository.findHw_movementByReference(name).then((res) => {
                if (res.data != null) {
                    setSearchProgress(false)
                    setHwmovement(res.data)
                    console.log('-------------The warehouse by reference----------')
                    console.log(res)
                    //setWareosueMovementsList(res,Mdl_SearchItemDate_itemName,name)

                }
            })
        } else if (type === 'name' && (startDate !== 'NaN-NaN-NaN' && endDate !== 'NaN-NaN-NaN')) { // this is the name of the item
            StockRepository.findItemByDate(Mdl_SearchItemDate_itemName).then((res) => {
                if (res.data != null) {
                    if (res.data.warehouse_stat == 'not exists') {
                        alert('The item could not be found in the stock. Kindly make sure you have entered the correct \n\n1. \'name\' of the item and \n2. the \'date\' range and then search again')
                        setSearchProgress(false)
                    } else {
                        setWareosueMovementsList(res, Mdl_SearchItemDate_itemName, name)
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
            setSaless([])
            getAllSaless(startDate, endDate)
            StockRepository.findHw_movement(SearchByDateOnly).then((res) => {
                setHwmovement([])
                setHwmovement(res.data);
                setDataLoad(true)
                setSearchProgress(false)
            });
        } else {
            alert('You have to select an option')
        }

    }
    const setWareosueMovementsList = (res, Mdl_SearchItemDate_itemName, name) => {

        setDate_time(res.data.warehouse_data.date_time)
        setIn_out(res.data.warehouse_data.in_out)
        setRemaining(res.data.warehouse_data.remaining)
        setCurrent_qty(res.data.warehouse_data.current_qty)
        setCarrier(res.data.warehouse_data.carrier)

        //setHwmovement(res.salesPurchases_data);
        Mdl_SearchItemDate_itemName = {
            id: res.data.warehouse_data.id,
            date_time: res.data.warehouse_data.date_time,
            in_out: in_out,
            carrier: res.data.warehouse_data.carrier,
            current_qty: current_qty,
            remaining: res.data.warehouse_data.remaining,
            name: res.data.warehouse_data.mdl_items.name
        }
        setName(name)
        //hwmovements.push(await Mdl_SearchItemDate_itemName)  
        setHwmovement([])
        setHwmovement(current => [...current, Mdl_SearchItemDate_itemName]);
        setSearchProgress(false)
        setClickedSearch(true)
    }

    const refreshClick = () => {
        setSearchProgress(false)
        setName('')
    }

    /*#endregion Listing data*/
    /*#region ---------- Show Height, reset all and clear Button   ------------*/
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
        setItems("")
        setSale_unit_cost(0)
        setCustomer(0)
        setAmount_paid(0)
        setExpected_amount(0)
        setRefresh(!refresh)
    }
    const clearHandle = () => {
        setId(null)
        setDate_time("")
        setItems("")
        setSale_unit_cost("")
        setAccount("")
        setCustomer("")
        setAmount_paid("")
        setExpected_amount("")
        setClearBtn(false)
    }
    /*#endregion Listing data*/
    /*#region ---------- SEARCH ON THE FORM  ------------*/
    const searchDone = (id, name, balance, saleunit_cost) => {
        setSearchedItemChosen(true) //show other 2 fields on the form
        setCompletedSearch(true) //get ready to fill the complete name, 
        setSearchProgress(false)
        setItemsId(id)
        setItems(id)
        setSearchedNameLabel('NAME')
        setSearchedQtyLabel('Qty')
        setSearchedQtyVal(balance)
        setCompleteitemName(name)
        setResultTableVisible(false)
        setChosenItemUitCost(saleunit_cost)
        setReference(saleunit_cost)

    }
    const searchForItemByName = () => {
        if (searchItemValue == '') {
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

    //Second search

    const SearchDone_Table2 = (id, name) => {

        setCompletedSearch(true) //get ready to fill the complete name, 
        setSearchProgress(false)
        setItemsId(id)
        setCompleteitemName(name)
        setSecondResultTableVisible(false)
    }
    /*#endregion SEARCH ON THE FORM*/
    /*#region Printing */
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data'
    });
    /*#endregion Listing data*/
    var TotalCost1 = 0
    var TotalCost = 0;

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
                // if (timer % 3 === 0) { // if there is 3 seconds interval
                // if (!searchDone) {// if the user has not clicked yes, to choose a reacor, beacuse of he chooses a record, the system should stop sending a request to backend
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
    }

    const setSoldQuantityHanlder = (e) => {
        var sq = e.target.value
        setSold_qty(sq)
        setExpected_amount(sq * reference)
        setAmount_paid(sq * reference)
        console.log(' sale uc: ' + reference + ' expected ' + ' sold qty: ' + sold_qty + '  tot: ' + sold_qty * reference)
    }

    return (
        <>
            

                <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
                    <ContainerRowBtwn clearBtn={clearBtn} form={saleMenu} showLoader={showLoader}  >
                        <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                        {editingMode &&
                            <Row className="d-flex justify-content-end">
                                <Col md={11}  ><h3 className="beerskin1"> {searchItemValue} </h3></Col>
                            </Row>}
                        <FormFillPane onSubmitHandler={onSubmitHandler}>
                            {!editingMode &&
                                <InputAndSearch changedContent={(e) => sendRequestOnThirdChar(e)} handle={() => searchForItemByName()} label='Item' name='item'>
                                    <div className='row offset-6  '>
                                        <span >
                                            {completeitemName && <>

                                                <span className={`fw-bold text-decoration-underline p-1 ${OtherStyles.lightBg()} `} style={{ textTransform: 'uppercase ', backgroundColor: '#ccc' }} >
                                                    {searchedNameLabel}:
                                                </span>
                                                &nbsp;  {completeitemName}

                                                &nbsp; &nbsp;  <span className='fw-bold text-decoration-underline p-1' style={{ textTransform: 'uppercase ', backgroundColor: '#ccc' }} >
                                                    {searchedQtyLabel}:
                                                </span>
                                                &nbsp; {searchedQtyVal}


                                                &nbsp; &nbsp;  <span className='fw-bold text-decoration-underline p-1' style={{ textTransform: 'uppercase ', backgroundColor: '#ccc' }} >
                                                    Unit Cost
                                                </span> &nbsp;
                                                {chosenItemUitCost}:
                                            </>
                                            }

                                        </span>
                                    </div>
                                    <LoadSub showmoreload={searchProgress} /> {/* Show progress upon clicking te search button*/}

                                    {/* The  first search table, searching itemOnly */}
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
                                                    return <TableRows searchDone={() => searchDone(item.id, item.name, item.balance, item.sale_cost)} item={item} delhandle={() => delItemsById(item.id, item.name)} userType={userType} />
                                                }
                                                )}
                                            </tbody>
                                        </TableOpen>
                                    }
                                </InputAndSearch>
                            }
                            <InputRowDate nDate={nDate} label="Date" name="Date" handle={(nDate) => setNdate(nDate)} />
                            <InputRow nDate={nDate} label="Client" name="Client" handle={(nDate) => setNdate(nDate)} />

                            {searchedItemChosen && <>{/*This is the variable that toggles the on and off the the two fields upon click on the search button*/}
                                <InputRowNumber name={`${saleMenu} Quantity  `} val={sold_qty} handle={(e) => setSoldQuantityHanlder(e)} label='sold Quantity' />
                                {bizType === 'business' && <>
                                    <InputRow name={`${saleMenu} Unit Cost`} val={reference} handle={(e) => setReference(e.target.value)} label='reference' />

                                    <span>
                                        {(expected_amount > amount_paid) ? (
                                            <>
                                                <span style={{ marginLeft: '350px', color: 'red' }}>debt of: </span>
                                                {(Number(expected_amount) - Number(amount_paid)).toLocaleString()}
                                            </>
                                        ) : ''}

                                    </span>
                                    <InputRowNumber name='Amount Paid' val={amount_paid} handle={(e) => setAmount_paid(e.target.value)} label='Amount Paid' /> </>}

                            </>
                            }
                            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />

                        </FormFillPane>
                        {/* <FormSidePane /> */}
                    </ContainerRowBtwn>
                </AnimateHeight>
                <ContainerRowFull mt='3'>
                    <ListToolBar listTitle={`${saleMenu} Cargo List`} height={height} entity={saleMenu}
                        changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)}
                        handlePrint={handlePrint} searchHeight={searchHeight} salesPurchaseFilters={true} />
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
                                            return <TableRows delhandle={() => delItemsById(item.id)} item={item} searchDone={SearchDone_Table2} userType={userType} />
                                        }
                                        )}
                                    </tbody>
                                </TableOpen>    </>
                        }

                        <h3 className='fw-bold mt-3'> Today Total Tallyout <span style={{ color: '#000', fontSize: '25px' }} className='p-1 button_skin4'>
                            {!bizType === 'business' && defaultMeasureUnit}
                            {

                                saless.map((pc) => {
                                    var total = 0;
                                    if (bizType === 'stock') {
                                        total += parseInt(pc.sold_qty)
                                    } else {
                                        total = parseInt(parseInt(pc.unit_cost) * parseInt(pc.purchased_qty))
                                    }
                                    TotalCost1 += parseInt(total)
                                })
                            }
                            {TotalCost1.toLocaleString()}  {bizType === 'stock' && defaultMeasureUnit}
                        </span>    </h3>
                        {/* ---------------SAles ---------------- */}
                        <TableOpen>
                            <TableHead>
                                <td> Item </td>
                                <td> Date </td>
                                <td> Done By </td>
                                <td> Qty </td>
                                {bizType === 'business' && <>
                                    <td> Unit Cost </td>
                                    <td> expected amt </td>
                                    <td> expected Sale UC </td>
                                    <td>  Purch. UC </td></>}

                                <td className='cashCol'> Total</td>
                                {userType == 'admin' && <td className='delButton'>Option</td>}
                            </TableHead>
                            <tbody>
                                {saless.map((pc, index) => {
                                    var total = pc.sale_unit_cost * pc.sold_qty
                                    TotalCost += total

                                    return (
                                        <tr key={index}>
                                            <td>{pc.itemName}</td>
                                            <td>{pc.date_time}</td>
                                            <td>
                                                {(!pc.user_name || pc.user_name === 'null') ? <span style={{ color: 'red' }}>deleted</span>
                                                    : pc.user_name + ' ' + pc.user_surname}
                                            </td>
                                            <td>{pc.sold_qty.toLocaleString()}</td>
                                            {bizType === 'business' && <>
                                                <td>{pc.sale_unit_cost.toLocaleString()}</td>
                                                <td>{pc.expected_amount.toLocaleString()}</td>
                                                <td>{pc.expectedSaleUnitCost.toLocaleString()}</td>
                                                <td>{pc.purchaseunitCost.toLocaleString()}</td> </>}
                                            <td className='cashCol'> {currencyName} {total.toLocaleString()}</td>
                                            {userType == 'admin' &&
                                                <ListOptioncolWithDeactivate removeOthers='disable' getEntityById={() => getSalesById(pc.id, pc.itemName, pc.itemsId)}
                                                    delEntityById={() => delPurchaseById(pc.id)} />
                                            }
                                        </tr>

                                    )
                                })}
                                <tr>
                                    <td className=' ' colSpan={10} >
                                        <Row className='d-flex justify-content-end   '>
                                            <Col md={6} style={{ textAlign: 'right' }}>
                                                <span className='grandTotal   '> Total {!bizType === 'business' && defaultMeasureUnit} {TotalCost.toLocaleString()} {bizType === 'stock' && defaultMeasureUnit}</span>
                                            </Col>
                                        </Row>
                                    </td>

                                </tr>

                            </tbody>
                        </TableOpen>


                        {/* ---------------Movements ---------------- */}
                        {Utils.PurchaseSalesTitle('Movements')}
                        <TableOpen>
                            <TableHead>
                                <td>Reference</td>
                                <td>date_time</td>
                                <td>item</td>
                                <td>Action</td>
                                <td>Previous</td>
                                <td>Difference</td>
                                <td>remaining</td>
                                <td>account</td>
                                {userType == 'admin' && <td className='delButton'>Option</td>}
                            </TableHead>
                            <tbody>
                                {hwmovements.map((Hw_movement, index) => {
                                    const prev = Hw_movement.current_qty
                                    const later = Hw_movement.remaining
                                    const pchased_sold = Hw_movement.in_out === 'in' ? 'Purchased' : 'Sold'
                                    const diff = pchased_sold == 'Purchased' ? later - prev : prev - later

                                    return (
                                        // <Rotate bottom right delay={index * 250}>  
                                        <tr key={Hw_movement.id}>
                                            {/* <td>{Hw_movement.id}   </td> */}
                                            <td>{Hw_movement.reference}   </td>
                                            <td>{Hw_movement.date_time}   </td>
                                            <td>{Hw_movement.itemname}   </td>
                                            <td style={{ backgroundColor: ds(Hw_movement.in_out) }}>{dc(Hw_movement.in_out)}   </td>
                                            <td>{Hw_movement.current_qty} {bizType === 'stock' && defaultMeasureUnit}  </td>
                                            <td>{pchased_sold}  <span style={{ color: 'blue' }}> {diff} </span></td>
                                            <td>{Hw_movement.remaining} {bizType === 'stock' && defaultMeasureUnit}   </td>
                                            <td>{Hw_movement.email}   </td>
                                            {userType == 'admin' && <ListOptioncol getEntityById={() => getHw_movementById(Hw_movement.id)} delEntityById={() => delHw_movementById(Hw_movement.id)} />}
                                        </tr>
                                        // </Rotate >
                                    )
                                })}</tbody>
                        </TableOpen>

                    </div>
                </ContainerRowFull>
                {!dataLoad && <DataListLoading />
                }

            
        </>
    )
}

export default WVTallyout
