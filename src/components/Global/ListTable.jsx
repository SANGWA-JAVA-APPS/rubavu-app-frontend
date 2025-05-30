import React from 'react'
// Icons
import { Icon } from 'react-icons-kit'
import { printer } from 'react-icons-kit/icomoon/printer'
import { floppyDisk as save } from 'react-icons-kit/icomoon/floppyDisk'
import { cancelCircle as cancel } from 'react-icons-kit/icomoon/cancelCircle'
import { plus as add } from 'react-icons-kit/icomoon/plus'
import { search } from 'react-icons-kit/icomoon/search'
import { pencil as edit } from 'react-icons-kit/icomoon/pencil'
import { cross as remove } from 'react-icons-kit/icomoon/cross'
import { forward as point } from 'react-icons-kit/icomoon/forward'
import { arrowRight as Mainpoint } from 'react-icons-kit/icomoon/arrowRight'
import { ic_not_interested as disabled } from 'react-icons-kit/md/ic_not_interested'
import { ic_play_arrow_outline as enabled } from 'react-icons-kit/md/ic_play_arrow_outline'
import { Col } from 'react-bootstrap'
function ListOptioncol(props) {
    return (
        <>
            <td className='delButton optCol' style={{width:'auto'}} >
                <div className='row d-flex justify-content-center align-items-center'>
                    <Col md={3} className="d-flex justify-content-center">
                        <button onClick={props.getEntityById} style={{ width: "40px", padding: "5px", cursor: "pointer" }} title="Update Record" className='btn'>
                            <Icon size={16} style={{ color: '#0fd120' }} icon={edit} />
                        </button>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center">
                        <button onClick={props.delEntityById} style={{ width: "40px", padding: "5px", cursor: "pointer" }} title="Delete Record" className='btn'>
                            <Icon size={16} style={{ color: '#ff0000' }} icon={remove} />
                        </button>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center">
                        {(props.print && !props.donwShowPrint) &&
                            <button onClick={props.printData} style={{ width: "40px", padding: "5px", cursor: "pointer" }} title="Print" className='btn'>
                                <Icon size={17} style={{ color: '#000' }} icon={printer} />
                            </button>
                        }
                    </Col>
                </div>
            </td>
        </>
    )
}
export default ListOptioncol




export const TableOpen = (props) => {
    return (
        <div className='DataTableBox'>
            <table style={{ backgroundColor: props.changedbgColor == 1 ? '#f7fdfa' : '#fff' }} className='table  table-responsive table-hover table-striped dataTable table-bordered'>
                {props.children}

            </table>
        </div>
    )
}

export const ListOptioncolWithDeactivate = (props) => {
    return (
        <>
            <td className='delButton optCol' >
                <div className='row d-flex justify-content-center'>
                    <button onClick={props.getEntityById} style={{ width: "20px" }} title="Update Record" className='mr-0 p-0 btn round-circle'>
                        <Icon size={16} style={{ color: '#0fd120', marginRight: "10px" }} icon={edit} />
                    </button>

                    {/* Administrator cant be deleted or disabled */}
                    {props.catname !== 'admin' && props.removeOthers !== 'disable' && <>
                        <button onClick={props.delEntityById} style={{ width: "40px", marginLeft: "20px", padding: "5px", cursor: "pointer" }} title="Delete Record" className='ml-0 p-0 btn'>
                            <Icon size={10} style={{ color: '#ff0000', marginRight: "10px" }} icon={remove} />
                        </button>
                        <button onClick={props.delDisable} style={{ width: "20px", marginLeft: "20px" }} title="Update Record" className=' ml-0 p-0 btn'>
                            {props.status == 'Enabled' ?
                                <Icon size={15} title="Disable" style={{ color: '#ff0000', marginRight: "10px" }} icon={disabled} />
                                :
                                <Icon size={15} title="Enable" style={{ color: '#ff0000', marginRight: "10px" }} icon={enabled} />
                            }
                        </button>
                    </>}


                </div>
            </td>
        </>
    )
}
export const ListOptioncolWithActivate = (props) => {
    return (
        <>
            <td className='delButton optCol' >
                <div className='row d-flex justify-content-center'>
                    <button onClick={props.getEntityById} style={{ width: "20px" }} title="Update Record" className='mr-0 p-0 btn round-circle'>
                        <Icon size={16} style={{ color: '#0fd120', marginRight: "10px" }} icon={edit} />
                    </button>
                    <button onClick={props.delEntityById} style={{ width: "40px", marginLeft: "20px", padding: "5px", cursor: "pointer" }} title="Delete Record" className='ml-0 p-0 btn'>
                        <Icon size={10} style={{ color: '#ff0000', marginRight: "10px" }} icon={remove} />
                    </button>
                    <button onClick={props.enabled} style={{ width: "20px", marginLeft: "20px" }} title="Update Record" className=' ml-0 p-0 btn'>
                        <Icon size={22} style={{ color: '#0fd120', marginRight: "10px" }} icon={enabled} />
                    </button>
                </div>
            </td>
        </>
    )
}

