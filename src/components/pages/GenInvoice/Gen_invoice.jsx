import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
// import UpdatedComponent from '../../Global/HOCForm'
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormInnerRightPaneFull, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputReadOnly, LongTextINputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'

import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import CommonArrivalComp from '../Arrivalnote/CommonArrivalComp'
import { LoadingGif } from '../../Styles/OtherStyles'
import { LoadSub } from '../../Global/InputRow'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Event } from '../../Global/commonForPages/TableCommons'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { InvoiceHeader, InvoiceRows } from './InvoiceRows'
import { ButtonContext } from '../../globalcomponents/ButtonContext'
import CustomModalPopup from '../../Global/CustomModalPopup'
import { ArrivalMovementsSummary } from '../Arrivalnote/ArrivalMovementsSummary'
import CurrentDate from '../../Global/CurrentDate'
import { BillDetails } from './BillDetails'
import { StorageCalculation } from '../Dashboard/StorageCalculation';

function Gen_invoice() {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState(getFormattedDate())
  const [amount, setAmount] = useState()
  const [ref_id, setRef_id] = useState()

  const [date1, setDate1] = useState(CurrentDate.todaydate())
  const [date2, setDate2] = useState(CurrentDate.todaydate())
  /*#endregion ENTITY FIELDS DECLARATION */
  // const [showModal, setShowModal] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [gen_invoices, setGen_invoices] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const { arrival_id, chosenProcess,
    setSourceId, setdestId, setArrival_id, obj, setObj, arrivalInvModal, setArrivalInvModal, showModal, setShowModal }
    = useContext(ColItemContext)

  const { serviceName, setServiceName, chargeCriteria, setChargeCriteria } = useContext(ButtonContext)
  const [setTariffs] = useState([])

  const [arrival_notes, setArrival_notes] = useState([]) //Data List
  const [tallies, setTallies] = useState([]) //Data list if tallies got after clicking the arrival for tariff
  const [arrivalObj, setArrivalObj] = useState({}) //Data list if tallies got after clicking the arrival for tariff
  const [total_weight, setTotal_weight] = useState()
  const [total_amount, setTotal_amount] = useState()
  const authHeader = useAuthHeader()();

  const [endDate, setEndDate] = useState(CurrentDate.todaydate())
  const [invoiceType, setInvoiceType] = useState('')
  const [invoiceTypedata, setInvoiceTypeDAta] = useState({})


  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const [payment, setPayment] = useState(
    { service: '', amount: '', fee: '', chosenProcessCategory: '' }
  )
  const [tallyItems, setTallyItems] = useState([])

  let totalWeight = 0;
  const [invoiceToBePrinted, setInvoiceToBePrinted] = useState(false)
  const [arrivalSelection, setArrivalSelection] = useState(false)
  const [truckGetInTime, setTruckGetInTime] = useState()
  const [destIName, setDestName] = useState()
  const [source_id, setSource_id] = useState(0)
  const [dest_id, setDest_id] = useState(0)
  const [destCat, setDestCat] = useState()
  const [description, setDescription] = useState()
  const [storageOthercosts, setstorageOthercosts] = useState(false)//this helps to switch from storage calculation vs other costs. it then help to show the modal with different content


  const [showRecepted, setShowReceipted] = useState(false)
  const auth = useAuthUser()
  const user = auth();
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var gen_invoice = {
      id: id, date_time: date_time, amount: tallyItems[0], ref_id: ref_id, total_weight: total_weight, total_amount: total_amount, description: description
    }
    if (id) {
      StockCommons.updateGen_invoice(gen_invoice, id, authHeader).then((res) => {
        resetAfterSave()
      })
    } else {
      StockCommons.saveGen_invoice(gen_invoice, arrival_id, authHeader).then((res) => {
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
  const getAllGen_invoices = () => {
    StockRepository.findGen_invoice(authHeader, date1, date2).then((res) => {
      setGen_invoices(res.data);
      setDataLoad(true)
    });
  }
  const getAllArrival_notes = () => {
    StockRepository.findArrival_note(date1, date2, user?.userid, authHeader).then((res) => {

      setArrival_notes(res.data);
      // setDataLoad(true)

    });
  }
  const getAllArrival_notesNotInvoiced = () => {
    StockRepository.findArrival_noteNotInvoiced(date1, date2, user?.userid, authHeader).then((res) => {
      setArrival_notes(res.data);
      // setDataLoad(true)

    });
  }
  useEffect(() => {
    setObj({})
    setInvoiceTypeDAta({})
    getAllGen_invoices(0, 20)
    if (showRecepted) {
      getAllArrival_notes(date1, date2)
    }else {
      getAllArrival_notesNotInvoiced()
    }

    setInvoiceToBePrinted(false)
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))
    setArrivalInvModal('invoice')// this is set to 'invoice' to switch the button as to calculate the tally cost
  }, [refresh]);

  useEffect(() => {
    if (showRecepted) {
      getAllArrival_notes()
    } else {
      getAllArrival_notesNotInvoiced()
    }
  }, [showRecepted])

  const getGen_invoiceById = (id) => {
    StockRepository.findGen_invoiceById(id, authHeader).then((res) => {
      setId(res.data.id)
      setDate_time(res.data.date_time)
      setAmount(res.data.amount)
      setRef_id(res.data.ref_id)
      setChargeCriteria(res.data.ChargeCriteria)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delGen_invoiceById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteGen_invoiceById(id).then(() => {
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

    getAllGen_invoices()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setAmount("")
    setRef_id("")

  }
  const clearHandle = () => {
    setId(null)
    setDate_time("")
    setAmount("")
    setRef_id("")

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

  const DoZero = (item) => {
    return item ? item : "0"
  }
  const ArrivalDetails = (destIName, source_id, dest_id, destCat, arrivalId) => {
    setDestName(destIName)
    setSource_id(DoZero(source_id))
    setDest_id(DoZero(dest_id))
    setDestCat(destCat)
    setArrival_id(arrivalId)
    setArrivalSelection(!arrivalSelection)
  }

  const selectAnotherArrival = () => {
    setArrivalSelection(!arrivalSelection)
  }

  useEffect(() => {
    if (invoiceToBePrinted) {

      StockRepository.truckarrivalInvoice(destIName, source_id, dest_id, destCat, arrival_id, authHeader).then((res) => {
        if (res.data.Tallies.length > 0) {
          setTallies(res.data.Tallies)
        } else if (res.data.PurchaseTallies.length > 0) {
          setTallies(res.data.PurchaseTallies)
        } else if (res.data.SalesTallies.length > 0) {
          setTallies(res.data.SalesTallies)
        }
        setArrivalObj(res.data.arrival)
        setArrivalObj(res.data.PurchaseTallies)
        setChargeCriteria(res.data.ChargeCriteria)
        setPayment(res.data.Payment)
        setTallyItems(res.data.Payment.res)
        if (invoiceType === 'tally') {
          setObj(res.data)
          setServiceName(res.data.Payment.service)
        } else {
          setObj(invoiceTypedata)
          setServiceName('Storage')
          console.log('-------------------THIS IS STORAGE----------')
          console.log(invoiceTypedata)
          console.log('------------------')
        }
        console.log('--------------obj value -----------------------')
        console.log(obj)
        console.log('--------------obj value -----------------------')

        setInvoiceToBePrinted(false)
        setArrival_id(arrival_id)
        if (invoiceToBePrinted) {
          navigate("/printInvoice")
        }

      }).catch(err => {
        alert(err)

      })

    }

  }, [invoiceToBePrinted])


  const navigate = useNavigate()
  const printInvoice = (destIName, source_id, dest_id, destCat, arrivalId, invoiceId, gen_invoice) => {


    // console.log('----------------------')
    // console.log(destIName + '--' + source_id + '--' + dest_id + '--' + destCat + '--' + arrivalId)
    // console.log('----------------------')
    setObj('')
    setDestName(destIName)
    setSourceId(source_id)
    setdestId(dest_id)
    setArrival_id(arrivalId)
    setDestCat(destCat)
    setInvoiceType(gen_invoice.invoiceType)
    console.log('-------------INVOICE TYPE---------')
    console.log(gen_invoice.invoiceType)
    console.log('----------------------')
    setInvoiceTypeDAta(gen_invoice)

    setInvoiceToBePrinted(true)

  }

  useEffect(() => {
    let wght = 0.0
    let amt = 0.0

    tallies.forEach(tally => {
      wght += tally.weight;
      amt += tally.weight * tally.unitPrice;
    });

    setTotal_weight(wght)
    setTotal_amount(amt)
  }, [tallies])

  /* #region --------------- FOR PULLING THE ARRIVAL DETAILS --------------- */

  const [arrivalTallyMovt, setArrivalTallyMovt] = useState([])
  const [arrivalSalesyMovt, setArrivalSalesyMovt] = useState([])
  const [arrivalPurchasesMovt, setArrivalPurchasesMovt] = useState([])
  const [movementsSummary, setMovementsSummary] = useState([])

  const truckarrivalGrpByDestination = (destIName, source_id, dest_id, destCat, arrivalId) => {
    console.log()
    const starDate = CurrentDate.todaydate()
    const endDate = CurrentDate.todaydate()
    setShowModal(true)
    setstorageOthercosts(false)
    setArrival_id(arrivalId)
    StockRepository.truckarrivalGrpByDestination(destIName, source_id, dest_id, destCat, arrivalId, date1, date2, authHeader).then((res) => {
      setArrivalTallyMovt(res.data.groupedTallies)
      setArrivalSalesyMovt(res.data.salesmovements)
      setArrivalPurchasesMovt(res.data.purchasessmovements)
      setMovementsSummary(res.data.movementsSummary)
    })
  }
  /* #endregion */


  const getCommonSearchByDate = (startDate, endDate) => {
    setDate1(startDate)
    setDate2(endDate)
    setRefresh(!refresh)
  }

  let cashOnCargo = 0.0

  const invoiceByCleint = (client) => {
    setstorageOthercosts(true)
    setShowModal(true)
  }
  return (
    // <PagesWapper>
    <>
      <CustomModalPopup show={showModal} onHide={() => setShowModal(false)} title={"Arrival Details"} content={
        storageOthercosts ? <StorageCalculation refresh={refresh} setRefresh={setRefresh} /> : <>
          <ArrivalMovementsSummary setShowModal={setShowModal} movementsSummary={movementsSummary} purchMvt={arrivalPurchasesMovt}
            saleMvt={arrivalSalesyMovt} tallyMvt={arrivalTallyMovt} startDate={date1} endDate={date2} setRefresh={setRefresh} refresh={refresh} />
        </>} />

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} noTitle={true} form={'Invoice'} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPaneFull onSubmitHandler={onSubmitHandler}>
            <Link className=' mx-3 btn btn-primary' onClick={() => selectAnotherArrival()} title="My arrival  ">Invoice Handling</Link>
            <Link className=' mx-3 btn btn-dark' onClick={() => invoiceByCleint()} title="Invoice Storage">Invoice Storage</Link>

            {arrivalSelection
              && <TableOpen>
                <TableHead>
                  <td>Arrival No.</td>
                  <td>Date Time </td>
                  <td>Client TIN </td>
                  <td>Client Name </td>
                  <td>Process </td>
                  {userType == 'admin' && <td className='delButton d-none'>Option</td>}
                </TableHead>
                <tbody>
                  {arrival_notes.map((arrival_note) => (
                    <tr key={arrival_note.id}>
                      <td>{arrival_note.id}   </td>
                      <td>{arrival_note.date_time}   </td>
                      <td>{arrival_note?.mdl_client?.tin_number}   </td>
                      <td>{arrival_note?.mdl_client?.mdl_client?.name} {arrival_note?.mdl_client?.mdl_client?.surname}  </td>

                      <td>

                        <Event item={[arrival_note.mdl_destination.name, arrival_note.source_id, arrival_note.dest_id,
                        arrival_note.mdl_destination.category, arrival_note.id]}
                          searchDone={() => {
                            truckarrivalGrpByDestination(arrival_note.mdl_destination.name,
                              arrival_note.source_id, arrival_note.dest_id, arrival_note.mdl_destination.category,
                              arrival_note.id)
                          }} />
                      </td>

                    </tr>
                  ))}</tbody>
              </TableOpen>}
            {userType == 'admin' &&
              <Row>
                
                <Col md={6}>
                  <input type="checkbox" id="receiptedInvoices" onChange={() => setShowReceipted(!showRecepted)} /> <label for="receiptedInvoices">Show receipted</label>
                </Col>
              </Row>}
            <Row className="mt-3  ">



            </Row>

            {chosenProcess && chosenProcess.split(' ')[0] === 'Warehouse'
              && <InputReadOnly name='W/H Storage ' val={ref_id} handle={(e) => setRef_id(e.target.value)} label='lblref_id' />
            }

            {/* <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} /> */}
          </FormInnerRightPaneFull>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar height={height} entity='Invoice' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">

          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <td>ID</td>
              <td>Arrival ID </td>
              <td>Date Time </td>
              <td>Cargo Movement </td>
              <td>Description </td>
              <td>Weight (KG) </td>
              <td>Total amount (RWf) </td>
              {userType == 'admin' && <td className='delButton '>Option</td>}
            </TableHead>
            <tbody>
              {gen_invoices.map((gen_invoice) => {
                cashOnCargo += gen_invoice.amount

                return (
                  <tr key={gen_invoice.id}>
                    <td>{gen_invoice.id}   </td>
                    <td>{gen_invoice.arrivalId}   </td>
                    <td>{gen_invoice.date_time}   </td>

                    <td>{gen_invoice.destIName}   </td>
                    <td>{gen_invoice.description}   </td>
                    <td>{gen_invoice.total_weight && (gen_invoice.total_weight).toLocaleString()}   </td>
                    <td>RWF {gen_invoice.amount && (gen_invoice.amount).toLocaleString()}   </td>
                    {userType == 'admin' && <ListOptioncol print={true}
                      printData={() => printInvoice(gen_invoice.destIName, gen_invoice.source_id, gen_invoice.dest_id, gen_invoice.destCat, gen_invoice.arrivalId, gen_invoice.id, gen_invoice
                      )} getEntityById={() => getGen_invoiceById(gen_invoice.id)}
                      delEntityById={() => delGen_invoiceById(gen_invoice.id)} />}
                  </tr>
                )
              }
              )}
              <tr>
                <td className="text-end" colSpan={6}> </td>
                <td style={{ fontWeight: 'bold', fontSize: '20px' }} className="text-start" > Total:  {cashOnCargo.toLocaleString()}</td>
              </tr>
            </tbody>
          </TableOpen>

        </div>
      </ContainerRow>
      {!dataLoad && <DataListLoading />
      }

      {/* </PagesWapper> */}
    </>

  )
}

export default Gen_invoice


