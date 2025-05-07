import React from 'react'
import Icon from 'react-icons-kit'
import { ic_thumb_up_alt as ok } from 'react-icons-kit/md/ic_thumb_up_alt'
import { cross as remove } from 'react-icons-kit/icomoon/cross'
import { pencil as edit } from 'react-icons-kit/icomoon/pencil'

function TableCommons() {
    return (
        <div>TableCommons</div>
    )
}

export default TableCommons


// This is specific for purchase, sale and item
export const LocalTableHead = ({ userType }) => {
    return <>
        <LocalTableHeadCommon>
            {userType == 'admin' && <td>Options</td>}
        </LocalTableHeadCommon>
    </>
}
export const LocalTableHeadItemsPage = () => {
    return <>
        <LocalTableHeadCommon>
            <td>Select</td>
        </LocalTableHeadCommon>
    </>
}

export const LocalTableHeadCommon = (props) => {
    return <> <td>ITEM</td>
        <td>Category </td>
        <td>Remaining</td>
        <td>Purchase U. cost</td>
        <td>Sale U. cost</td>
        {props.children}
    </>
}

export const TableRows = ({ item, searchDone, userType, delhandle }) => {
    return <tr>
        <td>{item.name}       </td>
        <td>{item.item_name}</td>
        <td>{item.balance}</td>
        <td>{item.unit_cost}</td>
        <td>{item.sale_cost}</td>
        {userType == 'admin' &&
            <td className='delButton'>  <a href="#">
                <Icon onClick={delhandle} className="cursor-pointer" title='You can delete this record' size={20} style={{ color: '#ff0000', marginRight: "10px" }} icon={remove} />
            </a>
                <a href='#'> &nbsp; &nbsp;<Event item={[item.id, item.item_name, item.balance, item.unit_cost, item.sale_cost]}
                 searchDone={searchDone} /></a>
            </td>
        }
          

        {userType !== 'admin' &&
            <Event item={item} searchDone={searchDone} />
        }
    </tr>
}
export const TableRowsNoChoose = ({ item, handleEdit }) => {
    return <tr>
        <td>{item.name}       </td>
        <td>{item.item_name}</td>
        <td >{item.balance}</td>
        {localStorage.getItem('catname') == 'admin' && <td>
            <a href='#'> <Icon size={16} onClick={handleEdit} style={{ color: '#0fd120', marginRight: "10px" }} icon={edit} /></a>

        </td>}
    </tr>
}


export const Event = ({ item, searchDone }) => {
    return <td>
        <Icon title='Click to select this record' onClick={(e) => searchDone(...item)} size={30} className='handCursor cursor-pointer'
            style={{ boxShadow: '0px 0px 4px #fff', color: '#e6540b', marginRight: "10px" }}
            icon={ok}
        />
    </td>
}
