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
import InputRow, { DropDownInput, EmptyInputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'

import Utils from '../../Global/Utils'
import Commons from '../../services/Commons'

import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
   import PagesWapper from '../../Global/PagesWapper';
import { TableOpen } from '../../Global/ListTable';



function Invoice() {

 const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id, setId] = useState()
const [quay_amount, setQuay_amount] = useState()
const [etd, setEtd] = useState()
const [vessel_handling_charges, setVessel_handling_charges] = useState()

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
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var invoice = {
      id:id,quay_amount : quay_amount,etd : etd,vessel_handling_charges : vessel_handling_charges
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
    StockStockRepository.findInvoiceById(id).then((res) => {
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

  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Invoice'} showLoader  = {showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Quay Amount ' val={quay_amount} handle={(e) => setQuay_amount(e.target.value)} label='lblquay_amount' />
            <InputRow name='Etd ' val={etd} handle={(e) => setEtd(e.target.value)} label='lbletd' />
            <InputRow name='Vessel Handling Charges ' val={vessel_handling_charges} handle={(e) => setVessel_handling_charges(e.target.value)} label='lblvessel_handling_charges' />
    
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
                <td>Quay Amount </td>
                <td>Etd </td>
                <td>Vessel Handling Charges </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}   </td>
                  <td>{invoice.quay_amount}   </td>
                  <td>{invoice.etd}   </td>
                  <td>{invoice.vessel_handling_charges}   </td>

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
