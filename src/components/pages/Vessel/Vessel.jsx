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
import InputRow, { DropDownInput, EmptyInputRow, FileInputRow, InputOnly, InputOnlyReadOnly } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Commons from '../../services/Commons'
import Repository from '../../services/Repository'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'
import { PathVesselHome } from '../NewNav/BreadCrumb'
import { Alert, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import { GenFullInput, GenIputRow } from '../../Global/InputRow'
import StockConn from '../../services/StockServices/StockConn'
import axios from 'axios'


function Vessel() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [plate_number, setPlate_number] = useState()
  const [capacity, setCapacity] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [vessels, setVessels] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [height, setHeight] = useState(0);

  const { itemOrCargo, setitemOrCargo } = useContext(ColItemContext)

  const [length, setLength] = useState(0)
  const [width, setWidth] = useState(0)
  const [vesselHeight, setVesselHeight] = useState(0);
  const [dimension, setDimension] = useState()


  const [owner_operator, setOwner_operator] = useState()
  const [contact_number, setContact_number] = useState()
  const [rura_certificate, setRura_certificate] = useState()
  const [errorOccured, setErrorOccured] = useState(false)
  const [loa, setLoa] = useState()
  const elementRef = useRef(null);



  // images codes
  /* #region ----------------------Files uploads ---------------------- */

  const [message, setMessage] = useState([]);
  const [docs, setDocs] = useState([]) //images
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);  // Get the files from the input field
    console.log('-----------------docs', docs)
    console.log(files); // Check what files are being captured
    if (files.length > 0) {
      setDocs(files); // Store the files in the state
    }
  };


  const formRef = useRef();

  const handleSubmit = async (event) => {


    /* #region ---------------Other form data --------------- */
    var vessel = {
      id: id, name: name, plate_number: plate_number,
      dimension: dimension, capacity: capacity,
      owner_operator: owner_operator,
      contact_number: contact_number,
      rura_certificate: rura_certificate,
      owner_operator: owner_operator,
      loa: loa,
    }

    /* #endregion */
    event.preventDefault();

    // Create FormData to append images and other data
    const formData = new FormData();
    for (let i = 0; i < docs.length; i++) {
      formData.append('images', docs[i]);
    }
    formData.append('images', docs); // Add item name to the form data

    // Append vessel data
    Object.keys(vessel).forEach((key) => {
      formData.append(key, vessel[key]);
    });

    try {
      const response = await axios.post(StockConn.wholePath.name + "/vessel/", formData, {
        headers: {
          ...StockConn.GetToken,
          'Content-Type': 'multipart/form-data' // This should be handled automatically by axios, but you can explicitly set it
        }

      });

      if (response.data !== 'Data saved succefully') {
        // setMessage(response.data.message); // Set the response message
        setErrorOccured(true)
        alert(response.data)
        elementRef.current.scrollIntoView({
          behavior: 'smooth',  // Optional: for smooth scrolling
          block: 'start',      // Optional: align at the start of the viewport
        });

      } else {
        setErrorOccured(false)
        alert('Data saved successfully')
      }
      setDataLoad(false)
    } catch (error) {
      // setMessage(error); // Set the response message
      setErrorOccured(true)
      // setMessage(error.message)
      console.log('==================done ======================')
      if (error.response) {
        alert('An error occured')
        setMessage(error.response.data.message)
      }

      console.error(error);
    }
  }
  /* # ----------------------------End file uplaods endregion */



  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)
    if (id) {
      StockCommons.updateVessel(vessel, id).then((res) => {
        resetAfterSave()
      })
    } else {

      setRefresh(!refresh)
      handleSubmit(e)
      //reset the form
      const formData = new FormData(formRef.current);
      console.log('Form submitted:', Object.fromEntries(formData.entries()));
      // Clear the form after submission
      formRef.current.reset();
    }
  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllVessels = (page, size) => {
    StockRepository.findVessel().then((res) => {
      setVessels(res.data);
      setDataLoad(true)

    });
  }
  useEffect(() => {
    setDimension(length + ' x ' + vesselHeight + ' x ' + width);

  }, [length, vesselHeight, width])

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
      <PagesWapper ref={elementRef}>

        <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
          <ContainerRowBtwn clearBtn={clearBtn} form={'Vessel'} showLoader={showLoader}  >
            <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />

            {errorOccured && <><h1 style={{ marginBottom: '10px', fontSize: '19px' }}>Correct the below input values </h1> <br /></>}

            {errorOccured &&
              <Alert variant={errorOccured ? 'danger' : 'success'}>
                {errorOccured && message}
              </Alert>}
            <FormInnerRightPane ref={formRef} onSubmitHandler={onSubmitHandler}>
              <InputRow name='Vessel Name ' val={name} handle={(e) => setName(e.target.value)} label='lblname' />
              <InputRow name='Plate Number ' val={plate_number} handle={(e) => setPlate_number(e.target.value)} label='lblplate_number' />

              <Row className=''>
                <Col md={12} className="form-group ms-1">
                  <Row>
                    <Col className='ms-1 ps-3' sm={3}>Dimension (meter)</Col>
                    <Col className="m-0 pe-0" >
                      <InputOnly num={true} name='length ' val={length}
                        handle={(e) => setLength(e.target.value)} placeholder="length"
                        label='lbldimension' />
                    </Col>
                    <Col className="m-0 p-0" >
                      <InputOnly num={true} name='width ' val={width} placeholder="Width"
                        handle={(e) => setWidth(e.target.value)} label='lbldimension' />
                    </Col>
                    <Col className="m-0 p-0" >
                      <InputOnly num={true} name='height ' val={vesselHeight} placeholder="Height"
                        handle={(e) => setVesselHeight(e.target.value)} label='lbldimension' />
                    </Col>
                    <Col className="m-0 p-0 d-none"  >
                      <InputOnlyReadOnly name='height ' readonly val={dimension}
                        handle={(e) => setDimension(e.target.value)} label='lbldimension' />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <InputRow num={true} name='Capacity (tons)' val={capacity} handle={(e) => setCapacity(e.target.value)} label='lblcapacity' />
              <InputRow name='Owner/operator' val={owner_operator} handle={(e) => setOwner_operator(e.target.value)}
                label='owner_operator' />
              <InputRow num={true} name='Contact/number' val={contact_number} handle={(e) => setContact_number(e.target.value)}
                label='contact_number' />
              <InputRow name='Rura certificate Number' val={rura_certificate} handle={(e) => setRura_certificate(e.target.value)}
                label='contact_number' />
              <InputRow name='LOA' val={loa} handle={(e) => setLoa(e.target.value)}
                label='loa' />
              <FileInputRow label='images' val={setDocs} handle={handleFileChange} name="RURA Certificates (Optional)"
              />


              <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
            </FormInnerRightPane>
            {/* <FormSidePane /> */}
          </ContainerRowBtwn>
        </AnimateHeight>
        <ContainerRow mt='3'>
          <ListToolBar listTitle='vessel List' height={height} entity='Vessel' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
          <SearchformAnimation searchHeight={searchHeight}>
            <SearchBox />
          </SearchformAnimation>

          <div ref={componentRef} className="dataTableBox">
            <PrintCompanyInfo />
            <TableOpen>
              <TableHead>

                <td>ID</td>
                <td>owner/operator </td>
                <td>Name </td>
                <td>Plate Number </td>
                <td>Dimension (l <smal>x</smal> w x h) </td>
                <td>Capacity </td>
                <td>contact number </td>
                <td>rura certificate Number </td>
                <td>LOA</td>

                {userType == 'admin' && <td className='delButton d-none'>Option</td>}
              </TableHead>
              <tbody>
                {vessels.map((vessel) => (
                  <tr key={vessel.id}>
                    <td>{vessel.id}   </td>
                    <td>{vessel.owner_operator}   </td>
                    <td>{vessel.name}   </td>
                    <td>{vessel.plate_number}   </td>
                    <td>{vessel.dimension}   </td>
                    <td>{vessel.capacity} tons  </td>

                    <td>{vessel.contact_number}   </td>
                    <td>{vessel.rura_certificate}   </td>
                    <td>{vessel.loa}   </td>

                    {userType == 'admin' && <ListOptioncol getEntityById={() => getVesselById(vessel.id)} delEntityById={() => delVesselById(vessel.id)} />}
                  </tr>
                ))}</tbody>
            </TableOpen>
          </div>
        </ContainerRow>
        {!dataLoad && <DataListLoading />
        }
      </PagesWapper>
    </>

  )
}

export default Vessel
