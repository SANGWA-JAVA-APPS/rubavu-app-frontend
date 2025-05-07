import React from 'react'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { Col, Row } from 'react-bootstrap'
import { TitleAndList } from '../../globalcomponents/TitleAndList'
import { androidBoat as boat } from 'react-icons-kit/ionicons/androidBoat'
import { truck } from 'react-icons-kit/icomoon/truck'
import { Icon } from 'react-icons-kit'
import { TitleSmallDescNoSlide } from '../../globalcomponents/TitleSmallDesc'
import {ic_login as incoming} from 'react-icons-kit/md/ic_login'
import {ic_logout as outgoing} from 'react-icons-kit/md/ic_logout'
import {ic_offline_pin_outline as berthedParked} from 'react-icons-kit/md/ic_offline_pin_outline'
export const IncomingOutgoing = ({ allBerthings, allEnteredTrucks, allunberthedVessels, alloutgoingTrucks,allAvailableAtPort, totalTruckAtPort,
    totIncomingWoodedboats, totOutgoingWoodedboats,totBerthedWoodedboats
 }) => {
    const iconColor = '#f17618'
    const darkboatColor = '#86431c'
    const blackIconColor = '#000000'
    const inoutgoingColor='#c700c7'
    const groupTileSize=30
    const myincomeOutgoingStyles = {
        border: '1px solid  #f17618',
        borderRadius: '9px' 
    }
    return (
        <ItemsContainer>
            <Row className=''>
                <Col md={4} className="">
                    <div className="  p-4" style={myincomeOutgoingStyles}>
                        <TitleAndList title={<> <TitleSmallDescNoSlide title={<>
                              <Icon icon={incoming} size={groupTileSize} style={{ color: inoutgoingColor , marginRight:'8px'}} />
                               Incoming  </>} />   </>}
                            li1={<> <Icon icon={boat} size={20} style={{ color: iconColor }} />  {allBerthings} vessels</>}
                            li2={<> <Icon icon={boat} size={20} style={{ color: darkboatColor }} /> {totIncomingWoodedboats} wooden boats </>}
                            li3={<>  <Icon icon={truck} size={20} style={{ color: blackIconColor }} /> {allEnteredTrucks} trucks</>}
                        />
                    </div>
                </Col>
                <Col md={4} className=" " >
                    <div className="  p-4" style={myincomeOutgoingStyles}>
                        <TitleAndList title={<><TitleSmallDescNoSlide title={<>
                              <Icon icon={outgoing} size={groupTileSize} style={{ color: inoutgoingColor , marginRight:'8px'}} />
                               Outgoing  </>} /></>}
                            li1={<> <Icon icon={boat} size={20} style={{ color: iconColor }} />  {allunberthedVessels} vessels</>}
                            li2={<> <Icon icon={boat} size={20} style={{ color: darkboatColor }} /> {totOutgoingWoodedboats} wooden boats </>}
                            li3={<>  <Icon icon={truck} size={20} style={{ color: blackIconColor }} /> {alloutgoingTrucks} trucks</>} />
                    </div>
                </Col>
                <Col md={4} className="">
                    <div className="  p-4" style={myincomeOutgoingStyles}>
                        <TitleAndList title={<><TitleSmallDescNoSlide title={<>
                              <Icon icon={berthedParked} size={groupTileSize} style={{ color: inoutgoingColor , marginRight:'8px'}} />
                               Berthed/Parked  </>} /></>}
                            li1={<> <Icon icon={boat} size={20} style={{ color: iconColor }} />  {allAvailableAtPort} vessels</>}
                            li2={<> <Icon icon={boat} size={20} style={{ color: darkboatColor }} /> {totBerthedWoodedboats} wooden boats </>}
                            li3={<>  <Icon icon={truck} size={20} style={{ color: blackIconColor }} /> {totalTruckAtPort} trucks</>} />
                    </div>
                </Col>

            </Row>
        </ItemsContainer>
    )
}
