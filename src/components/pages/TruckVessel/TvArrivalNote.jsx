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
import Commons from '../../services/Commons'
import Repository from '../../services/Repository'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import TruckVhNavBar from '../../Navbar/TruckVhNavBar'
import TruckVesselNavBar from '../../Navbar/TruckVesselNavBar'


function TvArrivalNote( ) {

    const [userType, setUserType] = useState()
    /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
    const [id, setId] = useState()
    const [date_time, setDate_time] = useState()
    const [entry_id, setEntry_id] = useState()
    const [profile_id, setProfile_id] = useState()
    const [weight, setWeight] = useState()

    /*#endregion ENTITY FIELDS DECLARATION */

    const [showLoader, setShowLoader] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [arrival_notes, setArrival_notes] = useState([]) //Data List
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

        var arrival_note = {
            id: id, date_time: date_time, entry_id: entry_id, profile_id: profile_id, weight: weight
        }
        if (id) {
            Commons.updateArrival_note(arrival_note, id).then((res) => {
                resetAfterSave()
            })
        } else {
            Commons.saveArrival_note(arrival_note).then((res) => {
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
    const getAllArrival_notes = (page, size) => {
        Repository.findArrival_note(page, size).then((res) => {
            setArrival_notes(res.data.data);
            setDataLoad(true)

        });
    }

    useEffect(() => {
        getAllArrival_notes(0, 20)

        //Get Token and catname
        setUserType(localStorage.getItem('catname'))

    }, [refresh]);


    const getArrival_noteById = (id) => {
        StockRepository.findArrival_noteById(id).then((res) => {
            setId(res.data.id)
            setDate_time(res.data.date_time)
            setEntry_id(res.data.entry_id)
            setProfile_id(res.data.profile_id)
            setWeight(res.data.weight)

            setClearBtn(true)
            showheight('auto')
        })
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
        setProfile_id("")
        setWeight("")

    }
    const clearHandle = () => {
        setId(null)
        setDate_time("")
        setEntry_id("")
        setProfile_id("")
        setWeight("")

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
            

                <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
                    <ContainerRowBtwn clearBtn={clearBtn} form={'Arrival_note'} showLoader={showLoader}  >
                        <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                        <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
                            <InputRow name='Date Time ' val={date_time} handle={(e) => setDate_time(e.target.value)} label='lbldate_time' />
                            <InputRow name='Entry Id ' val={entry_id} handle={(e) => setEntry_id(e.target.value)} label='lblentry_id' />
                            <InputRow name='Profile Id ' val={profile_id} handle={(e) => setProfile_id(e.target.value)} label='lblprofile_id' />
                            <InputRow name='Weight ' val={weight} handle={(e) => setWeight(e.target.value)} label='lblweight' />

                            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
                        </FormInnerRightPane>
                        {/* <FormSidePane /> */}
                    </ContainerRowBtwn>
                </AnimateHeight>
                <ContainerRow mt='3'>
                    <ListToolBar listTitle='arrival_note List' height={height} entity='Arrival_note' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
                    <SearchformAnimation searchHeight={searchHeight}>
                        <SearchBox />
                    </SearchformAnimation>

                    <div ref={componentRef} className="dataTableBox">
                        <PrintCompanyInfo />
                        <TableOpen>
                            <TableHead>

                                <td>ID</td>
                                <td>Date Time </td>
                                <td>Entry Id </td>
                                <td>Profile Id </td>
                                <td>Weight </td>

                                {userType == 'admin' && <td className='delButton'>Option</td>}
                            </TableHead>
                            <tbody>
                                {arrival_notes.map((arrival_note) => (
                                    <tr key={arrival_note.id}>
                                        <td>{arrival_note.id}   </td>
                                        <td>{arrival_note.date_time}   </td>
                                        <td>{arrival_note.entry_id}   </td>
                                        <td>{arrival_note.profile_id}   </td>
                                        <td>{arrival_note.weight}   </td>

                                        {userType == 'admin' && <ListOptioncol getEntityById={() => getArrival_noteById(arrival_note.id)} delEntityById={() => delArrival_noteById(arrival_note.id)} />}
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

export default TvArrivalNote
