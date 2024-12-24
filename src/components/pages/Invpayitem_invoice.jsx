import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
// import UpdatedComponent from '../../Global/HOCForm'
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Commons from '../../services/Commons'
import Repository from '../../services/Repository'
import { ColItemContext } from '../../Global/GlobalDataContentx'


function Invpayitem_invoice() {

 const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id, setId] = useState()
const [invoice_id, setInvoice_id] = useState()
const [invoicepayitems, setInvoicepayitems] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [invpayitem_invoices, setInvpayitem_invoices] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var invpayitem_invoice = {
      id:id,invoice_id : invoice_id,invoicepayitems : invoicepayitems
    }
    if (id) {
      Commons.updateInvpayitem_invoice(invpayitem_invoice, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveInvpayitem_invoice(invpayitem_invoice).then((res) => {
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
  const getAllInvpayitem_invoices = (page, size) => {
    Repository.findInvpayitem_invoice(page, size).then((res) => {
      setInvpayitem_invoices(res.data.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllInvpayitem_invoices(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getInvpayitem_invoiceById = (id) => {
    StockRepository.findInvpayitem_invoiceById(id).then((res) => {
      setId(res.data.id)
      setInvoice_id(res.data.invoice_id)
      setInvoicepayitems(res.data.invoicepayitems)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delInvpayitem_invoiceById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteInvpayitem_invoiceById(id).then(() => {
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
    getAllInvpayitem_invoices()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
setId(null)
setInvoice_id("")
setInvoicepayitems("")

  }
  const clearHandle = () => {
setId(null)
setInvoice_id("")
setInvoicepayitems("")

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

  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Invpayitem_invoice'} showLoader  = {showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Invoice Id ' val={invoice_id} handle={(e) => setInvoice_id(e.target.value)} label='lblinvoice_id' />
            <InputRow name='Invoicepayitems ' val={invoicepayitems} handle={(e) => setInvoicepayitems(e.target.value)} label='lblinvoicepayitems' />
    
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='invpayitem_invoice List' height={height} entity='Invpayitem_invoice' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

                <td>ID</td>
                <td>Invoice Id </td>
                <td>Invoicepayitems </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {invpayitem_invoices.map((invpayitem_invoice) => (
                <tr key={invpayitem_invoice.id}>
                  <td>{invpayitem_invoice.id}   </td>
                  <td>{invpayitem_invoice.invoice_id}   </td>
                  <td>{invpayitem_invoice.invoicepayitems}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getInvpayitem_invoiceById(invpayitem_invoice.id)} delEntityById={() => delInvpayitem_invoiceById(invpayitem_invoice.id)} />}
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

export default Invpayitem_invoice
