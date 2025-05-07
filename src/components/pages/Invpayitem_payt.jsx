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
import InputRow, { DropDownInput, EmptyInputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Commons from '../../services/Commons'
import Repository from '../../services/Repository'
import { ColItemContext } from '../../Global/GlobalDataContentx'


function Invpayitem_payt() {

 const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id, setId] = useState()
const [invpayitem_id, setInvpayitem_id] = useState()
const [payment_id, setPayment_id] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [invpayitem_payts, setInvpayitem_payts] = useState([]) //Data List
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

    var invpayitem_payt = {
      id:id,invpayitem_id : invpayitem_id,payment_id : payment_id
    }
    if (id) {
      Commons.updateInvpayitem_payt(invpayitem_payt, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveInvpayitem_payt(invpayitem_payt, authHeader).then((res) => {
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
  const getAllInvpayitem_payts = (page, size) => {
    Repository.findInvpayitem_payt(page, size, authHeader).then((res) => {
      setInvpayitem_payts(res.data.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllInvpayitem_payts(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getInvpayitem_paytById = (id) => {
    StockRepository.findInvpayitem_paytById(id, authHeader).then((res) => {
      setId(res.data.id)
      setInvpayitem_id(res.data.invpayitem_id)
      setPayment_id(res.data.payment_id)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delInvpayitem_paytById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteInvpayitem_paytById(id).then(() => {
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
    getAllInvpayitem_payts()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
setId(null)
setInvpayitem_id("")
setPayment_id("")

  }
  const clearHandle = () => {
setId(null)
setInvpayitem_id("")
setPayment_id("")

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
        <ContainerRowBtwn clearBtn={clearBtn} form={'Invpayitem_payt'} showLoader  = {showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Invpayitem Id ' val={invpayitem_id} handle={(e) => setInvpayitem_id(e.target.value)} label='lblinvpayitem_id' />
            <InputRow name='Payment Id ' val={payment_id} handle={(e) => setPayment_id(e.target.value)} label='lblpayment_id' />
    
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='invpayitem_payt List' height={height} entity='Invpayitem_payt' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

                <td>ID</td>
                <td>Invpayitem Id </td>
                <td>Payment Id </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {invpayitem_payts.map((invpayitem_payt) => (
                <tr key={invpayitem_payt.id}>
                  <td>{invpayitem_payt.id}   </td>
                  <td>{invpayitem_payt.invpayitem_id}   </td>
                  <td>{invpayitem_payt.payment_id}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getInvpayitem_paytById(invpayitem_payt.id)} delEntityById={() => delInvpayitem_paytById(invpayitem_payt.id)} />}
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

export default Invpayitem_payt
