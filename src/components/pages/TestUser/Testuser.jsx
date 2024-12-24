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
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import StockDelete from '../../services/StockServices/StockDelete'
import { ColItemContext } from '../../Global/GlobalDataContentx'


function Testuser() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [birth_location, setBirth_location] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [testusers, setTestusers] = useState([]) //Data List
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

    var Testuser = {
      id: id, name: name, surname: surname, birth_location: birth_location
    }
    if (id) {
      StockCommons.updateTestuser(Testuser, id).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveTestuser(Testuser).then((res) => {
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
  const getAllTestusers = (page, size) => {
    // StockRepository.findTestuser(page, size).then((res) => {
    //   setTestusers(res.data.data);
    //   setDataLoad(true)

    // });
  }

  useEffect(() => {
    getAllTestusers(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getTestuserById = (id) => {
    StockRepository.findTestuserById(id).then((res) => {
      setId(res.data.id)
      setName(res.data.name)
      setSurname(res.data.surname)
      setBirth_location(res.data.birth_location)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delTestuserById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteTestuserById(id).then(() => {
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
    getAllTestusers()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setName("")
    setSurname("")
    setBirth_location("")

  }
  const clearHandle = () => {
    setId(null)
    setName("")
    setSurname("")
    setBirth_location("")

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
        <ContainerRowBtwn clearBtn={clearBtn} form={'Testuser'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow name='Name ' val={name} handle={(e) => setName(e.target.value)} label='lblname' />
            <InputRow name='Surname ' val={surname} handle={(e) => setSurname(e.target.value)} label='lblsurname' />
            <InputRow name='Birth Location ' val={birth_location} handle={(e) => setBirth_location(e.target.value)} label='lblbirth_location' />

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Testuser List' height={height} entity='Testuser' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>ID</td>
              <td>Name </td>
              <td>Surname </td>
              <td>Birth Location </td>

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {testusers.map((testuser) => (
                <tr key={testuser.id}>
                  <td>{testuser.id}   </td>
                  <td>{testuser.name}   </td>
                  <td>{testuser.surname}   </td>
                  <td>{testuser.birth_location}   </td>

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getTestuserById(testuser.id)} delEntityById={() => delTestuserById(testuser.id)} />}
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

export default Testuser
