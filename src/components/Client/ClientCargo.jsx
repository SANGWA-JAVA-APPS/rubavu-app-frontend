import React, { useContext } from 'react'
import ContainerRow from '../Global/ContainerRow'
import { Col } from 'react-bootstrap'
import { DropDownInput } from '../Global/InputRow'
import TableHead from '../Global/TableHead'
import { TableOpen } from '../Global/ListTable'
import { TitleSmallDesc } from '../globalcomponents/TitleSmallDesc'
import { useState } from 'react'
import { Icon } from 'react-icons-kit'
import { newspaper as client } from 'react-icons-kit/icomoon/newspaper'
import { ColItemContext } from '../Global/GlobalDataContentx'
import { SmallSplitter, Splitter } from '../globalcomponents/Splitter'
function ClientCargo({ clients }) {
    const { searchItemValue } = useContext(ColItemContext)
    const localHead = {

        padding: '12px', color: '#fff'
    }
    const [showmore, setShowmore] = useState(false)

    const showmoreHandler = () => {
        setShowmore(!showmore)

    }
    return (
        <ContainerRow mt='3'>
            <Splitter/>
            
            <TitleSmallDesc title="Client Cargo Inventory" />
            <SmallSplitter/>
            
            <Col md={2}>
                <div className="border d-flex justify-content-center " style={{ height: '100px', width: '100px' }}>
                    <Icon size={'70%'} style={{ color: '#1d6d7b' }} icon={client} />
                </div>
                <p style={{ fontSize: '12px', fontWeight:'bold' }}>{searchItemValue}</p>
                <p style={{ fontSize: '12px', fontWeight:'bold' }}> {}</p>
            </Col>
            <Col md={2}>
                <DropDownInput label='Period' name='year'  >
                    <option>2025</option>
                </DropDownInput>
            </Col>
            <Col md={8}>
                <a href='#' onClick={showmoreHandler} className=''>Show more info</a>
                <table className='table table-bordered'>

                    <tr className="fw-bold" style={{ backgroundColor: '#1d6d7b', padding: '9px' }}>
                        <td style={localHead}>Arrival id </td>
                        {showmore && <>
                            <td style={localHead}>Client name </td>
                            <td style={localHead}>TIN </td>
                            <td style={localHead}>Arrival Date </td></>}
                        <td style={localHead}>Cargo </td>
                        <td style={localHead}>Previous </td>
                        <td style={localHead}>Balance  </td>
                        {showmore && <td style={localHead}>Last removal </td>}


                    </tr>


                    {/* {userType == 'admin' && <td className='delButton d-none'>Option</td>} */}

                    <tbody> {clients.map(client => (
                        <tr>
                            <td>{client.id}</td>


                            {showmore && <><td>{client.name}</td>
                                <td>{client.tin_number}</td>
                                <td>{client.date_time}</td></>}
                            <td>{client.itemName} </td>
                            <td>{client.prevQty} </td>
                            <td style={{  border: ' 2px solid green', fontWeight: 'bold',  color: '#00d9ff'   }}>
                                {(client.cargoBalance.toLocaleString())} units</td>

                            <td>{showmore && client.lastDate}</td>


                        </tr>))}
                    </tbody>

                </table>
            </Col>
        </ContainerRow>
    )
}

export default ClientCargo