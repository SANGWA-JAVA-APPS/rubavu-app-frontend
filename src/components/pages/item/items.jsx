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
import { ColItemContext } from '../../Global/GlobalDataContentx'

function Items() {

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [Id_id, setId_id] = useState()
  const [name, setName] = useState()
  const [id, setId] = useState(null)
  const [unit_cost, setUnit_cost] = useState(0)
  const [sale_cost, setSale_cost] = useState(0)
  const [category, setCategory] = useState()
  const [itemsId, setItemsId] = useState()
  const [item_categorys, setItem_categorys] = useState([]) //Data List
  const [itemsCategoryId, setItemsCategoryId] = useState() //this is the item category
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

  const {itemOrCargo, setitemOrCargo } = useContext(ColItemContext)
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
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('itemName', itemName);

    for (const imageFile of imageFiles) {
      formData.append('images', imageFile);
    }

    try {
      const response = await fetch(Conn.wholePath.name + '/items/upload', {
        method: 'POST',
        body: formData,
        Headers: Repository.getHeaders
      });

      if (response.ok) {
        console.log('Upload successful');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  /* #endregion */

  /*#endregion SEARCH FIELDS*/
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)
    var mdl_items = {
      id: id,
      name: name,
      unit_cost: unit_cost,
      sale_cost: sale_cost, balance: 0
    }
    if (id) {
      StockCommons.updateItem(mdl_items, id, itemsCategoryId).then((res) => {
        resetAfterSave()
      })
    } else {
      handleFileUpload()
      StockCommons.saveItem(mdl_items, itemsCategoryId).then((res) => {
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
  /*#region -----------All Records, Deleting and By Id------------------------*/
  const getAllItemss = (startPoint, nextset) => {
    StockRepository.findItems(startPoint, nextset).then((res) => {
      console.log('==========||============')
      console.log(res.data.content)
      setItemss(res.data.content);
      setDataLoad(true)
    });
  }
  const getAllItem_categorys = () => {
    StockRepository.findItem_category().then((res) => {
      setItem_categorys(res.data.data);
      setDataLoad(true)
    });
  }
  useEffect(() => {
    getAllItemss(startPoint, nextset)
    getAllItem_categorys()

    // //Get Token and catname
    setUserType(localStorage.getItem('catname'))
    setSearchProgressBottom(false)
  }, []);
  // }, [nextset, , searchProgressBottom, currentPage]);
  const getCommonSearchByDate = (startDate, endDate, name, type) => {
    setSearchProgress(true)
    var Mdl_SearchItemDate_itemName = {
      startDate: startDate,
      endDate: endDate,
      name: name,
      type: type
    }

    if (type == 'Reference') {// this is the reference number taken from dropdown list
      Repository.findHw_movementByReference(name).then((res) => {
        if (res.data != null) {
          setSearchProgress(false)
          console.log('-------------The warehouse by reference----------')
          console.log(res)
          //setWareosueMovementsList(res,Mdl_SearchItemDate_itemName,name)

        }
      })
    } else if (type = 'name' && (startDate !== 'NaN-NaN-NaN' && endDate !== 'NaN-NaN-NaN')) { // this is the name of the item
      Repository.findItemByDate(Mdl_SearchItemDate_itemName).then((res) => {
        if (res.data != null) {
          if (res.data.warehouse_stat == 'not exists') {
            alert('The item could not be found in the stock. Kindly make sure you have entered the correct \n\n1. \'name\' of the item and \n2. the \'date\' range and then search again')
            setSearchProgress(false)
          } else {


          }
        } else {
          alert('Could not find the data')
        }

      })

    } else if (type = 'name' && (startDate == 'NaN-NaN-NaN' && endDate == 'NaN-NaN-NaN')) {//  no date jus thte item
      setSecondResultTableVisible(true) // to display the second table of the search, there are two tables fof search

      Repository.findItemssbyname(name).then(res => {
        setSecondTableitemssbyname(res.data)
        setResultTableVisible(true)
        setSearchProgress(false)
      })

    } else {
      alert('You have to select an option')
    }



  }

  /*#endregion*/
  /*#region -----------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllItemss()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)

  }
  const clearHandle = () => {
    setId(null)
    setClearBtn(false)
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

  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={itemOrCargo} showLoader={showLoader}  >

          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            <InputRow name='Name' val={name} handle={(e) => getItemVal(e)} label='lblname' />

            <DropDownInput handle={(e) => setItemsCategoryId(e.target.value)} name='Category' label='Category' >
              {item_categorys.map((cats, index) => (
                <option key={index} selected={itemsCategoryId === cats.id} value={cats.id}> {cats.name} </option>
                // selected={catId === cat.id} value={cat.id}
              ))}
            </DropDownInput>

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />

          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>

        <ListToolBar listTitle={`${itemOrCargo} List`} height={height} entity={itemOrCargo} changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
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
              <td>name</td>
              <td>balance</td>
              {/* <td>unit_cost</td>
              <td>sale_cost</td> */}
              {/* <td>category</td> */}
              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {currentitems.map((items, index) => (
                <tr key={index}>
                  {/* <td>{items.id}   </td> */}
                  <td>{items.name}   </td>
                  <td>{items.balance}   </td>
                  {/* <td>{items.mdl_itemsCategory.item_name}   </td> */}
                  {/* <td>{items.unit_cost}   </td>
                  <td>{items.sale_cost}   </td> */}
                  {userType == 'admin' &&
                    <ListOptioncol getEntityById={() => getItemsById(items.id)} delEntityById={() => delItemsById(items.id)} />}
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

export default Items
