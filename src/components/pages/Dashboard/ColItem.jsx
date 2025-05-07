import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Icon } from 'react-icons-kit'
import StockRepository from '../../services/StockServices/StockRepository'
import { Link, useNavigate } from 'react-router-dom'
import { ColItemContext, useColItemContext } from '../../Global/GlobalDataContentx'
import { StockOrBisnessContext } from '../../Global/StockOrBisness'
import { useAuthHeader } from 'react-auth-kit'

function ColItem({ color, purchase, totPurchases, label, cls, path, clickHandler, chartArea }) {  //lx
    const [currencyName, setCurrencyName] = useState('')// this is used on search on the beginning of the form registration

    const [sharedData, setSharedData] = useState("Hello from Context!");

    const navigate = useNavigate(); // Get the navigate function
    const authHeader = useAuthHeader()();

    const { bizType, setBizType } = useContext(StockOrBisnessContext)
    const { defaultMeasureUnit, setDefaultMeasureUnit } = useContext(ColItemContext)
    const TopIconColors = {
        color: '#ef8c03', marginRight: '4px'
    }
    const iconSize = 20

    const getSettingByName = async (currencyName) => {
        try {
            const res = await StockRepository.getSettingByName(currencyName, authHeader);
            
            if (!res || !res.data) {
                throw new Error('Response or response.data is undefined');
            }
            if (bizType === 'stock') {
                setCurrencyName('kg');
            } else {
                setCurrencyName(res.data.value);
            }
        } catch (error) {
            console.error(`Error fetching setting for ${currencyName}:`, error);
            // Optionally set a fallback or notify the user
            setCurrencyName('default'); // Example fallback
        }
    };
    useEffect(() => {

        getSettingByName('currency')
    }, [])

    const { updateSelectedItem } = useColItemContext(); // Get the update function from context

    const dataToSend = () => {
        updateSelectedItem(label); // Update the selected item in the context
        navigate("/detailedrep")
    };
    return (

        <Col md={4} className="  ps-4 ">
            <Row className='d-flex  justify-content-center'>
                <Col md={12} className='      p-1'>
                    <GCard content={<>
                        <table>
                            <tr><td><Icon style={{ ...TopIconColors, color: color }} className='mb-2' color={color} size={iconSize} icon={purchase} /></td> <td>
                                <Link style={{ fontSize: '15px' }} className='dashboardLink' onClick={clickHandler} to={path}>
                                    <h4>   {totPurchases.toLocaleString()}  </h4>
                                </Link>
                            </td><td style={{ fontSize: '13px' }}> {label !== 'Revenue' ? defaultMeasureUnit : 'Rwf'} </td>
                            </tr>
                        </table>
                        <h5 className={cls} >
                            <b>
                                {label}
                            </b>
                        </h5>
                    </>
                    } btnText="Details" clickHandler="#" chartArea={chartArea} />

                    {/* lc means label color */}

                </Col>
            </Row>
        </Col>

    )
}

export default ColItem


export const GCard = ({ btnShow, content, btnText, clickHandler, chartArea }) => {
    return (
        <Card style={{ width: '20rem' }}>

            <Card.Body>
                <Row>
                    <Col style={{ height: '15rem', }} className='border' md={12}>{chartArea}</Col>
                </Row>
                {/* <Card.Title>{title}</Card.Title> */}
                <Card.Text>
                    {content}
                </Card.Text>
                {btnShow &&
                    <Button variant="primary" onClick={clickHandler}>{btnText} </Button>
                }
            </Card.Body>
        </Card>
    )
}