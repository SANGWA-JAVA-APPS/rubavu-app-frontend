import React, { useState } from 'react'
import CustomModalPopup from '../../Global/CustomModalPopup'
import { Form } from 'react-bootstrap'
import { Icon } from 'react-icons-kit'


import { search } from 'react-icons-kit/icomoon/search'
import { FormFillPane } from '../../Global/ContainerRow'
import InputRow, { DropDownInput, EmptyInputRow, LoadSub } from '../../Global/Forms/InputRow'
import StockRepository from '../../services/StockServices/StockRepository'
import { TableOpen } from '../../Global/ListTable'
import { LocalTableHead, TableRows } from '../../Global/commonForPages/TableCommons'
import TableHead from '../../Global/TableHead'

function PurchaseForm({ content, modalShow, hideEvent }) {
  return (
    <>
      <CustomModalPopup
        title="Add Purchases"
        content={content}
        show={modalShow}
        onHide={hideEvent} />

    </>
  )
}
export default PurchaseForm

export const PForm = ({ searchItemValue, changedContent, handle }) => {
  return <Form>
    <Form.Group className="mb-3" controlId="item">
      <Form.Label>item</Form.Label>
      <Form.Control type="text" placeholder="item" />
    </Form.Group>
    {/* Search input text */}
    <Form.Group className='mb-3' >
      <InputAndSearch val={searchItemValue}
        changedContent={changedContent}
        handle={handle} label='Item' name='item' />
    </Form.Group>

    <Form.Group className="mb-3" controlId="Reference">
      <Form.Label>Reference</Form.Label>
      <Form.Control type="text" placeholder="Reference" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="Purchased quantity">
      <Form.Label>Purchased quantity</Form.Label>
      <Form.Control type="number" placeholder="Purchased quantity" />
    </Form.Group>

  </Form>
}


export const OnlyForm = () => {
  // State to keep track of textbox values
  const [textboxes, setTextboxes] = useState([{ value: "" }]);
  const [completedSearch, setCompletedSearch] = useState(false)//  
  const [searchProgress, setSearchProgress] = useState(false)//more as units when clicked the 'deploy' button
  const [completeitemName, setCompleteitemName] = useState() //This is the chosen name of item selected from the list from the backend on the result table
  const [resultTableVisible, setResultTableVisible] = useState(false)//more as units when clicked the 'deploy' button
  const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
  const [userType, setUserType] = useState()
  const [searchedItemChosen, setSearchedItemChosen] = useState(false)// this is to show the two fields that are initially hiden(false), on the selection they appear again
  const [searchedNameLabel, setSearchedNameLabel] = useState('') // this is used on search on the beginning of the form registration
  const [searchedQtyLabel, setSearchedQtyLabel] = useState('') // this is used on search on the beginning of the form registration
  const [searchedQtyVal, setSearchedQtyVal] = useState('')// this is used on search on the beginning of the form registration
  const [itemsId, setItemsId] = useState()
  // Function to add a new textbox
  const addTextbox = () => {
    setTextboxes([...textboxes, { value: "" }]);
  };
  // Function to handle input change in a specific textbox
  const handleInputChange = (index, event) => {
    const newTextboxes = [...textboxes];
    newTextboxes[index].value = event.target.value;
    setTextboxes(newTextboxes);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
  } 
  const searchForItemByName = () => {
    console.log('--------The search initiated Commmon');

    if (searchItemValue === '') {
      alert('You have to enter the value to search')
    } else {
      setCompletedSearch(false)
      setSearchProgress(true) // Go and show the progress bar,
      StockRepository.findItemssbyname(searchItemValue).then(res => {
        setItemssbyname(res.data)
        setResultTableVisible(true)
        setSearchProgress(false)
      })
    }
  }
  const searchDone = (id, name, balance) => {


    setSearchedItemChosen(true) //show other 2 fields on the form
    setCompletedSearch(true) //get ready to fill the complete name, 
    setSearchProgress(false)
    setItemsId(id)
    setCompleteitemName(name)
    setResultTableVisible(false)

    //the below are used on search on the beginning of the form filling
    setSearchedNameLabel('NAME')
    setSearchedQtyLabel('Qty')
    setSearchedQtyVal(balance)

  }
  const [searchItemValue, setSearchItemValue] = useState('')
  return (
    <FormFillPane onSubmitHandler={handleSubmit}>
      {textboxes.map((textbox, index) => (
        <div key={index}>
         

          <InputAndSearch val={searchItemValue} changedContent={(e) => setSearchItemValue(e.target.value)} handle={() => searchForItemByName()} label='Item' name='item'>
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
          </InputAndSearch>




        </div>
      ))}

      <button type="button" onClick={addTextbox}>
        Add Textbox
      </button>
      <button type="submit">Submit</button>
    </FormFillPane>
  )
}


export const GenIputRow = (props) => {
  return (
    <div class="form-group row m-1">
      <label for={props.label} class="col-sm-3 col-form-label">{props.name}</label>
      <div class="col-sm-9">
        {props.children}

      </div>
    </div>
  )
}
export const InputAndSearch = (props) => {
  return (
    <>
      <GenIputRow name={props.name} label={props.labe}>
        <div className="input-group flex-nowrap">
          <input type="text" className="form-control"
            onChange={props.changedContent} placeholder="Type item name"
            aria-label="Username" aria-describedby="addon-wrapping" />
          <span className=" input-group-text" id="addon-wrapping" onClick={props.handle}>
            <Icon style={{ color: '#230d02', marginRight: "10px" }} icon={search} />
          </span>
        </div>

      </GenIputRow>
      <div className='row'>
        {props.children}
      </div>
    </>

  )
}
