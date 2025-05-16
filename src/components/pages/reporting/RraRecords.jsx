import React, { useRef, useState } from 'react'
import { ItemsContainer } from '../../globalcomponents/ItemsContainer'
import { Col, Row } from 'react-bootstrap'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { FileInputRow } from '../../Global/Forms/InputRow'
import PagesWapper from '../../Global/PagesWapper'
import { ContainerRowBtwn, FormInnerRightPane, SaveUpdateBtns } from '../../Global/ContainerRow'
import FormTools from '../../Global/PubFnx'
import { Splitter } from '../../globalcomponents/Splitter'
import axios from 'axios'
import StockConn from '../../services/StockServices/StockConn'

function RraRecords() {
    const [docs, setDocs] = useState([]) //images

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);  // Get the files from the input field
        console.log('-----------------docs', docs)
        console.log(files); // Check what files are being captured
        if (files.length > 0) {
            setDocs(files); // Store the files in the state
        }
    };
    const clearHandle = () => {


        setClearBtn(false)
    }
    const [clearBtn, setClearBtn] = useState(false) //The cancel button
    const [rrarec, setRrarec] = useState('rrarecords')
    let vessel = {
        rrarec: rrarec
      }


    const handleSubmit = async (event) => {


        /* #region ---------------Other form data --------------- */

        /* #endregion */
        event.preventDefault();

        // Create FormData to append images and other data
        const formData = new FormData();
        for (let i = 0; i < docs.length; i++) {
            formData.append('images', docs[i]);
        }
        formData.append('images', docs); // Add item name to the form data
        // Append vessel data
        Object.keys(vessel).forEach((key) => {
            formData.append(key, vessel[key]);
        });

        try {
            const response = await axios.post(StockConn.wholePath.name + "/rrarec/", formData, {
                headers: {
                    ...StockConn.GetToken,
                    'Content-Type': 'multipart/form-data' // This should be handled automatically by axios, but you can explicitly set it
                }
            });
          
                // setMessage(response.data.message); // Set the resp onse message
                // setErrorOccured(true)
                alert(response.data.message)
                // setRefresh(!refresh)
                // resetAfterSave()
                // elementRef.current.scrollIntoView({
                //   behavior: 'smooth',  // Optional: for smooth scrolling
                //   block: 'start',      // Optional: align at the start of the viewport
                // });
             
            setDataLoad(false)
        } catch (error) {
            // setMessage(error); // Set the response message
            // setErrorOccured(true)
            // setMessage(error.message)
            console.log('==================done ======================')
            // if (error.response) {
            //     alert('An error occured')
            //     alert(error.response.data.message)
            // }

            console.error(error);
        }
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        setShowLoader(true)
        handleSubmit(e)
    }
    const formRef = useRef();
    const [showLoader, setShowLoader] = useState(false)
    return (
        <PagesWapper  >
            <ContainerRowBtwn full={true} clearBtn={clearBtn} form={'Vessel'} showLoader={showLoader}  >
                <FormInnerRightPane ref={formRef} onSubmitHandler={onSubmitHandler}>
                    <ItemsContainer>
                        <Row className="d-flex mt-3 flex-row justify-content-center align-items-center">
                            <Col className="border  " md={6}>
                                <TitleSmallDesc title="Import RRA File" />
                            </Col>
                        </Row>
                        <Row className="d-flex flex-row justify-content-center align-items-center">
                            <Splitter />
                            <Col className="border border-light p-3" md={6}>
                                <FileInputRow label='images' val={setDocs} handle={handleFileChange} name="RRA FILE" />
                            </Col>
                        </Row>
                        <Row className="d-flex flex-row justify-content-center align-items-center">

                            <Col className="border border-light p-3" md={6}>
                                <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
                            </Col>
                        </Row>

                    </ItemsContainer>
                </FormInnerRightPane>
            </ContainerRowBtwn>
        </PagesWapper>
    )
}

export default RraRecords