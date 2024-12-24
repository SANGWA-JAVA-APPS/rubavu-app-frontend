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


function Proc_one() {

 const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id, setId] = useState()
const [entry_id, setEntry_id] = useState()
const [tally_id, setTally_id] = useState()
const [arrival_id, setArrival_id] = useState()
const [invoice_id, setInvoice_id] = useState()
const [payment_id, setPayment_id] = useState()
const [exits_id, setExits_id] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [proc_ones, setProc_ones] = useState([]) //Data List
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

    var proc_one = {
      id:id,entry_id : entry_id,tally_id : tally_id,arrival_id : arrival_id,invoice_id : invoice_id,payment_id : payment_id,exits_id : exits_id
    }
    if (id) {
      Commons.updateProc_one(proc_one, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveProc_one(proc_one).then((res) => {
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
  const getAllProc_ones = (page, size) => {
    Repository.findProc_one(page, size).then((res) => {
      setProc_ones(res.data.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllProc_ones(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getProc_oneById = (id) => {
    StockRepository.findProc_oneById(id).then((res) => {
      setId(res.data.id)
      setEntry_id(res.data.entry_id)
      setTally_id(res.data.tally_id)
      setArrival_id(res.data.arrival_id)
      setInvoice_id(res.data.invoice_id)
      setPayment_id(res.data.payment_id)
      setExits_id(res.data.exits_id)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delProc_oneById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteProc_oneById(id).then(() => {
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
    getAllProc_ones()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
setId(null)
setEntry_id("")
setTally_id("")
setArrival_id("")
setInvoice_id("")
setPayment_id("")
setExits_id("")

  }
  const clearHandle = () => {
setId(null)
setEntry_id("")
setTally_id("")
setArrival_id("")
setInvoice_id("")
setPayment_id("")
setExits_id("")

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
        <ContainerRowBtwn clearBtn={clearBtn} form={'Proc_one'} showLoader  = {showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Entry Id ' val={entry_id} handle={(e) => setEntry_id(e.target.value)} label='lblentry_id' />
            <InputRow name='Tally Id ' val={tally_id} handle={(e) => setTally_id(e.target.value)} label='lbltally_id' />
            <InputRow name='Arrival Id ' val={arrival_id} handle={(e) => setArrival_id(e.target.value)} label='lblarrival_id' />
            <InputRow name='Invoice Id ' val={invoice_id} handle={(e) => setInvoice_id(e.target.value)} label='lblinvoice_id' />
            <InputRow name='Payment Id ' val={payment_id} handle={(e) => setPayment_id(e.target.value)} label='lblpayment_id' />
            <InputRow name='Exits Id ' val={exits_id} handle={(e) => setExits_id(e.target.value)} label='lblexits_id' />
    
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='proc_one List' height={height} entity='Proc_one' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

                <td>ID</td>
                <td>Entry Id </td>
                <td>Tally Id </td>
                <td>Arrival Id </td>
                <td>Invoice Id </td>
                <td>Payment Id </td>
                <td>Exits Id </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {proc_ones.map((proc_one) => (
                <tr key={proc_one.id}>
                  <td>{proc_one.id}   </td>
                  <td>{proc_one.entry_id}   </td>
                  <td>{proc_one.tally_id}   </td>
                  <td>{proc_one.arrival_id}   </td>
                  <td>{proc_one.invoice_id}   </td>
                  <td>{proc_one.payment_id}   </td>
                  <td>{proc_one.exits_id}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getProc_oneById(proc_one.id)} delEntityById={() => delProc_oneById(proc_one.id)} />}
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

export default Proc_one
