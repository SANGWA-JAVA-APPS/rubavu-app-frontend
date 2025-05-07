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
import InputRow, { DropDownInput, EmptyInputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Commons from '../../services/Commons'
import Repository from '../../services/Repository'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'
import TruckVesselNavBar from '../../Navbar/TruckVesselNavBar'


function TVBooking() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState()
  const [vessel_id, setVessel_id] = useState()
  const [contact_n, setContact_n] = useState()
  const [rura_auth_n, setRura_auth_n] = useState()
  const [loading_port, setLoading_port] = useState()
  const [status, setStatus] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [bookings, setBookings] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var booking = {
      id: id, date_time: date_time, vessel_id: vessel_id, contact_n: contact_n, rura_auth_n: rura_auth_n, loading_port: loading_port, status: status
    }
    if (id) {
      Commons.updateBooking(booking, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveBooking(booking, authHeader).then((res) => {
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
    Repository.findBooking(page, size, authHeader).then((res) => {
      setBookings(res.data.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllBookings(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getBookingById = (id) => {
    StockRepository.findBookingById(id, authHeader).then((res) => {
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

  return (
    <>
    <TruckVesselNavBar/>
      <PagesWapper>

        <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
          <ContainerRowBtwn clearBtn={clearBtn} form={'Booking'} showLoader={showLoader}  >
            <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
            <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
              <InputRow name='Date Time ' val={date_time} handle={(e) => setDate_time(e.target.value)} label='lbldate_time' />
              <InputRow name='Vessel Id ' val={vessel_id} handle={(e) => setVessel_id(e.target.value)} label='lblvessel_id' />
              <InputRow name='Contact N ' val={contact_n} handle={(e) => setContact_n(e.target.value)} label='lblcontact_n' />
              <InputRow name='Rura Auth N ' val={rura_auth_n} handle={(e) => setRura_auth_n(e.target.value)} label='lblrura_auth_n' />
              <InputRow name='Loading Port ' val={loading_port} handle={(e) => setLoading_port(e.target.value)} label='lblloading_port' />
              <InputRow name='Status ' val={status} handle={(e) => setStatus(e.target.value)} label='lblstatus' />

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

                {userType == 'admin' && <td className='delButton'>Option</td>}
              </TableHead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}   </td>
                    <td>{booking.date_time}   </td>
                    <td>{booking.vessel_id}   </td>
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

export default TVBooking
