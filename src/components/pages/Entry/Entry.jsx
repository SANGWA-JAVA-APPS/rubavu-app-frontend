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
import InputRow, { DropDownInput, EmptyInputRow, InputRowDate, InputRowDateNoLabel, InputRowNumber } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'

import Commons from '../../services/Commons'
import StockDelete from '../../services/StockServices/StockDelete'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import Repository from '../../services/Repository'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'
import StockRepository from '../../services/StockServices/StockRepository'
import { Col, Row } from 'react-bootstrap'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Entry() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [cargo, setcargo] = useState()
  const [unit, setunit] = useState()
  // const [destination_id, setDestination_id] = useState()
  const [time_arrival, setTime_arrival] = useState()
  const [time_moored, setTime_moored] = useState()
  const [weight, setWeight] = useState()
  const [dateArrival,setDateArrival] = useState()
  const [timeArrival,setTimeArrival] = useState()

  const {destination_id} = useContext(ColItemContext)
  const [dateMoored,setDateMoored] = useState()
  const [timeMoored,setTimeMoored] = useState()
  

  const [allTrucks, setAllTrucks] = useState()
  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [entrys, setEntrys] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);
  

  const [sourcePlate_number, setsourcePlate_number] = useState()
  const [sourceTruck_type, setsourceTruck_type] = useState()
  const [sourceDriver_id, setsourceDriver_id] = useState()

  const [destinationPlate_number, setdestinationPlate_number] = useState()
  const [destinationTruck_type, setdestinationTruck_type] = useState()
  const [destinationDriver_id, setdestinationDriver_id] = useState()
  const [profile,setProfile] = useState()
  const [sourceMore,setSourceMore] = useState(true)
  const [destinationMore,setDestinationMore] = useState(true)
  const [sourceTruck,setsourceTruck] = useState(false)
  const [destinationTruck,setdestinationTruck]  = useState(false)

  //arrivals
  const [profilesArrival,setProfilesArrival] = useState()
  const [profileId,setProfileId] = useState()
  const [arrivalId,setArrivalId] = useState(0)

  const [createArrival,setCreateArrival] = useState(true)

  const [vessalValues,setVessalValues] = useState({
    "capacity": "",
    "contact_number": "",
    "dimension": "",
    "loa": "",
    "name": "",
    "owner_operator": "",
    "plate_number": ""
  })

  const handleSaveVesselData=(e)=>{
    const { name, value } = e.target;
    setVessalValues({
      ...vessalValues,
      [name]:value
    })
  }


  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/

  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllEntrys()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setcargo("")
    setunit("")
    setWeight("")
    setDateArrival("")
    setTimeArrival("")
    setDateMoored("")
    setTimeMoored("")
    setsourcePlate_number("")
    setsourceDriver_id("")
    setdestinationDriver_id("")
    setdestinationPlate_number("")
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var tally = {
      "destination": destination_id,
      "cargo": cargo,
      "unit": unit,
      "weight": weight,
      "arrival_id": arrivalId,
      // "description": "string",
      "time_arrival": `${dateArrival} ${timeArrival}`,
      "time_moored": `${dateMoored} ${timeMoored}`,
      "sourcePlate_number": sourcePlate_number,
      "sourceDriver": sourceDriver_id,
      "sourceTruck_type": sourceTruck_type,
      "destinationPlate_number": destinationPlate_number,
      "destinationDriver": destinationDriver_id,
      "destinationTruck_type": destinationTruck_type
    }


    if (id) {
      Commons.updateEntry(entry, id).then((res) => {
        resetAfterSave()
      })
    } else {
      axios.post("http://localhost:8101/stock/api/tally/savetally",tally,{ headers: StockRepository.getHeaders }).then((res) => {
        console.log(res.data)
        alert(res.data)
        if (res.data != null) {
          resetAfterSave()
        }
      }).catch((error) => {
        console.log('-----------')
        alert('Error Occured')
      })
      console.log(arrivalId)
    }
  }
  /*#endregion Listing data*/

  const getAllUsers = () => {
    Commons.getprofileByCategory().then(res=>{
      setProfile(res.data)
    })
  }

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllEntrys = (page, size) => {
    Repository.findEntry(page, size).then((res) => {
      setEntrys(res.data.data);
      setDataLoad(true)

    });
  }

  const getAllTrucks = () => {
    console.log(destination_id)
    StockRepository.getAllTruck().then(res=>{
      setAllTrucks(res.data)
      console.log("-----------------------------------------------")
      console.log(res.data)
    })
  }

  //arrival data

  const onSaveArrival = (e) => {
    e.preventDefault()
    alert
    const profileData = {
      id: profileId
    }
    StockRepository.saveArrival(profileData).then(res=>{
      setArrivalId(res.data.id)
      setCreateArrival(false)
    })

  }

  const getProfiles = () => {
    StockRepository.getClientProfiles("client").then(res=>{
      setProfilesArrival(res.data)
      console.log("-------------------&&&&------------------")
      console.log(res.data)
    })
  }




  useEffect(() => {
    getAllEntrys(0, 20)
    getAllTrucks()
    getAllUsers()
    getProfiles()
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getEntryById = (id) => {
    StockRepository.findEntryById(id).then((res) => {
      setId(res.data.id)
      setcargo(res.data.cargo)
      setunit(res.data.unit)
      setDestination_id(res.data.destination_id)
      setTime_arrival(res.data.time_arrival)
      setTime_moored(res.data.time_moored)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delEntryById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteEntryById(id).then(() => {
        setRefresh(!refresh)
      })
    }, () => { })
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const clearHandle = () => {
    setId(null)
    setcargo("")
    setunit("")
    setDestination_id("")
    setTime_arrival("")
    setTime_moored("")

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

  const[date_time,setDate_time]=useState()

  const handleTimeChange=(time)=>{
    setTimeArrival(time)
  }
  const handleTimeChange1 = (time) => {
    setTimeMoored(time);
  }

  const changeTitle =  `${destination_id==1?"Vessel To Vessel":
      destination_id==2?"Vessel To Truck":destination_id==3?"Truck To Truck":
      destination_id==4?"Truck To Vessel": ""
    }`
  
  const vesselForm = () => {
    return <div>
      <InputRow nam="" name='Capacity' val={vessalValues.capacity} handle={(e) => setsourcePlate_number(e.target.value)} label='lblsourceDriver_id' />
      <InputRow nam="" name='Contact Number' val={vessalValues.contact_number} handle={(e) => setsourcePlate_number(e.target.value)} label='lblsourceDriver_id' />
      <InputRow nam="" name='Dimension' val={vessalValues.dimension} handle={(e) => setsourcePlate_number(e.target.value)} label='lblsourceDriver_id' />
      <InputRow nam="" name='LOA' val={vessalValues.loa} handle={(e) => setsourcePlate_number(e.target.value)} label='lblsourceDriver_id' />
      <InputRow nam="" name='Name' val={vessalValues.name} handle={(e) => setsourcePlate_number(e.target.value)} label='lblsourceDriver_id' />
      <InputRow nam="" name='Owner Operator' val={vessalValues.owner_operator} handle={(e) => setsourcePlate_number(e.target.value)} label='lblsourceDriver_id' />
      <InputRow nam="" name='Plate Number' val={vessalValues.plate_number} handle={(e) => setsourcePlate_number(e.target.value)} label='lblsourceDriver_id' />
      
    </div>
  }
  return (
    <>
      {/* <TruckVhNavBar /> */}
      {/* <PagesWapper> */}
      <div className={createArrival?"":"d-none"}>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Arrival Notice'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSaveArrival}>
            <div className=' '>
              <DropDownInput handle={(e) => setProfileId(e.target.value)} defaultValue={1} name='client' label='Bollard' >
                {
                  profilesArrival && profilesArrival.map(profiles=>(
                    <option selected={'Vessel' == "Vessel"} value={profiles.id} key={profiles.id}>{profiles.name} {profiles.surname}</option>
                  ))
                }
              </DropDownInput>
            </div>
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      </div>
      <>{vesselForm()}</>
      <div className={createArrival?"d-none":""}>
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'tally'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <h2 className='fw-bolder'>Arrival Number: {arrivalId<10?"00"+arrivalId:arrivalId<100?"0"+arrivalId:arrivalId}</h2>
            <InputRowNumber name='number of items' val={unit} handle={(e) => setunit(e.target.value)} label='lbldestination_id' />
            <InputRowNumber name='Weight' val={weight} handle={(e) => setWeight(e.target.value)} label='lbldestination_id' />
            <InputRow name='Cargo' val={cargo} handle={(e) => setcargo(e.target.value)} label='lbldestination_id' />
            

            <Row className=''>
              <Col md={12} className="form-group ms-1">
                <Row>
                  <Col className='ms-2 ps-3' sm={3}>Date arrival</Col>
                  <Col className='m-0 pe-0 ' sm={4}>
                    <InputRowDateNoLabel nDate={dateArrival} label="Date" name="Date" moreclass=" txtAddHeight" handle={(nDate) => setDateArrival(nDate)} />
                  </Col>
                  <Col className='m-0 pe-0 ps-3'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker label="Time" format="hh:mm" ampm={true} renderInput={(params) => <TextField {...params} />} onChange={handleTimeChange} />
                    </LocalizationProvider>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className=''>
              <Col md={12} className="form-group ms-1">
                <Row>
                  <Col className='ms-2 ps-3' sm={3}>Date moored</Col>
                  <Col className='m-0 pe-0 ' sm={4}>
                    <InputRowDateNoLabel nDate={dateMoored} label="Date" name="Date" moreclass=" txtAddHeight" handle={(nDate) => setDateMoored(nDate)} />
                  </Col>
                  <Col className='m-0 pe-0 ps-3'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker label="Time" format="hh:mm" ampm={true} renderInput={(params) => <TextField {...params} />} onChange={handleTimeChange1} />
                    </LocalizationProvider>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* <DropDownInput handle={(e) => setCatId(e.target.value)} name='Source' label='trucktype' >
              {
                allTrucks && allTrucks.map(res=>(
                  <option value={res.id}>{res.sourcePlate_number} {res.sourceTruck_type}</option>
                ))
              }
            </DropDownInput> */}
            <Link onClick={()=>setsourceTruck(!sourceTruck)}>   Choose Source Truck</Link>
            <div className={sourceTruck?"":"d-none"}>
            <InputRow name='Plate number' val={sourcePlate_number} handle={(e) => setsourcePlate_number(e.target.value)} label='lblsourceDriver_id' />
              {/* <Link onClick={()=>setSourceMore(true)}>show more</Link> */}
              <div className={sourceMore?"":"d-none"}>
                <DropDownInput handle={(e) => setsourceDriver_id(e.target.value)} defaultValue={1} name='driver' label='Bollard' >
                  {
                    profile && profile.map(profiles=>(
                      <option selected={'Vessel' == "Vessel"} value={profiles.id} key={profiles.id}>{profiles.name} {profiles.surname}</option>
                    ))
                  }
                </DropDownInput>
                <InputRow name='Truck Type' val={sourceTruck_type} handle={(e) => setsourceTruck_type(e.target.value)} label='lblsourceTruck_type' />
              </div>
            </div>
            <br /><Link className={sourceTruck?"":"d-none"} onClick={()=>setdestinationTruck(!destinationTruck)}>Choose Destination Truck</Link>
            <div className={destinationTruck?"":"d-none"}>
            <InputRow name='Plate number' val={destinationPlate_number} handle={(e) => setdestinationPlate_number(e.target.value)} label='lblsourceDriver_id' />
              {/* <Link onClick={()=>setDestinationMore(true)}>show more</Link> */}
              <div className={destinationMore?"":"d-none"}>
                <DropDownInput handle={(e) => setdestinationDriver_id(e.target.value)} defaultValue={1} name='driver' label='Bollard' >
                  {
                    profile && profile.map(profiles=>(
                      <option selected={'Vessel' == "Vessel"} value={profiles.id} key={profiles.id}>{profiles.name} {profiles.surname}</option>
                    ))
                  }
                </DropDownInput>
                <InputRow name='Truck Type' val={destinationTruck_type} handle={(e) => setdestinationTruck_type(e.target.value)} label='lblsourceTruck_type' />
              </div>
            </div>
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      </div>
      <ContainerRow mt='3'>
        <ListToolBar listTitle={`${changeTitle} Records History`} height={height} entity='new record' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>ID</td>
              <td>Date Time </td>
              <td>Book Id </td>
              <td>Destination Id </td>
              {/* <td>Time Arrival </td>
              <td>Time Moored </td> */}

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {entrys.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}   </td>
                  <td>{entry.cargo}   </td>
                  <td>{entry.unit}   </td>
                  <td>{entry.destination_id}   </td>
                  {/* <td>{entry.time_arrival}   </td>
                  <td>{entry.time_moored}   </td> */}

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getEntryById(entry.id)} delEntityById={() => delEntryById(entry.id)} />}
                </tr>
              ))}</tbody>
          </TableOpen>
        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />
      }
    </>



  )
}

export default Entry
