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
import Utils, { usertoEditprint } from '../../Global/Utils'

import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import { useNavigate } from 'react-router-dom'
import CurrentDate from '../../Global/CurrentDate';


function Gen_exit() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState()
  const [receipt_id, setReceipt_id] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [gen_exits, setGen_exits] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [gen_receipts, setGen_receipts] = useState([]) //Data List
  const { itemOrCargo, setitemOrCargo, setObj } = useContext(ColItemContext)

  const authHeader = useAuthHeader()();
  const [genExitPrint, setgenExitPrint] = useState(false)

      const [startDate, setStartDate] = useState(CurrentDate.todaydate())
      const [endDate, setEndDate] = useState(CurrentDate.todaydate())



  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var gen_exit = {
      id: id, date_time: date_time, receipt_id: receipt_id
    }
    if (id) {
      StockCommons.updateGen_exit(gen_exit, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveGen_exit(gen_exit, receipt_id, authHeader).then((res) => {
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
  const getAllGen_exits = () => {
    StockRepository.findGen_exit(startDate,endDate, authHeader).then((res) => {
      setGen_exits(res.data);
      setDataLoad(true)

    });
  }

  const getAllGen_receipts = ( ) => {
    StockRepository.findGen_receipt(  authHeader, startDate,endDate).then((res) => {
      setGen_receipts(res.data);
      setDataLoad(true)

    });
  }
  useEffect(() => {
    getAllGen_exits( )
    getAllGen_receipts()
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getGen_exitById = (id) => {
    StockRepository.findGen_exitById(id, authHeader).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.date_time)
      setReceipt_id(res.data.receipt_id)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delGen_exitById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteGen_exitById(id).then(() => {
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
    getAllGen_exits()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setReceipt_id("")

  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setReceipt_id("")

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
  const printReceipt = (gen_exit) => {
    setObj(gen_exit)
    setgenExitPrint(true)
  }
  const navigate = useNavigate()
  useEffect(() => {
    if (genExitPrint) {
      navigate("/genexittprint")
    }
  }, [genExitPrint])

  const getCommonSearchByDate = (date1,date2) => {
    setStartDate(date1)
    setEndDate(date2)
    setRefresh(!refresh)
  }
  return (
    // <PagesWapper>
    <>
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Exit'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            {/* <InputRow name='Date Time ' val={date_time} handle={(e) => setDate_time(e.target.value)} label='lbldate_time' /> */}
            <DropDownInput handle={(e) => setReceipt_id(e.target.value)} name='Receipt' label='REceipt' >
              {gen_receipts.map((rec) => (
                <option value={rec.id} key={rec.id}>   {rec.id} - RWF {rec.amount.toLocaleString()} -  DOC ID {rec.description}</option>
              ))}
            </DropDownInput>


            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Exit List' role="addOpsExit" height={height} entity='Gen_exit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td colSpan={2}>Exit</td>
              <td colSpan={3}>Receipt</td>
              <td colSpan={3}>Invoice</td>
            </TableHead>
            <TableHead>
              <td>ID</td>
              <td>Date Time </td>
              <td>Receipt Id </td>
              <td>Receipt date_time</td>
              <td>Receipt amount</td>
              <td>  total weight</td>
              <td> Invoice amount</td>

              {usertoEditprint(userType) && <td className='delButton '>Option</td>}
            </TableHead>
            <tbody>
              {gen_exits.map((gen_exit) => (
                <tr key={gen_exit.id}>
                  <td>{gen_exit.id}   </td>
                  <td>{gen_exit.date_time}   </td>
                  <td>{gen_exit.receipt_id}   </td>
                  <td>{gen_exit.rdate_time}   </td>
                  <td>{gen_exit.amount}   </td>
                  <td>{gen_exit.total_weight}   </td>
                  <td>{gen_exit.total_amount}   </td>

                  {usertoEditprint(userType) && <ListOptioncol 
                  editRole="updateOpsExit" deleteRole="deleteOpsExit"
                   print={true} printData={() => printReceipt(gen_exit)} getEntityById={() => getGen_exitById(gen_exit.id)} delEntityById={() => delGen_exitById(gen_exit.id)} />}
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

export default Gen_exit
