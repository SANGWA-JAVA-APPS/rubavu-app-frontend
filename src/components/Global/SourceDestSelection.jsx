import React, { useContext, useState } from 'react'
import { ColItemContext, useColItemContext } from './GlobalDataContentx'
import StockRepository from '../services/StockServices/StockRepository'
import { TwoHorizontalParts } from '../globalcomponents/TwoParts/TwoHorizontalParts'
import { DropDownInput } from './InputRow'
import { Row } from 'react-bootstrap'

export const SourceDestSelection = () => {
    const { setSourceId,  setdestId} = useContext(useColItemContext)

    const [trucks, setTrucks] = useState([])
    const [vessels, setVessels] = useState([])


    const [sourceTruckId, setSourceTruckId] = useState()
    const [sourceVesselId, setVesselId] = useState()

    const [destinationTruckId, setDestinationTruckId] = useState()
    const [destinationVesselId, setDestinationVesselId] = useState()

    const [dataLoad, setDataLoad] = useState(false)
    const getAllVessels = (page, size) => {
        StockRepository.findVessel(authHeader).then((res) => {
            setVessels(res.data);
            setDataLoad(true)

        });
    }
    const getAllTrucks = () => {
        StockRepository.getAllTruck(authHeader).then((res) => {
            setTrucks(res.data);
            setDataLoad(true)

        });
    }
    useEffect(() => {
        getAllVessels()
        getAllTrucks()
    }, [])

    const setSourceTruckHandler = (e) => {
        setSourceTruckId(e.target.value)
        setSourceId(e.target.value)
    }
    const setSourceVesselHandler = (e) => {
        setSourceId(e.target.value)
    }
    const setDestTruckHandler = (e) => {
        setDestinationTruckId(e.target.value)
        setdestId(e.target.value)
    }
    const setDestVesselHandler = (e) => {
        setDestinationVesselId(e.target.value)
        setdestId(e.target.value)
    }

    return (
        <Row>
        <TwoHorizontalParts partOne={
                <>   <DropDownInput handle={(e) => setSourceTruckHandler(e)} name='Trucks' label='Trucks' >
                    {trucks.map((truck) => (
                        <option selected={sourceTruckId === truck.id} value={truck.id} key={truck.id}> {truck.plate_number} </option>
                    ))}
                </DropDownInput>
                    <DropDownInput handle={(e) => setSourceVesselHandler(e)} name='vessels' label='vessels' >
                        {vessels.map((vessel) => (
                            <option selected={sourceVesselId === vessel.id} value={vessel.id} key={vessel.id}> {vessel.plate_number} </option>
                        ))}
                    </DropDownInput>
                </>
            } partTwo={
                <>   <DropDownInput handle={(e) => setDestTruckHandler(e)} name='Trucks' label='Trucks' >
                    {trucks.map((truck) => (
                        <option selected={destinationTruckId === truck.id} value={truck.id} key={truck.id}> {truck.plate_number} </option>
                    ))}
                </DropDownInput>
                    <DropDownInput handle={(e) => setDestVesselHandler(e)} name='vessels' label='vessels' >
                        {vessels.map((vessel) => (
                            <option selected={destinationVesselId === vessel.id} value={vessel.id} key={vessel.id}> {vessel.plate_number} </option>
                        ))}
                    </DropDownInput>
                </>
            } />
        </Row>
    )
}

