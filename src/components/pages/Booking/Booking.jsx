
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
import InputRow, { DropDownInput, EmptyInputRow, InputOnly, InputRowDate, InputRowDateNoLabel, LongTextINputRow, TimeInputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils, { usertoEditprint } from '../../Global/Utils'
import Commons from '../../services/Commons'
import Repository from '../../services/Repository'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'

import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import { DateInputRow, InputAndSearch } from '../../Global/InputRow'
import SeaarchBytyping, { SearchTableResult } from '../../globalcomponents/SeaarchBytyping'
import { Event } from '../../Global/commonForPages/TableCommons'
import { ErrorSharp } from '@mui/icons-material'
import CurrentDate from '../../Global/CurrentDate'




function Booking() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState(new Date())
  const [date_time2, setDate_time2] = useState(new Date())

  const [eta, seteta] = useState()
  const [etd, setetd] = useState()

  const [vessel_id, setVessel_id] = useState()
  const [contact_n, setContact_n] = useState('')
  const [rura_auth_n, setRura_auth_n] = useState('')
  const [loading_port, setLoading_port] = useState()
  const [status, setStatus] = useState('Pending')
  const [bollardOrVesselNumber, setBollardOrVsselNumber] = useState()
  const [referenceId, setReferenceId] = useState()
  const [referenceIdTwo, setReferenceIdTwo] = useState()
  const [nDate, setNdate] = useState(new Date())
  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [bookings, setBookings] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [vessels, setVessels] = useState([]) //Data List
  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)

  const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
  const { searchTableVisible2, setSearchTableVisible2 } = useContext(ColItemContext)
  const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)
  const [searchItemValueTwo, setSearchItemValueTwo] = useState()
  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name

  const [time, setTime] = useState(null); //eta
  const [time2, setTime2] = useState(null); //etd
  const [description, setDescription] = useState(null); //etd

  const [berthing_side, setBerthing_side] = useState("") //etd
  const { showSelected, setShowSelected } = useContext(ColItemContext)
  const { showSelectedTwo, setShowSelectedTwo } = useContext(ColItemContext)

  const [bollard_or_vessel, setBollard_or_vessel] = useState()

  const [startDate, setStartDate] = useState()
  const [setEndDate, setSetEndDate] = useState()

  const tableHead = ['Operator Name', 'Vessel Name', 'plate number', 'dimension', 'capacity', 'contact number', 'Status']
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/


  const formatDateFn = (date) => {
    const selectedDate = new Date(date)
    // Ensure two-digit month and day (e.g., 2024-02-05)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(selectedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const [vessel_one, setVesselOne] = useState()
  const [vessel_two, setVesselTwo] = useState()
    const authHeader = useAuthHeader()();
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)
    var booking = {
      id: id, date_time: formatDateFn(date_time) + ' ' + time + ':00', vessel_id: vessel_id, contact_n: contact_n,
      rura_auth_n: rura_auth_n, loading_port: loading_port,
      status: status, bollardOrVesselNumber: referenceId + ' - ' + referenceIdTwo,
      eta: formatDateFn(date_time) + ' ' + time,
      etd: formatDateFn(date_time2) + ' ' + time2,
      description: description, berthing_side: berthing_side, bollard_or_vessel: bollard_or_vessel,
      vessel_one: vessel_one, vessel_two: vessel_two
    }
    let msg = ''
    if (!vessel_id) {
      alert('You have to select a vessel')
    } else if (id) {
      StockCommons.updateBooking(booking, id, vessel_id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveBooking(booking, vessel_id, authHeader).then((res) => {

        msg = res.data.message ? res.data.message : ''
        console.log(res.data)
        if (res.data != null) {
          resetAfterSave()
        }
      }).catch((error) => {
        const status = error.response.status;
        if (status == 302) {
          alert(error.response.data.message)
        } else {
          console.log('-----------')
          alert('Error Occured')
        }
      })
    }
    // } else {
    //   alert('The second bollad has to be greater than the first')
    // }
  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllBookings = (page, size, startDate, endDate) => {
    StockRepository.findBooking(startDate, endDate, authHeader).then((res) => {
      setBookings(res.data);
      setDataLoad(true)

    });
  }
  const findVesselByOperator = (searchItemValue) => {
    StockRepository.findVesselByTwoStatusesOperator(searchItemValue, authHeader).then((res) => {
      setItemssbyname(res.data);
      setDataLoad(true)

    });
  }
  const searchOnThirdSecond = (e) => {
    setSearchTableVisible(true)
    const newVal = e.target.value
    const nChar = newVal.length
    setSearchItemValue(newVal)
    findVesselByOperator(searchItemValue)


  }
  const TableTwoSearchOnThirdSecond = (e) => {
    setSearchTableVisible2(true)
    const newVal = e.target.value
    setStrangeVal(newVal)

    // findVesselByOperator(strangeval) // old search
    StockRepository.findVesselBerthedByOpStat(newVal, authHeader).then((res) => {
      setItemssbyname(res.data);
      setDataLoad(true)
    })

    if (searchItemValueTwo) {//if the user has typed in something
      // setCompletedSearch(false)
      // setSearchProgress(true) // Go and show the progress bar,
    }
  }

  useEffect(() => {
    getAllBookings(0, 20, CurrentDate.todaydate(), CurrentDate.todaydate())

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);

  useEffect(() => {
    if (vessel_id < 1) {
      setSearchItemValue('')
    }
  })

  const getBookingById = (id) => {
    StockRepository.findBookingById(id, authHeader).then((res) => {
      setId(res.data.id)
      setDate_time((res.data.eta).split(' ')[0])
      setDate_time2((res.data.etd).split(' ')[0])
      setTime((res.data.eta).split(' ')[1])
      setTime2((res.data.etd).split(' ')[1])
      setVessel_id(res.data.vessel_id)
      if ((res.data.bollardOrVesselNumber).split(' ').length > 1) {
        //choose the bollard type
        setBollardOrVsselNumber('Bollard')
        setReferenceId((res.data.bollardOrVesselNumber).split(' - ')[0])
        setReferenceIdTwo((res.data.bollardOrVesselNumber).split(' - ')[1])
      }
      setBerthing_side(res.data.berthing_side)
      setContact_n(res.data.contact_n)
      setRura_auth_n(res.data.rura_auth_n)
      setBerthing_side(res.data.berthing_side)
      setLoading_port(res.data.loading_port)

      setDescription(res.data.description)
      setStatus(res.data.status)
      searchDone(res.data.vesselId, res.data.vesselName)
      setClearBtn(true)
      setHeight('auto')
    })
  }
  const delBookingById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteBookingById(id).then(() => {
        setRefresh(!refresh)
      })
    }, () => { })
  }
  /*#endregion Listing data*/
  const BolladOrVessel = (val) => {
    if (val == 'Bollard') {
      setBollardOrVsselNumber(true)
      setSearchTableVisible2(false)
    } else {
      setBollardOrVsselNumber(false)
    }
    setBollard_or_vessel(val)
  }


  const firstVessel = (id) => {
    setReferenceId(id)
  }
  const secondVessel = (id) => {
    setReferenceIdTwo(id)
  }


  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllBookings()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setVessel_id("")
    setContact_n("")
    setRura_auth_n("")
    setLoading_port("")
    setStatus("")
    setRefresh(!refresh)

  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setDate_time2("")
    setVessel_id("")
    setContact_n("")
    setRura_auth_n("")
    setLoading_port("")
    setStatus("")

    setTime('')
    setTime2('')
    setVessel_id(null)

    // if ((res.data.bollardOrVesselNumber).split(' ').length > 1) {
    //   //choose the bollard type
    //   setBollardOrVsselNumber('Bollard')
    //   setReferenceId((res.data.bollardOrVesselNumber).split(' - ')[0])
    //   setReferenceIdTwo((res.data.bollardOrVesselNumber).split(' - ')[1])
    // }
    setBerthing_side('')
    setContact_n('')
    setRura_auth_n('')
    setLoading_port('')
    setDescription(null)
    setStatus('')
    searchDone('')
    // setClearBtn(true)


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

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const searchDone = (id, name, owner) => {
    setSearchTableVisible(false)
    setVessel_id(id)
    setReferenceId(id)
    setSearchItemValue(name)
    setShowSelected(true)

    // if (bollard_or_vessel === 'vessel') {

      let refid = id;//this is the first vessel
      setReferenceId(refid)
      StockRepository.findVesselById(refid, authHeader).then((res) => {
        setVesselOne(res.data.name)

      })

    // }
 }

  const searchDone2 = (id, name, owner) => {
    setSearchTableVisible2(false)
    setShowSelectedTwo(true)
    // inputRef2.current.focus();
    const newName = name
    setStrangeVal(newName)
    //set the reference id which may be the vessel id or the bollard id

    if (bollard_or_vessel === 'vessel') {
      let refidTwo = id;//this is the second vessel

      setReferenceIdTwo((refidTwo))
      StockRepository.findVesselById(refidTwo, authHeader).then((res) => {
        setVesselTwo(res.data.name)
      })
    }

    //get the vessel by id (referenceTwo)

  }

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    const MynewTime = time

  };
  const hideSelectorLink = () => {
    setShowSelected(false)
    setSearchItemValue('')
  }
  const hideSelectorLinkTwo = () => {
    setShowSelectedTwo(false)
    setStrangeVal('')

  }
  const [strangeval, setStrangeVal] = useState()

  const getCommonSearchByDate = (startDate, endDate, name, type) => {
    setStartDate(startDate)
    setEndDate(endDate)
    setRefresh(!refresh)
  }
  return (
    <>
      {/* <TruckVhNavBar/> */}
      {/* <PathVesselHome>
        <Col className="col-auto p-0 m-0 ms-2 ">
          <Link to="/bookingform">Booking</Link>
        </Col>
      </PathVesselHome> */}
      <Row>

        <PagesWapper>
          <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
            <ContainerRowBtwn clearBtn={clearBtn} form={'Booking'} showLoader={showLoader}  >
              <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
              <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

                {setSearchTableVisible && <SeaarchBytyping placeholder="Vessel to book, search vessel by operator name"
                  labelName='  Operator' searchTableVisible={searchTableVisible} showSelected={showSelected} hideSelectorLink={hideSelectorLink}
                  currentTypingVal={searchItemValue} ref={inputRef} sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)} />}

                {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />}

                {/* <DateTimePicker label="Basic date time picker" /> */}
                <Row>
                  
                  <Col md={12}>
                    <Row>
                      <Col className='ms-2 ps-3' sm={3}>ETA : {eta}   </Col>
                      <Col className=' pe-4'>
                        <InputRowDateNoLabel nDate={date_time} label="timeInput" handle={(nDate) => setDate_time(nDate)} />
                      </Col>
                      <Col className='ms-1 ps-3' sm={3}>Time</Col>
                      <Col className='pe-4'>
                        <TimeInputRow label="timeInput" val={time} handle={(e) => setTime(e.target.value)} />
                      </Col>
                      <Col className='ms-2 ps-3' sm={3}>ETD</Col>
                      <Col className=' pe-4'>
                        <InputRowDateNoLabel nDate={date_time2} label="timeInput" handle={(nDate) => setDate_time2(nDate)} />
                      </Col>
                      <Col className='ms-1 ps-3' sm={3}>Time</Col>
                      <Col className='pe-4'>
                        <TimeInputRow label="timeInput2" val={time2} handle={(e) => setTime2(e.target.value)} />
                      </Col>
                    </Row>

                  </Col>
                </Row>

                <DropDownInput val={bollard_or_vessel} handle={(e) => BolladOrVessel(e.target.value)} defaultValue={1} name='Bollard/Vessel assigned to ' label='Bollard' >
                  <option selected={bollardOrVesselNumber == 'Bollard'}   >Bollard   </option>
                  <option selected={bollardOrVesselNumber == 'vessel'}    >vessel   </option>
                </DropDownInput>
                {bollardOrVesselNumber &&
                  <>

                    <DropDownInput val={referenceId} handle={(e)=>firstVessel(e.target.value)} name='Small bollard' label='Bollard' >
                      <option selected={referenceId == 1} key={1}>1</option>
                      <option selected={referenceId == 2} key={2}>2</option>
                      <option selected={referenceId == 3} key={3}>3</option>
                      <option selected={referenceId == 4} key={4}>4</option>
                      <option selected={referenceId == 5} key={5}>5</option>
                      <option selected={referenceId == 6} key={6}>6</option>
                      <option selected={referenceId == 7} key={7}>7</option>
                      <option selected={referenceId == 8} key={8}>8</option>
                      <option selected={referenceId == 9} key={9}>9</option>
                      <option selected={referenceId == 10} key={10}>10</option>
                      <option selected={referenceId == 11} key={11}>11</option>
                      <option selected={referenceId == 12} key={12}>12</option>
                    </DropDownInput>

                    <DropDownInput val={referenceIdTwo} handle={(e)=>secondVessel(e.target.value)} name='Bigger bollard' label='Bollard' >
                      <option selected={referenceIdTwo == 1} key={1}>1</option>
                      <option selected={referenceIdTwo == 2} key={2}>2</option>
                      <option selected={referenceIdTwo == 3} key={3}>3</option>
                      <option selected={referenceIdTwo == 4} key={4}>4</option>
                      <option selected={referenceIdTwo == 5} key={5}>5</option>
                      <option selected={referenceIdTwo == 6} key={6}>6</option>
                      <option selected={referenceIdTwo == 7} key={7}>7</option>
                      <option selected={referenceIdTwo == 8} key={8}>8</option>
                      <option selected={referenceIdTwo == 9} key={9}>9</option>
                      <option selected={referenceIdTwo == 10} key={10}>10</option>
                      <option selected={referenceIdTwo == 11} key={11}>11</option>
                      <option selected={referenceIdTwo == 12} key={12}>12</option>
                    </DropDownInput>
                  </>
                }
                {!bollardOrVesselNumber &&
                  <SeaarchBytyping labelName='Operator' searchTableVisible={searchTableVisible2}
                    showSelected={showSelectedTwo} ref={inputRef2} sendRequestOnThirdChar={(e) => TableTwoSearchOnThirdSecond(e)}
                    hideSelectorLink={hideSelectorLinkTwo} currentTypingVal={strangeval} />}

                {searchTableVisible2 && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone2} />} />}
                <DropDownInput val={berthing_side} handle={(e) => setBerthing_side(e.target.value)} name='Berthing  Side' label='Starboard_side/Port'>
                  <option selected={berthing_side == 'Port'} key={1}>  Port  </option>
                  <option selected={berthing_side == 'starboard side'} key={2}> starboard side   </option>

                </DropDownInput>
                {/* <InputRow name='Vessel Id ' val={vessel_id} handle={(e) => setVessel_id(e.target.value)} label='lblvessel_id' /> */}
                <InputRow name='Destination Port ' val={loading_port} handle={(e) => setLoading_port(e.target.value)} label='lblloading_port' />
                <LongTextINputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />

                <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
              </FormInnerRightPane>
              {/* <FormSidePane /> */}
            </ContainerRowBtwn>
          </AnimateHeight>
          <ContainerRow mt='3'>
            <ListToolBar listTitle='Booking List' role="addBerthing" height={height} entity='Booking' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
            <SearchformAnimation searchHeight={searchHeight}>
              <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
            </SearchformAnimation>

            <div ref={componentRef} className="dataTableBox">
              <PrintCompanyInfo />
              <TableOpen>
                <TableHead>

                  <td>ID</td>
                  <td>Vessel </td>
                  <td>Operator Name </td>
                  <td>ETA </td>
                  <td>ETD </td>
                  <td>Destination Port </td>
                  <td>bollard or vessel </td>
                  <td>bollard Or Vessel Number </td>
                  {userType == usertoEditprint && <td className='delButton'>Option</td>}
                </TableHead>
                <tbody>
                  {bookings && bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}   </td>
                      <td>{booking.vesselName}   </td>
                      <td>{booking.operatorName}   </td>
                      <td>{booking.eta}   </td>
                      <td>{booking.etd}   </td>
                      <td>{booking.loading_port}   </td>
                      <td>{booking.bollard_or_vessel}   </td>
                      <td>{booking.bollard_or_vessel === 'vessel' ? booking.vesselOne + ' - ' + booking.vesselTwo : booking.bollardOrVesselNumber}   </td>
                      {userType == usertoEditprint && <ListOptioncol getEntityById={() => getBookingById(booking.id)} delEntityById={() => delBookingById(booking.id)} />}
                    </tr>
                  ))}</tbody>
              </TableOpen>
            </div>
          </ContainerRow>
          {!dataLoad && <DataListLoading />
          }

        </PagesWapper >
      </Row>
    </>

  )
}

export default Booking



export const TableRows = ({ bookings, searchDone }) => {
  return (
    <>
      {bookings && bookings.map((vessel, index) => (<tr>
        <td>{vessel.owner_operator}   </td>
        <td>{vessel.name}   </td>
        <td>{vessel.plate_number}   </td>
        <td>{vessel.dimension}   </td>
        <td>{vessel.capacity}   </td>
        <td>{vessel.contact_number}   </td>
        <td>{vessel.status}    </td>

        <Event item={[vessel.id, vessel.name, vessel.owner_operator]} searchDone={() => {
          searchDone(vessel.id, vessel.name, vessel.owner_operator, vessel.booking_id)
        }} />
      </tr>)
      )}


    </>)

}