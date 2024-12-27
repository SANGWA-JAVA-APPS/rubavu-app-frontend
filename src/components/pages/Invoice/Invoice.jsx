import React, { useState, useRef, useEffect, useContext } from 'react'
import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
// import UpdatedComponent from '../../../Global/HOCForm'
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputOnlyReadOnly, InputReadOnly, InputRowDateNoLabel } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'

import Utils from '../../Global/Utils'
import Commons from '../../services/Commons'

import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import PagesWapper from '../../Global/PagesWapper';
import ListOptioncol, { TableOpen } from '../../Global/ListTable';
import SeaarchBytyping, { SearchTableResult } from '../../globalcomponents/SeaarchBytyping';
import { Event } from '../../Global/commonForPages/TableCommons';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Col, Row } from 'react-bootstrap';



function Invoice() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [quay_amount, setQuay_amount] = useState()
  const [etd, setEtd] = useState()
  const [vessel_handling_charges, setVessel_handling_charges] = useState({
    id:"",berthing_amount:"", ata:"",capacity:"",mooring_amount: ""

  })
  const [vessel_id, setVessel_id] = useState()
  const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)
  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [invoices, setInvoices] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)

  const tableHead = ['Operator Name', 'Vessel Name', 'plate number', 'dimension', 'capacity', 'contact number']
  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name

  const formatTime = (time) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var invoice = {
      id: id, quay_amount: quay_amount, etd: date_time+' '+time, vessel_handling_charges: vessel_handling_charges, vessel_id: vessel_id
    }
    if (id) {
      StockCommons.updateInvoice(invoice, id).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveInvoice(invoice).then((res) => {
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
  const getAllInvoices = (page, size) => {
    StockRepository.findInvoice().then((res) => {
      setInvoices(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllInvoices(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getInvoiceById = (id) => {
    StockRepository.findInvoiceById(id).then((res) => {
      setId(res.data.id)
      setQuay_amount(res.data.quay_amount)
      setEtd(res.data.etd)
      setVessel_handling_charges(res.data.vessel_handling_charges)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delInvoiceById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteInvoiceById(id).then(() => {
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
    getAllInvoices()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setQuay_amount("")
    setEtd("")
    setVessel_handling_charges("")

  }
  const clearHandle = () => {
    setId(null)
    setQuay_amount("")
    setEtd("")
    setVessel_handling_charges("")

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

    StockRepository.findVesselByVesselId(id).then((res)=>{
      setVessel_handling_charges(res.data)
    })

  }
  const findVesselByOperator = (searchItemValue) => {
    StockRepository.findVesselByOperator(searchItemValue).then((res) => {
      setItemssbyname(res.data);
      setDataLoad(true)

    });
  }
  const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
  const searchOnThirdSecond = () => {
    setSearchTableVisible(true)
    findVesselByOperator(searchItemValue)
    if (searchItemValue) {//if the user has typed in something
      // setCompletedSearch(false)
      // setSearchProgress(true) // Go and show the progress bar,
    }
  }
  const[date_time,setDate_time]=useState(new Date())
  const[time,setTime]=useState( )
  

  const handleTimeChange = (newTime) => {
    setTime(formatTime(newTime));
    
  };

  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Invoice'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <SeaarchBytyping searchOnThirdSecond={searchOnThirdSecond} placeholder="Vessel to berth, search vessel by operator name" labelName='  Operator' searchTableVisible={searchTableVisible} />
            {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />}

            
            {/* <InputRow name='Etd ' val={etd} handle={(e) => setEtd(e.target.value)} label='lbletd' /> */}

            <Row className=''>
              <Col md={12} className="form-group ms-1">
                <Row>
                  <Col className='ms-2 ps-3' sm={3}>ETD</Col>
                  <Col className='m-0 pe-0 ' sm={4}>
                    <InputRowDateNoLabel nDate={date_time} label="Date" name="Date" moreclass=" txtAddHeight" handle={(nDate) => setDate_time(nDate)} />
                  </Col>
                  <Col className='m-0 pe-0 ps-3'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker label="Time" format="hh:mm" ampm={true} renderInput={(params) => <TextField {...params} />} onChange={handleTimeChange} />
                    </LocalizationProvider>
                  </Col>
                </Row>
              </Col>
            </Row>

           
            <br/>
            
            <InputReadOnly name='** Berthing ID ' val={vessel_handling_charges.id}   label='lblvessel_handling_charges' />
            <InputReadOnly name='** ATA' val={vessel_handling_charges.ata}   label='lblvessel_handling_charges' />
            <InputReadOnly name='** Capacity' val={vessel_handling_charges.capacity}   label='lblvessel_handling_charges' />
            <br/>
            <InputReadOnly name='Berthing charges ' val={vessel_handling_charges.berthing_amount} handle={(e) => setQuay_amount(e.target.value)} label='lblquay_amount' />
            <InputReadOnly name='Mooring Charges ' val={vessel_handling_charges.mooring_amount} handle={(e) => setVessel_handling_charges(e.target.value)} label='lblvessel_handling_charges' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='invoice List' height={height} entity='Invoice' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>ID</td>
              <td>Berthing Charges </td>
              <td>Mooring Charges </td>
              <td>Etd </td>

              {userType == 'admin' && <td className='delButton d-none'>Option</td>}
            </TableHead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}   </td>
                  <td>{invoice.quay_amount}   </td>
                  <td>{invoice.vessel_handling_charges}   </td>
                  <td>{invoice.etd}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getInvoiceById(invoice.id)} delEntityById={() => delInvoiceById(invoice.id)} />}
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

export default Invoice

export const TableRows = ({ bookings, searchDone }) => {
  return (
    <>
      {bookings.map((vessel, index) => (<tr>
        <td>{vessel.owner_operator}   </td>
        <td>{vessel.name}   </td>
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