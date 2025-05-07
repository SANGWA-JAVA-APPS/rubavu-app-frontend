import React, { useState, useRef, useEffect, useContext } from 'react'

import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
import { useAuthHeader } from 'react-auth-kit';
// import UpdatedComponent from '../../Global/HOCForm'

import 'react-datepicker/dist/react-datepicker.css'

import Utils from '../Global/Utils'
import { ColItemContext } from '../Global/GlobalDataContentx'
import StockCommons from '../services/StockServices/StockCommons'
import StockRepository from '../services/StockServices/StockRepository'
import PagesWapper from '../Global/PagesWapper';
import PrintCompanyInfo from '../Global/PrintCompanyInfo';
import TableHead from '../Global/TableHead'
import SearchBox from '../Global/SearchBox'
import InputRow from '../Global/InputRow'
import FormTools from '../Global/PubFnx'
import ListToolBar, { SearchformAnimation } from '../Global/ListToolBar'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, FormInnerRightPane, SaveUpdateBtns } from '../Global/ContainerRow'
import ListOptioncol, { TableOpen } from '../Global/ListTable'
import { DataListLoading } from '../Global/Loader'
import SeaarchBytyping, { SearchTableResult } from '../globalcomponents/SeaarchBytyping'
import { TruckTableRows } from './Invoice/Invoice'
import { InputReadOnly, InputRowDateNoLabel, TimeInputRow } from '../Global/Forms/InputRow'
import { Col, Row } from 'react-bootstrap'
import CurrentDate from '../Global/CurrentDate'
import { useNavigate } from 'react-router-dom';
import { setRef } from '@mui/material';

function Truck_exit() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [weight, setWeight] = useState()
  const [get_out_time, setGet_out_time] = useState()
  const [truck_id, setTruck_id] = useState()
  const [plate_number, setPlate_number] = useState()
  const [amount, setAmount] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */
  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [truck_exits, setTruck_exits] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button
  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [referenceIdTwo, setReferenceIdTwo] = useState()
  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)
  const authHeader = useAuthHeader()();

  const { obj, setObj } = useContext(ColItemContext)
  const [startDate, setStartDate] = useState(CurrentDate.todaydate())
  const [endDate, setEndDate] = useState(CurrentDate.todaydate())
  const navigate = useNavigate()

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)
    var truck_exit = {
      id: id, get_out_time: get_out_time
    }
    if (id) {
      StockCommons.updateTruck_exit(truck_exit, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveTruck_exit(truck_exit, truck_id, authHeader).then((res) => {
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
  const getAllTruck_exits = () => {
    StockRepository.findTruck_exit(startDate, endDate, authHeader).then((res) => {
      setTruck_exits(res.data);
      setDataLoad(true)
    });
  }
  useEffect(() => {
    getAllTruck_exits(0, 20)
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getTruck_exitById = (id) => {
    StockRepository.findTruck_exitById(id, authHeader).then((res) => {
      setId(res.data.id)
      setWeight(res.data.weight)
      setGet_out_time(res.data.get_out_time)
      setTruck_id(res.data.truck_id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTruck_exitById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteTruck_exitById(id).then(() => {
        setRefresh(!refresh)
      })
    }, () => { })
  }
  /*#endregion Listing data*/
  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllTruck_exits()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setWeight("")
    setGet_out_time("")
    setTruck_id("")

  }
  const clearHandle = () => {
    setId(null)
    setWeight("")
    setGet_out_time("")
    setTruck_id("")
    setClearBtn(false)
  }
  /*#endregion Listing data*/


  /*#region Printing */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /*#endregion Listing data*/

  /* #region ------------------SEARCH VESSEL BY TYPING ------------------------------------------------- */
  const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
  const { showSelected, setShowSelected } = useContext(ColItemContext)
  const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)
  const inputRef = useRef(null);
  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
  const tableHead = ['id', 'truck type', 'plate Number', 'Status']

  const hideSelectorLink = () => {
    setShowSelected(false)
    setSearchItemValue('')
  }
  const findTruckByPlateNumber = (searchItemValue) => {
    StockRepository.findVesselByPlatenumber(searchItemValue, authHeader).then((res) => {
      setItemssbyname(res.data);
      setDataLoad(true)

    });
  }
  const searchOnThirdSecond = (e) => {
    setSearchTableVisible(true)
    const newVal = e.target.value
    setSearchItemValue(newVal)
    findTruckByPlateNumber(searchItemValue)
    if (searchItemValue) {//if the user has typed in something
      // setCompletedSearch(false)
      // setSearchProgress(true) // Go and show the progress bar,
    }
  }
  const searchDone = (id, name, platenumber, status) => {
    setSearchTableVisible(false)
    setTruck_id(id)
    setPlate_number(platenumber)
    setSearchItemValue(name)
    setShowSelected()
    
    if ('exited' === status) {
      alert('The truck has already exited, you have to add a new entry')
    } else {
      StockRepository.findAmountDue(platenumber, authHeader).then((res) => {
        setAmount(res.data.price)
      })
    }
  }
  /* #endregion */

  useEffect(() => {
    if (id) {
      navigate('/truckexitprint')
    }
  }, [id])
  const printData = (truckExit) => {
    StockRepository.findTruckExitDetaisById(truckExit.id, authHeader).then((res) => {
      setObj(res.data[0])
      setId(truckExit.id)
      console.log('---------------------')
      console.log(obj)
    }) //get the exit note  details
  }
  const dt = new Date()

  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1)
    setEndDate(date2)
    setRefresh(!refresh)

  }
  return (
    <PagesWapper>
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Truck_exit'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            {setSearchTableVisible && <SeaarchBytyping placeholder="Enter a plate number"
              labelName='  Truck Plate number' searchTableVisible={searchTableVisible}
              showSelected={showSelected}
              hideSelectorLink={hideSelectorLink}
              currentTypingVal={searchItemValue}
              ref={inputRef}
              sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)} />}
            {searchTableVisible && <SearchTableResult tableHead={tableHead}
              TableRows={() => <TruckTableRows trucks={itemssbyname} searchDone={searchDone} />} />}
            <InputReadOnly name='Invoiced Amount ' val={amount} handle={(e) => setAmount(e.target.value)} label='lblget_out_time' />
            <Row>
              <Col md={12}>
                <Row>
                  
                  <Col className='ms-2 ps-3' sm={3}>Get-out time    </Col>
                  <Col className=' pe-4'>
                    <TimeInputRow label="Get out time" val={get_out_time} handle={(e) => setGet_out_time(e.target.value)} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='truck exit List' height={height} entity='Truck exit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Get Out Time </td>
              {/* <td>Truck Id </td> */}

              {userType == 'admin' && <td className='delButton '>Option</td>}
            </TableHead>
            <tbody>
              {truck_exits.map((truck_exit) => (
                <tr key={truck_exit.id}>
                  <td>{truck_exit.id}   </td>
                  <td>{truck_exit.date_time}   </td>
                  {/* <td>{truck_exit.truck_id}   </td> */}

                  {userType == 'admin' && <ListOptioncol print={true} printData={() => printData(truck_exit)}
                    getEntityById={() => getTruck_exitById(truck_exit.id)} delEntityById={() => delTruck_exitById(truck_exit.id)} />}
                </tr>
              ))}</tbody>
          </TableOpen>
        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />
      }

    </PagesWapper>


  )
}

export default Truck_exit
