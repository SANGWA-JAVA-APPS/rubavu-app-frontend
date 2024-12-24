import React, { useEffect, useRef, useState } from 'react'
import PagesWapper from '../Global/PagesWapper'
import AnimateHeight from 'react-animate-height'
import Title, { EditTitle } from '../Global/Title'
import Loader, { DataListLoading } from '../Global/Loader'

import Icon from 'react-icons-kit'
import { floppyDisk as save } from 'react-icons-kit/icomoon/floppyDisk'
import { cancelCircle as cancel } from 'react-icons-kit/icomoon/cancelCircle'
import { plus as add } from 'react-icons-kit/icomoon/plus'
import { search } from 'react-icons-kit/icomoon/search'
import { pencil as edit } from 'react-icons-kit/icomoon/pencil'
import { cross as remove } from 'react-icons-kit/icomoon/cross'
import { forward as point } from 'react-icons-kit/icomoon/forward'
import { arrowRight as Mainpoint } from 'react-icons-kit/icomoon/arrowRight'
import { printer } from 'react-icons-kit/icomoon/printer'

import { calendar } from 'react-icons-kit/icomoon/calendar'
import { Link } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import axios from 'axios'
import StockCommons from '../services/StockServices/StockCommons'
import SearchBox from '../Global/SearchBox'
import TableHead from '../Global/TableHead'
import StockRepository from '../services/StockServices/StockRepository'

export const Client = () => {
  

    const [date_time, setDate_time,] = useState()
    const [description, setDescription,] = useState()
    const [item_name, setItem_name,] = useState()
    const [quantity, setQuantity,] = useState()
    const [weight, setWeight,] = useState()
    const [arriv_tallying, setArriv_tallying,] = useState()
    const [RespLabel, setRespLabel] = useState()
    const [clients, setClients] = useState([])
    const [arrivals, setArrivals] = useState([])
    const [arrivalId, setArrivalId] = useState()
    const [height, setHeight] = useState(0);
    const [clearBtn, setClearBtn] = useState(false) //The cancel button
    const [searchHeight, setSearchHeight] = useState(0);
    const [dataLoad, setDataLoad] = useState(false)

    const [updateList, setUpdateList] = useState(0)

    // Entity fields
    const [id, setId] = useState(null)
    const [name, setName] = useState()
    const [surname, setSurname] = useState("B")
    const [telephone, setTelephone] = useState()
    const [tin, setTin] = useState()
    const [address, setAddress] = useState()
    const [dateTime, serDateTime] = useState()
    const [account_id, setAccount_id] = useState(1)
    const [o_entries, setO_entries] = useState(null)


    const [showLoader, setShowLoader,] = useState()
    const [showAlert, setShowAlert] = useState()




    const clearHandle = () => {
        setId(null)
        setClearBtn(false)
    }

    const changeSaveUpdateBtntxt = () => {
        return clearBtn ? "Save changes" : "Save"
    }
    const getTallyById = (id) => {
        StockRepository.findTallyingById(id).then((res) => {
            setId(res.data.id)
            setClearBtn(true)
            showheight('auto')
        })
    }

    const delTallyCatById = (id) => {
        axios.delete(Commons.findTallyingById() + id)
            .then((res) => {
                getAllClients()
            }).catch((err) => {
                console.log('Error while updating ..' + err.message)
            })
    }


    // //   /*#region Printing */
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data'
    });

    const singleRow = useRef();
    const handleRowPrint = useReactToPrint({
        content: () => singleRow.current,
        documentTitle: 'row-data'
    });


    useEffect(() => {
                  getAllClients()

        // Repository.findAllTallyingsCount().then((res2) => {
        //     setState({ totalRows: res2.data });
        // });
    }, [])

    const getAllClients = () => {
        StockRepository.findClient().then((res) => {
            setClients(res.data);
            setDataLoad(true)
            setUpdateList((updateList) => updateList + 1)
        });
    }
    function showheight(type) {
        setHeight(type)
    }
    const submitHndler = (e) => {
        e.preventDefault();
        setShowLoader(true)
        if (id) {
            axios
                .put(StockCommons.updateTally(id), {
                    id: id,
                    item_name: item_name,
                    quantity: quantity,
                    weight: weight,
                    date_time: date_time,
                    description: description,
                    account_id: account_id,
                    arrivalId: arrivalId
                }).then((res) => {
                    getAllClients()
                    setShowLoader(false)
                    document.getElementById("Form").reset();
                    console.log('Result upon upating the category: ')
                    console.log(res.data)
                    showheight(0)
                }).catch((err) => {
                    console.log('Error while updating ..' + err.message)
                })

        } else {
            console.log('We are inserting the data')
            StockCommons.newClient(id, name, surname, telephone, tin, address, dateTime, account_id, o_entries)
                .then((res) => {
                    console.log('Data after inserting:------------------')
                    console.log(res.data)
                    if (res.data != null) {
                        console.log('W---------------Load data-------------')
                        console.log(res.data)
                        document.getElementById("Form").reset();
                        setShowLoader(false)
                        setShowAlert(true)
                        setId(null)
                        getAllClients()

                        setHeight(0)
                    } else {
                        console.log('------------Returned nul----------------------')
                    }
                })
        }
    }
    const txtStyle = {
        border: "1px solid #000",
        color: "#000",
        fontWeight: "bolder"
    }

    return (
        <>
            <PagesWapper>
                <AnimateHeight
                    id="animForm"
                    duration={300} animateOpacity={true}
                    height={height}  >
                    <div className="container  " classname="formPane">
                        <div className='row'>
                            <div className='row  d-flex justify-content-between align-top'>

                                {clearBtn && <EditTitle name="Client" />}
                                {!clearBtn && <Title name=" Client " />}
                                <div className='col-8'  >
                                    {showAlert &&
                                        <div class="alert alert-primary" role="alert">
                                            Record Saved Successfully!
                                        </div>
                                    }</div>

                                <div className='box col-lg-8 col-md-8  ms-3 formBox p-3' >
                                    {showLoader && <Loader />}
                                    {/* {showAlert && <MyAlert item=" Tallying " />} */}
                                    <div className='form-row'>
                                        <form onSubmit={submitHndler} id="Form">
                                            <div class="form-group row m-1">
                                                <label htmlFor="inputName" class="col-sm-2 col-form-label">Name</label><div class="col-sm-10">
                                                    <input type="text" name='item_name' required autoComplete='false' style={txtStyle} className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="inputName" />
                                                </div>
                                            </div>
                                           
                                            <div class="form-group row m-1">
                                                <label htmlFor="inputPhone" class="col-sm-2 col-form-label">Location</label><div class="col-sm-10">
                                                    <input type="text" name='weight' required style={txtStyle} className="form-control" value={telephone} onChange={(e) => setTelephone(e.target.value)} id="inputPhone" />
                                                </div>
                                            </div>
                                            <div class="form-group row m-1">
                                                <label htmlFor="inputtin" class="col-sm-2 col-form-label">TIN</label><div class="col-sm-10">
                                                    <input type="text" name='arriv_tallying' required autoComplete='false' style={txtStyle} className="form-control" value={tin} onChange={(e) => setTin(e.target.value)} id="inputtin" />
                                                </div>
                                            </div>
                                            <div class="form-group row m-1">
                                                <label htmlFor="inputAddress" class="col-sm-2 col-form-label">Seal Number</label><div class="col-sm-10">
                                                    <input type="text" name='arriv_tallying' required autoComplete='false' style={txtStyle} className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="inputAddress" />
                                                </div>
                                            </div>
                                            <div className='container'>
                                                <div className="row">
                                                    <div className='col-6'>
                                                        {clearBtn &&
                                                            <button type='button' onClick={clearHandle} className='mt-4 btn btn-danger'>   <Icon style={{ color: '#fff', marginRight: "10px" }} icon={cancel} />  Cancel</button>
                                                        }
                                                    </div>
                                                    <div className='col-6'>
                                                        <button type="submit" className="mt-4     offset-6 col-6 float-right saveBtn " style={{ color: "#fff", fontWeight: "bolder" }} >  <Icon style={{ color: '#fff', marginRight: "10px" }} icon={save} />
                                                            {changeSaveUpdateBtntxt()}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='col-lg-3 d-flex align-start align-items-start   fs-1  rounded-circle col-md-3 totalBox  g-light'>
                                    <ul className='totalBoxList '>
                                        <li>
                                            <h6><Icon icon={Mainpoint} />   DataItem 1</h6>
                                            <p><Icon size={12} style={{ marginLeft: "20px", marginRight: "6px" }} icon={point} />
                                                45 &nbsp;&nbsp;    <Link className='text-white' to="#"> <Icon size={12} icon={calendar} />    {new Date().getFullYear()} </Link> </p>
                                        </li>
                                        <li><h6><Icon icon={Mainpoint} />  Data item 2 </h6>
                                            <p><Icon style={{ marginLeft: "20px", marginRight: "6px" }} icon={point} />
                                                23 &nbsp;&nbsp;
                                                <Link className='text-white' to="#"> <Icon size={12} icon={calendar} /> {new Date().getFullYear()} </Link>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateHeight> 

                <div className='container mt-3'>
                    <div className='row'>
                        <div className='col-12 '><h3 className='boldTitle'> Clients  </h3></div>
                        <div className='row'>
                            <div className='col-6'>
                                <button id='addREc' className='btn'
                                    aria-expanded={height !== 0} aria-controls="animForm" onClick={() => setHeight(height === 0 ? 'auto' : 0)}
                                    style={{ marginRight: "15px", backgroundColor: "#470343", fontSize: "12px", color: '#fff', fontWeight: "bold" }}>
                                    <Icon size={11} style={{ marginRight: "8px", color: '#fff' }} icon={add} />
                                    Add Client
                                </button>
                                <button onClick={handlePrint} style={{ marginRight: "10px", fontSize: "12px" }} className='btn btn-dark ms-1'><Icon style={{ marginRight: "8px", color: '#fff' }} icon={printer} />
                                    Print
                                </button>
                                <button className='btn btn-outline-success ms-1'
                                    aria-expanded={searchHeight !== 0} aria-controls="animSearchBox" onClick={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)}>
                                    <Icon style={{ color: 'black' }} icon={search} />   </button>
                            </div>
                        </div>
                        <div className='row '>
                            <div className='col-12'>
                                <AnimateHeight id="animSearchBox" // animating the search box
                                    duration={250} animateOpacity={true}
                                    height={searchHeight} >
                                    <SearchBox />
                                </AnimateHeight>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container dataTableBox mt-2'>
                    <table className='table table-striped dataTable table-bordered'>
                        <TableHead >
                            <td>Name </td>
                     
                            <td>Location </td>
                            <td>TIN </td>
                            <td>Seal NUmber </td>
                           
                            {/* <td className='delButton'>Option </td> */}
                        </TableHead>
                        <tbody>
                            {clients.length>0 && clients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.name}</td>
                                    
                                    <td>{client.telephone}</td>
                                    <td>{client.tin}</td>
                                    <td>{client.address}</td>
                                     

                                </tr>
                            ))}</tbody>
                    </table>
                </div>
                {
                    !dataLoad &&
                    <DataListLoading />
                }
            </PagesWapper >
        </ >
    )

}
