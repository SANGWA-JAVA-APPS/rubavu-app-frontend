import React, { useContext, useState } from 'react'
import { InputAndSearch, LoadSub } from '../Global/InputRow'
import { TableOpen } from '../Global/ListTable'
import TableHead from '../Global/TableHead'
// import { LocalTableHead, LocalTableHeadCommon, TableRows } from '../../Global/commonForPages/TableCommons'
import { LocalTableHead, LocalTableHeadCommon, TableRows } from '../../components/Global/commonForPages/TableCommons'
import { ColItemContext } from '../Global/GlobalDataContentx'

function SeaarchBytyping({ tableHead, TableRows ,searchOnThirdSecond, labelName}) {
    const  {searchItemValue, setSearchItemValue} = useContext(ColItemContext)
    const [completeitemName, setCompleteitemName] = useState() //This is the chosen name of item selected from the list from the backend on the result table
    const [searchedNameLabel, setSearchedNameLabel] = useState('') // this is used on search on the beginning of the form registration
    const [searchedQtyLabel, setSearchedQtyLabel] = useState('') // this is used on search on the beginning of the form registration
    const [searchedQtyVal, setSearchedQtyVal] = useState('')// this is used on search on the beginning of the form registration
    const [resultTableVisible, setResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button

    const [isActive, setIsActive] = useState(true);
    const [nCahrEntered, setNCharEntered] = useState(0)
    const [userType, setUserType] = useState()
    const [searchProgress, setSearchProgress] = useState(false)//more as units when clicked the 'deploy' button
    const [completedSearch, setCompletedSearch] = useState(false)//  

        const {searchTableVisible,setSearchTableVisible}=useContext(ColItemContext)
   
    const sendRequestOnThirdChar = (e) => {
        const newValue = e.target.value;

        setSearchItemValue(newValue)
        // setIsActive(true)
        if (newValue.length === 0) {
            //   setNCharEntered(0)
            //   // handleReset()
            setSearchTableVisible(false)

        } else if (newValue.length >= 3) {
            searchOnThirdSecond()
        }
    }
    const searchForItemByName = () => {
        console.log('--------The search initiated Commmon');

        if (searchItemValue === '') {
            //   alert('You have to enter the value to search')
        } else {
            setSearchTableVisible(true)
        }
    }
    const blurhandler = () => {
    }
  
    
    return (
        <InputAndSearch val={searchItemValue}
            changedContent={(e) => sendRequestOnThirdChar(e)}
            handle={() => searchForItemByName()}
            blurhandler={blurhandler} label='Item' name={labelName}>
            <div className='row offset-6 fw-bold'>
                <span >
                    {completeitemName && <>

                        <span className='fw-bold text-decoration-underline p-1' style={{ textTransform: 'uppercase ', backgroundColor: '#ccc' }} >
                            {searchedNameLabel}:
                        </span>
                        &nbsp;  {completeitemName}

                        &nbsp; &nbsp;  <span className='fw-bold text-decoration-underline p-1' style={{ textTransform: 'uppercase ', backgroundColor: '#ccc' }} >
                            {searchedQtyLabel}:
                        </span>
                        &nbsp; {searchedQtyVal}
                    </>
                    }

                </span>
            </div>
            <LoadSub showmoreload={searchProgress} /> {/* Show progress upon clicking te deploy button*/}

            {/* The first search table */}
            {  searchTableVisible &&
                <>
                    <h4>Vessels    </h4>
                    <TableOpen changedbgColor={1} >
                        <TableHead changedbgColor={1}>
                            {tableHead.map((item, index) => (
                                <td>{item}</td>
                            ))}
                            <td>Option</td>
                       </TableHead>
                        <tbody>  {TableRows()}    </tbody>
                    </TableOpen>
                </>
            }
        </InputAndSearch>
    )
}

export default SeaarchBytyping