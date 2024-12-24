
import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
// import UpdatedComponent from '../../Global/HOCForm'
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputOnly, InputRowDate, InputRowDateNoLabel } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Commons from '../../services/Commons'
import Repository from '../../services/Repository'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'
import { PathVesselHome } from '../NewNav/BreadCrumb'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import { DateInputRow, InputAndSearch } from '../../Global/InputRow'
import SeaarchBytyping from '../../globalcomponents/SeaarchBytyping'
import { Event } from '../../Global/commonForPages/TableCommons'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'

function Booking() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState()
  const [vessel_id, setVessel_id] = useState()
  const [contact_n, setContact_n] = useState()
  const [rura_auth_n, setRura_auth_n] = useState()
  const [loading_port, setLoading_port] = useState()
  const [status, setStatus] = useState('pending')
  const [bollardNumber, setBollardNumber] = useState()
  const [nDate, setNdate] = useState(new Date())
  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [bookings, setBookings] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState();
  const [searchHeight, setSearchHeight] = useState();
  const [refresh, setRefresh] = useState(false);
  const [vessels, setVessels] = useState([]) //Data List
  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)

  const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
  const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)

  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
  const tableHead = ['Vessel Name', 'Operator Name', 'plate number', 'dimension','capacity', 'contact number']

  const [time, setTime] = useState(null);

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)
    var booking = {
      id: id, date_time: date_time + ' ' + time, vessel_id: vessel_id, contact_n: contact_n, rura_auth_n: rura_auth_n, loading_port: loading_port, status: status, bollardNumber: bollardNumber
    }
    if (id) {
      StockCommons.updateBooking(booking, id).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveBooking(booking, vessel_id).then((res) => {
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
  const getAllBookings = (page, size) => {
    StockRepository.findBooking().then((res) => {
      setBookings(res.data);
      setDataLoad(true)

    });
  }
  const findVesselByOperator = (searchItemValue) => {
    StockRepository.findVesselByOperator(searchItemValue).then((res) => {
      setItemssbyname(res.data);
      setDataLoad(true)

    });
  }


  const searchOnThirdSecond = () => {
    setSearchTableVisible(true)
    findVesselByOperator(searchItemValue)
    if (searchItemValue) {//if the user has typed in something
      setCompletedSearch(false)
      setSearchProgress(true) // Go and show the progress bar,

      // StockRepository.findItemssbyname(searchItemValue).then(res => {
      //   setItemssbyname(res.data)

      //   setSearchProgress(false)
      // })
    }
  }

  useEffect(() => {
    getAllBookings(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getBookingById = (id) => {
    StockRepository.findBookingById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.date_time)
      setVessel_id(res.data.vessel_id)
      setContact_n(res.data.contact_n)
      setRura_auth_n(res.data.rura_auth_n)
      setLoading_port(res.data.loading_port)
      setStatus(res.data.status)

      setClearBtn(true)
      showheight('auto')
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
    setVessel_id("")
    setContact_n("")
    setRura_auth_n("")
    setLoading_port("")
    setStatus("")

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


  const searchDone = (id, name) => {

    setSearchTableVisible(false)
    setVessel_id(id)
    setSearchItemValue(name)
  }

  const handleTimeChange = (newTime) => {

  };
  const [bollardOrVessel, setBollardOrVessel] = useState(false)
  const BolladOrVessel = (val) => {
    if (val == 'Bollard') {
      setBollardOrVessel(true)
    } else {
      setBollardOrVessel(false)
    }
  }

  return (
    <>
      {/* <TruckVhNavBar/> */}
      <PathVesselHome>
        <Col className="col-auto p-0 m-0 ms-2 ">
          <Link to="/bookingform">Booking</Link>
        </Col>
      </PathVesselHome>
      <PagesWapper>

        <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
          <ContainerRowBtwn clearBtn={clearBtn} form={'Booking'} showLoader={showLoader}  >
            <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
            <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

              <Row className=''>
                <Col md={12} className="form-group ms-1">
                  <Row>
                    <Col className='ms-1 ps-3' sm={3}>Date/Time Arrival</Col>
                    <Col className='m-0 pe-0'>
                      <InputRowDateNoLabel nDate={nDate} label="Date" name="Date" moreclass="w-75 txtAddHeight" handle={(nDate) => setNdate(nDate)} />
                    </Col>
                    <Col className='m-0 pe-0 ps-3'>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Time"
                          format="hh:mm"
                          ampm={true}
                          renderInput={(params) => <TextField {...params} />}
                          onChange={handleTimeChange} />
                      </LocalizationProvider>
                    </Col>

                    <SeaarchBytyping tableHead={tableHead} searchOnThirdSecond={searchOnThirdSecond} labelName='Vessel'
                      TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />
                  </Row>
                </Col>
              </Row>
              {/* <InputRow name='Vessel Id ' val={vessel_id} handle={(e) => setVessel_id(e.target.value)} label='lblvessel_id' /> */}
              <InputRow name='Contact N ' val={contact_n} handle={(e) => setContact_n(e.target.value)} label='lblcontact_n' />
              <InputRow name='Rura Auth N ' val={rura_auth_n} handle={(e) => setRura_auth_n(e.target.value)} label='lblrura_auth_n' />
              <InputRow name='Loading Port ' val={loading_port} handle={(e) => setLoading_port(e.target.value)} label='lblloading_port' />



              <DropDownInput handle={(e) => BolladOrVessel(e.target.value)} name='Bollard/Vessel ' label='Bollard' >

                <option selected={vessel_id == "Bollard"} value={"Bollard"} key={2}>Bollard   </option>
                <option selected={vessel_id == "Vessel"} value={"Vessel"} key={2}>vessel   </option>
              </DropDownInput>
              {bollardOrVessel &&
                <DropDownInput handle={(e) => setVessel_id(e.target.value)} name='Bollard' label='Bollard' >
                  <option selected={vessel_id == 1} value={1} key={1}>1  </option>
                  <option selected={vessel_id == 2} value={2} key={2}>2   </option>
                  <option selected={vessel_id == 3} value={3} key={3}>3   </option>
                  <option selected={vessel_id == 4} value={4} key={4}>4   </option>
                  <option selected={vessel_id == 5} value={5} key={5}>5   </option>
                  <option selected={vessel_id == 6} value={6} key={6}>6   </option>
                  <option selected={vessel_id == 7} value={7} key={7}>7   </option>
                </DropDownInput>
              }
              {!bollardOrVessel &&
                <SeaarchBytyping tableHead={tableHead} searchOnThirdSecond={searchOnThirdSecond} labelName='Vessel'
                  TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />
              }
              <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
            </FormInnerRightPane>
            {/* <FormSidePane /> */}
          </ContainerRowBtwn>
        </AnimateHeight>
        <ContainerRow mt='3'>
          <ListToolBar listTitle='booking List' height={height} entity='Booking' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
          <SearchformAnimation searchHeight={searchHeight}>
            <SearchBox />
          </SearchformAnimation>

          <div ref={componentRef} className="dataTableBox">
            <PrintCompanyInfo />
            <TableOpen>
              <TableHead>

                <td>ID</td>
                <td>Date Time </td>
                <td>Vessel Id </td>
                <td>Contact N </td>
                <td>Rura Auth N </td>
                <td>Loading Port </td>
                <td>Status </td>

                {userType == 'admin' && <td className='delButton '>Option</td>}
              </TableHead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}   </td>
                    <td>{booking.date_time}   </td>
                    <td>{booking.mdl_vessel.name}   </td>
                    <td>{booking.contact_n}   </td>
                    <td>{booking.rura_auth_n}   </td>
                    <td>{booking.loading_port}   </td>
                    <td>{booking.status}   </td>

                    {userType == 'admin' && <ListOptioncol getEntityById={() => getBookingById(booking.id)} delEntityById={() => delBookingById(booking.id)} />}
                  </tr>
                ))}</tbody>
            </TableOpen>
          </div>
        </ContainerRow>
        {!dataLoad && <DataListLoading />
        }

      </PagesWapper>
    </>

  )
}

export default Booking



export const TableRows = ({ bookings, searchDone }) => {
  return (
    <>
      {bookings.map((vessel, index) => (<tr>
        <td>{vessel.name}   </td>
        <td>{vessel.owner_operator}   </td>
        <td>{vessel.plate_number}   </td>
        <td>{vessel.dimension}   </td>
        <td>{vessel.capacity}   </td>
        <td>{vessel.contact_number}   </td>

        <Event item={[vessel.id, vessel.name]} searchDone={() => {
          searchDone(vessel.id, vessel.name)
        }} />
      </tr>)
      )}


    </>)

}