import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
// import VertNavBar from '../../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'
import { useAuthHeader } from 'react-auth-kit';
// import UpdatedComponent from '../../Global/HOCForm'
import PrintCompanyInfo from '../../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead'
import SearchBox from '../../Global/SearchBox'
import 'react-datepicker/dist/react-datepicker.css'
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, InputOnlyReadOnly, InputReadOnly, LongTextINputRow } from '../../Global/Forms/InputRow'
import FormTools from '../../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../../Global/ListTable'
import Utils from '../../Global/Utils'
import StockDelete from '../../services/StockServices/StockDelete'

import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockRepository from '../../services/StockServices/StockRepository'
import StockCommons from '../../services/StockServices/StockCommons'
import { useNavigate } from 'react-router-dom'
import CurrentDate from '../../Global/CurrentDate';



function Berthpayment() {

    const [userType, setUserType] = useState()
    /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
    const [id, setId] = useState()
    const [invoice_id, setInvoice_id] = useState()
    const [date_time, setDate_time] = useState(new Date())
    const [payment, setPayment] = useState()
    const [description, setDescription] = useState()
    /*#endregion ENTITY FIELDS DECLARATION */

    const [showLoader, setShowLoader] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [berthpayments, setBerthpayments] = useState([]) //Data List
    const [clearBtn, setClearBtn] = useState(false) //The cancel button

    const [dataLoad, setDataLoad] = useState(false)
    const [height, setHeight] = useState(0);
    const [searchHeight, setSearchHeight] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [invoices, setInvoices] = useState([]) //Data List
    const { itemOrCargo, setitemOrCargo, obj, setObj } = useContext(ColItemContext)

    const [receiptPrint, setReceiptprint] = useState(false)
    const navigate = useNavigate()


    const [invoiceQuayAmount, setInvoiceQuayAmount] = useState()
    const [invoiceHandlingAmount, setInvoiceHandlingAmount] = useState()

    const [totalReceipt, setTotalReceipt] = useState()

    const authHeader = useAuthHeader()();
    const [startDate, setStartDate] = useState(CurrentDate.todaydate()); 
    const [endDate, setEndtDate] = useState(CurrentDate.todaydate()); 

    /*#region ---------- SAVING DATA TO DB--------------------------------------*/
    const onSubmitHandler = (e) => {
        e.preventDefault()
        setShowLoader(true)

        var berthpayment = {
            id: id, invoice_id: invoice_id, date_time: date_time, payment: payment.replace(/,/g, ""), description: description
        }
        if (id) {
            StockCommons.updateBerthpayment(berthpayment, id, authHeader).then((res) => {
                resetAfterSave()
            })
        } else if(totalReceipt> payment){
            setShowLoader(false)
            alert('invalid receipt amount, the amount has to be equal to the total amount: '+totalReceipt )

        }else if(!invoice_id){
            alert('Invalid records, You have to select the invoice')
        }else{
            StockCommons.saveBerthpayment(berthpayment, invoice_id, authHeader).then((res) => {
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
    const getAllBerthpayments = (page, size) => {
        StockRepository.findBerthpayment(page, size, authHeader).then((res) => {
            setBerthpayments(res.data);
            setDataLoad(true)
        });
    }
    const getAllInvoices = () => {
        StockRepository.findInvoice(startDate, endDate,authHeader).then((res) => {
            setInvoices(res.data);
            setDataLoad(true)

        });
    }

    useEffect(() => {
        getAllBerthpayments(0, 20)
        getAllInvoices()
        //Get Token and catname
        setUserType(localStorage.getItem('catname'))

    }, [refresh]);


    const getBerthpaymentById = (id) => {
        StockRepository.findBerthpaymentById(id, authHeader).then((res) => {
            setId(res.data.id)
            setInvoice_id(res.data.invoice_id)
            setDate_time(res.data.date_time)
            setPayment(res.data.payment)

            setClearBtn(true)
            showheight('auto')
        })
    }
    const delBerthpaymentById = (id) => {
        Utils.Submit(
            () => {
                StockDelete.deleteBerthpaymentById(id)
                    .then(() => {
                        setRefresh(!refresh)
                    })
                    .catch((error) => {
                        console.error('Delete error:', error)
                    })
            },
            () => {
            }
        )
    }
    /*#endregion Listing data*/

    /*#region ---------Show Height, reset all and clear Button   ------------*/
    function showheight(type) {
        setHeight(type)
    }
    const resetAfterSave = () => {
        document.getElementById("Form").reset();
        getAllBerthpayments()
        setShowLoader(false)
        setShowAlert(true)
        setHeight(0)
        setId(null)
        setInvoice_id("")
        setDate_time("")
        setPayment("")

    }
    const clearHandle = () => {
        setId(null)
        setInvoice_id("")
        setDate_time("")
        setPayment("")

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

    useEffect(() => {
        if (receiptPrint) {
            navigate("/prinreceipt")
        }
    }, [receiptPrint])

    const printData = (berthpayment) => {
        setObj(berthpayment)
        console.log(berthpayment)
        setReceiptprint(true)
    }

    
    useEffect(()=>{
        const tot=(Number(invoiceQuayAmount) + Number(invoiceHandlingAmount)).toLocaleString()
        setTotalReceipt(tot) 
        setPayment(tot)
    },[invoiceQuayAmount,invoiceHandlingAmount])
    const getBerthInvoiceById = (invoiceId) => {
        setInvoice_id(invoiceId)
        StockRepository.findBerthInvoiceById(invoiceId, authHeader).then((res) => {
            setInvoiceQuayAmount(res.data.quay_amount)
            setInvoiceHandlingAmount(res.data.vessel_handling_charges)
        })
    }
    const getCommonSearchByDate=(date1,date2)=>{
        setStartDate(date1)
        setEndtDate(date2)
        setRefresh(!refresh)
    }
    return (
        <PagesWapper>

            <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
                <ContainerRowBtwn clearBtn={clearBtn} form={'Berth payment'} showLoader={showLoader}  >
                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                    <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
                        <DropDownInput handle={(e) => getBerthInvoiceById(e.target.value)} name='Invoice' label='Invoice' >
                            {invoices.map((invoice) => (
                                <option value={invoice.id} key={invoice.id}>   {invoice.id} - {invoice.name} - {invoice.number_days} day{"(s)"}</option>
                            ))}
                        </DropDownInput>

                        <InputReadOnly name='Total Payment' val={totalReceipt} handle={(e) => setPayment(e.target.value)} label='lblpayment' />
                        <InputRow name='Paid Amount' val={payment} handle={(e) => setPayment(e.target.value)} label='lblpayment' />

                        <LongTextINputRow name='Description ' val={description} handle={(e) => setDescription(e.target.value)} label='lbldesc' />


                        <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
                    </FormInnerRightPane>
                    {/* <FormSidePane /> */}
                </ContainerRowBtwn>
            </AnimateHeight>
            <ContainerRow mt='3'>
                <ListToolBar listTitle='Berth payment List' height={height} entity='Berth payment' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
                <SearchformAnimation searchHeight={searchHeight}>
                    <SearchBox getCommonSearchByDate={getCommonSearchByDate} />
                </SearchformAnimation>

                <div ref={componentRef} className="dataTableBox ">
                    <PrintCompanyInfo />
                    <TableOpen>
                        <TableHead>
                            <td>Receipt ID</td>
                            <td>Invoice Id </td>
                            <td className="text-center">Date Time </td>
                            <td className="text-center">Receipt Amount </td>
                            <td className="text-center">Invoice Amount </td>
                            <td className="text-center">Vessel Name </td>
                            <td className="text-center">Vessel Operator </td>
                            <td className="text-center">Description </td>
                            {userType == 'admin' && <td className='delButton '>Option</td>}
                        </TableHead>
                        <tbody>
                            
                            {berthpayments.map((berthpayment) => (
                                <tr key={berthpayment.id}>

                                    <td>{berthpayment.id}   </td>
                                    <td>{berthpayment.mdl_invoice && berthpayment?.mdl_invoice?.id}   </td>
                                    <td className="text-center">{berthpayment.date_time}   </td>
                                    <td className="text-center">{(berthpayment.payment).toLocaleString()}   </td>
                                    <td className="text-center">{ berthpayment.mdl_invoice?.quay_amount 
                                    && (berthpayment?.mdl_invoice?.quay_amount).toLocaleString()}   </td>
                                    <td className="text-center">{ berthpayment?.mdl_invoice?.mdl_vessel?.name}   </td>
                                    <td className="text-center">{ berthpayment?.mdl_invoice?.mdl_vessel?.owner_operator}   </td>
                                    <td className="text-center">{berthpayment.description}   </td>
                                    {userType == 'admin' && <ListOptioncol print={true}
                                        printData={() => printData(berthpayment)} getEntityById={() => getBerthpaymentById(berthpayment.id)} delEntityById={() => delBerthpaymentById(berthpayment.id)} />}
                                </tr>
                            ))}
                            </tbody>
                    </TableOpen>
                </div>
            </ContainerRow>
            {!dataLoad && <DataListLoading />
            }

        </PagesWapper>


    )
}

export default Berthpayment
