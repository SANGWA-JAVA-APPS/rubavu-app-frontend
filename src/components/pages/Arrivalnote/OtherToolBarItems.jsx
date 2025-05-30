import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useContext } from 'react'
import StockRepository from '../../services/StockServices/StockRepository'
import { useAuthHeader } from 'react-auth-kit'
export const OtherToolBarItems = () => {
    const { checkAll, setcheckAll, myRecords, setMyRecords, process, setProcess, arrivalUsername, setCommonArray,
        commonsDate, setCommonSDate, commoneDate, setCommoneDate
    } = useContext(ColItemContext)
    const [usernames, setUsernames] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const authHeader = useAuthHeader()();
    useEffect(() => {
        //search for users
        StockRepository.findAccountExcludeClient(authHeader).then((res) => {
            setUsernames(res.data)
            // setDataLoad(true)
        });
    }, [])
    
    const usernameChanged = (username) => {
        StockRepository.findArrival_noteFilterByUser(commonsDate, commoneDate, username, authHeader).then((res) => {
            console.log('--------->>>>>>>>> '+commonsDate+' '+commoneDate)
            setCommonArray(res.data)
        })
    }
   
    const checkAllEvent = () => {
        setcheckAll(!checkAll)
    }
    const checkMyRecordsEvent = () => {
        if (checkAll) {
            setcheckAll(false)
        }
        setMyRecords(!myRecords)
    }
    const checkProcesssEvent = () => {
        if (checkAll) {
            setcheckAll(false)
        }
        setProcess(!process)
    }

    useEffect(() => {
        if (checkAll) {
            setMyRecords(false)
            setProcess(false)
        } else {

        }
    }, [checkAll])
    return (
        <>
            <Col className="ms-4   d-flex  align-items-center">
                <input onChange={checkAllEvent} className="mx-2 " type="checkbox" checked={checkAll} id="all_checked" />
                <label className="fw-bold" for="all_checked">All</label>
            </Col>
            <Col className="ms-4   d-flex  align-items-center">
                <input onChange={checkMyRecordsEvent} className="mx-2 " type="checkbox" checked={myRecords} id="my_records" />
                <label className="fw-bold d-flex" for="my_records">My&nbsp;records</label>
            </Col>
            <Col className="ms-4   d-flex  align-items-center">
                <input onChange={checkProcesssEvent} className="mx-2 " type="checkbox" checked={process} id="process" />
                <label className="fw-bold" for="process">Process</label>
            </Col>

            <Col className=''>
                <select onChange={(e) => usernameChanged(e.target.value)} class="form-select form-select-md" title="Criteria"
                    aria-label=".form-select-lg example">
                    <option>Select Option</option>

                    {usernames && usernames.map((usr, index) => {
                        return <option key={index} value={usr.id}>{usr.name} {usr.surname}</option>
                    })
                    }
                </select>
            </Col>
        </>
    )
}
