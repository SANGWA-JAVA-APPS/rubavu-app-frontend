import React, { useContext, useState } from 'react'
import { InputAndSearch, LoadSub } from '../Global/InputRow'
import { TableOpen } from '../Global/ListTable'
import TableHead from '../Global/TableHead'
// import { LocalTableHead, LocalTableHeadCommon, TableRows } from '../../Global/commonForPages/TableCommons'
import { LocalTableHead, LocalTableHeadCommon, TableRows } from '../../components/Global/commonForPages/TableCommons'
import { ColItemContext } from '../Global/GlobalDataContentx'

function SeaarchBytyping({  searchOnThirdSecond, labelName,placeholder ,hideSelectorLink ,showSelected, currentTypingVal,ref,sendRequestOnThirdChar}) {
    const { searchItemValue, setSearchItemValue } = useContext(ColItemContext)
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

    // const { searchTableVisible, setSearchTableVisible } = useContext(ColItemContext)
    
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
        <InputAndSearch val={currentTypingVal}   placeholder={placeholder} showSelected={showSelected} hideSelectorLink={hideSelectorLink}  
                ref={ref} 
            changedContent={ sendRequestOnThirdChar }
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

        </InputAndSearch>
    )
}

export default SeaarchBytyping

export const SearchTableResult = ({tableHead,TableRows}) => {
    return <>
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