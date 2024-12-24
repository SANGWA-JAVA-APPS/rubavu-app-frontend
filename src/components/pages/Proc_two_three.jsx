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


function Proc_two_three() {

 const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id, setId] = useState()
const [book_id, setBook_id] = useState()
const [tallyout_id, setTallyout_id] = useState()
const [invoice_id, setInvoice_id] = useState()
const [payment_id, setPayment_id] = useState()
const [exits_id, setExits_id] = useState()
const [cargo_dest_id, setCargo_dest_id] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [proc_two_threes, setProc_two_threes] = useState([]) //Data List
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

    var proc_two_three = {
      id:id,book_id : book_id,tallyout_id : tallyout_id,invoice_id : invoice_id,payment_id : payment_id,exits_id : exits_id,cargo_dest_id : cargo_dest_id
    }
    if (id) {
      Commons.updateProc_two_three(proc_two_three, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveProc_two_three(proc_two_three).then((res) => {
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
  const getAllProc_two_threes = (page, size) => {
    Repository.findProc_two_three(page, size).then((res) => {
      setProc_two_threes(res.data.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllProc_two_threes(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getProc_two_threeById = (id) => {
    StockRepository.findProc_two_threeById(id).then((res) => {
      setId(res.data.id)
      setBook_id(res.data.book_id)
      setTallyout_id(res.data.tallyout_id)
      setInvoice_id(res.data.invoice_id)
      setPayment_id(res.data.payment_id)
      setExits_id(res.data.exits_id)
      setCargo_dest_id(res.data.cargo_dest_id)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delProc_two_threeById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteProc_two_threeById(id).then(() => {
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
    getAllProc_two_threes()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
setId(null)
setBook_id("")
setTallyout_id("")
setInvoice_id("")
setPayment_id("")
setExits_id("")
setCargo_dest_id("")

  }
  const clearHandle = () => {
setId(null)
setBook_id("")
setTallyout_id("")
setInvoice_id("")
setPayment_id("")
setExits_id("")
setCargo_dest_id("")

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
        <ContainerRowBtwn clearBtn={clearBtn} form={'Proc_two_three'} showLoader  = {showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Book Id ' val={book_id} handle={(e) => setBook_id(e.target.value)} label='lblbook_id' />
            <InputRow name='Tallyout Id ' val={tallyout_id} handle={(e) => setTallyout_id(e.target.value)} label='lbltallyout_id' />
            <InputRow name='Invoice Id ' val={invoice_id} handle={(e) => setInvoice_id(e.target.value)} label='lblinvoice_id' />
            <InputRow name='Payment Id ' val={payment_id} handle={(e) => setPayment_id(e.target.value)} label='lblpayment_id' />
            <InputRow name='Exits Id ' val={exits_id} handle={(e) => setExits_id(e.target.value)} label='lblexits_id' />
            <InputRow name='Cargo Dest Id ' val={cargo_dest_id} handle={(e) => setCargo_dest_id(e.target.value)} label='lblcargo_dest_id' />
    
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='proc_two_three List' height={height} entity='Proc_two_three' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

                <td>ID</td>
                <td>Book Id </td>
                <td>Tallyout Id </td>
                <td>Invoice Id </td>
                <td>Payment Id </td>
                <td>Exits Id </td>
                <td>Cargo Dest Id </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {proc_two_threes.map((proc_two_three) => (
                <tr key={proc_two_three.id}>
                  <td>{proc_two_three.id}   </td>
                  <td>{proc_two_three.book_id}   </td>
                  <td>{proc_two_three.tallyout_id}   </td>
                  <td>{proc_two_three.invoice_id}   </td>
                  <td>{proc_two_three.payment_id}   </td>
                  <td>{proc_two_three.exits_id}   </td>
                  <td>{proc_two_three.cargo_dest_id}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getProc_two_threeById(proc_two_three.id)} delEntityById={() => delProc_two_threeById(proc_two_three.id)} />}
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

export default Proc_two_three
