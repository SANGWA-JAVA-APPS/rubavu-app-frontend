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
import InputRow, { DropDownInput, EmptyInputRow, InputRowDateNoLabel, TimeInputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils, { usertoEditprint } from '../../Global/Utils'
import Commons from '../../services/Commons'

import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import { Col, Row } from 'react-bootstrap'
import SeaarchBytyping, { SearchTableResult } from '../../globalcomponents/SeaarchBytyping'
import { TableRows } from '../Invoice/Invoice'
import { useNavigate } from 'react-router-dom';
import CurrentDate from '../../Global/CurrentDate';
import StockDelete from '../../services/StockServices/StockDelete'


function Entry() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [weight_of_truck, setWeight_of_truck] = useState()
  const [truck_id, setTruck_id] = useState()
  const [cargo_type, setCargo_type] = useState()
  const [get_in_time, setGet_in_time] = useState(new Date())
  const [full_or_empty, setFull_or_empty] = useState()
  const [full_vessel_truck_warehouse, setFull_vessel_truck_warehouse] = useState()

  const [plate_number, setPlate_number] = useState()
  const [truck_type, setTruck_type] = useState()
  const [driver_name, setDriver_name] = useState()
  const [driver_contact, setDriver_contact] = useState()

  const [seal_number, setSeal_number] = useState()
  const [destination, setDestination] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [truck_entrys, setTruck_entrys] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [cargo_owner, setCargo_owner] = useState()
  const { obj, setObj } = useContext(ColItemContext)
  const navigate = useNavigate()
  const [time, setTime] = useState(null);
  const tableHead = ['Operator Name', 'Vessel Name', 'plate number', 'dimension', 'capacity', 'contact number']
  const authHeader = useAuthHeader()();
  const [startDate, setStartDate] = useState(CurrentDate.todaydate())
  const [endDate, setEndDate] = useState(CurrentDate.todaydate())
  const [type, setType] = useState('');
  const [truck_woodenboat, setTruck_woodenboat] = useState()

  const [selectedTime, setSelectedTime] = useState('');

  const formatDateFn = (date) => {
    const selectedDate = new Date(date)
    // Ensure two-digit month and day (e.g., 2024-02-05)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(selectedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const isTimeInFuture = (timeStr) => {
    if (!timeStr) return false;
    const [inputHrs, inputMins] = timeStr.split(':').map(Number);
    const now = new Date();
    const currentHrs = now.getHours();
    const currentMins = now.getMinutes();

    return inputHrs > currentHrs || (inputHrs === currentHrs && inputMins > currentMins);
  };


  var TruckEntryDTO = {}
  const [truckData, setTruckData] = useState({
    plate_number: '', truck_id: '',
    cargo_owner: '', truck_type: '',
    cargo_type: '', get_in_time: '',
    driver_name: '', weight_of_truck: '',
    full_or_empty: '', full_vessel_truck_warehouse: '',
    seal_number: '', driver_contact: '',
    time: '', clearBtn: false, height: 'auto',
  });
  const initializeTruckData = () => {
    const truckData = {
      plate_number: plate_number, truck_id: id, cargo_owner: cargo_owner, truck_type: truck_type, cargo_type: cargo_type, get_in_time: formatDateFn(get_in_time) + ' ' + time,
      driver_name: driver_name, driver_contact: driver_contact, weight_of_truck: weight_of_truck, full_or_empty: full_or_empty, full_vessel_truck_warehouse: full_vessel_truck_warehouse, seal_number: seal_number, clearBtn: true,
      height: 'auto',
    };
    return truckData;
  };
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)
    TruckEntryDTO = {
      //truck
      plate_number: plate_number,
      driver_id: null,
      truck_type: truck_type,

      //driver
      mdl_profile: {
        name: driver_name,
        telephone: driver_contact,
      },

      //driver contact
      o_truck_entrys: [
        {
          id: id,
          weight_of_truck: weight_of_truck,
          full_or_empty: full_or_empty,
          cargo_type: cargo_type,
          seal_number: seal_number,
          full_vessel_truck_warehouse: full_vessel_truck_warehouse,
          get_in_time: formatDateFn(get_in_time) + ' ' + time + ':00',
          cargo_owner: cargo_owner, truck_woodenboat: truck_woodenboat
        }
      ]
    }


    if (driver_name.split(' ').length > 1) {
      if (id) {
        const truckData = initializeTruckData();
        const requiredFields = [
          'plate_number', 'truck_id',
          'cargo_owner', 'truck_type',
          'cargo_type', 'get_in_time',
          'driver_name', 'driver_contact',
          'weight_of_truck', 'full_or_empty',
          'full_vessel_truck_warehouse', 'seal_number',
        ];
        const isValid = requiredFields.every((field) => truckData[field] !== '' && truckData[field] !== null && truckData[field] !== undefined);
        if (!isValid) {
          console.error('Missing required fields:', truckData);
          alert('Please fill in all required fields.');
          return;
        }
        // if (isTimeInFuture(time)) {
        //   alert('Selected time cannot be in the future.');

        // }

        StockCommons.updateTruck_entry(truckData, id, authHeader).then((res) => {
          resetAfterSave()
        })

      } 
      // else if (isTimeInFuture(time)) {
      //   alert('Selected time cannot be in the future.');
      //   return;
      // } 
      else {

        StockCommons.saveTruck_entry(TruckEntryDTO, authHeader).then((res) => {
          console.log(res.data)
          if (res.data != null) {
            resetAfterSave()
          }
        }).catch((error) => {
          console.log('-----------')
          alert('Error Occured')
        })
      }
    } else {
      alert("Error, you have to provide both names of the driver")
    }
  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllTruck_entrys = (e) => {
    StockRepository.findTruck_entry(authHeader, startDate, endDate).then((res) => {
      setTruck_entrys(res.data);
      setDataLoad(true)
    });
  }
  const [maxTime, setMaxTime] = useState('');

  useEffect(() => {
    getAllTruck_entrys(0, 20)

    setUserType(localStorage.getItem('catname'))
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setMaxTime(`${hours}:${minutes}`);

  }, [refresh]);


  const getTruck_entryById = (id) => {
    StockRepository.findTruck_entryById(id, authHeader).then((res) => {
      setHeight('auto')
      setId(res.data.id)
      setPlate_number(res.data.plate_number)
      setTruck_id(res.data.id)
      setCargo_owner(res.data.cargo_owner)
      setTruck_type(res.data.truck_type)
      setCargo_type(res.data.cargo_type)
      setGet_in_time(res.data.get_in_time)
      setDriver_contact(res.data.driver_contact)
      setClearBtn(true)
      showheight('auto')
      setDriver_name(res.data.driver_name)
      setWeight_of_truck(res.data.weight_of_truck)
      setFull_or_empty(res.data.full_or_empty)
      setFull_vessel_truck_warehouse(res.data.full_vessel_truck_warehouse)
      setSeal_number(res.data.seal_number)
      setDriver_contact(res.data.driver_contact)
      setGet_in_time(res.data.get_in_time)
      setTime(res.data.get_in_time.split('T')[1])
      setGet_in_time(res.data.get_in_time.split('T')[0])



    })
  }
  const delTruck_entryById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteTruck_entryById(id).then(() => {
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
    getAllTruck_entrys()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setWeight_of_truck("")
    setTruck_id("")
    setCargo_type("")
    setGet_in_time("")

  }
  const clearHandle = () => {
    setId(null)
    setWeight_of_truck("")
    setTruck_id("")
    setCargo_type("")
    setGet_in_time("")

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
  const hideSelectorLink = () => {
    setShowSelected(false)
    setSearchItemValue('')
  }

  const findVesselByOperator = (searchItemValue) => {
    StockRepository.findVesselByOperator(searchItemValue, authHeader).then((res) => {
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
  const searchDone = (id, name, owner) => {
    setSearchTableVisible(false)
    // setVessel_id(id)
    setSearchItemValue(name)
    setShowSelected(true)
    inputRef.current.focus();
  }
  /* #endregion */


  const [loadedPrintableData, setLoadedPrintableData] = useState(false)
  useEffect(() => {
    if (loadedPrintableData) {
      navigate('/truckEntryPrint')
      console.log(obj)
    }
  }, [loadedPrintableData])

  const printData = (obj) => {
    setId(obj.id)
    setObj(obj)
    setLoadedPrintableData(true)
  }
  const getCommonSearchByDate = (startDate, endDate, name) => {

    if ('plate_number' == type) {
      const pn = name
      StockRepository.findTruck_entryByPlate_number(name, authHeader).then((res) => {
        setTruck_entrys(res.data.content);
        setDataLoad(true)
      });
    } else {

      setStartDate(startDate)
      setEndDate(endDate)
      setRefresh(!refresh)
    }
  }



  const handleTime = (e) => {
    const value = e.target.value;
    setSelectedTime(value);
    setTime(value)

    // if (value > maxTime) {
    //   alert('Selected time cannot be in the future.');
    //   setSelectedTime(''); // reset invalid time
    // }
  }
  return (
    <PagesWapper>
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Truck Entry'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <DropDownInput val={truck_woodenboat} handle={(e) => setTruck_woodenboat(e.target.value)} defaultValue={1} name='Truck/W ooden Boat ' label='twb' >
              <option selected={truck_type == 'truck'}  >Truck </option>
              <option selected={truck_type == 'wooden boat'}    >Wooden boat</option>
            </DropDownInput>

            <InputRow name='License Plate Number ' val={plate_number} handle={(e) => setPlate_number(e.target.value)} label='lblweight_of_truck' />
            <InputRow name='Cargo Owner ' val={cargo_owner} handle={(e) => setCargo_owner(e.target.value)} label='lblcargo_owner' />

            <DropDownInput val={truck_type} handle={(e) => setTruck_type(e.target.value)} defaultValue={1} name='Truck Type ' label='Bollard' >
              <option selected={truck_type == 'Box truck'}          >Box truck</option>
              <option selected={truck_type == '20ft container'}    >20ft container</option>
              <option selected={truck_type == '40ft container'}    >40ft container</option>
              <option selected={truck_type == '2x20ft container'}    >2x20ft container</option>
              <option selected={truck_type == 'others'}    >others   </option>
            </DropDownInput>

            <InputRow name='Driver Names ' val={driver_name} handle={(e) => setDriver_name(e.target.value)} label='lblweight_of_truck' />
            <InputRow name='Driver contact number ' val={driver_contact} handle={(e) => setDriver_contact(e.target.value)} label='lblweight_of_truck' />
            <InputRow num={true} name='Weight Of Truck(tons) ' val={weight_of_truck} handle={(e) => setWeight_of_truck(e.target.value)} label='lblweight_of_truck' />
            <DropDownInput val={full_or_empty} handle={(e) => setFull_or_empty(e.target.value)} defaultValue={1} name='Full/Empty' label='Bollard' >
              <option selected={full_or_empty == 'Full'}>Full</option>
              <option selected={full_or_empty == 'Empty'}>Empty</option>

            </DropDownInput>


            <DropDownInput val={full_vessel_truck_warehouse} handle={(e) => setFull_vessel_truck_warehouse(e.target.value)} defaultValue={1} name='Select Vessel/Truck/WH' label='Bollard' >
              <option selected={full_vessel_truck_warehouse == "Vessel"}  >Vessel   </option>
              <option selected={full_vessel_truck_warehouse == "Truck"}  >Truck   </option>
              <option selected={full_vessel_truck_warehouse == "Warehouse"}  >Warehouse   </option>
              <option selected={full_or_empty == 'TBD'}>Other</option>
            </DropDownInput>

            {(full_or_empty === 'Full' && full_vessel_truck_warehouse == 'Vessel' && setSearchTableVisible) &&
              <SeaarchBytyping placeholder="Vessel to book, search vessel by operator name"
                labelName='  Operator' searchTableVisible={searchTableVisible}
                showSelected={showSelected}
                hideSelectorLink={hideSelectorLink}
                currentTypingVal={searchItemValue}
                ref={inputRef}
                sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)} />
            }
            {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />}

            <InputRow name='Cargo Type ' val={cargo_type} handle={(e) => setCargo_type(e.target.value)} label='lblcargo_type' />
            <InputRow name='Seal Number (optional)' val={seal_number} handle={(e) => setSeal_number(e.target.value)} label='lblcargo_type' />
            <Row>
              <Col md={12}>
                <Row>
                  <Col className='ms-2 ps-3' sm={3}>Get-in time   </Col>
                  <Col className=' pe-4'>
                    <InputRowDateNoLabel nDate={get_in_time} label="timeInput" handle={(nDate) => setGet_in_time(nDate)} />
                  </Col>
                  <Col className='ms-1 ps-3' sm={3}></Col>
                  <Col className='pe-4'>
                    <TimeInputRow max={maxTime} label="timeInput" val={time} handle={(e) => handleTime(e)} />
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
        <ListToolBar listTitle='Truck Entry List' role="addGateEntry" height={height} entity='Truck Entry' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate}
            options={[{ name: 'plate_number', value: 'plate_number', label: 'Plate number' }]} setType={setType} />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>ID </td>
              <td className="text-center">Plate N. </td>
              <td className="text-center">Truck Type </td>
              <td className="text-center">Weight (tons)</td>
              <td className="text-center">Plate Number </td>
              <td className="text-center">Cargo Type </td>
              <td className="text-center">cargo owner </td>
              <td className="text-center">Get In Time </td>
              <td className="text-center">full/Empty </td>
              <td className="text-center">Source / Destination</td>
              <td className="text-center">seal Number </td>
              {usertoEditprint(userType) && <td className='delButton '>Option</td>}
            </TableHead>
            <tbody>
              {truck_entrys.map((truck_entry) => (
                <tr key={truck_entry.id}>

                  <td>{truck_entry.id}   </td>
                  <td className="text-center">{truck_entry.plate_number}   </td>
                  <td className="text-center">{truck_entry.truck_type}   </td>
                  <td className="text-center">{truck_entry.weight_of_truck}   </td>
                  <td className="text-center">{truck_entry.plate_number}   </td>
                  <td className="text-center">{truck_entry.cargo_type}   </td>
                  <td className="text-center">{truck_entry.cargo_owner}   </td>
                  <td className="text-center">{(truck_entry.get_in_time)?.includes('T') ? (truck_entry.get_in_time)?.split('T')[0] + ' ' + (truck_entry.get_in_time)?.split('T')[1] : truck_entry.get_in_time}   </td>
                  <td className="text-center">{truck_entry.full_or_empty}   </td>
                  <td className="text-center">{truck_entry.full_vessel_truck_warehouse}   </td>
                  <td className="text-center">{truck_entry.seal_number}   </td>
                  {usertoEditprint(userType) && <ListOptioncol print={true} 
                  editRole="updateGateEntry" deleteRole="deleteGateEntry"
                   printData={() => printData(truck_entry)}
                    getEntityById={() => getTruck_entryById(truck_entry.id)} delEntityById={() => delTruck_entryById(truck_entry.id)} />}
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

export default Entry
