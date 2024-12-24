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


function Invoice_pay_items() {

 const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id, setId] = useState()
const [name, setName] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [invoice_pay_itemss, setInvoice_pay_itemss] = useState([]) //Data List
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

    var invoice_pay_items = {
      id:id,name : name
    }
    if (id) {
      Commons.updateInvoice_pay_items(invoice_pay_items, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveInvoice_pay_items(invoice_pay_items).then((res) => {
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
  const getAllInvoice_pay_itemss = (page, size) => {
    Repository.findInvoice_pay_items(page, size).then((res) => {
      setInvoice_pay_itemss(res.data.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllInvoice_pay_itemss(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getInvoice_pay_itemsById = (id) => {
    StockRepository.findInvoice_pay_itemsById(id).then((res) => {
      setId(res.data.id)
      setName(res.data.name)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delInvoice_pay_itemsById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteInvoice_pay_itemsById(id).then(() => {
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
    getAllInvoice_pay_itemss()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
setId(null)
setName("")

  }
  const clearHandle = () => {
setId(null)
setName("")

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
        <ContainerRowBtwn clearBtn={clearBtn} form={'Invoice_pay_items'} showLoader  = {showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Name ' val={name} handle={(e) => setName(e.target.value)} label='lblname' />
    
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='invoice_pay_items List' height={height} entity='Invoice_pay_items' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

                <td>ID</td>
                <td>Name </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {invoice_pay_itemss.map((invoice_pay_items) => (
                <tr key={invoice_pay_items.id}>
                  <td>{invoice_pay_items.id}   </td>
                  <td>{invoice_pay_items.name}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getInvoice_pay_itemsById(invoice_pay_items.id)} delEntityById={() => delInvoice_pay_itemsById(invoice_pay_items.id)} />}
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

export default Invoice_pay_items
