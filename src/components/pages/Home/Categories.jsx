import React from 'react'
import { Row, Tab, Table, Tabs } from 'react-bootstrap'
import DataRows from './DataRows'

function Categories({ list }) {
    return (
        <>

            <Tabs defaultActiveKey="home" id="custom-tabs"
                style={{ width: '100%' }}
                className="mb-3 custom-tabs">
                <Tab eventKey="home" title="History"   >
                    <Row>
                        <Table style={{ width: '100%' }} striped bordered hover>
                            <thead>
                                <tr style={{backgroundColor:'#301203 !important'}}>
                                    <th>Item</th>
                                    <th>Date</th>
                                    <th>Activity</th>
                                    <th>Previous</th>
                                    <th>Remaining</th>
                                    <th>Cash</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((res) => {
                                    var color= res.in_out == 'out' ? 'green !important' : '' 
                                    return (
                                         <DataRows color={color} res={res}/>    
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Row>

                </Tab>
                <Tab eventKey="profile" title="Monthly Report">
                    <p>This is the Profile tab content.</p>
                </Tab>
                <Tab eventKey="contact" title="Damages">
                    <p>This is the Contact tab content.</p>
                </Tab>

            </Tabs>

        </>
    )
}

export default Categories