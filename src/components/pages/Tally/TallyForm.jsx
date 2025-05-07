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
import InputRow, { DropDownInput, EmptyInputRow, InputRowDateNoLabel, LongTextINputRow, TimeInputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import { Col, Row } from 'react-bootstrap'


function TallyForm() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [cargo, setCargo] = useState()
  const [unit, setUnit] = useState()
  const [weight, setWeight] = useState()
  const [entry_date, setEntry_date] = useState()
  const [start_date_time, setStart_date_time] = useState(new Date())
  const [end_date_time, setEnd_date_time] = useState(new Date())
  const [destination_id, setDestination_id] = useState()
  const [description, setDescription] = useState()
  const [arrival_id, setArrival_id] = useState()
  const [clients, setClients] = useState([])
  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [tallys, setTallys] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [arrival_notes, setArrival_notes] = useState([]) //Data List
  const { itemOrCargo, setitemOrCargo, chosenProcessId, setChosenProcessId, sourceId, destId, setSourceId, setdestId } = useContext(ColItemContext)

  const [startTime, setStartTime] = useState(null);
  const [endtTime, setEndTime] = useState(null);
  const formatTime = (time) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  const formatDateFn = (date) => {
    const selectedDate = new Date(date)
    // Ensure two-digit month and day (e.g., 2024-02-05)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(selectedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var tally = {
      id: id, cargo: cargo, unit: unit, weight: weight, entry_date: entry_date,
      start_date_time: formatDateFn(start_date_time) + ' ' + startTime,
      end_date_time: formatDateFn(end_date_time) + ' ' + endtTime, destination_id: destId, source_id: sourceId,
      dest_id: destId, description: description, arrival_id: arrival_id
    }
    if (id) {
      StockCommons.updateTally(tally, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveTally(tally, arrival_id, authHeader).then((res) => {
        console.log(res.data)
        if (res.data != null) {
          resetAfterSave()
        }
      }).catch((error) => {
        console.log('-----------')
        alert('Error Occured')
        console.log(error)
      })
    }
  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllTallys = (page, size) => {
    StockRepository.findTally(page, size, authHeader).then((res) => {
      setTallys(res.data);
      setDataLoad(true)

    });
  }
  const findSourceDestinationByArr = (arrivalId) => {
    StockRepository.findSourceDestinationByArr(arrivalId, authHeader).then((res) => {
      setSourceId(res.data.source)
      setdestId(res.data.dest_id)
      console.log('---Source: ' + res.data.source)
      console.log('---destination: ' + res.data.destination)
      setDataLoad(true)

    });
  }


  const getAllArrival_notes = (page, size) => {
    StockRepository.findArrival_note(page, size, authHeader).then((res) => {
      setArrival_notes(res.data);
      setDataLoad(true)

    });
  }
  useEffect(() => {
    setDestination_id(chosenProcessId)
  })
  useEffect(() => {
    getAllTallys(0, 20)
    getAllArrival_notes()
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getTallyById = (id) => {
    StockRepository.findTallyById(id, authHeader).then((res) => {
      setId(res.data.id)
      setCargo(res.data.cargo)
      setUnit(res.data.unit)
      setWeight(res.data.weight)
      setEntry_date(res.data.entry_date)
      setStart_date_time(res.data.start_date_time)
      setEnd_date_time(res.data.end_date_time)
      setDestination_id(res.data.destination_id)
      setSource_id(res.data.source_id)
      setDest_id(res.data.dest_id)
      setDescription(res.data.description)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTallyById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteTallyById(id).then(() => {
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
    getAllTallys()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setCargo("")
    setUnit("")
    setWeight("")
    setEntry_date("")
    setStart_date_time("")
    setEnd_date_time("")
    setDestination_id("")
    // setSource_id("")
    // setDest_id("")
    setDescription("")

  }
  const clearHandle = () => {
    setId(null)
    setCargo("")
    setUnit("")
    setWeight("")
    setEntry_date("")
    setStart_date_time("")
    setEnd_date_time("")
    setDestination_id("")
    setSource_id("")
    setDest_id("")
    setDescription("")

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
  const selectArrivalhandler = (e) => {
    setArrival_id(e.target.value)
    findSourceDestinationByArr(e.target.value)
  }
  return (
    <>
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Tally'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            <DropDownInput handle={(e) => selectArrivalhandler(e, id)} name='Arrival Number' label='Bollard' >
              {arrival_notes.map((arrival) => (
                <option value={arrival.id} key={arrival.id}>    {arrival.id}</option>
              ))}
            </DropDownInput>

            <InputRow name='Cargo ' val={cargo} handle={(e) => setCargo(e.target.value)} label='lblcargo' />
            <InputRow name='Number of items ' val={unit} handle={(e) => setUnit(e.target.value)} label='lblunit' />
            <InputRow name='Weight (Kg) ' val={weight} handle={(e) => setWeight(e.target.value)} label='lblweight' />

            <Row>
              <Col md={12}>
                <Row>
                  <Col className='ms-2 ps-3' sm={3}>Start Date    </Col>
                  <Col className=' pe-4'>
                    <InputRowDateNoLabel nDate={start_date_time} label="timeInput" handle={(nDate) => setStart_date_time(nDate)} />
                  </Col>
                  <Col className='ms-1 ps-3' sm={3}>StartTime</Col>
                  <Col className='pe-4'>
                    <TimeInputRow label="timeInput" val={startTime} handle={(e) => setStartTime(e.target.value)} />
                  </Col>
                  <Col className='ms-2 ps-3' sm={3}>End Date    </Col>
                  <Col className=' pe-4'>
                    <InputRowDateNoLabel nDate={end_date_time} label="timeInput" handle={(nDate) => setEnd_date_time(nDate)} />
                  </Col>
                  <Col className='ms-1 ps-3' sm={3}>End Time</Col>
                  <Col className='pe-4'>
                    <TimeInputRow label="timeInput" val={endtTime} handle={(e) => setEndTime(e.target.value)} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <LongTextINputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />
            

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='tally List' height={height} entity='Tally' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Cargo </td>
              <td>Unit </td>
              <td>Weight </td>
              <td>Entry Date </td>
              <td>Start Date Time </td>
              <td>End Date Time </td>
              <td>Destination Id </td>
              <td>Source Id </td>
              <td>Dest Id </td>
              <td>Description </td>

              {userType == 'admin' && <td className='delButton d-none'>Option</td>}
            </TableHead>
            <tbody>
              {tallys.map((tally) => (
                <tr key={tally.id}>
                  <td>{tally.id}   </td>
                  <td>{tally.cargo}   </td>
                  <td>{tally.unit}   </td>
                  <td>{tally.weight}   </td>
                  <td>{tally.entry_date}   </td>
                  <td>{tally.start_date_time}   </td>
                  <td>{tally.end_date_time}   </td>
                  <td>{tally.destination_id}   </td>
                  <td>{tally.source_id}   </td>
                  <td>{tally.dest_id}   </td>
                  <td>{tally.description}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getTallyById(tally.id)} delEntityById={() => delTallyById(tally.id)} />}
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

export default TallyForm  
