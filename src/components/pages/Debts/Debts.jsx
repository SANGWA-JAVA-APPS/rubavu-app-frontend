import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
import SessionTime from '../../services/SessionTime'
import axios from 'axios'
import Commons from '../../services/Commons'
import Repository from "../../services/Repository"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'



import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

// import SideBar from '../../Navbar/SideBar'
// import Dashboard from './Dashboard'
// import About from './About'

import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, LoadSub } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Delete from '../../services/Delete'
import Pagination from '../../Global/Pagination'
import { LocalTableHead, LocalTableHeadCommon, TableRows, TableRowsNoChoose } from '../../Global/commonForPages/TableCommons'
import Conn from '../../services/Conn'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import StockDelete from '../../services/StockServices/StockDelete'
import CurrentDate from '../../Global/CurrentDate'

function Debts() {



    /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
    const [id, setId] = useState(null)
    const [Date_time, setDate_time] = useState()
    const [Exp_amount, setExp_amount] = useState()
    const [Done_by, setDone_by] = useState()
    const [Description, setDescription] = useState()
    const [expensess, setExpensess] = useState([]) //Data List
    /*#endregion Listing data*/




    /*#region -----------OTHER FIELDS---------------------*/
    const [showLoader, setShowLoader] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [itemss, setItemss] = useState([]) //Data List

    const [clearBtn, setClearBtn] = useState(false) //The cancel button

    const [dataLoad, setDataLoad] = useState(false)
    const [height, setHeight] = useState(0);
    const [searchHeight, setSearchHeight] = useState(0);
    const [userType, setUserType] = useState()
    const [searchProgress, setSearchProgress] = useState(false)// next or previous set of data on top
    const [searchProgressBottom, setSearchProgressBottom] = useState(false)// next or previous set of data on bottom
    /*#endregion*/
    /*#region -----------PAGINATION -----*/
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentitems = itemss.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const [startPoint, setStartPoint] = useState(0)
    const [nextset, setNextset] = useState(20) // number of record
    const [itemsBackend, setItemsBackend] = useState(nextset)// incremented amount each next
    const totalItems = itemss.length


    const nextEvent = () => {

        setSearchProgressBottom(true)
        setStartPoint(n => n + 1)
        setNextset(nextset => nextset + 1)

        getAllItemss(startPoint, nextset)

        // go to db
        /*
        it is just a setting i gave myself (SANGWA) to set the set to be 50 records from database
        so each set will be retrieving a set of 50 items.
        */
        console.log(startPoint + '- ' + nextset)

    }

    const prevEvent = () => {
        if (startPoint > 0) {
            setSearchProgressBottom(true)
            setStartPoint(n => n - 1)
            setNextset(nextset => nextset - 1)

            getAllItemss(startPoint, nextset)
        }

        // searchProgressBottom(true)

    }

    const getItemsById = (id) => {
        setSearchProgressBottom(true)

        StockRepository.findItemsById(id).then((res) => {
            setId(res.data.id)
            setName(res.data.name)
            setUnit_cost(res.data.unit_cost)
            setSale_cost(res.data.sale_cost)
            setItemsCategoryId(res.data.caId)

            setClearBtn(true)
            showheight('auto')
            setHeight('auto')
            setSearchProgressBottom(false)
        })
    }
    const delItemsById = (id) => {
        Utils.Submit(() => {
            StockDelete.deleteItemsById(id).then((res) => {
                getAllItemss()
            })
        })
    }

    /*#endregion -- End pagination*/


    /*#region ---------- SEARCH FIELDS--------------------------------------*/
    const [searchedItemChosen, setSearchedItemChosen] = useState(false)// this is to show the two fields that are initially hiden(false), on the selection they appear again
    const [completedSearch, setCompletedSearch] = useState(false)//  
    const [searchItemValue, setSearchItemValue] = useState('')

    const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
    const [secondTableitemssbyname, setSecondTableitemssbyname] = useState([]) //Data List searched by name
    const [completeitemName, setCompleteitemName] = useState() //This is the chosen name of item selected from the list from the backend on the result table
    const [resultTableVisible, setResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button
    const [secondResultTableVisible, setSecondResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button


    /* #region  Wrking with images */
    const [itemName, setItemName] = useState(name);
    const [imageFiles, setImageFiles] = useState([]);



    const handleImageChange = (e) => {
        setImageFiles([...e.target.files]);
    };

    /* #endregion */

    /*#endregion SEARCH FIELDS*/
    /*#region ---------- SAVING DATA TO DB--------------------------------------*/
    const onSubmitHandler = (e) => {
        e.preventDefault()
        setShowLoader(true)

        var mdl_expenses = {
            id: id, date_time: CurrentDate.todaydate(), exp_amount: Exp_amount, done_by: Done_by, description: Description
        }
        if (id) {
            StockCommons.updateUnit(mdl_expenses, id).then((res) => {
                resetAfterSave()
            })
        } else {
            var accountId = Done_by
            StockCommons.saveExpenses(mdl_expenses, accountId).then((res) => {
                console.log(res.data)
                if (res.data != null) {
                    resetAfterSave()
                }
            }).catch((error) => {
                console.log('-----------')
                alert('Error Occured')
            })
        }
    }
    /*#endregion Listing data*/


    /*#region ------------All Records, Deleting and By Id------------------------*/
    const getAllExpensess = () => {
        StockRepository.findExpenses().then((res) => {
            setExpensess(res.data);
            setDataLoad(true)
        });
    }

    useEffect(() => {
        getAllExpensess()
        setDone_by(localStorage.getItem('userid'))
        setUserType(localStorage.getItem('catname'))
    }, []);


    const getExpensesById = (id) => {
        Repository.findExpensesById(id).then((res) => {
            setId(res.data.id)
            setDate_time(res.data.id)
            setExp_amount(res.data.id)
            setDone_by(res.data.id)
            setDescription(res.data.id)
            setClearBtn(true)
            showheight('auto')
        })
    }
    const delExpensesById = (id) => {
        Utils.Submit(() => {
            Delete.deleteExpensesById(id, () => { getAllExpensess() })
        }, () => { })
    }
    /*#endregion Listing data*/

    /*#region ---------Show Height, reset all and clear Button   ------------*/
    function showheight(type) {
        setHeight(type)
    }
    const resetAfterSave = () => {
        document.getElementById("Form").reset();
        getAllExpensess()
        setShowLoader(false)
        setShowAlert(true)
        setHeight(0)
        setId(null)
        setDate_time("")
        setExp_amount("")

        setDescription("")
    }
    const clearHandle = () => {
        setId(null)
        setDate_time("")
        setExp_amount("")

        setDescription("")
    }

    /*#endregion Listing data*/



    /*#region -----------Printing */
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data'
    });
    /*#endregion Listing data*/
    /*#region -----------SEARCH ON ITEMS ONLY*/
    const SearchDone_Table2 = (id, name) => {

        setCompletedSearch(true) //get ready to fill the complete name, 
        setSearchProgress(false)
        setItemsId(id)
        setCompleteitemName(name)
        setSecondResultTableVisible(false)
    }

    const getItemVal = (e) => {
        setName(e.target.value)
        setItemName(e.target.value)
    }
    /*#endregion*/
    const getCommonSearchByDate = (startDate, endDate, name, type) => {

    }
    return (
        <PagesWapper>

            <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
                {/* <ContainerRowBtwn clearBtn={clearBtn} form='Debts' showLoader={showLoader}  >

                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                    <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
                        <InputRow name='Exp Amount ' val={Exp_amount} handle={(e) => setExp_amount(e.target.value)} label='lblExp Amount ' />
                        <InputRow name='Description ' val={Description} handle={(e) => setDescription(e.target.value)} label='lblDescription ' />
                        <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
                    </FormInnerRightPane>
                    
                </ContainerRowBtwn> */}
            </AnimateHeight>
            <ContainerRow mt='3'>
                <h3>Debts</h3>
                {/* <ListToolBar listTitle='Debts List' height={height} entity='Debts' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} /> */}
                <SearchformAnimation searchHeight={searchHeight}>
                    <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
                </SearchformAnimation>

                <div ref={componentRef} className="dataTableBox">
                    <PrintCompanyInfo />

                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalitems={itemss.length}
                        paginate={paginate} prevEvent={prevEvent}
                        nextEvent={nextEvent} />
                    <LoadSub showmoreload={searchProgressBottom} /> {/* Show progress upon clicking */}

                    {/* The  second search table, searching itemOnly */}
                    {secondResultTableVisible && <>
                        <h3 style={{ color: 'green' }}>Search Result</h3>
                        <TableOpen changedbgColor={1} >
                            <TableHead changedbgColor={1}>
                                <LocalTableHeadCommon />
                                {userType == 'admin' && <td className='delButton'>Option</td>}
                            </TableHead>
                            <tbody>
                                {secondTableitemssbyname.map((item, index) => {
                                    var color = index > 0 && (secondTableitemssbyname[index - 1].name !== item.name ? 'change' : 'v')
                                    var styl = color == 'change' ? 'green' : 'transparent'
                                    var txt = color == 'change' ? '#fff' : '#000'
                                    return <TableRowsNoChoose handleEdit={() => getItemsById(item.id)} item={item} />
                                }
                                )}
                            </tbody>
                        </TableOpen>
                    </>
                    }

                    <TableOpen>
                        <TableHead>
                            {/* <td>id</td> */}
                            <td>Date</td>
                            <td>Amount</td>
                            <td>Description</td>

                            {userType == 'admin' && <td className='delButton'>Option</td>}
                        </TableHead>
                        <tbody>
                            {expensess.map((exp, index) => (
                                <tr key={index}>
                                    <td>{exp.date_time}   </td>
                                    <td>{exp.exp_amount}   </td>
                                    <td>{exp.description}   </td>

                                    {userType == 'admin' &&
                                        <ListOptioncol getEntityById={() => getItemsById(exp.id)} delEntityById={() => delItemsById(exp.id)} />}
                                </tr>
                            ))}</tbody>
                    </TableOpen>
                    <LoadSub showmoreload={searchProgressBottom} /> {/* Show progress upon clicking te deploy button*/}

                    <Pagination itemsPerPage={itemsPerPage}
                        totalitems={itemss.length}
                        paginate={paginate}
                        prevEvent={prevEvent}
                        nextEvent={nextEvent} />
                </div>
            </ContainerRow>
            {!dataLoad && <DataListLoading />}
        </PagesWapper>
    )
}

export default Debts
