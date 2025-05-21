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
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'
import TruckVesselNavBar from '../../Navbar/TruckVesselNavBar'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import StockDelete from '../../services/StockServices/StockDelete'


function TVpayment() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [payments, setPayments] = useState([]) //Data List
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

    var payment = {
      id: id, date_time: date_time
    }
    if (id) {
      Commons.updatePayment(payment, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.savePayment(payment, authHeader).then((res) => {
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
  const getAllPayments = (page, size) => {
    Repository.findPayment(page, size, authHeader).then((res) => {
      // Filter out deleted records
      setPayments(res.data.data.filter(payment => !payment.isDeleted));
      setDataLoad(true)
    });
  }

  useEffect(() => {
    getAllPayments(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getPaymentById = (id) => {
    StockRepository.findPaymentById(id, authHeader).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.date_time)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delPaymentById = (id) => {
    Utils.Submit(() => {
      StockDelete.deletePaymentById(id).then(() => {
        // Update local state to remove the deleted item
        setPayments(prevPayments => prevPayments.filter(payment => payment.id !== id));
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
    getAllPayments()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")

  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")

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
    <>
      

        <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
          <ContainerRowBtwn clearBtn={clearBtn} form={'Payment'} showLoader={showLoader}  >
            <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
            <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
              <span style={{ color: 'green' }}>Vessel has been on dock for <b><span style={{ color: 'red' }}>20 days (Berthing fee 20 x tariff)</span></b></span> <br />
              <span style={{ color: 'green' }}>** Mooring fees is  <b><span style={{ color: 'red' }}> tariff  </span></b></span>
              <InputRow name='Date Time ' val={date_time} handle={(e) => setDate_time(e.target.value)} label='lbldate_time' />
              <InputRow name='Mooring Fees ' val={date_time} handle={(e) => setDate_time(e.target.value)} label='lbldate_time' />
              <InputRow name='Berthing fees ' val={date_time} handle={(e) => setDate_time(e.target.value)} label='lbldate_time' />

              <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
            </FormInnerRightPane>
            {/* <FormSidePane /> */}
          </ContainerRowBtwn>
        </AnimateHeight>
        <ContainerRow mt='3'>
          <ListToolBar listTitle='payment List' height={height} entity='Payment' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
          <SearchformAnimation searchHeight={searchHeight}>
            <SearchBox />
          </SearchformAnimation>

          <div ref={componentRef} className="dataTableBox">
            <PrintCompanyInfo />
            <TableOpen>
              <TableHead>

                <td>ID</td>
                <td>Date Time </td>

                {userType == 'admin' && <td className='delButton'>Option</td>}
              </TableHead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}   </td>
                    <td>{payment.date_time}   </td>

                    {userType == 'admin' && <ListOptioncol getEntityById={() => getPaymentById(payment.id)} delEntityById={() => delPaymentById(payment.id)} />}
                  </tr>
                ))}</tbody>
            </TableOpen>
          </div>
        </ContainerRow>
        {!dataLoad && <DataListLoading />
        }

      
    </>

  )
}

export default TVpayment
