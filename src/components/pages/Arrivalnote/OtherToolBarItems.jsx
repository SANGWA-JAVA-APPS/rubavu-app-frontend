import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useContext } from 'react'

export const OtherToolBarItems = () => {
    const { checkAll, setcheckAll, myRecords, setMyRecords, process, setProcess } = useContext(ColItemContext)


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

        </>
    )
}
