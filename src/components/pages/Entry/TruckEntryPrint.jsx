import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col, Row } from 'react-bootstrap'
import PagesWapper from '../../Global/PagesWapper'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import { useAuthHeader } from 'react-auth-kit'
import { PrintRow, PrintSignature } from '../../Global/Utils'

export const TruckEntryPrint = () => {
    const { obj } = useContext(ColItemContext)
    const navigate = useNavigate()
    const authHeader = useAuthHeader()();
    useEffect(() => {
        if (!obj || !obj.plate_number) {
            navigate('/entryform')
        }
    }, [obj])
    const componentRef = useRef();
    return (
        <PagesWapper>
            <Printtemplate
                ref={componentRef}
                leftAddress="MAGERWA"
                title={`Print a TruckEntry - ${obj.name}`}
                rightSideAddress="RUBAVU PORT"
                contentTitle={` TRuck Entry   `} >
                <SmallSplitter />

                <Col md={6} style={{ fontSize: '12px' }}>
                    <Row>
                        <PrintRow txt="Truck Entry ID" txtValue={obj.id} /> {/* 5 */}
                        <PrintRow txt="Plate Number" txtValue={obj.plate_number} /> {/* "asdfas" */}
                        <PrintRow txt="Truck Type" txtValue={obj.truck_type} /> {/* "40ft container" - using truck_type as no 'name' field exists */}
                        <PrintRow txt="Owner/Operator" txtValue={obj.cargo_owner} /> {/* "asfas" - using cargo_owner as no 'owner_operator' field exists */}
                        <PrintRow txt="seal number  " txtValue={obj.seal_number + " tons"} /> {/* "30 tons" - using weight_of_truck as no 'dimension' field exists */}
                        <PrintRow txt="full vessel truck warehouse" txtValue={obj.full_vessel_truck_warehouse    } /> {/* "30" - using weight_of_truck as no 'capacity' field exists */}
                        <PrintRow txt="get in time" txtValue={obj.get_in_time    } /> {/* "30" - using weight_of_truck as no 'capacity' field exists */}
                        <PrintRow txt="cargo owner" txtValue={obj.cargo_owner    } /> {/* "30" - using weight_of_truck as no 'capacity' field exists */}
                    </Row>
                </Col>

                <Splitter />
                <PrintSignature />
            </Printtemplate>
        </PagesWapper>

    )
}
