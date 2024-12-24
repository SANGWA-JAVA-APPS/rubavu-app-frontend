import React, { useContext, useEffect, useRef, useState } from 'react'
import { ClearBtnSaveStatus, ContainerSingleRow, FormFillPane } from '../../Global/ContainerRow';
import { InputAndSearch } from './PurchaseForm';
import { LoadSub } from '../../Global/InputRow';
import { Button, Col, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap';
import { BrandContext } from '../../Global/BrandContext';
import { Icon } from 'react-icons-kit'
import { cross as remove } from 'react-icons-kit/icomoon/cross'
import { plus } from 'react-icons-kit/icomoon/plus'
import { checkmark as confirm } from 'react-icons-kit/icomoon/checkmark'

import TopPart from '../sale/TopPart';
import BillPart from '../sale/BillPart';
import BillForm from '../sale/BillForm';
import { ColItemContext } from '../../Global/GlobalDataContentx';
import StockCommons from '../../services/StockServices/StockCommons';
import StockRepository from '../../services/StockServices/StockRepository';

function MultipleItems() {
    const [textboxes, setTextboxes] = useState([{ value: "" }]);
    const height = 0;
    const [completeitemName, setCompleteitemName] = useState() //This is the chosen name of item selected from the list from the backend on the result table
    const [searchedQtyVal, setSearchedQtyVal] = useState('')// this is used on search on the beginning of the form registration
    const [searchProgress, setSearchProgress] = useState(false)//more as units when clicked the 'deploy' button

    const [clearBtn, setClearBtn] = useState(false) //The cancel button
    const [showLoader, setShowLoader] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [searchItemValue, setSearchItemValue] = useState('')
    const { brandName, setBrandName } = useContext(BrandContext);  // Access brandName and its setter
    const [userType, setUserType] = useState()
    const { pressedKey, handleKeyPress } = useContext(ColItemContext); // Use the context
    const {  setSelectedItem} = useContext(ColItemContext);
    const addFields = (index) => {
        setTextboxes([...textboxes, { value: "" }]);
    }

    /* #region ------------Dymnamically add the fields */
    const [fields, setFields] = useState([{ itemsId: "", sale_unit_cost: 0, sold_qty: "", show: false }]);

    // Handle input change for a specific field (either item or quantity)
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newFields = [...fields];
        newFields[index][name] = value;
        setFields(newFields);
        if (event.target.name === 'itemsId') {//show the items' list only on the "item" filed
            newFields[index].show = true;  // Hide the corresponding div
            var newValue = newFields[index].itemsId;
            console.log('--------  ' + newValue)
            setResultTableVisible(true)
            if (newValue.length > 2) {
                setShowLoader(true)
                StockRepository.findItemssbyname(newValue).then(res => {
                    setItemssbyname(res.data)
                    setShowLoader(false)
                })
            }

        } else {
            newFields[index].show = false;  // Hide the corresponding div
            setShowLoader(false)
        }

    };

    // Add a new set of input fields
    const handleAddFields = () => {
        setFields([...fields, { itemsId: "", sale_unit_cost: 0, sold_qty: "", show: false }]);
        scrollToTop()
    };

    // Remove a set of input fields
    const handleRemoveFields = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };
    // Hide the div (set `show` to false)
    const handleHideDiv = (index) => {
        const newFields = [...fields];
        newFields[index].show = false;  // Hide the corresponding div
        setFields(newFields);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted fields:", fields);
        // You can send `fields` to a backend or process it further
        const mysales = fields;
        console.log('-----------')
        console.log(mysales)
        StockCommons.saveMultipleSales(mysales).then((res) => {
            alert(res.data)
        })
    };

    /* #endregion */

    /* #region ------------Search Result table -------------------- */
    const [itemssbyname, setItemssbyname] = useState([]) //Data List searched by name
    const [resultTableVisible, setResultTableVisible] = useState(true)//more as units when clicked the 'deploy' button
    const searchDone = (id, name, balance) => {
        

        // setSearchedItemChosen(true) //show other 2 fields on the form
        // setCompletedSearch(true) //get ready to fill the complete name, 
        // setSearchProgress(false)
        // setItemsId(id)
        // setCompleteitemName(name)

        
        setSelectedItem(name)
        setResultTableVisible(false)

        //the below are used on search on the beginning of the form filling
        // setSearchedNameLabel('NAME')
        // setSearchedQtyLabel('Qty')
        // setSearchedQtyVal(balance)
        // handleReset()
    }
    const delItemsById = (id, name) => {

        // Utils.SubmitWithInfoOnPopup((msg) => {
        //   Delete.deleteItemsById(id, () => { getItemsRefresh() })
        // }, () => { })
    }
    /* #endregion */

    const totalitems = (fields) => {
        return fields.length < 1 ? 'No items Added' : 'Total items: ' + fields.length
    }
    var sum = 0;
    useEffect(() => {
        document.body.style.backgroundColor = '#f6f6f5';
    })
    const myRef = useRef(null);
    const [show, setShow] = useState(false);

    const scrollToTop = () => {

        myRef.current.scrollIntoView({
            behavior: 'smooth', // Smooth scroll effect
            block: 'end', // Aligns the top of the element to the top of the container

        });
    };
    const clearAll = () => {
        setFields([{}])
    }

    return (
        <>
            <TopPart totalitems={totalitems(fields)} handleAddFields={handleAddFields} plusIcon={plus} handleSubmit={handleSubmit} confirmIcon={confirm} clearAll={clearAll} />
            <Row className="d-flex justify-content-center multipleItemBox  " >
                <BillPart brandName={brandName} fields={fields} sum={sum} />
                <BillForm myRef={myRef} handleSubmit={handleSubmit} fields={fields} handleInputChange={handleInputChange}
                    handleHideDiv={handleHideDiv} handleRemoveFields={handleRemoveFields}
                    itemssbyname={itemssbyname} resultTableVisible={resultTableVisible} showLoader={showLoader}
                    searchDone={searchDone} delItemsById={delItemsById} userType={userType} />
            </Row>
        </>
    )
}

export default MultipleItems