import React from 'react'
import { TableOpen } from '../../Global/ListTable'
import TableHead from '../../Global/TableHead'
import { LocalTableHead, TableRows } from '../../Global/commonForPages/TableCommons'
// child of  BillForm
function SearchResultTable({resultTableVisible,itemssbyname,searchDone,delItemsById,userType}) {
    return (
        <>
            {resultTableVisible &&
                <TableOpen changedbgColor={1} >
                    <TableHead changedbgColor={1}>
                        <LocalTableHead userType={userType} />

                        {userType !== 'admin' && <td className='delButton'>Select</td>}
                    </TableHead>
                    <tbody>
                        {itemssbyname.map((item, index) => {
                            var color = index > 0 && (itemssbyname[index - 1].name !== item.name ? 'change' : 'v')
                            var styl = color == 'change' ? 'green' : 'transparent'
                            var txt = color == 'change' ? '#fff' : '#000'
                            return <TableRows searchDone={() => searchDone(item.id, item.name, item.balance)} item={item} delhandle={() => delItemsById(item.id, item.name)} userType={userType} />
                        }
                        )}
                    </tbody>
                </TableOpen>
            }
        </>
    )
}

export default SearchResultTable