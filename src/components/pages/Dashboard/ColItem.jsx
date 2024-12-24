import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Icon } from 'react-icons-kit'
import StockRepository from '../../services/StockServices/StockRepository'
import { Link, useNavigate } from 'react-router-dom'
import { ColItemContext, useColItemContext } from '../../Global/GlobalDataContentx'
import { StockOrBisnessContext } from '../../Global/StockOrBisness'

function ColItem({ color, purchase, totPurchases, label, cls, path }) {  //lx
    const [currencyName, setCurrencyName] = useState('')// this is used on search on the beginning of the form registration

    const [sharedData, setSharedData] = useState("Hello from Context!");

    const navigate = useNavigate(); // Get the navigate function

    const { bizType, setBizType } = useContext(StockOrBisnessContext)
    const { defaultMeasureUnit, setDefaultMeasureUnit } = useContext(ColItemContext)
    const TopIconColors = {
        color: '#ef8c03', marginRight: '4px'
    }
    const iconSize = 30
    const getSettingByName = (currencyName) => {
        StockRepository.getSettingByName(currencyName).then((res) => {
            if (bizType === 'stock') {
                setCurrencyName('kg')
            }else{
                setCurrencyName(res.data.value)
            }
        })
    }

    useEffect(() => {

        getSettingByName('currency')
    }, [])

    const { updateSelectedItem } = useColItemContext(); // Get the update function from context


    const dataToSend = () => {
        updateSelectedItem(label); // Update the selected item in the context
        navigate("/detailedrep")
    };

    return (

        <Col md={3} className="border-end ">
            <Row className='d-flex  justify-content-center'>
                <Col md={9} className='  purchaseBgn pane p-2'>

                    <table>
                        <tr><td><Icon style={{ ...TopIconColors, color: color }} color={color} size={iconSize} icon={purchase} /></td> <td>
                            <Link style={{ fontSize: '20px' }} className='dashboardLink' to={path}>
                                <h3>   {totPurchases.toLocaleString()}  </h3>
                            </Link>
                        </td><td style={{ fontSize: '13px' }}> { label!=='Revenue'? defaultMeasureUnit:'Rwf'} </td></tr>
                    </table>
                    <h4 className={cls}  ><b>
                        {label}

                    </b></h4> {/* lc means label color */}

                </Col>
            </Row>
        </Col>

    )
}

export default ColItem