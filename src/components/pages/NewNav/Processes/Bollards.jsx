import React, { useState, useRef, useEffect, useContext } from 'react'

import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
// import UpdatedComponent from '../../../Global/HOCForm'


import TableHead from '../../../Global/TableHead'


import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputRowDateNoLabel, LongTextINputRow } from '../../../Global/Forms/InputRow'
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
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'


export const Bollards = () => {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [vessel_id, setVessel_id] = useState()
  const [ata, setAta] = useState()
  const [etd, setEtd] = useState()
  const [bollard_or_vessel, setBollard_or_vessel] = useState('Bollard')
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

  const tableHead = ['Operator Name', 'Vessel Name', 'plate number', 'dimension', 'capacity', 'contact number']


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
    const fdOne = formatDateFn(date_time)
    const fdTwo = formatDateFn(date_time2)

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
      ata: fdOne + ' ' + time,
      etd: fdTwo + ' ' + time2,
      bollard_or_vessel: bollard_or_vessel, vessel_arr_draft: vessel_arr_draft, description: description, vessel_or_bollard_refId: vessel_or_bollard_refId
    }
    if (id) {
      StockCommons.updateBerthing(berthing, id).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveBerthing(berthing).then((res) => {
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
  const getAllBerthings = () => {
    StockRepository.findBerthing().then((res) => {
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
    StockStockRepository.findBerthingById(id).then((res) => {
      setId(res.data.id)
      setVessel_id(res.data.vessel_id)
      setAta(res.data.ata)
      setEtd(res.data.etd)
      setBollard_or_vessel(res.data.bollard_or_vessel)
      setVessel_arr_draft(res.data.vessel_arr_draft)
      setDescription(res.data.desc)
      setVessel_or_bollard_refId(res.data.vessel_or_bollard_refId)

      setClearBtn(true)
      showheight('auto')
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
    setVessel_or_bollard_refId("")

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


  const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
  const { searchTableVisible2, setSearchTableVisible2 } = useContext(ColItemContext)
  const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)

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
    }
  }
  const TableTwoSearchOnThirdSecond = () => {
    setSearchTableVisible2(true)
    findVesselByOperator(searchItemValue)
    if (searchItemValue) {//if the user has typed in something
      setCompletedSearch(false)
      setSearchProgress(true) // Go and show the progress bar,
    }
  }
  const searchDone = (id, name) => {
    setSearchTableVisible(false)
    setVessel_id(id)
    setSearchItemValue(name)

  }

  const searchDone2 = (id, name) => {
    setSearchTableVisible2(false)
    setSearchItemValue(name)
    //set the reference id which may be the vessel id or the bollard id

    setVessel_or_bollard_refId(id)

  }

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };
  const handleTimeChange2 = (newTime) => {
    setTime2(newTime);
  };
  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Berthing'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            <SeaarchBytyping searchOnThirdSecond={searchOnThirdSecond} placeholder="Vessel to berth, search vessel by operator name" labelName='  Operator' searchTableVisible={searchTableVisible} />
            {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />}
            <InputRow name='Vessel Id ' moreclass='d-none' val={vessel_id} handle={(e) => setVessel_id(e.target.value)} label='lblvessel_id' />

            <Row className=''>
              <Col md={12} className="form-group ms-1">
                <Row>
                  <Col className='ms-2 ps-3' sm={3}>ATA</Col>
                  <Col className='m-0 pe-0 ' sm={4}>
                    <InputRowDateNoLabel nDate={date_time} label="Date" name="Date" moreclass=" txtAddHeight" handle={(nDate) => setDate_time(nDate)} />
                  </Col>
                  <Col className='m-0 pe-0 ps-3'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker label="Time" format="hh:mm" ampm={true} renderInput={(params) => <TextField {...params} />} onChange={handleTimeChange} />
                    </LocalizationProvider>
                  </Col>
                </Row>
                <Row>
                  <Col className='ms-2 ps-3' sm={3}>ETD</Col>
                  <Col className='m-0 pe-0 ' sm={4}>
                    <InputRowDateNoLabel nDate={date_time2} label="Date" name="Date" moreclass=" txtAddHeight" handle={(nDate) => setDate_time2(nDate)} />
                  </Col>
                  <Col className='m-0 pe-0 ps-3'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker label="Time" format="hh:mm" ampm={true} renderInput={(params) => <TextField {...params} />} onChange={handleTimeChange2} />
                    </LocalizationProvider>
                  </Col>
                </Row>


              </Col>
            </Row>


            {/* <InputRow name='ATA ' val={ata} handle={(e) => setAta(e.target.value)} label='lblata' />
            <InputRow name='ETD ' val={etd} handle={(e) => setEtd(e.target.value)} label='lbletd' /> */}
            {/* <InputRow name='Bollard Or Vessel ' val={bollard_or_vessel} handle={(e) => setBollard_or_vessel(e.target.value)} label='lblbollard_or_vessel' /> */}
            
            <DropDownInput handle={(e) => setBollard_or_vessel(e.target.value)} name='Bollard/Vessel(meter)  ' label='Bollard' >

              <option selected={'Bollard' == "Bollard"} value={"Bollard"} key={1}>Bollard   </option>
              <option selected={'Vessel' == "Vessel"} value={"Vessel"} key={2}>vessel   </option>
            </DropDownInput>
            {bollard_or_vessel === 'Vessel' &&
              <SeaarchBytyping searchOnThirdSecond={TableTwoSearchOnThirdSecond} placeholder="Vessel to book, search vessel by operator name" labelName='  Operator' searchTableVisible={searchTableVisible2} />
            }
            {searchTableVisible2 && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone2} />} />}
            {bollard_or_vessel === 'Bollard' && <DropDownInput handle={(e) => setVessel_or_bollard_refId(e.target.value)} name='Bollard' label='Bollard' >
              <option selected={vessel_id == 1} value={1} key={1}>1  </option>
              <option selected={vessel_id == 2} value={2} key={2}>2   </option>
              <option selected={vessel_id == 3} value={3} key={3}>3   </option>
              <option selected={vessel_id == 4} value={4} key={4}>4   </option>
              <option selected={vessel_id == 5} value={5} key={5}>5   </option>
              <option selected={vessel_id == 6} value={6} key={6}>6   </option>
              <option selected={vessel_id == 7} value={7} key={7}>7   </option>
            </DropDownInput>}






            <InputRow name='Vessel Arrival Draft ' val={vessel_arr_draft} handle={(e) => setVessel_arr_draft(e.target.value)} label='lblvessel_arr_draft' />

            {/* <InputRow name='Vessel Or Bollard Ref.Id ' val={vessel_or_bollard_refId} handle={(e) => setVessel_or_bollard_refId(e.target.value)} label='lblvessel_or_bollard_refId' /> */}
            <LongTextINputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='berthing List' height={height} entity='Berthing' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>ID</td>
              <td>Vessel  </td>
              
              <td>AtA </td>
              <td>Etd </td>
              <td>Bollard Or Vessel </td>
              <td>Bollard Or Vessel value </td>
              <td>Vessel Arr Draft </td>
              <td>Desc </td>
              {/* <td>Vessel Or Bollard RefId </td> */}

              {userType == 'admin' && <td className='delButton d-none'>Option</td>}
            </TableHead>
            <tbody>
              {berthings.map((berthing) => (
                <tr key={berthing.id}>
                  <td>{berthing.id}   </td>
                  <td> berthed vessel  </td>
                  
                  <td>{berthing.ata}   </td>
                  <td>{berthing.etd}   </td>
                  <td>{berthing.bollard_or_vessel}   </td>
                  <td>vessel/bollard value   </td>
                  <td>{berthing.vessel_arr_draft}   </td>
                  <td>{berthing.description}   </td>
                  {/* <td>{berthing.vessel_or_bollard_refId}   </td> */}

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getBerthingById(berthing.id)} delEntityById={() => delBerthingById(berthing.id)} />}
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

