import React, { useState, useRef, useEffect, useContext } from 'react'

import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
// import UpdatedComponent from '../../Global/HOCForm'



import 'react-datepicker/dist/react-datepicker.css'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ColItemContext } from '../../../Global/GlobalDataContentx'
import { PathVesselHome } from '../BreadCrumb'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, FormInnerRightPane, SaveUpdateBtns } from '../../../Global/ContainerRow'
import InputRow from '../../../Global/InputRow'
import FormTools from '../../../Global/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../../Global/ListToolBar'
import SearchBox from '../../../Global/SearchBox'
import ListOptioncol, { TableOpen } from '../../../Global/ListTable'
import TableHead from '../../../Global/TableHead'
import PrintCompanyInfo from '../../../Global/PrintCompanyInfo'
import { DataListLoading } from '../../../Global/Loader'
import StockRepository from '../../../services/StockServices/StockRepository'
import { InputRowDate } from '../../../Global/Forms/InputRow'


export const  TruckTruck=()=> {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [plate_number, setPlate_number] = useState()
  const [dimension, setDimension] = useState()
  const [capacity, setCapacity] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [vessels, setVessels] = useState([]) //Data List
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

    var vessel = {
      id: id, name: name, plate_number: plate_number, dimension: dimension, capacity: capacity
    }
    if (id) {
      Commons.updateVessel(vessel, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveVessel(vessel).then((res) => {
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
  const getAllVessels = (page, size) => {
    StockRepository.findVessel( ).then((res) => {
      setVessels(res.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllVessels(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getVesselById = (id) => {
    StockRepository.findVesselById(id).then((res) => {
      setId(res.data.id)
      setName(res.data.name)
      setPlate_number(res.data.plate_number)
      setDimension(res.data.dimension)
      setCapacity(res.data.capacity)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delVesselById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteVesselById(id).then(() => {
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
    getAllVessels()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setName("")
    setPlate_number("")
    setDimension("")
    setCapacity("")

  }
  const clearHandle = () => {
    setId(null)
    setName("")
    setPlate_number("")
    setDimension("")
    setCapacity("")

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
      {/* <TruckVhNavBar /> */}
      <PathVesselHome>
        <Col className="col-auto p-0 m-0 ms-2 ">
          <Link to="/vessel">Vessel</Link>
        </Col>
      </PathVesselHome>
      

        <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
          <ContainerRowBtwn clearBtn={clearBtn} form={'Truck Truck'} showLoader={showLoader}  >
            <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
            <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
              <InputRow name='Truck ' val={name} handle={(e) => setName(e.target.value)} label='lblname' />
              <InputRow name='Weight ' val={plate_number} handle={(e) => setPlate_number(e.target.value)} label='lblplate_number' />

              <InputRowDate nDate={dimension} label="Date Start" name="Date Start" handle={(nDate) => setDimension(nDate)} />
              <InputRowDate nDate={dimension} label="Date End" name="Date End" handle={(nDate) => setDimension(nDate)} />
              {/* <InputRow name='Date Start ' val={dimension} handle={(e) => setDimension(e.target.value)} label='lbldimension' />
              <InputRow name='Date End' val={capacity} handle={(e) => setCapacity(e.target.value)} label='lblcapacity' /> */}

              <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
            </FormInnerRightPane>
            {/* <FormSidePane /> */}
          </ContainerRowBtwn>
        </AnimateHeight>
        <ContainerRow mt='3'>
          <ListToolBar listTitle='Truck Truck Report' height={height} entity='Truck Truck' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
          <SearchformAnimation searchHeight={searchHeight}>
            <SearchBox />
          </SearchformAnimation>

          <div ref={componentRef} className="dataTableBox">
            <PrintCompanyInfo />
            <TableOpen>
              <TableHead>

                <td>ID</td>
                <td>Truck </td>
                <td>Weight </td>
                <td>Start Date </td>
                <td>End Date </td>

                {userType == 'admin' && <td className='delButton'>Option</td>}
              </TableHead>
              <tbody>
                {vessels.map((vessel) => (
                  <tr key={vessel.id}>
                    <td>{vessel.id}   </td>
                    <td>{vessel.name}   </td>
                    <td>{vessel.plate_number}   </td>
                    <td>{vessel.dimension}   </td>
                    <td>{vessel.capacity}   </td>

                    {userType == 'admin' && <ListOptioncol getEntityById={() => getVesselById(vessel.id)} delEntityById={() => delVesselById(vessel.id)} />}
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


