import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
// import UpdatedComponent from '../../../Global/HOCForm'
import PrintCompanyInfo from '../../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../../Global/Loader';
import TableHead from '../../../Global/TableHead'
import SearchBox from '../../../Global/SearchBox'
import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, LongTextINputRow } from '../../../Global/Forms/InputRow'
import FormTools from '../../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../../Global/ListTable'
import Utils from '../../../Global/Utils'
import Commons from '../../../services/Commons'

import { ColItemContext } from '../../../Global/GlobalDataContentx'
import StockRepository from '../../../services/StockServices/StockRepository'
import StockCommons from '../../../services/StockServices/StockCommons'


function Unberthing() {

 const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
const [id, setId] = useState()
const [vessel_id, setVessel_id] = useState()
const [atd, setAtd] = useState()
const [departure_draft, setDeparture_draft] = useState()
const [desc, setDesc] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [unberthings, setUnberthings] = useState([]) //Data List
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

    var unberthing = {
      id:id,vessel_id : vessel_id,atd : atd,departure_draft : departure_draft,desc : desc
    }
    if (id) {
        StockCommons.updateUnberthing(unberthing, id).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveUnberthing(unberthing).then((res) => {
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
  const getAllUnberthings = (page, size) => {
    StockRepository.findUnberthing(page, size).then((res) => {
      setUnberthings(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllUnberthings(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getUnberthingById = (id) => {
    StockRepository.findUnberthingById(id).then((res) => {
      setId(res.data.id)
      setVessel_id(res.data.vessel_id)
      setAtd(res.data.atd)
      setDeparture_draft(res.data.departure_draft)
      setDesc(res.data.desc)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delUnberthingById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteUnberthingById(id).then(() => {
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
    getAllUnberthings()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
setId(null)
setVessel_id("")
setAtd("")
setDeparture_draft("")
setDesc("")

  }
  const clearHandle = () => {
setId(null)
setVessel_id("")
setAtd("")
setDeparture_draft("")
setDesc("")

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
        <ContainerRowBtwn clearBtn={clearBtn} form={'Unberthing'} showLoader  = {showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Vessel Id ' val={vessel_id} handle={(e) => setVessel_id(e.target.value)} label='lblvessel_id' />
            <InputRow name='ATD ' val={atd} handle={(e) => setAtd(e.target.value)} label='lblatd' />
            <InputRow name='Departure Draft ' val={departure_draft} handle={(e) => setDeparture_draft(e.target.value)} label='lbldeparture_draft' />
            <LongTextINputRow name='Description ' val={desc} handle={(e) => setDesc(e.target.value)} label='lbldesc' />
            
    
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='unberthing List' height={height} entity='Unberthing' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

                <td>ID</td>
                <td>Vessel Id </td>
                <td>Atd </td>
                <td>Departure Draft </td>
                <td>Desc </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {unberthings.map((unberthing) => (
                <tr key={unberthing.id}>
                  <td>{unberthing.id}   </td>
                  <td>{unberthing.vessel_id}   </td>
                  <td>{unberthing.atd}   </td>
                  <td>{unberthing.departure_draft}   </td>
                  <td>{unberthing.desc}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getUnberthingById(unberthing.id)} delEntityById={() => delUnberthingById(unberthing.id)} />}
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

export default Unberthing
