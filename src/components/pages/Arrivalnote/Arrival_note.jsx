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
import InputRow, { DropDownInput, DropDownInputNoLabel, EmptyInputRow, InputOnly, InputOnlyEditable, InputOnlyReadOnly, InputReadOnly, LongTextINputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import Commons from '../../services/Commons'
import Repository from '../../services/Repository'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'
import { Button, Col, Container, Row } from 'react-bootstrap'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import { Link, useNavigate } from 'react-router-dom'
import { printer } from 'react-icons-kit/icomoon/printer'
import Icon from 'react-icons-kit'
import { Submenu } from '../NewNav/ProcSubMenu/Submenu'
import CustomModalPopup from '../../Global/CustomModalPopup'
import { ArrivalDetailsPopup, MediumPopup } from './ArrivalDetailsPopup'
import { ArrivalDetailsContent } from './ArrivalClientDetails'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import { arrowRight } from 'react-icons-kit/icomoon/arrowRight'
import { arrowLeft } from 'react-icons-kit/icomoon/arrowLeft'
import MultipleInputs from './MultipleInputs'
import { ButtonContext } from '../../globalcomponents/ButtonContext'

import { ArrivalToolBar } from './ArrivalToolBar'
import { ToastContext } from '../../globalcomponents/ToastContext'
import { pencil as edit } from 'react-icons-kit/icomoon/pencil'
import { InvoiceHeader, InvoiceRows } from '../GenInvoice/InvoiceRows'
import { user as client } from 'react-icons-kit/icomoon/user'
import CurrentDate from '../../Global/CurrentDate'
import { ArrivalMovementsSummary } from './ArrivalMovementsSummary'
import { useCollectTypeContext } from '../../Global/CollectTypeContext';
import SeaarchBytyping, { SearchTableResult } from '../../globalcomponents/SeaarchBytyping';
import { ClientTableRows } from '../Invoice/Invoice';
import { OtherToolBarItems } from './OtherToolBarItems';


function Arrival_note({ DynamicMenu }) {

  const [userType, setUserType] = useState()
  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time, setDate_time] = useState()
  const [entry_id, setEntry_id] = useState()

  const [weight, setWeight] = useState()
  const [dataLoad, setDataLoad] = useState(false)
  /*#endregion ENTITY FIELDS DECLARATION */

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [arrival_notes, setArrival_notes] = useState([]) //Data List
  const [arrival_notesNoDestination, setArrival_notesNoDestination] = useState([]) //Data List

  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [nextArrival, setNextArrival] = useState();
  const [clients, setClients] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [smallModalOpen, setSmallModalOpen] = useState(false)

  const { step, setStep, arrivalNote, setArrivalNote, updateArrivalNote, inputs, serviceName, setInputs, setServiceName} = useContext(ButtonContext)

  const { chosenProcess, chosenProcessId, chosenProcessCategory, sourceId, setSourceId, destId, setdestId, arrival_id, setArrival_id, obj, setObj,
    arrivalInvModal, setArrivalInvModal, checkAll, setcheckAll, myRecords, setMyRecords, process, setProcess, commonsDate, commonArray,setCommonSDate, commoneDate, setCommoneDate
  } = useContext(ColItemContext)


  const { showToast } = useContext(ToastContext)
  /* #region -----------------sOURCE AND DESTINATION ID -------------------------------- */

  const [counter, setCounter] = useState(1)

  const [trucks, setTrucks] = useState([])
  const [vessels, setVessels] = useState([])

  const [sourceTruckId, setSourceTruckId] = useState()
  const [sourceVesselId, setVesselId] = useState()

  const [destinationTruckId, setDestinationTruckId] = useState()
  const [destinationVesselId, setDestinationVesselId] = useState()
  const navigate = useNavigate()
  const [arrivaldetailsTallies, setArrivaldetailsTallies] = useState([])
  const [arrivadetailsPurchaseTallies, setarrivadetailsPurchaseTallies] = useState([])
  const [arrivadetailsSalesTallies, setArrivadetailsSalesTallies] = useState([])

  const [startDate, setStartDate] = useState(CurrentDate.todaydate())
  const [endDate, setEndDate] = useState(CurrentDate.todaydate())

  const [searchedclientId, setSearchedclientId] = useState(0)

  const { collect_type, setCollect_type } = useCollectTypeContext()
  

  const authHeader = useAuthHeader()();
  const getAllVessels = (page, size) => {
    StockRepository.findVessel(authHeader).then((res) => {
      setVessels(res.data);
      setDataLoad(true)
    });
  }
  const localColStyles = {
    fontWeight: 'bold', fontSize: '20px'
  }
  const getOnlyTrucks = () => {
    StockRepository.getUniqueTrucksWithEntries(authHeader).then((res) => {
      setTrucks(res.data);
      setDataLoad(true)
    });
  }
  useEffect(() => {
    getAllVessels()
    getOnlyTrucks()
    setArrivalInvModal('arrival')
    
    // showToast("Success! Data saved.", "success");
  }, [])
  useEffect(() => {
    if (!chosenProcessId || !chosenProcessCategory) {
      navigate("/ops")
    }
  })
  const setSourceTruckHandler = (e) => {
    setSourceTruckId(e.target.value)
    setSourceId(e.target.value)
    arrivalNote.source_id = e.target.value
  }
  const setSourceVesselHandler = (e) => {
    setSourceId(e.target.value)
    arrivalNote.source_id = e.target.value
  }
  const setDestTruckHandler = (e) => {
    setDestinationTruckId(e.target.value)
    setdestId(e.target.value)
    arrivalNote.dest_id = e.target.value
  }
  const setDestVesselHandler = (e) => {
    setDestinationVesselId(e.target.value)
    setdestId(e.target.value)
    arrivalNote.dest_id = e.target.value
  }
  /* #endregion */


  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const auth = useAuthUser()
  const user = auth();
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)
    setArrivalNote(prevState => ({
      ...prevState,  // Keep existing values
      dest_id: prevState.dest_id ? prevState.dest_id : "0", // Update only arrival_id
      source_id: prevState.source_id ? prevState.source_id : "0",
      collect_type: prevState.collect_type, // Update only arrival_id
      userid: user?.userid || "0",
    }));

    const requestData = {
      arrivalPartOne: arrivalNote,
      arrivalTallyDTOs: inputs
    }

    if (id) {
      StockCommons.updateArrival_note(requestData, arrivalNote.id, authHeader).then((res) => {
        alert('Arrival Note changed successfully')
        clearForm()
        setrefresh(!refresh)
      })
    } else if (!arrivalNote.tarifftype) {
      alert('You have to specify the assorted/not assorted value !')

    } else if (arrivalNote.tin_number !== '') {
      StockCommons.saveArrival_note(requestData, chosenProcessId, authHeader).then((res) => {
        console.log(res.data)
        if (res.data != null) {
          resetAfterSave()
          alert('Arrival note created successfully')
        }
      }).catch((error) => {
        console.log('-----------')
        // StockCommons.RedirectToLogin()
      })
    } else {
      alert(arrival_id)
    }
  }

  useEffect(() => {
    const currentUser = auth();

    const userid = user?.userid || localStorage.getItem('userid') || '0';

    if (currentUser) {
      // setUser(currentUser);
      // Optionally update arrivalNote.userid here if needed
      setArrivalNote((prevState) => ({
        ...prevState,
        userid: userid,
      }));
    }
  }, [auth]);


  /*#endregion Listing data*/
  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllArrival_notes = (startDate, endDate) => {
    StockRepository.findArrival_noteByProcess(startDate, endDate, user?.userid, chosenProcessId, authHeader).then((res) => {
      setArrival_notes(res.data);
      setDataLoad(true)

    });
  }
  const getAllArrival_notesNoDestination = (startDate, endDate) => {
    StockRepository.findArrival_note(startDate, endDate, user?.userid, authHeader).then((res) => {
      setArrival_notesNoDestination(res.data);
      setDataLoad(true)

    });
  }


  const getAllClients = () => {
    StockRepository.findClient(authHeader).then((res) => {
      setClients(res.data);
      // setDataLoad(true)
      // setUpdateList((updateList) => updateList + 1)
    });
  }
  const getNextArrival = () => {
    StockRepository.findNextarrival(authHeader).then((res) => {
      setNextArrival(res.data);
      // setDataLoad(true)
      // setUpdateList((updateList) => updateList + 1)
    });
  }
  useEffect(() => {
    setArrival_id(0)
    // getAllArrival_notes(startDate, endDate)
    // getAllArrival_notesNoDestination(startDate, endDate)
    getAllClients()
    getNextArrival()
    //Get Token and catname
    setUserType(localStorage.getItem('catname'))
    setStep(1)
  }, [refresh]);


  const getArrival_noteById = (id) => {
    StockRepository.findArrival_noteById(id, authHeader).then((res) => {
      const { arrivalPartOne, arrivalTallyDTOs } = res.data;
      setSourceTruckId(arrivalPartOne.source_id)
      setSourceId(arrivalPartOne.source_id)


      setArrivalNote({
        id: arrivalPartOne.id || null,
        date_time: arrivalPartOne.date_time || "",
        source_id: arrivalPartOne.source_id || "",
        dest_id: arrivalPartOne.dest_id || "",
        destination_id: arrivalPartOne.destination_id ? String(arrivalPartOne.destination_id) : "",
        arrival_id: arrivalPartOne.arrival_id ? String(arrivalPartOne.arrival_id) : "",
        tin_number: arrivalPartOne.tin_number || "",
        name: arrivalPartOne.name || "",
        surname: arrivalPartOne.surname || "",
        telephone: arrivalPartOne.telephone || "",
        tarifftype: arrivalPartOne.tarifftype || "",
        collect_type: arrivalPartOne.collect_type || "",
        ddcom: arrivalPartOne.ddcom || "",
        exporter: arrivalPartOne.exporter || "",
        clearingAgent: arrivalPartOne.clearingAgent || "",
        description: arrivalPartOne.description || "",
        userid: arrivalPartOne.userid || localStorage.getItem('userid') || ""
      });
      setInputs(arrivalTallyDTOs.length > 0 ? arrivalTallyDTOs.map(tally => {
        // Normalize end_date_time to yyyy-MM-dd HH:mm:ss if needed
        let endDateTime = tally.end_date_time || "";
        if (endDateTime && !endDateTime.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
          try {
            const date = new Date(endDateTime);
            endDateTime = date.toISOString().replace('T', ' ').substring(0, 19);
          } catch (e) {
            endDateTime = "";
          }
        }
        return {
          id: tally.id || null,
          cargo: tally.cargo || "",
          unit: tally.unit || 0,
          weight: tally.weight || 0,
          weighttype: tally.weighttype || "", // String ("1", "2", "3")
          entry_date: tally.entry_date || "",
          dest_id: tally.dest_id != null ? String(tally.dest_id) : "",
          source_id: tally.source_id != null ? String(tally.source_id) : "",
          description: tally.description || "OK",
          start_date_time: tally.start_date_time || "",
          end_date_time: endDateTime
        };
      }) : [{
        id: null, cargo: "", unit: 0, weight: 0, weighttype: "", entry_date: "", dest_id: "", source_id: "", description: "OK", start_date_time: "", end_date_time: ""
      }]);
      setId(arrivalPartOne.arrival_id)
      // Additional logic
      setClearBtn(true);
      // showheight('auto');
    })
    // setClearBtn(true)
    showheight('auto')

  }
  const delArrival_noteById = (id) => {
    Utils.Submit(() => {
      StockDelete.deleteArrival_noteById(id).then(() => {
        setRefresh(!refresh)
      })
    }, () => { })
  }
  /*#endregion Listing data*/
  /*#region ---------Show Height, reset all and clear Button   ------------*/
  const defaultArrivalNote = {
    id: null,
    date_time: "",
    source_id: "",
    dest_id: "",
    destination_id: "",
    arrival_id: "",
    tin_number: "",
    name: "",
    surname: "",
    telephone: "",
    tarifftype: "",
    collect_type: "",
    ddcom: "",
    exporter: "",
    clearingAgent: "",
    description: "",
    userid: localStorage.getItem('userid') || ""
  };

  const defaultInputs = [{
    id: null, cargo: "", unit: 0, weight: 0, weighttype: "", entry_date: "", dest_id: "", source_id: "", description: "OK", start_date_time: "",
    end_date_time: ""
  }];
  const clearForm = () => {
    setArrivalNote(defaultArrivalNote);
    setInputs(defaultInputs);
    setHeight(0);
    setDataLoad(false)
    setShowLoader(false);
    setRefresh(!refresh)
  };
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getAllArrival_notes()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time("")
    setEntry_id("")

    setWeight("")

  }
  const clearHandle = () => {
    setId(null)
    clearForm()
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
  const snbr = (name) => {//source name
    return name === 'Truck' ? 'Select Source Truck Plate Number' : (name === 'Vessel') ? 'Select Source Vessel   Number' : ''
  }
  const dnbr = (name) => {//Destination name
    return name === 'Truck' ? 'Select Destination Truck Plate Number' :
      (name === 'Vessel') ? 'Select Destionation Vessel Number' : ''
  }
  const [destIName, setDestName] = useState()
  const [source_id, setSource_id] = useState(0)
  const [dest_id, setDest_id] = useState(0)
  const [destCat, setDestCat] = useState()

  const [trucksByArrival, setTrucksByArrival] = useState([])
  const [trucksByArrivalTwo, setTrucksByArrivalTwo] = useState([])
  const [vesselsByArrival, setVesselsByArrival] = useState([])
  const [vesselsByArrivalTwo, setVesselsByArrivalTwo] = useState([])
  const [type, setType] = useState('')

  const DoZero = (item) => {
    return item === undefined ? 0 : item
  }
  useEffect(() => { //just details
    if (modalOpen) {
      StockRepository.truckarrival(destIName, source_id, dest_id, destCat, arrival_id, authHeader).then((res) => {

        if (destIName === 'Truck Truck') {
          setTrucksByArrival(res.data.truck1)
          setTrucksByArrivalTwo(res.data.truck2)
        }
        if (destIName === 'Truck Warehouse' || destIName === 'Warehouse Truck') {
          setTrucksByArrival(res.data.truck)
        }
        if (destIName === 'Truck Vessel' || destIName === 'Vessel Truck') {
          setTrucksByArrival(res.data.truck)
          setVesselsByArrival(res.data.vessel)
        }
        if (destIName === 'Vessel Vessel') {
          setVesselsByArrival(res.data.vessel1)
          setVesselsByArrivalTwo(res.data.vessel2)
        }
        if (destIName === 'Vessel Warehouse' || destIName === 'Warehouse Vessel') {
          setVesselsByArrival(res.data.vessel)
        }
      })

    }
  }, [modalOpen]);

  const ArrivalDetails = (destIName, source_id, dest_id, destCat, arrivalId, small) => {
    const _sourceId = source_id ? source_id : 0 // the zero means warehouse
    const _destId = dest_id ? dest_id : 0// the zero means warehouse

    setDestName(destIName)
    setSource_id(DoZero(_sourceId))
    setDest_id(DoZero(_destId))
    setDestCat(destCat)
    setArrival_id(arrivalId)
    setModalOpen(true)
  }
  const ArrivalDetailsSmall = (destIName, source_id, dest_id, destCat, arrivalId, small) => {
    const _sourceId = source_id ? source_id : 0 // the zero means warehouse
    const _destId = dest_id ? dest_id : 0// the zero means warehouse

    setDestName(destIName)
    setSource_id(DoZero(_sourceId))
    setDest_id(DoZero(_destId))
    setDestCat(destCat)
    setArrival_id(arrivalId)
    //get tally, purchases, sales trucks and vessels

    setSmallModalOpen(true)
  }
  useEffect(() => {
    if (smallModalOpen) {
      StockRepository.truckarrival(destIName, source_id, dest_id, destCat, arrival_id, authHeader).then((res) => {
        // setServiceName(res.data.Payment.service)
        setArrivaldetailsTallies(res.data.Tallies)
        setarrivadetailsPurchaseTallies(res.data.PurchaseTallies)
        setArrivadetailsSalesTallies(res.data.SalesTallies)
      })
    }
  }, [smallModalOpen])
  const handleArrivalDetails = (e) => {
    setArrival_id(e.target.value)
    arrivalNote.arrival_id = e.target.value
    setCloseClient(true)
    StockRepository.findClientnames(arrival_id, authHeader).then((res) => {
      setArrival_id(arrival_id)
      setCloseClient(true)
      setClientByArrival({
        name: res.data.name,
        surname: res.data.surname,
        tin_number: res.data.tin_number,
        telephone: res.data.telephone
      })
    })
  }
  const [arriPrint, setArriPrintprint] = useState(false)

  const printArrivalnote = (arrival_note) => {
    const _sourceId = arrival_note.source_id ? arrival_note.source_id : 0  // the zero means warehouse
    const _destId = arrival_note.dest_id ? arrival_note.dest_id : 0  // the zero means warehouse

    StockRepository.truckarrival(arrival_note.mdl_destination.name, _sourceId, _destId, arrival_note.mdl_destination.category, arrival_note.id, authHeader).then((res) => {
      setObj(res.data)
      setArriPrintprint(true)
    })
  }
  useEffect(() => {
    if (arriPrint) {
      navigate("/arrivalPrint")
    }
  }, [arriPrint])
  const [length, setLength] = useState()
  const [width, setWidth] = useState()
  const [dimension, setDimension] = useState()
  const [vesselHeight, setVesselHeight] = useState()
  const customSaveEvent = () => {
    if (step < 2) {
      setStep(n => n + 1)
    }
  }
  const customSaveEventTwo = () => {
    if (step > 0) {
      setStep(n => n - 1)
    }
  }
  const zeroBeforethousand = (n) => {
    n = Number(n)
    return (n < 100 ? '00' + n : n)
  }

  let totalWeight = 0;
  const [showModal, setShowModal] = useState(false)
  const [arrivalTallyMovt, setArrivalTallyMovt] = useState([])
  const [arrivalSalesyMovt, setArrivalSalesyMovt] = useState([])
  const [arrivalPurchasesMovt, setArrivalPurchasesMovt] = useState([])
  const [movementsSummary, setMovementsSummary] = useState([])

  const truckarrivalGrpByDestination = (destIName, source_id, dest_id, destCat, arrivalId) => {
    setShowModal(true)
    StockRepository.truckarrivalGrpByDestination(destIName, source_id, dest_id, destCat, arrivalId, startDate, endDate, authHeader).then((res) => {
      setArrivalTallyMovt(res.data.groupedTallies)
      setArrivalSalesyMovt(res.data.salesmovements)
      setArrivalPurchasesMovt(res.data.purchasessmovements)
      setMovementsSummary(res.data.movementsSummary)
    })
  }


  const commongSearchCriteris = (startDate, endDate, clientId) => {
    if (checkAll) {
      StockRepository.findArrival_noteFilterByclient(startDate, endDate, user?.userid, searchedclientId, authHeader).then((res) => {
        setArrival_notes(res.data)
      })
    } else if (myRecords && process) {//both
      StockRepository.findArrival_noteByProcessAndUserAndClient(startDate, endDate, user?.userid, chosenProcessId, clientId, authHeader).then((res) => {
        setArrival_notes(res.data);
        // setDataLoad(true)
      });
    } else if (process && !myRecords) {
      StockRepository.findArrival_noteByProcessAndClient(startDate, endDate, user?.userid, chosenProcessId, clientId, authHeader).then((res) => {
        setArrival_notes(res.data);
        // setDataLoad(true)
      });
    } else if (!process && myRecords) {
      StockRepository.findArrival_noteFilterByUserAndCliebt(startDate, endDate, user?.userid, clientId, authHeader).then((res) => {
        setArrival_notes(res.data);
        // setDataLoad(true)
      });
    }
  }

  const getArrivalById = (arrivalId) => {
    StockRepository.findArrival_noteFilterbyid(arrivalId, authHeader).then((res) => {
      setArrival_notes(res.data);
    })
  }
  const searchOptions = (startDate, endDate, clientId, arrivalId) => {
    setSearchItemValue('')
    if ('client_name' === type) {
      if (searchedclientId || clientId) {
        commongSearchCriteris(startDate, endDate, clientId)
      }
    } else if (startDate && endDate) {
      setStartDate(startDate)
      setEndDate(endDate)
      setRefresh(!refresh)
    }  else {
      alert('Put some values to search by')
    }
  }

  const getCommonSearchByDate = (startDate, endDate, name) => {
    searchOptions(startDate, endDate, searchedclientId)
      setCommonSDate(startDate)
       setCommoneDate(endDate)
  }
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const getSortSymbol = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };
  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...vessels].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setVessels(sortedData);
    setSortConfig({ key, direction });
  };
  let totalRows = 0, totalAmount = 0

  /* #region ------------------SEARCH CLIENT BY TYPING ------------------------------------------------- */
  const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
  const { showSelected, setShowSelected } = useContext(ColItemContext)
  const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)
  const inputRef = useRef(null);
  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
  const tableHead = ['id', 'Client name', 'tin number']

  const hideSelectorLink = () => {
    setShowSelected(false)
    setSearchItemValue('')
  }
  const findClientByNameLike = (searchItemValue) => {

    StockRepository.findClientByNameLike(searchItemValue, authHeader).then((res) => {
      setItemssbyname(res.data.content);

      setDataLoad(true)
    });

  }
  const [numCaharacters, setNumCaharacters] = useState(0)


  const searchDone = (id, name, platenumber, status) => {
    setSearchTableVisible(false)
    setSearchItemValue(name)
    setShowSelected()

    setSearchedclientId(id)
    if (searchedclientId) {
      searchOptions(startDate, endDate, searchedclientId)
    }


  }
  useEffect(() => {
    searchOptions(startDate, endDate, searchedclientId)
  }, [searchedclientId])
  /* #endregion */
  const [searchCriteria, setSearchCriteria] = useState('')//this is to be used globally in this component
  const[searchArrivalId,setSearchArrivalId]=useState()
  const realTimeValueEvent = (e) => {
    let word = e.target.value
    setSearchItemValue(word)
    setSearchCriteria(word)
    if ('arrival_note' === type) {
      if (word.length > 0) {
        setSearchArrivalId(word)//we would liek to get in globally once we are searching by username
        getArrivalById(word)
      }
    } else if (word.length > 3) {
      if ('client_name' === type) {
        setSearchTableVisible(true)
        findClientByNameLike(word)
        setSearchArrivalId('')
      }
    } else {
      setSearchedclientId(0)
      setSearchTableVisible(false)
    }
  }
  const [noSelection, setNoSelection] = useState(false)

  const searchOptionTwo = () => {
    setDataLoad(false)
    if (checkAll) {
      StockRepository.findArrival_note(startDate, endDate, user?.userid, authHeader).then((res) => {
        setArrival_notes(res.data);
        setDataLoad(true)
      });
    } else if (myRecords && process) {//both
      StockRepository.findArrival_noteByProcessAndUser(startDate, endDate, user?.userid, chosenProcessId, authHeader).then((res) => {
        setArrival_notes(res.data);
        setDataLoad(true)
      });
    } else if (myRecords && !process) {
      StockRepository.findArrival_noteFilterByUser(startDate, endDate, user?.userid, authHeader).then((res) => {
        setArrival_notes(res.data);
        setDataLoad(true)
      });
    } else if (process && !myRecords) {
      StockRepository.findArrival_noteByProcess(startDate, endDate, user?.userid, chosenProcessId, authHeader).then((res) => {
        setArrival_notes(res.data);
        setDataLoad(true)
      });
    } else if (!process && !myRecords) {
      StockRepository.findArrival_note(startDate, endDate, user?.userid, authHeader).then((res) => {
        setArrival_notes(res.data);
        setDataLoad(true)
        setNoSelection(true)
      });
    }
  }
  useEffect(() => {
    if (!noSelection) {
      if (searchedclientId > 0) {//the client exists
        searchOptions(startDate, endDate, searchedclientId)
      } else {
        searchOptionTwo()
      }
    }
  }, [checkAll, setcheckAll, myRecords, setMyRecords, process, setProcess, searchedclientId, refresh])

  useEffect(() => {
    if (noSelection) {// if no checkbox is selected, the "check all" checkbox is selected  
      setcheckAll(true)// there is a logic in "OtherToolBarItems" component that manages the checkboxes events, so when this is checked al other checkboxes are unchecked!
      setNoSelection(false)
      console.log('-----------------Checked the first------------------------------')
    }
  }, [dataLoad])

   useEffect(()=>{
    if(commonArray && commonArray.length>0){
      
      let arr=commonArray
      setArrival_notes([])
      setArrival_notes(arr)
    }
   },[commonArray])
  return (
    <>

    hello
      <CustomModalPopup show={showModal} onHide={() => setShowModal(false)} title={"Arrival Details"} content={
        <>
          <ArrivalMovementsSummary movementsSummary={movementsSummary} purchMvt={arrivalPurchasesMovt} saleMvt={arrivalSalesyMovt} tallyMvt={arrivalTallyMovt}
            startDate={startDate} endDate={endDate} />
        </>
      } />

      <MediumPopup title={`ARRIVAL No. ${arrival_id}`} full={false} centered="centered" dataLoaded={dataLoad} modalOpen={smallModalOpen} handleShowModal={() => setSmallModalOpen(false)}
        content={<>
          <Row>
            <Col md={12}>
              {arrivaldetailsTallies.length > 0 && <>
                <TitleSmallDesc title="Transhipment" />
                <table className="table ">
                  <InvoiceHeader />
                  {arrivaldetailsTallies.map((tally, index) => {
                    totalWeight += tally.weight * tally.unitPrice
                    return (<InvoiceRows tally={tally} index={index} serviceName={serviceName} />)
                  })
                  }</table> </>}
              {arrivadetailsPurchaseTallies.length > 0 && <>
                <TitleSmallDesc title="To Warehouse" />
                <table className="table ">
                  <InvoiceHeader />
                  {arrivadetailsPurchaseTallies.map((tally, index) => {
                    totalWeight += tally.weight * tally.unitPrice
                    return (<InvoiceRows tally={tally} index={index} serviceName={serviceName} />)
                  })
                  }</table>
              </>}
              {arrivadetailsSalesTallies.length > 0 && <>
                <TitleSmallDesc title="From Warehouse" />
                <table className="table ">
                  <InvoiceHeader />
                  {arrivadetailsSalesTallies.map((tally, index) => {
                    totalWeight += tally.weight * tally.unitPrice
                    return (<InvoiceRows tally={tally} index={index} serviceName={serviceName} />)
                  })
                  }</table> </>}
            </Col>
          </Row>


        </>} />
      <ArrivalDetailsPopup full title={destIName} userType={userType} dataLoaded={dataLoad} modalOpen={modalOpen}
        handleShowModal={() => setModalOpen(false)}
        content={destIName === 'Truck Vessel' || destIName === 'Vessel Truck' ?
          <>
            <TitleSmallDesc title="Truck Details " />
            <TableOpen>
              <TruckEntryHead userType={userType} />
              <tbody>{trucksByArrival.map((truckItem) => (<TruckEntryDetails truckItem={truckItem} />))} </tbody>
            </TableOpen>
            <Splitter />
            <Splitter />
            <TitleSmallDesc title="Vessel Details" />
            {vesselsByArrival.map((vessel) => <VesselDetails vessel={vessel} />)}
          </> : destIName === 'Truck Truck' ?
            <>
              <TitleSmallDesc title="Truck 1 Details " />
              <TableOpen>
                <TruckEntryHead userType={userType} />
                <tbody>{trucksByArrival.map((truckItem) => (<TruckEntryDetails truckItem={truckItem} />))} </tbody>
              </TableOpen>
              <Splitter />
              <Splitter />
              <TitleSmallDesc title="Truck 2 Details " />
              <TableOpen>
                <TruckEntryHead userType={userType} />
                <tbody>{trucksByArrivalTwo.map((truckItem) => (<TruckEntryDetails truckItem={truckItem} />))} </tbody>
              </TableOpen>
            </> : destIName === 'Truck Warehouse' || destIName === 'Warehouse Truck' ?
              <><TitleSmallDesc title="Truck Details " />
                <TableOpen>
                  <TruckEntryHead userType={userType} />
                  <tbody>{trucksByArrival.map((truckItem) => (<TruckEntryDetails truckItem={truckItem} />))} </tbody>
                </TableOpen></> : destIName === 'Vessel Vessel' ?
                <>
                  <TitleSmallDesc title="Vessel 1 Details" />
                  {vesselsByArrival.map((vessel) => <VesselDetails vessel={vessel} />)}
                  <Splitter />
                  <Splitter />
                  <TitleSmallDesc title="Vessel 2 Details" />
                  {vesselsByArrivalTwo.map((vessel) => <VesselDetails vessel={vessel} />)}
                </> : destIName === 'Vessel Warehouse' || destIName === 'Warehouse Vessel' ?
                  <>
                    <TitleSmallDesc title="Vessel Details" />
                    {vesselsByArrival.map((vessel) => <VesselDetails vessel={vessel} />)}
                  </> : ''
        }
      />
      <TitleSmallDesc title={` Next arrival: ${(nextArrival + 1)}  (${chosenProcess} )     `} />
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn full={true} clearBtn={clearBtn} noTitle={true} nocaps={true}
          customTitle={<Col md={12}>  <ArrivalToolBar /></Col>} showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPaneFull onSubmitHandler={onSubmitHandler}>

            {chosenProcess &&
              chosenProcess.split(' ')[0] === 'nWarehouse' &&
              <> {step === 1 && <>

                <DropDownInput handle={(e) => handleArrivalDetails(e)} name='Select Arrival Note' label='arrivalnote' >
                  {arrival_notesNoDestination.map((an) => (
                    <option value={an.id} key={an.id}>   {zeroBeforethousand(an.id)} - {an?.mdl_client?.mdl_client?.name} - {an?.date_time} -{an?.mdl_destination?.name}</option>
                  ))}
                </DropDownInput>
              </>
              }
              </>}
            <>  {step === 1 && chosenProcess && chosenProcess.split(' ')[0] !== 'Warehouse' &&
              <>
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col className='ms-2 ps-4' sm={3}>Option </Col>
                      <Col className=' pe-4'>


                        <DropDownInputNoLabel val={arrivalNote.tarifftype} handle={(e) => updateArrivalNote("tarifftype", e.target.value)} name='Select Option' label='arrivalnote' >
                          <option value={2} > From Abroad - (Import)  </option>
                          <option value={1} > From Rwanda - (Export) </option>
                        </DropDownInputNoLabel>
                      </Col>
                      <Col className=" ">Collection Type</Col>
                      <Col className=' pe-4 me-1'>
                        <DropDownInputNoLabel val={arrivalNote.collect_type} handle={(e) => updateArrivalNote("collect_type", e.target.value)} name='Select Option' label='arrivalnote' >
                          <option selected={collect_type === 'Assorted'}>Assorted</option>
                          <option selected={collect_type === 'Not Assorted'}>Not Assorted</option>
                        </DropDownInputNoLabel>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col className='ms-2 ps-4' sm={3}>DDCOM </Col>
                      <Col className=' pe-4'>
                        <InputOnlyEditable moreclass="w-100 " val={arrivalNote.ddcom} handle={(e) => updateArrivalNote("ddcom", e.target.value)} label='ddcom' />
                      </Col>
                      <Col className=""> Exporter name,TIN </Col>
                      <Col className=' pe-4 me-1'>
                        <InputOnlyEditable moreclass="w-100" val={arrivalNote.exporter} handle={(e) => updateArrivalNote("exporter", e.target.value)} label='exporter' />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col className='ms-2 ps-4' sm={3}>Clearing Agent name,TIN </Col>
                      <Col className=' pe-4  me-1'>
                        <InputOnlyEditable moreclass="w-100" val={arrivalNote.clearingAgent} handle={(e) => updateArrivalNote("clearingAgent", e.target.value)} label='clearingAgent' />
                      </Col>

                      <Col >Client TIN  </Col>
                      <Col className=' pe-4 me-1'>
                        <InputOnlyEditable moreclass="w-100 " num={true} val={arrivalNote.tin_number} handle={(e) => updateArrivalNote("tin_number", e.target.value)} label='tin_number' />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col className='ms-2 ps-4' sm={3}>Client Name (Consignee) </Col>
                      <Col className=' pe-4  me-1'>
                        <InputOnlyEditable moreclass="w-100 " name='Client (Consignee)' val={arrivalNote.name} handle={(e) => updateArrivalNote("name", e.target.value)} label='lblname' />
                      </Col>
                      <Col >Client Telephone  </Col>
                      <Col className=' pe-4 me-1'>
                        <InputOnlyEditable num={true} name=' Client Telephone' val={arrivalNote.telephone} handle={(e) => updateArrivalNote("telephone", e.target.value)} label='telephone' />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Row className="mt-2">
                      <Col className='ms-2 ps-3' sm={3}>{snbr(chosenProcessCategory)}  </Col>
                      <Col className=' pe-4'>
                        <>
                          {chosenProcessCategory == 'Truck' && <DropDownInputNoLabel val={sourceId} handle={(e) => setSourceTruckHandler(e)} name='Trucks' label='Trucks' >
                            {trucks.map((truck) => (
                              <option selected={sourceTruckId === truck.id} value={truck.id} key={truck.id}>
                                <>
                                  {`${truck?.plate_number} ----------- 
                                 ${truck?.driver_name} ----------- 
                                 ${truck.get_in_time && (truck.get_in_time).split('T')[0] + ' ' + (truck.get_in_time).split('T')[1]}
                                 `}

                                </>
                              </option>
                            ))
                            }
                          </DropDownInputNoLabel>}
                          {chosenProcessCategory == 'Vessel' && <DropDownInputNoLabel val={sourceId} handle={(e) => setSourceVesselHandler(e)} name='vessels' label='vessels' >
                            {vessels.map((vessel) => (
                              <option selected={sourceVesselId === vessel.id} value={vessel.id} key={vessel.id}> {vessel.plate_number} - {vessel.name} </option>
                            ))}
                          </DropDownInputNoLabel>}
                        </>
                      </Col>
                      <Col className='ms-1 ps-3' sm={3}>{chosenProcess && dnbr(chosenProcess.split(' ')[1])}</Col>
                      <Col className='pe-4 me-1 '>
                        <>
                          {chosenProcess && chosenProcess.split(' ')[1] === 'Truck' && <>
                            <DropDownInputNoLabel val={destId} handle={(e) => setDestTruckHandler(e)} name='Trucks' label='Trucks' >
                              {trucks.map((truck) => (
                                <option selected={destinationTruckId === truck.id} value={truck.id} key={truck.id}> {truck.plate_number} </option>
                              ))}
                            </DropDownInputNoLabel>
                          </>}
                          {chosenProcess && chosenProcess.split(' ')[1] === 'Vessel' &&
                            <DropDownInputNoLabel val={destId} handle={(e) => setDestVesselHandler(e)} name='vessels' label='vessels' >
                              {vessels.map((vessel) => (
                                <option selected={destinationVesselId === vessel.id} value={vessel.id} key={vessel.id}> {vessel.plate_number} - {vessel.name}</option>
                              ))}
                            </DropDownInputNoLabel>}
                        </>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <SaveUpdateBtns clearHandle={clearHandle}
                  saveOrUpdate={clearBtn ? " " : "  "} customEvent={customSaveEvent}
                  normalbtn={true} noCustomIcon={true} customIcon={<Icon size={'32'} icon={arrowRight} />} />
              </>}
              {step === 2 && <>
                <MultipleInputs />
                <ArrivalToolBar />
                <Col md={11} className="border bg-light">
                  <LongTextINputRow val={arrivalNote.description} handle={(e) => updateArrivalNote("description", e.target.value)} name='Description ' label='Description' />
                </Col>
                <SaveUpdateBtns clearHandle={clearHandle}
                  saveOrUpdate={clearBtn ? "" : "  "}
                  customEvent={customSaveEventTwo}
                  normalbtn={true} noCustomIcon={true} customIcon={<Icon size={'32'} icon={arrowLeft} />} />
                <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={clearBtn ? "Save changes" : "Finish"} />
              </>
              }
            </>
          </FormInnerRightPaneFull>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn >
      </AnimateHeight >
      <ContainerRow mt='3'>
        <ListToolBar height={height} entity='Arrival note' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} >
          <OtherToolBarItems  />
        </ListToolBar>
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} setType={setType} noValueField={true} realTimeValueEvent={realTimeValueEvent} realTimeValueCatch={true}
            options={[
              { name: 'client_name', value: 'client_name', label: 'Client Name' },
              { name: 'arrival_note', value: 'arrival_note', label: 'Arrival note' }
            ]} />
        </SearchformAnimation>

        <Row className='d-flex justify-content-start d-none'>
          {arrival_notes.map((arrival_note) => (
            <Col className="col-auto my-2 arrivalCardWrapper">
              <div className="arrivalSmallCard   d-flex align-items-center justify-content-center" >
                <span className="topPart">
                  <Icon size={16} style={{ color: '#0fd120', marginRight: "10px" }} icon={client} />

                  {arrival_note?.mdl_client?.mdl_client?.name}</span>
                <Link style={{ textDecoration: "none" }} onClick={() => ArrivalDetailsSmall(arrival_note.mdl_destination.name, arrival_note.source_id, arrival_note.dest_id,
                  arrival_note.mdl_destination.category, arrival_note.id)}>
                  {arrival_note.id} </Link>
                <Row className="icons">
                  <Col>
                    <Icon size={16} style={{ color: '#0fd120', marginRight: "10px" }} icon={edit} />
                    <Icon size={17} style={{ color: '#000', marginRight: "10px" }} icon={printer}
                      onClick={() => printArrivalnote(arrival_note)} />
                  </Col>
                </Row>
                <span className="bottomopPart">TIN: {arrival_note?.mdl_client?.tin_number}</span>
              </div>
            </Col>
          ))}
        </Row>
        {dataLoad ?
          <>
            <div ref={componentRef} className="dataTableBox">
              <PrintCompanyInfo />

              <SeaarchBytyping placeholder="Enter a Client Name" hideField={true}
                labelName='Search Client By Name ' searchTableVisible={searchTableVisible} showSelected={showSelected} hideSelectorLink={hideSelectorLink}
                currentTypingVal={searchItemValue} ref={inputRef} sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)} />
              {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <ClientTableRows clients={itemssbyname} searchDone={searchDone} />} />}

              <TableOpen>
                <TableHead>
                  <th onClick={() => sortData('id')}>ID {getSortSymbol('id')}</th>
                  <th onClick={() => sortData('date_time')}>Date Time {getSortSymbol('date_time')}</th>
                  <th onClick={() => sortData('client_tin')}>Client TIN {getSortSymbol('client_tin')}</th>
                  <th onClick={() => sortData('client_name')}>Client Name {getSortSymbol('client_name')}</th>
                  <th onClick={() => sortData('collection_type')}>Collection Type {getSortSymbol('collection_type')}</th>
                  <th onClick={() => sortData('destination')}>Destination {getSortSymbol('destination')}</th>
                  <th onClick={() => sortData('origin')}>Origin {getSortSymbol('origin')}</th>
                  <th onClick={() => sortData('invoice_amount')}>Invoice Amount {getSortSymbol('invoice_amount')}</th>
                  <th onClick={() => sortData('done_by')}>Done by {getSortSymbol('done_by')}</th>
                  <th>Option</th>
                  <td className="HeaderdelButton">Options </td>

                  {userType == 'admin' && <td className='delButton d-none'>Option</td>}
                </TableHead>
                <tbody>


                  {arrival_notes ? (arrival_notes.map((arrival_note) => {
                    totalRows += 1
                    totalAmount += arrival_note.o_mdl_gen_invoices
                      .reduce((sum, invoice) => sum + invoice.amount, 0)
                    return (<>
                      <ArrivalRows arrival_note={arrival_note} userType={userType} truckarrivalGrpByDestination={truckarrivalGrpByDestination} printArrivalnote={printArrivalnote} getArrival_noteById={getArrival_noteById} />

                    </>

                    )
                  }))

                    : <Row>
                      <Col md={6}>No Records at {startDate} {"->"} {endDate}</Col>
                    </Row>
                  }
                  <tr>
                    <td colspan={5}>
                      <p style={localColStyles}> {totalRows} Entries</p>
                    </td>
                    <td colspan={3} className="text-end">
                      <p style={localColStyles}> Total   RWF {totalAmount.toLocaleString()}   </p>
                    </td>
                  </tr>
                </tbody>
              </TableOpen>
            </div>
          </> : <Row className="d-flex justify-content-center">
            <Col md={3} className="loader"> </Col>
          </Row>
        }
      </ContainerRow>
      {!dataLoad && <DataListLoading />}



    </>
  )
}

export default Arrival_note

export const ArrivalRows = ({ arrival_note, userType, truckarrivalGrpByDestination, getArrival_noteById }) => {
  return (
    <tr key={arrival_note.id}>
      <td>{arrival_note.id}   </td>
      <td>{arrival_note.date_time}   </td>
      <td>{arrival_note?.mdl_client?.tin_number}   </td>
      <td>{arrival_note?.mdl_client?.mdl_client?.name} {arrival_note?.mdl_client?.mdl_client?.surname}  </td>
      <td>{arrival_note?.collect_type}   </td>
      <td>{arrival_note?.mdl_destination.name}   </td>
      <td>{arrival_note?.tarifftype == 1 ? 'Export' : 'Import'}   </td>
      <td style={{ backgroundColor: arrival_note.o_mdl_gen_invoices && arrival_note.o_mdl_gen_invoices.length > 0 ? '#fff' : 'red' }}>
        {arrival_note.o_mdl_gen_invoices && arrival_note.o_mdl_gen_invoices.length > 0 ? (
          <>
            <span className="fw-bold">RWF </span>
            {arrival_note.o_mdl_gen_invoices
              .reduce((sum, invoice) => sum + invoice.amount, 0)
              .toLocaleString({ style: 'currency', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </>
        ) : ('RWF 0')}
      </td>
      <td>{arrival_note.mdl_account.username} </td>
      <td>
        <Link onClick={() => truckarrivalGrpByDestination(arrival_note.mdl_destination.name, arrival_note.source_id, arrival_note.dest_id, arrival_note.mdl_destination.category, arrival_note.id)}>Details</Link>
      </td>
      {userType == 'admin' && <ListOptioncol print={true} donwShowPrint={true}
        printData={() => printArrivalnote(arrival_note)} getEntityById={() => getArrival_noteById(arrival_note.id)} delEntityById={() => delArrival_noteById(arrival_note.id)} />}

    </tr>
  )
}


export const VesselDetails = ({ vessel }) => {
  return (<Row className=' ' key={vessel.id}>
    <h4 className='ms-2    fw-bold'>Vessel</h4>
    <Col md={12}  >
      <TableOpen>
        <TableHead>
          <td>ID</td>
          <td>Name</td>
          <td>Plate Number</td>
          <td>Dimension</td>
          <td>Capacity</td>
          <td>Owner/Operator</td>
          <td>RURA Certificate</td>
          <td>Contact Number</td>
        </TableHead>
        <tbody>
          <td>{vessel.id}</td>
          <td>{vessel.name || 'null'}</td>
          <td>{vessel.plate_number || 'null'}</td>
          <td>{vessel.dimension || 'null'}</td>
          <td>{vessel.capacity || 'null'}</td>
          <td>{vessel.owner_operator || 'null'}</td>
          <td>{vessel.rura_certificate || 'null'}</td>
          <td>{vessel.contact_number || 'null'}</td>
        </tbody>
      </TableOpen>
    </Col>
    <Col md={12}>
      <h4 className='ms-2 mt-4 fw-bold'>Berthing</h4>
      <TableOpen>
        <TableHead>
          <td>LOA</td>
          <td>ATA</td>
          <td>ETD</td>
          <td>Bollard/Vessel</td>
          <td>Vessel Arrival Draft</td>
          <td>Description</td>
          <td>Vessel/Bollard Ref ID</td>
          <td>Berthing Side</td>
        </TableHead>
        <tbody>
          <td>{vessel.loa || 'null'}</td>
          <td>{vessel.ata || 'null'}</td>
          <td>{vessel.etd || 'null'}</td>
          <td>{vessel.bollard_or_vessel || 'null'}</td>
          <td>{vessel.vessel_arr_draft || 'null'}</td>
          <td>{vessel.description || 'null'}</td>
          <td>{vessel.vessel_or_bollard_refId || 'null'}</td>
          <td>{vessel.berthing_side || 'null'}</td>
        </tbody>
      </TableOpen>
    </Col>
    <Col md={12}>
      <h4 className='ms-2 mt-4 fw-bold'>Booking</h4>

      <TableOpen>
        <TableHead>
          <td>Booking ID</td>
          <td>Date Time</td>
          <td>Contact N</td>
          <td>RURA Auth N</td>
          <td>Loading Port</td>
          <td>Status</td>
          <td>Bollard Or Vessel Number</td>
          <td>Reference ID</td>
          <td>ETA</td>
          <td>BK ETD</td>
          <td>BK Description</td>
          <td>BK Berthing Side</td>
        </TableHead>
        <tbody>
          <td>{vessel.bookingId || 'null'}</td>
          <td>{vessel.date_time || 'null'}</td>
          <td>{vessel.contact_n || 'null'}</td>
          <td>{vessel.rura_auth_n || 'null'}</td>
          <td>{vessel.loading_port || 'null'}</td>
          <td>{vessel.status || 'null'}</td>
          <td>{vessel.bollardOrVesselNumber || 'null'}</td>
          <td>{vessel.referenceId || 'null'}</td>
          <td>{vessel.eta || 'null'}</td>
          <td>{vessel.bkEtd || 'null'}</td>
          <td>{vessel.bkDescription || 'null'}</td>
          <td>{vessel.bkBerthing_side || 'null'}</td>
        </tbody>
      </TableOpen>
      <Splitter />

    </Col>
    <Col md={12}>
      <h4 className='ms-2 mt-4 fw-bold'>Berthing Invoice</h4>
      <TableOpen>
        <TableHead>
          <td>Invoicing ID</td>
          <td>Quay Amount</td>
          <td>Inv ETD</td>
          <td>Vessel Handling Charges</td>
        </TableHead>
        <tbody>
          <td>{vessel.invoicingId || 'null'}</td>
          <td>{vessel.quay_amount || 'null'}</td>
          <td>{vessel.invEtd || 'null'}</td>
          <td>{vessel.vessel_handling_charges || 'null'}</td>

        </tbody>
      </TableOpen>
    </Col>
  </Row>)
}
export const TruckEntryHead = ({ userType }) => {
  return <>
    <thead>
      <tr className='bg-light nopad'>
        <td style={{ backgroundColor: '#fff', padding: '10px', color: '#000' }}
          className='bg-light' colSpan={5}>Truck</td>
        <td style={{ backgroundColor: '#fff', padding: '10px', color: '#000' }}
          className='bg-light' colSpan={5}>Entry</td>

      </tr>
    </thead>

    <TableHead>
      <td>ID</td>
      <td>Plate Number</td>
      <td>Truck Type</td>
      <td>Driver Name</td>
      <td>Driver Contact</td>
      <td>Weight of Truck (tons)</td>
      <td>Full or Empty</td>
      <td>Cargo Type</td>
      <td>Seal Number</td>
      <td>Get In Time</td>
      {userType === 'admin' && <td className="delButton d-none">Option</td>}
    </TableHead>
  </>
}
export const TruckEntryDetails = ({ truckItem }) => {
  return <tr key={truckItem.id}>
    <td>{truckItem.id}</td>
    <td>{truckItem.plate_number}</td>
    <td>{truckItem.truck_type}</td>
    <td>{truckItem.driver_name || 'N/A'}</td>
    <td>{truckItem.driver_contact || 'N/A'}</td>
    <td>{truckItem.weight_of_truck}</td>
    <td>{truckItem.full_or_empty}</td>
    <td>{truckItem.cargo_type}</td>
    <td>{truckItem.seal_number}</td>
    <td>{truckItem.get_in_time}</td>
  </tr>
}

