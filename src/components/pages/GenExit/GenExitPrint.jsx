import React, { useContext, useEffect, useRef } from 'react'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import { ButtonContext } from '../../globalcomponents/ButtonContext'
import { useNavigate } from 'react-router-dom'
import Printtemplate from '../../globalcomponents/Printtemplate'
import { Col, Row } from 'react-bootstrap'
import { SmallSplitter, Splitter } from '../../globalcomponents/Splitter'
import PagesWapper from '../../Global/PagesWapper'


export const GenExitPrint = () => {

  const { obj } = useContext(ColItemContext)
  const { serviceName, chargeCriteria, setChargeCriteria } = useContext(ButtonContext)
  const navigate = useNavigate()


  const componentRef = useRef();
  let totWeight = 0
  useEffect(() => {
    if (!obj) {
      // navigate('/startproc')
    }
  }, [obj])
  return (
    <PagesWapper>
      <Printtemplate
        ref={componentRef}
        leftAddress="MAGERWA"
        title={`Printing Exit note  `}
        rightSideAddress="RUBAVU PORT"
        contentTitle={` EXIT NOTE`}>

        {/* <h5 className="mt-5 text-underline"><u><b>CLIENT INFORMATION</b></u></h5> */}
        <Col md={12} style={{ marginTop: '80px' }}>
          <Row className="d-flex justify-content-around ">

            <Col md={11} className="mt-1 col-6 border-bottom border border-dark">
              <h5 className="mt-3 text-underline"><u><b>EXIT INFORMATION</b></u></h5>
              <Row>

                <Col className="col-5"  >Exit date   </Col> <Col className="col-6"  >{obj.date_time}</Col>

              </Row>
            </Col>
            <Col md={11} className="mt-2 col-6 border-bottom border border-dark">
              <h5 className="mt-5 text-underline"><u><b>RECEIPT INFORMATION</b></u></h5>
              <Row>
                <Col className="col-5"  > Reecipt Id  </Col> <Col className="col-6"  >{obj?.rid}</Col>
                <Col className="col-5"  > Receipt  Date    </Col> <Col className="col-6"  >{obj.rdate_time}</Col>
                <SmallSplitter />
                <Col className="col-5"  > Receipt  Amount    </Col> <Col className="col-6 fw-bold"  >RWf {obj.amount && (obj.amount).toLocaleString()}</Col>
              </Row>
            </Col>
            <Col md={11} xs={11} className="mt-2 col-6 border-bottom border border-dark">
              <h5 className="mt-5 text-underline"><u><b>INVOICE INFORMATION</b></u></h5>
              <Row>
                <Col className="col-5"  > Reecipt Id  </Col> <Col className="col-6"  >{obj?.id}</Col>
                <Col className="col-5"  >   Invoice total weight    </Col> <Col className="col-6"  >{obj.total_weight}</Col>
                <SmallSplitter />
                <Col className="col-5"  >   Invoice total amount    </Col> <Col className="col-6 fw-bold"  >RWf 
                {obj.total_amount && (obj.total_amount).toLocaleString()}</Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={11}>
          <Col md={12} className="VertSpacenOnPrint d-none"></Col>
          <Row style={{ position: 'absolute', width: '90%', bottom: '0' }}>
            <table>
              <thead style={{ backgroundColor: '#f5f5f5' }}>
                <td className="border border-dark">Tally</td> <td className="border border-dark">Warehouse Supervisor</td> <td className="border border-dark">Customs</td> <td className="border border-dark">Client</td>
              </thead>
              <tbody>
                <tr style={{ height: '100px' }}>
                  <td className="border border-dark"> </td> <td className="border border-dark"> </td> <td className="border border-dark"> </td> <td className="border border-dark"> </td>
                </tr>
              </tbody>
            </table>
          </Row>
        </Col>
      </Printtemplate>
    </PagesWapper>
  )
}

