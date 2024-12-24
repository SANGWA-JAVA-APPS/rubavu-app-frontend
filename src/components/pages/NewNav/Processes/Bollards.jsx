import React, { useState, useRef, useEffect, useContext } from 'react'

import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
// import UpdatedComponent from '../../../Global/HOCForm'


import TableHead from '../../../Global/TableHead'


import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow } from '../../../Global/Forms/InputRow'
import FormTools from '../../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../../Global/ListTable'
import Utils from '../../../Global/Utils'


import { ColItemContext } from '../../../Global/GlobalDataContentx'
import PagesWapper from '../../../Global/PagesWapper';
import PrintCompanyInfo from '../../../Global/PrintCompanyInfo';
import { DataListLoading } from '../../../Global/Loader'
import SearchBox from '../../../Global/SearchBox'
import StockRepository from '../../../services/StockServices/StockRepository'
import StockCommons from '../../../services/StockServices/StockCommons'


export const Bollards = () => {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [vessel_id, setVessel_id] = useState()
  const [ata, setAta] = useState()
  const [etd, setEtd] = useState()
  const [bollard_or_vessel, setBollard_or_vessel] = useState()
  const [vessel_arr_draft, setVessel_arr_draft] = useState()
  const [description, setDescription] = useState()
  const [vessel_or_bollard_refId, setVessel_or_bollard_refId] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [berthings, setBerthings] = useState([]) //Data List
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

    var berthing = {
      id: id, vessel_id: vessel_id, ata: ata, etd: etd, bollard_or_vessel: bollard_or_vessel, vessel_arr_draft: vessel_arr_draft, description: description, vessel_or_bollard_refId: vessel_or_bollard_refId
    }
    if (id) {
      StockCommons.updateBerthing(berthing, id).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveBerthing(berthing).then((res) => {
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
  const getAllBerthings = ( ) => {
    StockRepository.findBerthing( ).then((res) => {
      setBerthings(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllBerthings( )

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getBerthingById = (id) => {
    StockStockRepository.findBerthingById(id).then((res) => {
      setId(res.data.id)
      setVessel_id(res.data.vessel_id)
      setAta(res.data.ata)
      setEtd(res.data.etd)
      setBollard_or_vessel(res.data.bollard_or_vessel)
      setVessel_arr_draft(res.data.vessel_arr_draft)
      setDescription(res.data.desc)
      setVessel_or_bollard_refId(res.data.vessel_or_bollard_refId)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delBerthingById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteBerthingById(id).then(() => {
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
    getAllBerthings()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setVessel_id("")
    setAta("")
    setEtd("")
    setBollard_or_vessel("")
    setVessel_arr_draft("")
    setDescription("")
    setVessel_or_bollard_refId("")

  }
  const clearHandle = () => {
    setId(null)
    setVessel_id("")
    setAta("")
    setEtd("")
    setBollard_or_vessel("")
    setVessel_arr_draft("")
    setDescription("")
    setVessel_or_bollard_refId("")

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
        <ContainerRowBtwn clearBtn={clearBtn} form={'Berthing'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Vessel Id ' val={vessel_id} handle={(e) => setVessel_id(e.target.value)} label='lblvessel_id' />
            <InputRow name='ATA ' val={ata} handle={(e) => setAta(e.target.value)} label='lblata' />
            <InputRow name='ETD ' val={etd} handle={(e) => setEtd(e.target.value)} label='lbletd' />
            <InputRow name='Bollard Or Vessel ' val={bollard_or_vessel} handle={(e) => setBollard_or_vessel(e.target.value)} label='lblbollard_or_vessel' />
            <InputRow name='Vessel Arrival Draft ' val={vessel_arr_draft} handle={(e) => setVessel_arr_draft(e.target.value)} label='lblvessel_arr_draft' />
            <InputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />
            <InputRow name='Vessel Or Bollard Ref.Id ' val={vessel_or_bollard_refId} handle={(e) => setVessel_or_bollard_refId(e.target.value)} label='lblvessel_or_bollard_refId' />

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='berthing List' height={height} entity='Berthing' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
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
              <td>Etd </td>
              <td>Bollard Or Vessel </td>
              <td>Vessel Arr Draft </td>
              <td>Desc </td>
              <td>Vessel Or Bollard RefId </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {berthings.map((berthing) => (
                <tr key={berthing.id}>
                  <td>{berthing.id}   </td>
                  <td>{berthing.vessel_id}   </td>
                  <td>{berthing.ata}   </td>
                  <td>{berthing.etd}   </td>
                  <td>{berthing.bollard_or_vessel}   </td>
                  <td>{berthing.vessel_arr_draft}   </td>
                  <td>{berthing.desc}   </td>
                  <td>{berthing.vessel_or_bollard_refId}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getBerthingById(berthing.id)} delEntityById={() => delBerthingById(berthing.id)} />}
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

