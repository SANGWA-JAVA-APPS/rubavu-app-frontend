import React, { useContext, useEffect, useState } from 'react'
import { DropDownInput } from '../../Global/InputRow';
import { ColItemContext } from '../../Global/GlobalDataContentx';
import StockRepository from '../../services/StockServices/StockRepository';

function CommonArrivalComp() {
    const [arrival_notes, setArrival_notes] = useState([]) //Data List

    const { arrival_id, setArrival_id } = useContext(ColItemContext)

    const [destIName, setDestName] = useState()
    const [source_id, setSource_id] = useState(0)
    const [dest_id, setDest_id] = useState(0)
    const [destCat, setDestCat] = useState()
    const [obj, setObj] = useState({})

    const getAllArrival_notes = () => {
        StockRepository.findArrival_note(authHeader).then((res) => {


            setArrival_notes(res.data);



        });
    }
    const changedArrivalId = (arrival) => {
        setObj(arrival)
        console.log(JSON.stringify(obj))
    }

    const DoZero = (item) => {
        return item === undefined ? 0 : item
    }
    useEffect(() => {
        getAllArrival_notes()
    }, [])
    useEffect(() => {

        if (obj.source_id) {

            setDestName(obj?.source_id)
            setDestCat(obj?.mdl_destination?.name)

            setSource_id(DoZero(obj.source_id))
            setDest_id(DoZero(obj.dest_id))
            setDestCat(obj.mdl_destination.destCat)
            setArrival_id(obj.id)
            if (arrival_id>0) {
                StockRepository.truckarrival(destIName, source_id, dest_id, destCat, arrival_id, authHeader).then((res) => {

                    setArrival_id(0)
                })
            }
            console.log('------------------obj items -----------------')
            console.log('destIName: ' + name + ', sourceid: ' + source_id + ' dest_id: ' + dest_id + ' destcat: ' + destCat + ' arrivalid: ' + arrival_id)
        }

    }, [obj])
    return (
        <DropDownInput handle={(e) => setObj(JSON.parse(e.target.value))} name='Arrival Number' label='Bollard' >
            {arrival_notes.map((arrival) => (
                <option value={JSON.stringify(arrival)} key={arrival.id}>    {arrival.id}</option>
            ))}
        </DropDownInput>
    )
}

export default CommonArrivalComp