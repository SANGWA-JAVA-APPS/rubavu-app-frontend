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
import InputRow, { DropDownInput, EmptyInputRow, InputRowDate } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'

import Commons from '../../services/Commons'
import StockDelete from '../../services/StockServices/StockDelete'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import Repository from '../../services/Repository'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'


function Entry() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState()
  const [book_id, setBook_id] = useState()
  const [destination_id, setDestination_id] = useState()
  const [time_arrival, setTime_arrival] = useState()
  const [time_moored, setTime_moored] = useState()

  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [entrys, setEntrys] = useState([]) //Data List
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

    var entry = {
      id: id, date_time: date_time, book_id: book_id, destination_id: destination_id, time_arrival: time_arrival, time_moored: time_moored
    }
    if (id) {
      Commons.updateEntry(entry, id).then((res) => {
        resetAfterSave()
      })
    } else {
      Commons.saveEntry(entry).then((res) => {
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
  const getAllEntrys = (page, size) => {
    Repository.findEntry(page, size).then((res) => {
      setEntrys(res.data.data);
      setDataLoad(true)

    });
  }

  useEffect(() => {
    getAllEntrys(0, 20)

    //Get Token and catname
    setUserType(localStorage.getItem('catname'))

  }, [refresh]);


  const getEntryById = (id) => {
    StockRepository.findEntryById(id).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.date_time)
      setBook_id(res.data.book_id)
      setDestination_id(res.data.destination_id)
      setTime_arrival(res.data.time_arrival)
      setTime_moored(res.data.time_moored)

      setClearBtn(true)
      showheight('auto')
    })
  }
  const delEntryById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteEntryById(id).then(() => {
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
    getAllEntrys()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setBook_id("")
    setDestination_id("")
    setTime_arrival("")
    setTime_moored("")

  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setBook_id("")
    setDestination_id("")
    setTime_arrival("")
    setTime_moored("")

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
      {/* <PagesWapper> */}

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={'Entry'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <DropDownInput handle={(e) => setCatId(e.target.value)} name='Truck Type' label='trucktype' >
              <option>box truck  </option>
              <option>20ft container  </option>
              <option>40ft container  </option>
              <option>2x20ft container  </option>
              <option>Other  </option>
            </DropDownInput>
            <InputRowDate nDate={date_time} label="Date" name="Date" handle={(nDate) => setDate_time(nDate)} />
            
            {/* <InputRow name='Book Id ' val={book_id} handle={(e) => setBook_id(e.target.value)} label='lblbook_id' /> */}
            <InputRow name='Destination  ' val={destination_id} handle={(e) => setDestination_id(e.target.value)} label='lbldestination_id' />

            <DropDownInput handle={(e) => setCatId(e.target.value)} name='Truck Type' label='trucktype' >
              <option>Warehouse  </option>
              <option>Vessel  </option>
              <option>Truck </option>
            </DropDownInput>
            {/* <InputRow name='Time Arrival ' val={time_arrival} handle={(e) => setTime_arrival(e.target.value)} label='lbltime_arrival' /> */}
            {/* <InputRow name='Time Moored ' val={time_moored} handle={(e) => setTime_moored(e.target.value)} label='lbltime_moored' /> */}

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='entry List' height={height} entity='Entry' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>

              <td>ID</td>
              <td>Date Time </td>
              <td>Book Id </td>
              <td>Destination Id </td>
              {/* <td>Time Arrival </td>
              <td>Time Moored </td> */}

              {userType == 'admin' && <td className='delButton'>Option</td>}
            </TableHead>
            <tbody>
              {entrys.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}   </td>
                  <td>{entry.date_time}   </td>
                  <td>{entry.book_id}   </td>
                  <td>{entry.destination_id}   </td>
                  {/* <td>{entry.time_arrival}   </td>
                  <td>{entry.time_moored}   </td> */}

                  {userType == 'admin' && <ListOptioncol getEntityById={() => getEntryById(entry.id)} delEntityById={() => delEntryById(entry.id)} />}
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

export default Entry
