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
import InputRow, { DropDownInput, EmptyInputRow, InputReadOnly, LongTextINputRow, TimeInputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import StockDelete from '../../services/StockServices/StockDelete'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'
import { Button, Col, Row } from 'react-bootstrap'
import { InputAndSearch, LoadSub } from '../../Global/InputRow'
import SeaarchBytyping, { SearchTableResult } from '../../globalcomponents/SeaarchBytyping'
import { TableRows, TruckTableRows } from '../Invoice/Invoice'
import { useNavigate } from 'react-router-dom';
import CurrentDate from '../../Global/CurrentDate';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';



function TruckReceipt() {
  const { obj, setObj } = useContext(ColItemContext)
  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState(null)
  const [licence_plate_number, setLicence_plate_number] = useState()
  const [get_out_time, setGet_out_time] = useState('2')
  const [amount, setAmount] = useState()
  const [truck_id, setTruckId] = useState()
  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [truck_payments, setTruck_payments] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  //below are the result  from truck tariff
  const [totalTime, setTotalTime] = useState('');
  const [truckEntryTime, settruckEntryTime] = useState('');
  const [fee, setFee] = useState(0);

  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)

  const [totalDays, setTotalDays] = useState()
  const [totalHours, setTotalHours] = useState()
  const [totalMin, setTotalMin] = useState()
  const [entryTime, setEntryTime] = useState()

  const [gen_invoices, setGen_invoices] = useState([]) //Data List



  const [payment_amount, setPayment_amount] = useState()
  const [invoice_id, setInvoice_id] = useState()

  const [truckParkingInvoices, setTruckParkingInvoices] = useState([])

  const [truckParkingInvoice, settruckParkingInvoice] = useState()
  const authHeader = useAuthHeader()();
  const [description, setDescription] = useState()
  const navigate = useNavigate()

  const [startDate, setStartDate] = useState(CurrentDate.todaydate())
  const [endDate, setEndDate] = useState(CurrentDate.todaydate())

  const [editingRowId, setEditingRowId] = useState(null);
  const [editFields, setEditFields] = useState({
    payment_amount: ''
  });

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const convertToInt = (value) => {
    const cleanedValue = value.replace(/[^0-9.-]+/g, '');
    return parseInt(cleanedValue, 10);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_truck_payment = {
      payment_amount: payment_amount, description: description
    }
    if (id) {
      StockCommons.updateTruck_parking_invoice(mdl_truck_payment, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveTruck_payment(mdl_truck_payment, truckParkingInvoice, authHeader).then((res) => {
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
  const getAllTruck_payments = (page, size) => {
    StockRepository.findTruckPayment(startDate, endDate, authHeader).then((res) => {
      // Filter out deleted records
      setTruck_payments(res.data.filter(payment => !payment.isDeleted));
      setDataLoad(true)
    });
  }
  const findTruck_parking_invoice = () => {
    StockRepository.finNongroupedinvoicesbydate(authHeader, startDate, endDate).then((res) => {
      setTruckParkingInvoices(res.data)
    })
  } 
  useEffect(() => {
    getAllTruck_payments( )
    findTruck_parking_invoice()
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);



  const getTruck_parking_invoiceById = (id) => {
    StockRepository.findTruck_parking_invoiceById(id, authHeader).then((res) => {
      setId(res.data.id)
      setLicence_plate_number(res.data.licence_plate_number)
      setGet_out_time(res.data.get_out_time)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTruck_parking_invoiceById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteTruck_parking_invoiceById(id).then(() => {
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
    getAllTruck_payments()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setLicence_plate_number("")
    setGet_out_time("")

  }
  const clearHandle = () => {
    setId(null)
    setLicence_plate_number("")
    setGet_out_time("")

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
  const tableHead = ['id', 'truck type', 'plate Number']

  const hideSelectorLink = () => {
    setShowSelected(false)
    setSearchItemValue('')
  }
  // const hideSelectorLinkTwo = () => {
  //   setShowSelectedTwo(false)
  //   setStrangeVal('')
  // }
  const findVesselByOperator = (searchItemValue) => {
    StockRepository.findVesselByPlatenumber(searchItemValue, authHeader).then((res) => {
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
  const searchDone = (id, name, platenumber) => {
    setSearchTableVisible(false)
    setTruckId(id)
    setLicence_plate_number(platenumber)
    setSearchItemValue(name)
    setShowSelected(true)
    // inputRef.current.focus();

    StockRepository.findAmountDue(platenumber, authHeader).then((res) => {
      setAmount((res.data.price).toLocaleString())
      setTotalTime(`${res.data.totalDays}d: ${res.data.totalHours}h: ${res.data.totalMin}m`)
      settruckEntryTime(res.data.entryTime)
      setFee(res.data.fee)

      //set the fields that will be sent to db while saving the invoice
      setTotalDays(res.data.totalDays)
      setTotalHours(res.data.totalHours)
      setTotalMin(res.data.totalMin)
      setEntryTime(res.data.entryTime)

    }).catch(() => { StockCommons.RedirectToLogin() })
  }
  /* #endregion */

  const dt = new Date()

  useEffect(() => {
    if (id) {
      navigate('/truckreceiptPrint')
    }
  }, [id])
  const printData = (obj) => {
    setObj(obj)
    setId(obj.id)
    console.log(obj)
  }
  const getCommonSearchByDate=(date1,date2)=>{
    setStartDate(date1)
    setEndDate(date2)
    setRefresh(!refresh)
  }

  const startEditRow = (truck_payment) => {
    setEditingRowId(truck_payment.id);
    setEditFields({
      payment_amount: truck_payment.payment_amount
    });
  };

  const saveEditRow = (id) => {
    const updatedPayment = {
      payment_amount: editFields.payment_amount
    };
    
    StockCommons.updateTruck_payment(updatedPayment, id, authHeader).then(() => {
      setEditingRowId(null);
      setRefresh(!refresh);
    });
  };

  const cancelEditRow = () => {
    setEditingRowId(null);
  };

  const delTruckPaymentById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteTruckPaymentById(id).then(() => {
        // Update local state to remove the deleted item
        setTruck_payments(prevPayments => prevPayments.filter(payment => payment.id !== id));
        setRefresh(!refresh)
      })
    }, () => { })
  }

  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Truck parking payment'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            {/* <DropDownInput val={truckParkingInvoice} handle={(e) => settruckParkingInvoice(e.target.value)} name='Invoice' label='Invoice' >
              {truckParkingInvoices.map((invoice) => (
                <option value={invoice.id} key={invoice.id}> {invoice.id} </option>
              ))}
            </DropDownInput> */}
            <DropDownInput val={truckParkingInvoice} handle={(e) => settruckParkingInvoice(e.target.value)} name='Invoice' label='Invoice' >
              {truckParkingInvoices.map((invoice) => (
                <option value={invoice.id} key={invoice.id}> {invoice.id} {" \t  "} - {invoice.licence_plate_number} - {(invoice.amount).toLocaleString()} </option>
              ))}
            </DropDownInput>
            <InputRow num={true} name='Total Amount (Rwf) ' val={payment_amount} handle={(e) => setPayment_amount(e.target.value)} label='lblget_out_time' />
            <LongTextINputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='truck parking payment List' height={height} entity='Truck parking payment' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox  getCommonSearchByDate={getCommonSearchByDate}/>
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>ID</td>
              <td>Amount</td>

              <td> Date   </td>
              <td> description   </td>
              {userType == 'admin' && <td className='delButton '>Option</td>}
            </TableHead>
            <tbody>
              {truck_payments.map((truck_payment) => (
                <tr key={truck_payment.id}>
                  <td>{truck_payment.id}   </td>
                  <td>
                    {editingRowId === truck_payment.id ? (
                      <input
                        type="number"
                        value={editFields.payment_amount}
                        onChange={e => setEditFields(f => ({ ...f, payment_amount: e.target.value }))}
                        style={{ width: '100px' }}
                      />
                    ) : (
                      Number(truck_payment.payment_amount).toLocaleString()
                    )}
                  </td>
                  <td>{truck_payment.date_time}   </td>
                  <td>{truck_payment.description}</td>
                  {userType == 'admin' && (
                    <td className='delButton'>
                      {editingRowId === truck_payment.id ? (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={() => saveEditRow(truck_payment.id)}>Save</button>
                          <button className="btn btn-secondary btn-sm" onClick={cancelEditRow}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={() => startEditRow(truck_payment)} title="Edit Payment">
                            <FaPencilAlt />
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => delTruckPaymentById(truck_payment.id)} title="Delete Payment">
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </td>
                  )}
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

export default TruckReceipt
