import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
import { useAuthHeader } from 'react-auth-kit';
// import UpdatedComponent from '../../../Global/HOCForm'
import PrintCompanyInfo from '../../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../../Global/Loader';
import TableHead from '../../../Global/TableHead'
import SearchBox from '../../../Global/SearchBox'
import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormInnerRightPaneFull, FormSidePane, SaveUpdateBtns } from '../../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputReadOnly, InputRowDateNoLabel, LongTextINputRow, TimeInputRow } from '../../../Global/Forms/InputRow'
import FormTools from '../../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../../Global/ListTable'
import Utils from '../../../Global/Utils'
import Commons from '../../../services/Commons'

import { ColItemContext } from '../../../Global/GlobalDataContentx'
import StockRepository from '../../../services/StockServices/StockRepository'
import StockCommons from '../../../services/StockServices/StockCommons'
import SeaarchBytyping, { SearchTableResult } from '../../../globalcomponents/SeaarchBytyping'
import { TableRows } from '../../Invoice/Invoice'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import SearchResultTable from '../../sale/SearchResultTable'
import { TitleSmallDesc } from '../../../globalcomponents/TitleSmallDesc'
import { SmallSplitter, Splitter } from '../../../globalcomponents/Splitter'


function Unberthing() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [vessel_id, setVessel_id] = useState()
  const [atd, setAtd] = useState()
  const [departure_draft, setDeparture_draft] = useState()
  const [desc, setDesc] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [unberthings, setUnberthings] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { itemOrCargo, setitemOrCargo , obj, setObj } = useContext(ColItemContext)

  const tableHead = ['Operator Name', 'Vessel Name', 'plate number', 'dimension', 'capacity', 'contact number']

  const authHeader = useAuthHeader()();
  const navigate=useNavigate()

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
  // const hideSelectorLinkTwo = () => {
  //   setShowSelectedTwo(false)
  //   setStrangeVal('')
  // }
  const findVesselByOperator = (searchItemValue) => {
    StockRepository.findVesselPaidByOperator(searchItemValue, authHeader).then((res) => {
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
  //previous steps
  const [sName, setSName] = useState()
  const [splate_number, setSplate_number] = useState()
  const [sdimension, setSdimension] = useState()
  const [scapacity, setScapacity] = useState()
  const [sowner_operator, setSowner_operator] = useState()
  const [srura_certificate, setSrura_certificate] = useState()
  const [scontact_number, setScontact_number] = useState()
  const [sloa, setSloa] = useState()
  //berthing
  const [sata, setSata] = useState()
  const [setd, setSetd] = useState()
  const [sbollard_or_vessel, setSbollard_or_vesseletd] = useState()
  const [svessel_arr_draft, setSvessel_arr_draft] = useState()
  const [sdescription, setSdescription] = useState()
  const [svessel_or_bollard_refId, setSvessel_or_bollard_refId] = useState()
  const [sberthing_side, setSberthing_side] = useState()
  //Booking
  const [sdate_time, setSdate_time] = useState()
  const [scontact_n, setScontact_n] = useState()
  const [srura_auth_n, setSrura_auth_n] = useState()
  const [sloading_port, setSloading_port] = useState()
  const [sstatus, setSstatus] = useState()
  const [sbollardOrVesselNumber, setSbollardOrVesselNumber] = useState()
  const [seta, setSeta] = useState()
  const [sbkEtd, setSbkEtd] = useState()
  const [bkDescription, setBkDescription] = useState()
  const [sbkBerthing_side, setSbkBerthing_side] = useState()
  //invoice
  const [squay_amount, setSquay_amount] = useState()
  const [invEtd, setSinvEtd] = useState()
  const [svessel_handling_charges, setSvessel_handling_charges] = useState()

  //Payment (receipt)
  const [spytDate_time, setSPytDate_time] = useState()

  const [spayment, setSpayment] = useState()


  const searchDone = (id, name, owner) => {
    setSearchTableVisible(false)
    setVessel_id(id)
    setSearchItemValue(name)
    setShowSelected(true)

    StockRepository.findVesselDetailsUnberth(id, authHeader).then((res) => {
      setSName(res.data[0].name)
      setSplate_number(res.data[0].plate_number)
      setSdimension(res.data[0].dimension)
      setScapacity(res.data[0].capacity)
      setSowner_operator(res.data[0].owner_operator)
      setSrura_certificate(res.data[0].rura_certificate)
      setScontact_number(res.data[0].contact_number)

      //berthing
      setSata(res.data[0].etd)
      setSetd(res.data[0].etd)
      setSbollard_or_vesseletd(res.data[0].bollard_or_vesseletd)
      setSvessel_arr_draft(res.data[0].vessel_arr_draft)
      setSdescription(res.data[0].description)
      setSvessel_or_bollard_refId(res.data[0].vessel_or_bollard_refId)
      setSberthing_side(res.data[0].berthing_side)
      //booking

      setSdate_time(res.data[0].date_time)
      setScontact_n(res.data[0].contact_n)
      setSrura_auth_n(res.data[0].rura_auth_n)
      setSloading_port(res.data[0].loading_port)
      setSstatus(res.data[0].status)
      setSbollardOrVesselNumber(res.data[0].bollardOrVesselNumber)
      setSeta(res.data[0].eta)
      setSbkEtd(res.data[0].eta)
      setBkDescription(res.data[0].bkDescription)
      setSbkBerthing_side(res.data[0].bkBerthing_side)

      //invoice
      setSquay_amount(res.data[0].quay_amount)
      setSinvEtd(res.data[0].invEtd)
      setSvessel_handling_charges(res.data[0].svessel_handling_charges)

      //receipt
      setSPytDate_time(res.data[0].pytDate_time)
      setSpayment(res.data[0].payment)

    })

  }
  /* #endregion */



  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var unberthing = {
      id: id, vessel_id: vessel_id, atd: atd, departure_draft: departure_draft, desc: desc
    }
    if (id) {
      StockCommons.updateUnberthing(unberthing, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveUnberthing(unberthing, vessel_id, authHeader).then((res) => {
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
  const getAllUnberthings = (page, size) => {
    StockRepository.findUnberthing(page, size, authHeader).then((res) => {
      setUnberthings(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllUnberthings(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getUnberthingById = (id) => {
    StockRepository.findUnberthingById(id, authHeader).then((res) => {
      setId(res.data.id)
      setVessel_id(res.data.vessel_id)
      setAtd(res.data.atd)
      setDeparture_draft(res.data.departure_draft)
      setDesc(res.data.desc)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delUnberthingById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteUnberthingById(id).then(() => {
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
    getAllUnberthings()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setVessel_id("")
    setAtd("")
    setDeparture_draft("")
    setDesc("")

  }
  const clearHandle = () => {
    setId(null)
    setVessel_id("")
    setAtd("")
    setDeparture_draft("")
    setDesc("")

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

  const [showHideVesseDetails, setShowHideVeselDetails] = useState(false)
  const [showHideBerthingDetails, setShowHideBerthingDetails] = useState(false)
  const [unberthPrint, setUnberthPrintprint] = useState(false)

  const printData=(unberthing)=>{
    setObj(unberthing)
    setUnberthPrintprint(true)
  }
  useEffect(()=>{
    if (unberthPrint){
      navigate("/unberthPrint")
    }

  },[unberthPrint])
  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Unberthing'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPaneFull onSubmitHandler={onSubmitHandler}>
            
            {setSearchTableVisible &&
              <SeaarchBytyping placeholder="Vessel to book, search vessel by operator name"
                labelName='  Operator' searchTableVisible={searchTableVisible}
                showSelected={showSelected}
                hideSelectorLink={hideSelectorLink}
                currentTypingVal={searchItemValue}
                ref={inputRef}
                sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)} />
            }
            {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />}

            {/* searchTableVisible-----context
                    showSelected ----------context
                    hideSelectorLink  -----method
                    searchItemValue
                    inputRef
                    searchOnThirdSecond
                    tableHead ------------- here on same form
                    itemssbyname
                    searchDone ----------here
                */}
            {showSelected &&
              <Row>
                <SmallSplitter />
                <Col md={6}>

                  <TitleSmallDesc title="Invoice" />
                  <InputReadOnly name='VESSEL  ' val={sName} label='lblvessel_numDays' />
                  <InputReadOnly name='Quay amount' val={squay_amount} label='lblvessel_numDays' />
                  <InputReadOnly name='Inv. Etd' val={invEtd} label='lblvessel_numDays' />

                </Col>

                <Col md={6}>
                  <TitleSmallDesc title="Receipt" />
                  <InputReadOnly name='Receipt Date time' val={spytDate_time} label='lblvessel_numDays' />
                  <InputRow name='Receipt Amount' val={spayment} label='lblvessel_numDays' />
                </Col>
                <Link onClick={() => setShowHideVeselDetails(!showHideVesseDetails)} className="ms-3">More  Details</Link>

                {showHideVesseDetails && <>

                  <Col md={6}>
                    <InputReadOnly name='***Plate number ' val={splate_number} label='splate_number' />
                    <InputReadOnly name='Dimension ' val={sdimension} label='sdimension' />
                    <InputReadOnly name='Capacity ' val={scapacity} label='scapacity' />
                    <InputReadOnly name='owner/operator' val={sowner_operator} label='sowner_operator' />
                    <InputReadOnly name='srura_certificate' val={srura_certificate} label='srura_certificate' />
                    <InputReadOnly name='Contact number' val={scontact_number} label='scontact_number' />
                    <InputReadOnly name='loa' val={sloa} label='srura_certificate' />
                  </Col>
                  <Col md={6}>

                    <InputReadOnly name='**ata ' val={sata} label='lblvessel_numDays' />
                    <InputReadOnly name='ETD' val={setd} label='lblvessel_numDays' />
                    <InputReadOnly name='bollard or vessel ' val={sbollard_or_vessel} label='lblvessel_numDays' />
                    <InputReadOnly name='vessel arr. draft' val={svessel_arr_draft} label='lblvessel_numDays' />
                    <InputReadOnly name='sescription ' val={sdescription} label='lblvessel_numDays' />
                    <InputReadOnly name='vessel or bollard value' val={svessel_or_bollard_refId} label='lblvessel_numDays' />
                    <InputReadOnly name='berthing side' val={sberthing_side} label='lblvessel_numDays' />

                  </Col>
                  <Col md={6}>
                    <h4 className="ms-3">Booking</h4>
                    <InputReadOnly name='date time' val={sdate_time} label='lblvessel_numDays' />
                    <InputReadOnly name='contact_n' val={scontact_n} label='lblvessel_numDays' />
                    <InputReadOnly name='rura_auth_n' val={srura_auth_n} label='lblvessel_numDays' />
                    <InputReadOnly name='loading_port' val={sloading_port} label='lblvessel_numDays' />
                    <InputReadOnly name='bollardOrVesselNumber' val={sbollardOrVesselNumber} label='lblvessel_numDays' />
                    <InputReadOnly name='status' val={sstatus} label='lblvessel_numDays' />
                    <InputReadOnly name='eta' val={seta} label='lblvessel_numDays' />
                    <InputReadOnly name='Etd' val={sbkEtd} label='lblvessel_numDays' />
                    <InputReadOnly name='Description' val={bkDescription} label='lblvessel_numDays' />
                    <InputReadOnly name='Berthing side' val={sbkBerthing_side} label='lblvessel_numDays' />
                  </Col>
                </>}
              </Row>}
            <br />
            <Row>
              <Col md={12}>
                <Row>
                  <Col className='ms-2 ps-3' sm={3}>Time</Col>
                  <Col className='pe-4 me-1'>
                    <TimeInputRow label="timeInput" val={atd} handle={(e) => setAtd(e.target.value)} />
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* <InputRow name='ATD ' val={atd} handle={(e) => setAtd(e.target.value)} label='lblatd' /> */}
            <InputRow name='Departure Draft ' val={departure_draft} handle={(e) => setDeparture_draft(e.target.value)} label='lbldeparture_draft' />
            <LongTextINputRow name='Description ' val={desc} handle={(e) => setDesc(e.target.value)} label='lbldesc' />


            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPaneFull>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Unberthing List' height={height} entity='Unberthing' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <thead className="databtablehead">
              <td colSpan={2} className="border border-light">Vessel</td>
              <td colSpan={3} className="border border-light">Unberth</td>
              <td colSpan={2} className="border border-light">Payment</td>
              <td style={{borderRight:'1px solid #fff !important'}} colSpan={3}>Invoice</td>
            </thead>
            <TableHead>

              <td>ID</td>
              <td>Vessel </td>

              <td>Atd </td>
              <td>Departure Draft </td>
              <td>Desc </td>

              <td>Payment Date </td>
              <td>Payment Amount </td>

              <td>Invoice Quay amount </td>
              <td>Invoiced handling charges</td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {unberthings.map((unberthing) => (
                <tr key={unberthing.id}>
                  <td>{unberthing.id}   </td>
                  <td>{unberthing.name}   </td>
                  <td>{unberthing.atd}   </td>
                  <td>{unberthing.departure_draft}   </td>
                  <td>{unberthing.ubthDescription}   </td>
                  <td>{unberthing.pytDate_time}   </td>
                  <td>{unberthing.payment}   </td>
                  <td>{unberthing.quay_amount}   </td>
                  <td>{unberthing.vessel_handling_charges}   </td>

                  {userType == 'admin' && <ListOptioncol print={true}
                   printData={()=>printData(unberthing)} getEntityById={() => getUnberthingById(unberthing.id)} delEntityById={() => delUnberthingById(unberthing.id)} />}
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

export default Unberthing
