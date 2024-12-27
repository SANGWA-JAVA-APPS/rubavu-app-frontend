
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
import InputRow, { DropDownInput, EmptyInputRow, InputOnly, InputRowDate, InputRowDateNoLabel, LongTextINputRow } from '../../Global/Forms/InputRow'
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
import SeaarchBytyping, { SearchTableResult } from '../../globalcomponents/SeaarchBytyping'
import { Event } from '../../Global/commonForPages/TableCommons'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'

function Booking() {

  const [profile,setProfile] = useState()

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState(new Date())

  const [trucks,setTrucks ] = useState()


  const [plate_number, setplate_number] = useState()
  const [truck_type, settruck_type] = useState()
  const [driver_id, setdriver_id] = useState()
  const [loading_port, setLoading_port] = useState()
  const [status, setStatus] = useState('pending')
  const [bollardOrVesselNumber, setBollardOrVsselNumber] = useState()
  const [referenceId, setReferenceId] = useState()
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

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/

  const getAllUsers = () => {
    Commons.getprofileByCategory().then(res=>{
      setProfile(res.data)
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)
    const truck = {
      plate_number:plate_number,
      truck_type: truck_type,
      driver_id:driver_id
    }
    console.log(truck)
    if (id) {
      StockRepository.updateTruck(id,truck).then((res) => {
        resetAfterSave()
      })
    } else {
      StockRepository.saveTruck(truck).then((res) => {
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
  const getAllTruck = () => {
    StockRepository.getAllTruck().then((res) => {
      setTrucks(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllTruck()
    getAllUsers()
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getTrucksById = (id) => {
    StockRepository.getTruckById(id).then((res) => {
      setId(res.data.id)
      setplate_number(res.data.plate_number)
      settruck_type(res.data.truck_type)
      setdriver_id(res.data.driver_id)

      console.log(id)
      console.log(plate_number)
      console.log(driver_id)
      console.log(truck_type)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const deleteTruckById = (id) => {

    Utils.Submit(() => StockRepository.deleteTruck(id).then(() => {
      setRefresh(!refresh)
    }))



    // Utils.Submit(() => {
    //   StockRepository.deleteTruck(id).then(() => {
    //     setRefresh(!refresh)
    //   })
    // }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllTruck()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setplate_number("")
    setdriver_id("")
    settruck_type("")
    setRefresh(!refresh)

  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setplate_number("")
    settruck_type("")
    setdriver_id("")
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


  const BolladOrVessel = (val) => {
    if (val == 'Bollard') {
      setBollardOrVsselNumber(true)
    } else {
      setBollardOrVsselNumber(false)
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
          <ContainerRowBtwn clearBtn={clearBtn} form={'Truck'} showLoader={showLoader}  >
            <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
            <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
              <InputRow name='Plate number' val={plate_number} handle={(e) => setplate_number(e.target.value)} label='lbldriver_id' />
              driver:{driver_id}
              <DropDownInput handle={(e) => setdriver_id(e.target.value)} defaultValue={1} name='driver' label='Bollard' >
                {
                  profile && profile.map(profiles=>(
                    <option selected={'Vessel' == "Vessel"} value={profiles.id} key={profiles.id}>{profiles.name} {profiles.surname}</option>
                  ))
                }
              </DropDownInput>
              <InputRow name='Truck Type' val={truck_type} handle={(e) => settruck_type(e.target.value)} label='lbltruck_type' />
            
              <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
            </FormInnerRightPane>
            {/* <FormSidePane /> */}
          </ContainerRowBtwn>
        </AnimateHeight>
        <ContainerRow mt='3'>
          <ListToolBar listTitle='Truck List' height={height} entity='Truck' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
          <SearchformAnimation searchHeight={searchHeight}>
            <SearchBox />
          </SearchformAnimation>

          <div ref={componentRef} className="dataTableBox">
            <PrintCompanyInfo />
            <TableOpen>
              <TableHead>

                <td>ID</td>
                <td>Plate Number</td>
                <td>Driver Id</td>
                <td>Truck type</td>

                {userType == 'admin' && <td className='delButton'>Option</td>}
              </TableHead>
              <tbody>
                {trucks && trucks.map((truck) => (
                  <tr key={truck.id}>
                    <td>{truck.id}   </td>
                    <td>{truck.plate_number}   </td>
                    <td>{truck.truck_type}   </td>
                    <td>{truck.driver_id}   </td>

                    {userType == 'admin' && <ListOptioncol getEntityById={() => getTrucksById(truck.id)} delEntityById={() => deleteTruckById(truck.id)} />}
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
        <td>{vessel.owner_operator}   </td>
        <td>{vessel.name}   </td>
        <td>{vessel.plate_number}   </td>
        <td>{vessel.dimension}   </td>
        <td>{vessel.capacity}   </td>
        <td>{vessel.truck_typeumber}   </td>

        <Event item={[vessel.id, vessel.name]} searchDone={() => {
          searchDone(vessel.id, vessel.name)
        }} />
      </tr>)
      )}


    </>)

}