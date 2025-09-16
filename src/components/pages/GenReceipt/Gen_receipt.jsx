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
import InputRow, { DropDownInput, EmptyInputRow, InputReadOnly, LongTextINputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils, { usertoEditprint } from '../../Global/Utils'

import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import { useNavigate } from 'react-router-dom'
import CurrentDate from '../../Global/CurrentDate';
import { Col, Row } from 'react-bootstrap';


function Gen_receipt() {
  const authHeader = useAuthHeader()();
  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState()
  const [amount, setAmount] = useState()
  const [invoice_id, setInvoice_id] = useState()
  const [genInvoiceId, setGenInvoiceId] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [gen_receipts, setGen_receipts] = useState([]) //Data List
  const [gen_invoices, setGen_invoices] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [genReceiptPrint, setgenReceiptPrint] = useState(false)
  const [description, setDescription] = useState()

  const { itemOrCargo, setitemOrCargo, obj, setObj } = useContext(ColItemContext)
  const [totalAmount, setTotalAmount] = useState()
  const [startDate, setStartDate] = useState(CurrentDate.todaydate())
  const [endDate, setEndDate] = useState(CurrentDate.todaydate())

  const [showRecepted, setShowReceipted] = useState(false)
  const [truck_parking_invoices,setTruck_parking_invoices]=useState([])
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var gen_receipt = {
      id: id, date_time: date_time, amount: invoiceDetails[0]?.total_amount, invoice_id: invoice_id, description: description, genInvoiceId: genInvoiceId
    }
    if (id) {
      StockCommons.updateGen_receipt(gen_receipt, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else if (totalAmount > amount) {
      alert('Error: The receipt amount has to be equal to the amount of the invoice, ' + totalAmount)
    } else {
      StockCommons.saveGen_receipt(gen_receipt, invoice_id, authHeader).then((res) => {
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
  const getAllGen_invoices = () => {
    StockRepository.findGen_invoice(authHeader, startDate, endDate).then((res) => {
      setGen_invoices(res.data);
      setDataLoad(true)

    });
  }
  const findGen_NonReceiptedinvoice = () => {
    StockRepository.findGen_NonReceiptedinvoice(authHeader, startDate, endDate).then((res) => {
      setGen_invoices(res.data);
      setDataLoad(true)

    });
  }
  const getAllTruck_parking_invoices = () => {
    StockRepository.findTruck_parking_invoice(authHeader, startDate, endDate).then((res) => {
      setTruck_parking_invoices(res.data);
      setDataLoad(true)
    });
  }

  const getAllGen_receipts = () => {
    StockRepository.findGen_receipt(authHeader, startDate, endDate).then((res) => {
      setGen_receipts(res.data);
      setDataLoad(true)

    });
  }
  useEffect(() => {
    if (showRecepted) {
      getAllGen_invoices()
    } else {
      findGen_NonReceiptedinvoice()
    }
  }, [showRecepted])

  useEffect(() => {
    getAllGen_receipts(0, 20)
    getAllTruck_parking_invoices(startDate, endDate)
    if (showRecepted) {
      getAllGen_invoices()
    } else {
      findGen_NonReceiptedinvoice()
    }
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);

  const getGen_receiptById = (id) => {
    StockRepository.findGen_receiptById(id, authHeader).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.date_time)
      setAmount(res.data.amount)
      setInvoice_id(res.data.invoice_id)
      setGenInvoiceId(res.data.genInvoiceId)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delGen_receiptById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteGen_receiptById(id).then(() => {
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
    getAllGen_receipts()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setAmount("")
    setInvoice_id("")
    setGenInvoiceId("")

  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setAmount("")
    setInvoice_id("")
    setGenInvoiceId("")

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
  const printReceipt = (gen_receipt) => {
    setObj(gen_receipt)
    setgenReceiptPrint(true)
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (genReceiptPrint) {
      navigate("/receiptprint")
    }
  }, [genReceiptPrint])

  const [invoiceDetails, setInvoiceDetails] = useState([])

  const getInvoiceById = (invoice_id) => {
    if (invoice_id) {
      setInvoice_id(invoice_id)
      setGenInvoiceId(invoice_id)
      StockRepository.findGen_DetailedinvoiceById(invoice_id, authHeader).then((res) => {
        setTotalAmount(res.data.amount)
        setAmount(invoiceDetails[0]?.total_amount)
        
        setInvoiceDetails(res.data)
      })
    }
  }
  const getCommonSearchByDate = (date1, date2) => {
    setStartDate(date1)
    setEndDate(date2)
    setRefresh(!refresh)
  }
  return (
    // <PagesWapper>
    <>
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Receipt'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <DropDownInput handle={(e) => getInvoiceById(e.target.value)} name='Invoice' label='Invoice' >
              {gen_invoices.map((invoice) => (
                <option value={invoice.id} key={invoice.id} >   {invoice.id} ----------- RWF{(invoice.amount).toLocaleString()} --------- {(invoice.total_weight).toLocaleString()}KG </option>
              ))}
            </DropDownInput>
            {usertoEditprint(userType) &&
              <Row>
                <Col md={3}></Col>
                <Col md={6}>
                  <input type="checkbox" id="receiptedInvoices" onChange={() => setShowReceipted(!showRecepted)} /> <label for="receiptedInvoices">Show receipted</label>
                </Col>
              </Row>}
            {/* <InputRow name='Amount ' val={amount} handle={(e) => setAmount(e.target.value)} label='lblamount' /> */}


            <InputReadOnly name='Date Time' val={invoiceDetails[0]?.date_time} label='lblget_out_time' />
            <InputReadOnly name='Weight(KG)' val={invoiceDetails[0]?.total_weight.toLocaleString()} label='lblget_weight' />
            <InputReadOnly name='Amount' val={invoiceDetails[0]?.total_amount.toLocaleString()} label='lblget_amount' />
            <InputReadOnly name='Description' val={invoiceDetails[0]?.description} label='lblget_desc' />
            <InputReadOnly name='ArrivalId No.' val={invoiceDetails[0]?.arrivalId} label='lblget_an' />
            <InputReadOnly name='Process' val={invoiceDetails[0]?.destIName} label='lblget_an' />
            <InputReadOnly name='Client' val={invoiceDetails[0]?.clientName} label='lblget_an' />
            <InputReadOnly name='Tin Number' val={invoiceDetails[0]?.tinNumber} label='lblget_an' />


            <LongTextINputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Receipt List' role="addOpsReceipt" height={height} entity='receipt' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        </SearchformAnimation>
        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Date Time </td>
              <td>Amount </td>
              <td>Invoice Id </td>
              <td>Invoice Date </td>
              <td>description</td>
              {usertoEditprint(userType) && <td className='delButton '>Option</td>}
            </TableHead>
            <tbody>
              {gen_receipts.map((gen_receipt) => (
                <tr key={gen_receipt.id}>
                  <td>{gen_receipt.id}   </td>
                  <td>{gen_receipt.dateTime}   </td>
                  <td>RWF {gen_receipt.amount && (gen_receipt.amount).toLocaleString()}   </td>
                  <td>{gen_receipt?.invoiceId}   </td>
                  <td>{gen_receipt?.invDate_time}   </td>
                  <td>{gen_receipt?.description}   </td>

                  {usertoEditprint(userType)
                    && <ListOptioncol editRole="updateOpsReceipt" deleteRole="deleteOpsReceipt"
                     print={true} printData={() => printReceipt(gen_receipt)} getEntityById={() => getGen_receiptById(gen_receipt.id)} delEntityById={() => delGen_receiptById(gen_receipt.id)} />}
                </tr>
              ))}</tbody>
          </TableOpen>
        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />
      }

      {/* </PagesWapper> */}
    </>

  )
}

export default Gen_receipt
