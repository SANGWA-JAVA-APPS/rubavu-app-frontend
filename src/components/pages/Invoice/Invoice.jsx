import React, { useState, useRef, useEffect, useContext } from 'react'
import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
import { useAuthHeader } from 'react-auth-kit';
// import UpdatedComponent from '../../../Global/HOCForm'
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputOnlyReadOnly, InputReadOnly, InputRowDateNoLabel, TimeInputRow } from '../../Global/Forms/InputRow'
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
import StockDelete from '../../services/StockServices/StockDelete'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CurrentDate from '../../Global/CurrentDate';

import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'



function Invoice() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [quay_amount, setQuay_amount] = useState()
  const [etd, setEtd] = useState()
  const [isEditing, setIsEditing] = useState(false)

  const [vessel_id, setVessel_id] = useState()
  const { searchItemValue, setSearchItemValue, obj, setObj } = useContext(ColItemContext)
  /*#endregion ENTITY FIELDS DECLARATION */
  const [vessel_handling_charges, setVessel_handling_charges] = useState({
    id: "", berthing_amount: "", ata: "", capacity: "", mooring_amount: "", numDays: "", loa: ""

  })
  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [invoices, setInvoices] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)
  const tableHead = ['Operator Name', 'Vessel Name', 'plate number', 'dimension', 'capacity', 'contact number', "Status"]
  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
  const [tariffService, setTariffService] = useState([]) //Data List searched by name

  const { showSelected, setShowSelected } = useContext(ColItemContext)
  const { showSelectedTwo, setShowSelectedTwo } = useContext(ColItemContext)
  const [invoiceprint, setInvoiceprint] = useState(false)
  const [number_days, setNumber_days] = useState(vessel_handling_charges.numDays)

  const [startDate, setStartDate] = useState(CurrentDate.todaydate())
  const [endDate, setEndDate] = useState(CurrentDate.todaydate())

  const authHeader = useAuthHeader()();
  const formatTime = (time) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  const navigate = useNavigate()
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const formatDateFn = (date) => {
    const selectedDate = new Date(date)
    // Ensure two-digit month and day (e.g., 2024-02-05)
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(selectedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_invoice = {
      id: id, quay_amount: vessel_handling_charges.berthing_amount, etd: formatDateFn(date_time) + ' ' + time + ':00',
      vessel_handling_charges: vessel_handling_charges.mooring_amount,
      vessel_id: vessel_id, number_days: number_days
    }
    if (id) {
      StockCommons.updateInvoice(mdl_invoice, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveInvoice(mdl_invoice, vessel_id, authHeader).then((res) => {
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
  const getAllInvoices = () => {
    StockRepository.findInvoice(startDate, endDate, authHeader).then((res) => {
      // Filter out deleted records
      setInvoices(res.data.filter(invoice => !invoice.isDeleted));
      setDataLoad(true)
    });
  }
  const getAlltarrifs = (page, size) => {
    StockRepository.findtariffservices(authHeader).then((res) => {
      setTariffService(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllInvoices()
    getAlltarrifs()
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getInvoiceById = (id) => {
    StockRepository.findInvoiceById(id, authHeader).then((res) => {
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
    setShowSelected(true)
    // getInvoiceById(id)
    //find the berth charges
    StockRepository.findVesselByVesselId(id, authHeader).then((res) => {
      setVessel_handling_charges(res.data)
    })
    inputRef.current.focus();

  }
  const findVesselByOperator = (searchItemValue) => {
    StockRepository.findVesselBerthedByOpStat(searchItemValue, authHeader).then((res) => {
      setItemssbyname(res.data);
      setDataLoad(true)

    });
  }
  const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
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

  const inputRef = useRef(null);
  const [strangeval, setStrangeVal] = useState()


  const hideSelectorLink = () => {
    setShowSelected(false)
    setSearchItemValue('')
  }
  const hideSelectorLinkTwo = () => {
    setShowSelectedTwo(false)
    setStrangeVal('')

  }
  const [date_time, setDate_time] = useState(new Date())
  const [time, setTime] = useState()


  const handleTimeChange = (newTime) => {
    setTime(formatTime(newTime));

  };


  useEffect(() => {
    if (vessel_handling_charges.numDays) {
      setNumber_days(vessel_handling_charges.numDays)
    }
  }, [vessel_handling_charges.numDays])

  useEffect(() => {
    if (invoiceprint) {
      navigate("/pringinvoice", { state: { numDays: number_days } })
    }
  }, [invoiceprint])

  const printData = (invoice) => {
    setObj(invoice)
    console.log(invoice)
    setInvoiceprint(true)

  }

  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1)
    setEndDate(date2)
    setRefresh(!refresh)
  }

let totBerthing=0.0, totWharfage=0.0

  const [editingRowId, setEditingRowId] = useState(null);
  const [editFields, setEditFields] = useState({ quay_amount: '', vessel_handling_charges: '' });

  const startEditRow = (invoice) => {
    setEditingRowId(invoice.id);
    setEditFields({
      quay_amount: invoice.quay_amount || '',
      vessel_handling_charges: invoice.vessel_handling_charges || ''
    });
  };

  const cancelEditRow = () => {
    setEditingRowId(null);
    setEditFields({ quay_amount: '', vessel_handling_charges: '' });
  };

  const saveEditRow = async (invoiceId) => {
    try {
      await StockRepository.updateInvoiceField(invoiceId, 'quay_amount', Number(editFields.quay_amount), authHeader);
      await StockRepository.updateInvoiceField(invoiceId, 'vessel_handling_charges', Number(editFields.vessel_handling_charges), authHeader);
      setInvoices(prev =>
        prev.map(inv =>
          inv.id === invoiceId ? { ...inv, quay_amount: Number(editFields.quay_amount), vessel_handling_charges: Number(editFields.vessel_handling_charges) } : inv
        )
      );
      cancelEditRow();
    } catch (err) {
      alert('Failed to update. Please try again.');
    }
  };

  const delPaymentAdviceById = (id) => {
    Utils.Submit(() => {
      StockDelete.deletePaymentAdviceById(id).then(() => {
        // Update local state to remove the deleted item
        setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.id !== id));
        setRefresh(!refresh)
      })
    }, () => { })
  }

  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Payment Advices '} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            
            {setSearchTableVisible && <SeaarchBytyping placeholder="Vessel to book, search vessel by operator name"
              labelName='  Operator' searchTableVisible={searchTableVisible} showSelected={showSelected} hideSelectorLink={hideSelectorLink}
              currentTypingVal={searchItemValue} ref={inputRef} sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)} />}

            {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />}


            {/* <InputRow name='Etd ' val={etd} handle={(e) => setEtd(e.target.value)} label='lbletd' /> */}

            <Row>
              <Col md={12}>
                <Row>
                  <Col className='ms-2 ps-3' sm={3}>ETD    </Col>
                  <Col className=' me-4  '>
                    <InputRowDateNoLabel nDate={date_time} label="timeInput" handle={(nDate) => setDate_time(nDate)} />
                  </Col>
                  <Col className='ms-1 ps-3' sm={3}>Time</Col>
                  <Col className='pe-4'>
                    <TimeInputRow label="timeInput" val={time} handle={(e) => setTime(e.target.value)} />
                  </Col>
                </Row>
              </Col>
            </Row>

            <InputReadOnly name='** Number of days ' val={vessel_handling_charges.numDays} label='lblvessel_numDays' />
            <InputReadOnly name='** Berthing ID ' val={vessel_handling_charges.id} label='lblvessel_handling_charges' />
            {/* <InputReadOnly name='** ATA' val={(vessel_handling_charges.ata).split('T')[0]+' '+ (vessel_handling_charges.ata).split('T')[1]} label='lblvessel_handling_charges' /> */}
            <InputReadOnly name='** ATA' val={
              String(vessel_handling_charges.ata).includes('T') ?
                (vessel_handling_charges.ata).split('T')[0] + ' ' + (vessel_handling_charges.ata).split('T')[1] : vessel_handling_charges.ata} label='lblvessel_handling_charges' />
            <InputReadOnly name='** Capacity (tons)' val={vessel_handling_charges.capacity} label='lblvessel_handling_charges' />
            <InputReadOnly name='** LOA (meter)' val={vessel_handling_charges.loa} label='Length' />
            <br />
            <InputReadOnly name='Berthing charges ' val={vessel_handling_charges.berthing_amount && (vessel_handling_charges.berthing_amount).toLocaleString()} handle={(e) => setQuay_amount(e.target.value)} label='lblquay_amount' />
            <InputReadOnly name='Wharfage Charges ' val={vessel_handling_charges.mooring_amount && (vessel_handling_charges.mooring_amount).toLocaleString()} handle={(e) => setVessel_handling_charges(e.target.value)} label='lblvessel_handling_charges' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Payment Advice' height={height} entity='Payment Advice' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>


              <td>ID </td>
              <td>Vessel  </td>
              <td className="text-center">owner Operator  </td>
              <td className="text-center">ATA </td>
              <td className="text-center">Etd </td>
              <td className="text-center">Number of Days </td>
              <td className="text-center">LOA (m)</td>
              <td className="text-center">Berthing Charges </td>
              <td className="text-center">Wharfage Charges </td>

              {userType == 'admin' && <td className='delButton '>Option</td>}
            </TableHead>
            <tbody>
              {invoices.map((invoice) => {
                totBerthing+=invoice.quay_amount
                totWharfage+=invoice.vessel_handling_charges
                return (
                <tr key={invoice.id}>

                  <td>{invoice.id}   </td>
                  <td>{invoice.name}   </td>
                  <td className="text-center">{invoice.owner_operator}   </td>
                  <td className="text-center">{(invoice.ata).split('T')[0] + ' ' + (invoice.ata).split('T')[1]}   </td>
                  <td className="text-center">{(invoice.etd).split('T')[0] + ' ' + (invoice.etd).split('T')[1]}   </td>
                  <td className="text-center">{invoice.number_days}   </td>
                  <td className="text-center">{invoice.loa}   </td>
                  <td className="text-center">{invoice.quay_amount && (Number(invoice.quay_amount)).toLocaleString()}   </td>
                  <td className="text-center">{invoice.vessel_handling_charges && (invoice.vessel_handling_charges).toLocaleString()}   </td>
                  {userType == 'admin' && <ListOptioncol print={true} printData={() => printData(invoice)} getEntityById={() => getInvoiceById(invoice.id)} delEntityById={() => delInvoiceById(invoice.id)} />}
                   
                  <td className="text-center">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editFields.vessel_handling_charges}
                        onChange={e => setEditFields(f => ({ ...f, vessel_handling_charges: e.target.value }))}
                        style={{ width: '100px' }}
                      />
                    ) : (
                      invoice.vessel_handling_charges && Number(invoice.vessel_handling_charges).toLocaleString()
                    )}
                  </td>
                  {userType == 'admin' && (
                    <td className='delButton'>
                      {isEditing ? (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={() => saveEditRow(invoice.id)}>Save</button>
                          <button className="btn btn-secondary btn-sm" onClick={cancelEditRow}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={() => startEditRow(invoice)} title="Edit Charges">
                            <FaPencilAlt />
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => delPaymentAdviceById(invoice.id)} title="Delete Payment Advice">
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              )})}

              
              </tbody>
          </TableOpen>


        </div>
      </ContainerRow>
      {
        !dataLoad && <DataListLoading />
      }

    </PagesWapper >


  )
}

export default Invoice

export const TableRows = ({ bookings, searchDone }) => {
  return (bookings.length > 0 ?
    <>
      {bookings && bookings.map((vessel, index) => (<tr>
        <td>{vessel.owner_operator}   </td>
        <td>{vessel.name}   </td>
        <td>{vessel.plate_number}   </td>
        <td>{vessel.dimension}   </td>
        <td>{vessel.capacity}   </td>
        <td>{vessel.contact_number}   </td>
        <td>{vessel.status}   </td>

        <Event item={[vessel.id, vessel.name]} searchDone={() => {
          searchDone(vessel.id, vessel.name)
        }} />
      </tr>)
      )}
    </> : <tr> <td colspan="6"> <p className="text-danger border">No Booking Found  </p></td></tr>)

}
export const ClientTableRows = ({  clients, searchDone }) => {
  return (
    <>
      {clients.map((client, index) => (<tr>
        <td>{client.id}   </td>
        <td>{client.name}   </td>
        <td>{client.tin_number}   </td>
        
        <Event item={[client.id, client.name, client.tin_number]} searchDone={() => {
          searchDone(client.id, client.name, client.tin_number)
        }} />
      </tr>)
      )}
    </>)
}
export const TruckTableRows = ({ trucks, searchDone }) => {
  return (
    <>
      {trucks.map((truck, index) => (<tr>
        <td>{truck.id}   </td>
        <td>{truck.truck_type}   </td>
        <td>{truck.plate_number}   </td>
        <td>{truck.status}   </td>
        <Event item={[truck.id, truck.truck_type, truck.plate_number, truck.status]} searchDone={() => {
          searchDone(truck.id, truck.truck_type, truck.plate_number, truck.status)
        }} />
      </tr>)
      )}
    </>)
}
export const CargoTableRows = ({ cargo, searchDone }) => {
  return (
    <>
      {cargo.map((cargo, index) => (<tr>
        <td>{cargo.id}   </td>
        <td>{cargo.truck_type}   </td>
        <td>{cargo.plate_number}   </td>
        <td>{cargo.status}   </td>
        <Event item={[cargo.id, cargo.truck_type, cargo.plate_number, cargo.status]} searchDone={() => {
          searchDone(cargo.id, cargo.truck_type, cargo.plate_number, cargo.status)
        }} />
      </tr>)
      )}
    </>)
}

export const separateDateTime = () => 10
