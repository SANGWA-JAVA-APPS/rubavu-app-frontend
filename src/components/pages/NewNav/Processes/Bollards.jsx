import React, { useState, useRef, useEffect, useContext } from 'react'

import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
import { useAuthHeader } from 'react-auth-kit';
// import UpdatedComponent from '../../../Global/HOCForm'


import TableHead from '../../../Global/TableHead'


import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputRowDateNoLabel, LongTextINputRow, TimeInputRow } from '../../../Global/Forms/InputRow'
import FormTools from '../../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../../Global/ListTable'
import Utils from '../../../Global/Utils'


import { ColItemContext } from '../../../Global/GlobalDataContentx'
import PagesWapper from '../../../Global/PagesWapper';
import PrintCompanyInfo from '../../../Global/PrintCompanyInfo';
import { DataListLoading } from '../../../Global/Loader'
import SearchBox from '../../../Global/SearchBox'
import StockRepository from '../../../services/StockServices/StockRepository'
import StockCommons from '../../../services/StockServices/StockCommons'
import SeaarchBytyping, { SearchTableResult } from '../../../globalcomponents/SeaarchBytyping'
import { TableRows } from '../../Booking/Booking'
import { Col, Row } from 'react-bootstrap'
import { red } from '@mui/material/colors'
import { Link, useNavigate } from 'react-router-dom'
import { setRef } from '@mui/material'


export const Bollards = () => {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [vessel_id, setVessel_id] = useState()
  const [ata, setAta] = useState()
  const [etd, setEtd] = useState()
  const [bollard_or_vessel, setBollard_or_vessel] = useState("")
  const [vessel_arr_draft, setVessel_arr_draft] = useState()
  const [description, setDescription] = useState()
  const [vessel_or_bollard_refId, setVessel_or_bollard_refId] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [berthings, setBerthings] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)
  const [date_time, setDate_time] = useState(new Date())
  const [date_time2, setDate_time2] = useState(new Date())
  const [time, setTime] = useState(null); //eta
  const [time2, setTime2] = useState(null); //etd
  const { showSelected, setShowSelected } = useContext(ColItemContext)
  const { showSelectedTwo, setShowSelectedTwo, obj, setObj } = useContext(ColItemContext)
  const [berthing_side, setBerthing_side] = useState("") //etd
  const [referenceIdTwo, setReferenceIdTwo] = useState()

  const tableHead = ['Operator Name', 'Vessel Name', 'plate number', 'dimension', 'capacity', 'contact number', 'Status']

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()


  const [berthprint, setBerthprint] = useState(false)
  const navigate = useNavigate()
  const authHeader = useAuthHeader()();



  const [vessel_one, setVesselOne] = useState()
  const [vessel_two, setVesselTwo] = useState()

  const formatDateFn = (date) => {
    const selectedDate = new Date(date)
    // Ensure two-digit month and day (e.g., 2024-02-05)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(selectedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function timeIsCorrect(time1, time2) {
    // Split time strings into hours and minutes
    const [hour1, minute1] = time1.split(":").map(Number);
    const [hour2, minute2] = time2.split(":").map(Number);

    // Compare the times
    if (hour1 < hour2 || (hour1 === hour2 && minute1 < minute2)) {
      return true
    } else if (hour1 > hour2 || (hour1 === hour2 && minute1 > minute2)) {
      // alert(` The ETD time ${time1} cannot be earlier than the ATA  time ${time2} `);
      return false
    } else {
      // alert(`${time1} is the same as ${time1}  ${time2}`);
      return false
    }
  }
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    const updating = time.split(':').length === 3
    //the below two lines makes sure that the time is not apped the double zerows ":00" again while updating the form.
    const reformattedTimeOne = (updating) ? time.split(':')[0] + ':' + time.split(':')[1] + ':' + time.split(':')[2] : time
    const reformattedTimeTwo = (updating) ? time2.split(':')[0] + ':' + time2.split(':')[1] + ':' + time2.split(':')[2] : time2


    const fdOne = (String(date_time).includes('GMT')) ? formatDateFn(date_time) : ((updating) ? date_time : formatDateFn(date_time))
    const fdTwo = (String(date_time2).includes('GMT')) ? formatDateFn(date_time2) : ((updating) ? date_time2 : formatDateFn(date_time2))

    /* #region ----------FORMATE TIME AS HH:MM:SS */
    const formatTime = (time) => {
      const hours = String(time.getHours()).padStart(2, "0");
      const minutes = String(time.getMinutes()).padStart(2, "0");
      const seconds = String(time.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    };

    if (time) {
      const t1 = formatTime(new Date(time))
      setTime(t1);
    }
    if (time2) {
      const t2 = formatTime(new Date(time2))
      setTime2(t2);
    }

    /* #endregion */

    var berthing = {
      id: id, vessel_id: vessel_id,
      ata: `${fdOne} ${updating ? reformattedTimeOne : `${time}:00`}`,
      etd: `${fdTwo} ${updating ? reformattedTimeTwo : `${time2}:00`}`,
      bollard_or_vessel: bollard_or_vessel, vessel_arr_draft: vessel_arr_draft, description: description,
      vessel_or_bollard_refId: vessel_or_bollard_refId + ' - ' + referenceIdTwo, berthing_side: berthing_side,
      vessel_one: vessel_one, vessel_two: vessel_two
    }
    if (!(vessel_id === vessel_or_bollard_refId && bollard_or_vessel === 'Vessel')) {
      if (vessel_id) {

        if (bollard_or_vessel === 'Bollard' && (vessel_or_bollard_refId === referenceIdTwo)) {
          alert('The bollards have to be different')
        } else {
          if (id) {


            StockCommons.updateBerthing(berthing, id, vessel_id, authHeader).then((res) => {
              resetAfterSave()
            })
          } else {
            StockCommons.saveBerthing(berthing, vessel_id, authHeader).then((res) => {
              alert('Berthing saved successfully')
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

      } else {
        alert('You have to select a vessel to berth')
      }
    } else {
      alert('The vessel to berth cannot be the same as the one to berth along side, please pick a different vessel. '
        + bollard_or_vessel + ' vessel: ' + vessel_id + ' bollardOrVessel : ' + vessel_or_bollard_refId)
    }

  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllBerthings = () => {

    StockRepository.findBerthing(startDate, endDate, authHeader).then((res) => {
      setBerthings(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllBerthings()

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getBerthingById = (id) => {
    StockRepository.findBerthingById(id, authHeader).then((res) => {
      setId(res.data.id)
      setTime((res.data.ata).split('T')[1])
      setTime2((res.data.etd).split(' ')[1])

      setDate_time((res.data.ata).split('T')[0])
      setDate_time2((res.data.etd).split(' ')[0])
      setHeight('auto')
      if ((res.data.vessel_or_bollard_refId).split(' - ').length > 1) {
        //choose the bollard type
        setBollard_or_vessel('Bollard')
        // setReferenceId((res.data.vessel_or_bollard_refId).split(' - ')[0])
        setVessel_or_bollard_refId(((res.data.vessel_or_bollard_refId).split(' - ')[0]))

        setReferenceIdTwo((res.data.vessel_or_bollard_refId).split(' - ')[1])
      } else {
        setBollard_or_vessel(res.data.bollard_or_vessel)
      }
      setBerthing_side(res.data.berthing_side)

      setVessel_arr_draft(res.data.vessel_arr_draft)
      setDescription(res.data.description)

      setClearBtn(true)



      //refill the vessel name


      setVessel_id(res.data.vesselId)
      setSearchItemValue(res.data.vesselName)
      setShowSelected(true)
      setSearchTableVisible(false)
    })
  }
  const delBerthingById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteBerthingById(id).then(() => {
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
    getAllBerthings()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setVessel_id("")
    setAta("")
    setEtd("")
    setBollard_or_vessel("")
    setVessel_arr_draft("")
    setDescription("")
    setVessel_or_bollard_refId("")

  }
  const clearHandle = () => {
    setId(null)
    setVessel_id("")
    setAta("")
    setEtd("")
    setBollard_or_vessel("")
    setVessel_arr_draft("")
    setDescription("")
    // setVessel_or_bollard_refId("")

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
  const dontSave = () => {
    return (vessel_id === vessel_or_bollard_refId && bollard_or_vessel === 'Vessel')
  }

  const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
  const { searchTableVisible2, setSearchTableVisible2 } = useContext(ColItemContext)
  const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)

  const findVesselByOperator = (searchItemValue) => {
    StockRepository.findVesselBookedByOpStat(searchItemValue, authHeader).then((res) => {
      setItemssbyname(res.data);
      setDataLoad(true)
    });
  }
  const searchOnThirdSecond = (e) => {
    setSearchTableVisible(true)
    const newVal = e.target.value
    setSearchItemValue(newVal)
    findVesselByOperator(searchItemValue)

  }
  const TableTwoSearchOnThirdSecond = (e) => {
    setSearchTableVisible2(true)
    const newVal = e.target.value
    setStrangeVal(newVal)
    StockRepository.findVesselBerthedByOpStat(strangeval, authHeader).then((res) => {
      setItemssbyname(res.data);
      setDataLoad(true)
    })
    // findVesselByOperator(strangeval)

  }
  const hideSelectorLink = () => {
    setShowSelected(false)
    setSearchItemValue('')
  }
  const hideSelectorLinkTwo = () => {
    setShowSelectedTwo(false)
    setStrangeVal('')

  }

  const inputRef = useRef(null);
  const searchDone = (id, name) => {
    setSearchTableVisible(false)
    setVessel_id(id)
    setSearchItemValue(name)
    setShowSelected(true)

    let refid = id
    StockRepository.findVesselById(refid, authHeader).then((res) => {
      setVesselOne(res.data.name)

    })
  }

  const searchDone2 = (id, name) => {
    setSearchTableVisible2(false)

    setShowSelectedTwo(true)
    setStrangeVal(name)
    //set the reference id which may be the vessel id or the bollard id
    setVessel_or_bollard_refId(id)
    setReferenceIdTwo(id)

    let refidTwo = id
    setReferenceIdTwo((refidTwo))
    StockRepository.findVesselById(refidTwo, authHeader).then((res) => {
      setVesselTwo(res.data.name)
    })
  }
  useEffect(() => {
    if (berthprint) {
      navigate("/pringberth")
    }
  }, [berthprint])

  const printData = (berthing) => {
    setObj(berthing)
    console.log(berthing)
    setBerthprint(true)
  }

  const [strangeval, setStrangeVal] = useState()
  const getCommonSearchByDate = (startDate, endDate, name, type) => {
    setStartDate(startDate)
    setEndDate(endDate)
    setRefresh(!refresh)
  }
  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Berthing'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            {/* <SeaarchBytyping searchOnThirdSecond={searchOnThirdSecond} placeholder="Vessel to berth, search vessel by operator name" labelName='  Operator' searchTableVisible={searchTableVisible} /> */}
            {setSearchTableVisible && <SeaarchBytyping placeholder="Vessel to book, search vessel by operator name"
              labelName='  Operator' searchTableVisible={searchTableVisible} showSelected={showSelected} hideSelectorLink={hideSelectorLink}
              currentTypingVal={searchItemValue} ref={inputRef} sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)} />}

            {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />}

            <Row>
              <Col md={12}>
                <Row>

                  <Col className='ms-2 ps-3' sm={3}>ATA    </Col>
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
            
            <DropDownInput handle={(e) => setBollard_or_vessel(e.target.value)} name='Bollard / Vessel ' label='Bollard' >
              <option selected={bollard_or_vessel == 'Bollard'} value={"Bollard"}  >Bollard   </option>
              <option selected={bollard_or_vessel == 'Vessel'} value={"Vessel"}  >vessel   </option>
            </DropDownInput>

            {bollard_or_vessel === 'Vessel' &&
              <SeaarchBytyping labelName='Operator' searchTableVisible={searchTableVisible2}
                showSelected={showSelectedTwo} sendRequestOnThirdChar={TableTwoSearchOnThirdSecond}
                hideSelectorLink={hideSelectorLinkTwo} currentTypingVal={strangeval} />
            }
            {searchTableVisible2 && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone2} />} />}

            {bollard_or_vessel === 'Bollard' &&
              <>
                <DropDownInput handle={(e) => setVessel_or_bollard_refId(e.target.value)} name='Small Bollard' label='Bollard' >
                  <option selected={vessel_or_bollard_refId == 1} value={1} key={1}>1</option>
                  <option selected={vessel_or_bollard_refId == 2} value={2} key={2}>2</option>
                  <option selected={vessel_or_bollard_refId == 3} value={3} key={3}>3</option>
                  <option selected={vessel_or_bollard_refId == 4} value={4} key={4}>4</option>
                  <option selected={vessel_or_bollard_refId == 5} value={5} key={5}>5</option>
                  <option selected={vessel_or_bollard_refId == 6} value={6} key={6}>6</option>
                  <option selected={vessel_or_bollard_refId == 7} value={7} key={7}>7</option>

                  <option selected={vessel_or_bollard_refId == 8} value={8} key={8}>8   </option>
                  <option selected={vessel_or_bollard_refId == 9} value={9} key={9}>9   </option>
                  <option selected={vessel_or_bollard_refId == 10} value={10} key={10}>10   </option>
                  <option selected={vessel_or_bollard_refId == 11} value={11} key={11}>11   </option>
                  <option selected={vessel_or_bollard_refId == 12} value={12} key={12}>12   </option>

                </DropDownInput>

                <DropDownInput handle={(e) => setReferenceIdTwo(e.target.value)} name='Bigger bollard' label='Bollard' >
                  <option selected={referenceIdTwo == 1} value={1} key={1}>1  </option>
                  <option selected={referenceIdTwo == 2} value={2} key={2}>2   </option>
                  <option selected={referenceIdTwo == 3} value={3} key={3}>3   </option>
                  <option selected={referenceIdTwo == 4} value={4} key={4}>4   </option>
                  <option selected={referenceIdTwo == 5} value={5} key={5}>5   </option>
                  <option selected={referenceIdTwo == 6} value={6} key={6}>6   </option>
                  <option selected={referenceIdTwo == 7} value={7} key={7}>7   </option>

                  <option selected={referenceIdTwo == 8} value={8} key={8}>8   </option>
                  <option selected={referenceIdTwo == 9} value={9} key={9}>9   </option>
                  <option selected={referenceIdTwo == 10} value={10} key={10}>10   </option>
                  <option selected={referenceIdTwo == 11} value={11} key={11}>11   </option>
                  <option selected={referenceIdTwo == 12} value={12} key={12}>12   </option>
                </DropDownInput> </>
            }

            <DropDownInput handle={(e) => setBerthing_side(e.target.value)} val={berthing_side} name='Berthing  Side' label='Starboard_side/Port'>
              <option selected={berthing_side == "Port"}   >Port</option>
              <option selected={berthing_side == "starboard side"}  >starboard side</option>

            </DropDownInput>
            <InputRow name='Vessel Arrival Draft (meter) ' val={vessel_arr_draft} handle={(e) => setVessel_arr_draft(e.target.value)} label='lblvessel_arr_draft' />

            {/* <InputRow name='Vessel Or Bollard Ref.Id ' val={vessel_or_bollard_refId} handle={(e) => setVessel_or_bollard_refId(e.target.value)} label='lblvessel_or_bollard_refId' /> */}
            <LongTextINputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Berthing List' height={height} entity='Berthing' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>Vessel  </td>
              <td>Owner/Operator </td>
              <td>AtA </td>
              <td>Etd </td>
              <td>Bollard Or Vessel </td>
              <td>Bollard - Vessel value </td>
              <td>Arr Draft (m) </td>
              <td>Desc </td>

              <td>plate n. </td>
              <td>dimension   </td>
              <td>capacity (ton)   </td>
             

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {berthings.map((berthing) => (
                <tr key={berthing.id}>

                  <td >{berthing.vesselName}  </td>
                  <td >{berthing.owner_operator}  </td>
                  <td style={{ minWidth: '90px' }}>{(berthing.ata).split('T')[0]} {(berthing.ata).split('T')[1]}
                  </td>
                  <td>{berthing.etd}   </td>
                  <td>{berthing.bollard_or_vessel}   </td>
                  <td>{berthing.bollard_or_vessel==='Vessel'? berthing.vesselOne+' - '+berthing.vesselTwo: berthing.vessel_or_bollard_refId    }  </td>

                  <td>{berthing.vessel_arr_draft}   </td>
                  <td>{berthing.description}   </td>

                  <td>{berthing.plate_number}   </td>
                  <td>{berthing.dimension}   </td>
                  <td>{berthing.capacity && (Number(berthing.capacity)).toLocaleString()}   </td>
                  
                  {userType == 'admin' && <ListOptioncol getEntityById={() => getBerthingById(berthing.id)} delEntityById={() => delBerthingById(berthing.id)}
                    print={true} printData={() => printData(berthing)} />}
                </tr>
              ))}</tbody>
          </TableOpen>
        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />}

    </PagesWapper >


  )
}

