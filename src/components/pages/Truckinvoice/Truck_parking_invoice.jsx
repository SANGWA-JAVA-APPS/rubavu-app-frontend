import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
import { useAuthHeader } from 'react-auth-kit';
// import UpdatedComponent from '../../Global/HOCForm'
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputReadOnly, TimeInputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'


import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import { Button, Col, Row } from 'react-bootstrap'
import { InputAndSearch, LoadSub } from '../../Global/InputRow'
import SeaarchBytyping, { SearchTableResult } from '../../globalcomponents/SeaarchBytyping'
import { TableRows, TruckTableRows } from '../Invoice/Invoice'
import CurrentDate from '../../Global/CurrentDate'
import { useNavigate } from 'react-router-dom';



function Truck_parking_invoice() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [licence_plate_number, setLicence_plate_number] = useState()
  const [get_out_time, setGet_out_time] = useState(CurrentDate.CurrentDateTime())
  const [amount, setAmount] = useState(0)
  const [truck_id, setTruckId] = useState()
  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [truck_parking_invoices, setTruck_parking_invoices] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  //below are the result  from truck tariff
  const [totalTime, setTotalTime] = useState('');
  const [truckEntryTime, settruckEntryTime] = useState('');
  const [fee, setFee] = useState(0);

  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)

  const [startDate, setStartDate] = useState(CurrentDate.todaydate())
  const [endDate, setEndDate] = useState(CurrentDate.todaydate())

  const [total12HourBlocks, setTotal12HourBlocks] = useState()
  const [totalRemainingHours, setTotalRemainingHours] = useState()
  const [totalRemainingSeconds, setTotalRemainingSeconds] = useState()
  const [final12HoursBlokcs, setFinal12HoursBlokcs] = useState()
  const [price, setPrice] = useState()
  const [entryTime, setEntryTime] = useState()

  const authHeader = useAuthHeader()();

  const { obj, setObj } = useContext(ColItemContext)
  const navigate = useNavigate()
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const convertToInt = (value) => {
    const cleanedValue = value.replace(/[^0-9.-]+/g, '');
    return parseInt(cleanedValue, 10);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var truck_parking_invoice = {
      id: id, licence_plate_number: licence_plate_number, get_out_time: get_out_time, amount: convertToInt(amount),
      //truck tariff charges variables
      totalDays: total12HourBlocks, totalHours: totalRemainingHours,
      totalMin: totalRemainingSeconds, fee: fee, entryTime: entryTime
    }
    if (id) {
      StockCommons.updateTruck_parking_invoice(truck_parking_invoice, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else if (!amount) {
      alert('Please enter the amount')

    } else {
      StockCommons.saveTruck_parking_invoice(truck_parking_invoice, truck_id, authHeader).then((res) => {
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
  const getAllTruck_parking_invoices = () => {
    StockRepository.findTrucksInvoicesNoGrp(authHeader, startDate, endDate).then((res) => {
      setTruck_parking_invoices(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllTruck_parking_invoices()

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getTruck_parking_invoiceById = (id) => {
    StockRepository.findTruck_parking_invoiceById(id, authHeader).then((res) => {
      setId(res.data.id)
      setLicence_plate_number(res.data.licence_plate_number)
      setGet_out_time(res.data.get_out_time)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTruck_parking_invoiceById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteTruck_parking_invoiceById(id).then(() => {
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
    getAllTruck_parking_invoices()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setLicence_plate_number("")


  }
  const clearHandle = () => {
    setId(null)
    setLicence_plate_number("")


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
  const tableHead = ['id', 'truck type', 'plate Number', 'status']

  const hideSelectorLink = () => {
    setShowSelected(false)
    setSearchItemValue('')
  }
  // const hideSelectorLinkTwo = () => {
  //   setShowSelectedTwo(false)
  //   setStrangeVal('')
  // }
  const findVesselByOperator = (searchItemValue) => {
    StockRepository.findVesselByPlatenumber(searchItemValue, authHeader).then((res) => {
      setItemssbyname(res.data);
      setDataLoad(true)

    });
  }
  const searchOnThirdSecond = (e) => {
    setSearchTableVisible(true)
    const newVal = e.target.value
    setSearchItemValue(newVal)
    findVesselByOperator(searchItemValue)
    if (searchItemValue) {//if the user has typed in something
      // setCompletedSearch(false)
      // setSearchProgress(true) // Go and show the progress bar,
    }
  }
  const searchDone = (id, name, platenumber, status) => {
    setSearchTableVisible(false)
    setTruckId(id)
    setLicence_plate_number(platenumber)
    setSearchItemValue(name)
    setShowSelected(true)

    // inputRef.current.focus();
    if ('exited' === status) {

      alert('The truck has already exited, it has to enter first')
    } else {
      StockRepository.findAmountDue(platenumber, authHeader).then((res) => {
        setAmount((res.data.price).toLocaleString())

        setTotalTime(
          `${parseInt((res.data.final12HoursBlokcs || 0).toString().trim())} 12-hour blocks: (Total blocks: ${parseInt((res.data.total12HourBlocks || 0).toString().trim())}, ${parseInt((res.data.remainingHours || 0).toString().trim())} hrs remaining hours, ${parseInt((res.data.remainingSeconds || 0).toString().trim())} sec) `
        );
        settruckEntryTime(res.data.entryTime)
        setFee(res.data.fee)

        //set the fields that will be sent to db while saving the invoice
        setTotal12HourBlocks(res.data.total12HourBlocks)
        setTotalRemainingHours(res.data.remainingHours)
        setTotalRemainingSeconds(res.data.remainingSeconds)
        setFinal12HoursBlokcs(res.data.final12HoursBlokcs)
        setPrice(res.data.price)
        setEntryTime(res.data.entryTime)

      }).catch(() => { StockCommons.RedirectToLogin() })
    }
  }
  /* #endregion */

  const dt = new Date()

  useEffect(() => {
    if (id) {
      navigate('/truckParkingInvoicePrint')
      // alert('The id is changed: '+ obj.id)
    }
  }, [id])

  const printData = (truck_parking_invoice) => {
    setObj(truck_parking_invoice)
    setId(truck_parking_invoice.id)
  }
  const getCommonSearchByDate = (startDate, endDate, name) => {
    setStartDate(startDate)
    setEndDate(endDate)
    setRefresh(!refresh)
  }
  let totInvoices = 0.0
  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Truck parking invoice'} showLoader={showLoader}  >
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

            <InputRow name='Licence Plate Number ' val={licence_plate_number} handle={(e) => setLicence_plate_number(e.target.value)} label='lbllicence_plate_number' />
            <Row >
              {/* <Col className='ms-1 ps-3' sm={3}>Get-out Time</Col>
              <Col className='pe-4'>
                <TimeInputRow label="Get-out time" val={get_out_time} handle={(e) => setGet_out_time(e.target.value)} />
              </Col> */}
            </Row>

            <InputReadOnly name='Truck Entry Time ' val={truckEntryTime} handle={(e) => settruckEntryTime(e.target.value)} label='lblget_out_time' />
            <InputReadOnly name='Total 12-hour blocks ' val={totalTime} handle={(e) => setTotalTime(e.target.value)} label='lblget_out_time' />
            <InputReadOnly name='Fee ' val={fee} handle={(e) => setFee(e.target.value)} label='lblget_out_time' />
            <InputReadOnly name='Total Amount (Rwf) ' val={amount} handle={(e) => setAmount(e.target.value)} label='lblget_out_time' />

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='truck parking invoice List' height={height} entity='Truck parking invoice' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>ID</td>
              <td>Licence Plate Number </td>
              <td>Get Out Time </td>
              <td>Amount</td>
              <td>Cargo Owner</td>
              <td> totalDays  </td>
              <td> totalHours   </td>
              <td> totalMin   </td>
              <td> fee   </td>

              {userType == 'admin' && <td className='delButton '>Option</td>}
            </TableHead>
            <tbody>
              {truck_parking_invoices.map((truck_parking_invoice) => {
                totInvoices += truck_parking_invoice.amount
                return (
                  <tr key={truck_parking_invoice.id}>
                    <td>{truck_parking_invoice.id}   </td>
                    <td>{truck_parking_invoice.licence_plate_number}   </td>
                    <td>{truck_parking_invoice.entryTime}   </td>
                    <td>{(truck_parking_invoice.amount.toLocaleString())}   </td>
                    <td>{(truck_parking_invoice?.mdl_truck?.o_truck_entrys[0]?.cargo_owner)}   </td>


                    <td>{truck_parking_invoice.totalDays}   </td>
                    <td>{truck_parking_invoice.totalHours}   </td>
                    <td>{truck_parking_invoice.totalMin}   </td>
                    <td>{(truck_parking_invoice.fee).toLocaleString()}   </td>

                    {userType == 'admin' && <ListOptioncol print={true}
                      printData={() => printData(truck_parking_invoice)}
                      getEntityById={() => getTruck_parking_invoiceById(truck_parking_invoice.id)} delEntityById={() => delTruck_parking_invoiceById(truck_parking_invoice.id)} />}
                  </tr>
                )
              })}
              <tr>
                <td colspan={3} style={{ textAlign: 'right', fontSize: '20px', fontWeight: 'bold' }}>
                  Total Amount  RWF {totInvoices.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </TableOpen>
        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />
      }

    </PagesWapper>


  )
}

export default Truck_parking_invoice
