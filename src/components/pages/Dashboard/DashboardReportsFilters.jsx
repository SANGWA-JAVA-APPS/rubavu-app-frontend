import React, { useContext, useRef, useState } from 'react'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import SeaarchBytyping, { SearchTableResult } from '../../globalcomponents/SeaarchBytyping'
import { Button, Col, Row } from 'react-bootstrap'
import { DropDownInput, DropDownInputNoLabels, InputAndSearchNoLabel } from '../../Global/InputRow'
import ListToolBar from '../../Global/ListToolBar'
import SearchBox from '../../Global/SearchBox'
import { InputRowDateNoLabel } from '../../Global/Forms/InputRow'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { Slide } from 'react-reveal'

export const DashboardReportsFilters = () => {
    const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)

    /* #region ------------------SEARCH VESSEL BY TYPING ------------------------------------------------- */

    const { showSelected, setShowSelected } = useContext(ColItemContext)
    const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)
    const inputRef = useRef(null);
    const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
    const hideSelectorLink = () => {
        setShowSelected(false)
        setSearchItemValue('')
    }

    const findVesselByOperator = (searchItemValue) => {
        StockRepository.findVesselByOperator(searchItemValue, authHeader).then((res) => {
            setItemssbyname(res.data);
            setDataLoad(true)

        });
    }
    const searchOnThirdSecond = (e) => {
        setSearchTableVisible(true)
        const newVal = e.target.value
        setSearchItemValue(newVal)
        findVesselByOperator(searchItemValue)

        if (searchItemValue) {//if the user has typed in something
            // setCompletedSearch(false)
            // setSearchProgress(true) // Go and show the progress bar,
        }


    }
    const searchDone = (id, name, owner) => {
        setSearchTableVisible(false)
        // setVessel_id(id)
        setSearchItemValue(name)
        setShowSelected(true)
        inputRef.current.focus();
    }
    /* #endregion */
    const [criteriatYPE, setCriteriaType] = useState()
    const [criteria, setCriteria] = useState()
    const [criteriaFilter, setCriteriaFilter] = useState()
    const [date_time, setDate_time] = useState(new Date())
    const [date_timeTwo, setDate_timeTwo] = useState(new Date())
    return (
        <ItemsContainer>
            <Slide delay={900} down>
                <Col md={12} style={{}}>
                    <Row className=" " style={{ backgroundColor: '#fff', border: '1px solid #ccc', boxShadow: ' 0px 0px 5px #000' }}>
                        <Col md={12} className="p-2 mb-4" style={{ backgroundColor: '#fff' }}>
                            <Row className="d-flex justify-content-center">
                                <Col md={6} className="text-center  " >
                                    <InputRowDateNoLabel nDate={date_time} label="timeInput" handle={(nDate) => setDate_time(nDate)} />
                                </Col>
                                <Col md={6}   >
                                    <ItemsContainer>
                                        <Col md={6}>
                                            <InputRowDateNoLabel nDate={date_timeTwo} label="timeInput" handle={(nDate) => setDate_timeTwo(nDate)} />
                                        </Col>
                                        <Col md={6}>
                                            <Button variant="primary" className="mt-0">Search</Button>
                                        </Col>
                                    </ItemsContainer>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className="d-none">
                            <Row>

                                <Col md={4}> <DropDownInputNoLabels noInitial={true} handle={(e) => setCriteriaType(e.target.value)} defaultValue={1} name='Bollard/Vessel assigned to ' label='Bollard' >
                                    <option value={""}  >-- Criteria Type --   </option>
                                    <option value={"BERTHIN"}  >Berthing   </option>
                                    <option value={"CARGO"}  >Cargo   </option>
                                </DropDownInputNoLabels>
                                </Col>
                                <Col md={4}>
                                    <DropDownInputNoLabels noInitial={true} handle={(e) => setCriteria(e.target.value)} defaultValue={1} name='Bollard/Vessel assigned to ' label='Bollard' >
                                        <option value={""}  >-- Criteria   --   </option>
                                        <option value={"BERTHIN"}  >Vessel Arrivals   </option>
                                        <option value={"CARGO"}  >Vessel Payments   </option>
                                    </DropDownInputNoLabels>
                                </Col>
                                <Col md={4}>
                                    {criteriatYPE === 'BERTHIN' ?
                                        <DropDownInputNoLabels noInitial={true} handle={(e) => setCriteriaFilter(e.target.value)} defaultValue={1} name='Bollard/Vessel assigned to ' label='Bollard' >
                                            <option value={""}  >-- Filter   --   </option>
                                            <option value={"BERTHIN"}  >Vessel Name   </option>
                                            <option value={"CARGO"}  >Vessel Operator name   </option>
                                            <option value={"CARGO"}  >Vessel Plate number   </option>
                                        </DropDownInputNoLabels>
                                        :
                                        <DropDownInputNoLabels noInitial={true} handle={(e) => setCriteriaFilter(e.target.value)} defaultValue={1} name='Bollard/Vessel assigned to ' label='Bollard' >
                                            <option value={""}  >-- Filter   --   </option>
                                            <option value={"BERTHIN"}>Cargo Owner   </option>
                                            <option value={"CARGO"}  >Cargo Type   </option>
                                            <option value={"CARGO"}  >Cargo Type   </option>
                                            <option value={"CARGO"}  >Cargo Movement   </option>
                                            <option value={"CARGO"}  >Client TIN   </option>
                                        </DropDownInputNoLabels>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className="d-none">

                            {setSearchTableVisible && <InputAndSearchNoLabel placeholder="Filter value"
                                labelName='  Operator' searchTableVisible={searchTableVisible} showSelected={showSelected} hideSelectorLink={hideSelectorLink}
                                currentTypingVal={searchItemValue} ref={inputRef} sendRequestOnThirdChar={(e) => searchOnThirdSecond(e)} />}
                            {searchTableVisible && <SearchTableResult tableHead={tableHead} TableRows={() => <TableRows bookings={itemssbyname} searchDone={searchDone} />} />}
                        </Col>
                    </Row>
                </Col>
            </Slide>

        </ItemsContainer>
    )
}
