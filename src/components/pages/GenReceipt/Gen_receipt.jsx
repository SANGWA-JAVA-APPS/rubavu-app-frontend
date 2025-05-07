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
import InputRow, { DropDownInput, EmptyInputRow, LongTextINputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'

import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import { useNavigate } from 'react-router-dom'
import CurrentDate from '../../Global/CurrentDate';


function Gen_receipt() {
  const authHeader = useAuthHeader()();
  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState()
  const [amount, setAmount] = useState()
  const [invoice_id, setInvoice_id] = useState()

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


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var gen_receipt = {
      id: id, date_time: date_time, amount: amount, invoice_id: invoice_id, description: description
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
  const getAllGen_invoices = (page, size) => {
    StockRepository.findGen_invoice(page, size, authHeader).then((res) => {
      setGen_invoices(res.data);
      setDataLoad(true)

    });
  }
  const getAllTruck_parking_invoices = ( ) => {
    StockRepository.findTruck_parking_invoice(  authHeader ,startDate, endDate).then((res) => {
      setTruck_parking_invoices(res.data);
      setDataLoad(true)
    });
  }

  const getAllGen_receipts = () => {
    StockRepository.findGen_receipt(  authHeader,startDate,endDate).then((res) => {
      setGen_receipts(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllGen_receipts(0, 20)
    getAllTruck_parking_invoices(startDate, endDate)
    getAllGen_invoices()
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);

  const getGen_receiptById = (id) => {
    StockRepository.findGen_receiptById(id, authHeader).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.date_time)
      setAmount(res.data.amount)
      setInvoice_id(res.data.invoice_id)

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

  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setAmount("")
    setInvoice_id("")

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


  const getInvoiceById = (invoice_id) => {
    StockRepository.findGen_invoiceById(invoice_id, authHeader).then((res) => {
      setInvoice_id(res.data.id)
      setTotalAmount(res.data.total_amount)
      setAmount(res.data.total_amount)
    })
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
                <option value={invoice.id} key={invoice.id}>   {invoice.id}</option>
              ))}
            </DropDownInput>
            <InputRow name='Amount ' val={amount} handle={(e) => setAmount(e.target.value)} label='lblamount' />

            <LongTextINputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Receipt List' height={height} entity='receipt' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
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
              {userType == 'admin' && <td className='delButton '>Option</td>}
            </TableHead>
            <tbody>
              {gen_receipts.map((gen_receipt) => (
                <tr key={gen_receipt.id}>
                  <td>{gen_receipt.id}   </td>
                  <td>{gen_receipt.date_time}   </td>
                  <td>RWF {gen_receipt.amount && (gen_receipt.amount).toLocaleString()}   </td>
                  <td>{gen_receipt?.mdl_invoice?.id}   </td>
                  <td>{gen_receipt?.mdl_invoice?.date_time}   </td>
                  <td>{gen_receipt?.description}   </td>

                  {userType == 'admin'
                    && <ListOptioncol print={true} printData={() => printReceipt(gen_receipt)} getEntityById={() => getGen_receiptById(gen_receipt.id)} delEntityById={() => delGen_receiptById(gen_receipt.id)} />}
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
