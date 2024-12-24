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


function Stockout_lines() {

 const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id, setId] = useState()
const [items_id, setItems_id] = useState()
const [arrival_id, setArrival_id] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [stockout_liness, setStockout_liness] = useState([]) //Data List
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

    var stockout_lines = {
      id:id,items_id : items_id,arrival_id : arrival_id
    }
    if (id) {
      Commons.updateStockout_lines(stockout_lines, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveStockout_lines(stockout_lines).then((res) => {
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
  const getAllStockout_liness = (page, size) => {
    Repository.findStockout_lines(page, size).then((res) => {
      setStockout_liness(res.data.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllStockout_liness(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getStockout_linesById = (id) => {
    StockRepository.findStockout_linesById(id).then((res) => {
      setId(res.data.id)
      setItems_id(res.data.items_id)
      setArrival_id(res.data.arrival_id)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delStockout_linesById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteStockout_linesById(id).then(() => {
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
    getAllStockout_liness()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
setId(null)
setItems_id("")
setArrival_id("")

  }
  const clearHandle = () => {
setId(null)
setItems_id("")
setArrival_id("")

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
        <ContainerRowBtwn clearBtn={clearBtn} form={'Stockout_lines'} showLoader  = {showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Items Id ' val={items_id} handle={(e) => setItems_id(e.target.value)} label='lblitems_id' />
            <InputRow name='Arrival Id ' val={arrival_id} handle={(e) => setArrival_id(e.target.value)} label='lblarrival_id' />
    
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='stockout_lines List' height={height} entity='Stockout_lines' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

                <td>ID</td>
                <td>Items Id </td>
                <td>Arrival Id </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {stockout_liness.map((stockout_lines) => (
                <tr key={stockout_lines.id}>
                  <td>{stockout_lines.id}   </td>
                  <td>{stockout_lines.items_id}   </td>
                  <td>{stockout_lines.arrival_id}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getStockout_linesById(stockout_lines.id)} delEntityById={() => delStockout_linesById(stockout_lines.id)} />}
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

export default Stockout_lines
