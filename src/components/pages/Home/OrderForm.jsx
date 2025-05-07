
import { useEffect, useState } from "react"
import { ClearBtnSaveStatus, ContainerRowBtwn, FormInnerRightPane, FormInnerRightPaneFile, SaveUpdateBtns } from "../../Global/ContainerRow"
import AnimateHeight from "react-animate-height"
import FormTools from "../../Global/PubFnx"
// import BootResponsiveMain from "./BootResposive"
// import ListToolBar from "../Global/ListToolBar"
import Conn from "../../services/Conn"
import axios from "axios"
import Repository from "../../services/Repository"
import StockConn from "../../services/StockServices/StockConn"

const OrderForm = () => {
    /* #region ------------------------------------------Declarations------------------------------------- */
    const [height, setHeight] = useState(0) //form height
    const [clearBtn, setClearBtn] = useState(false) //form title
    const [showLoader, setShowLoader] = useState(false) //unknown
    const [showAlert, setShowAlert] = useState(false) //generating alert
    const [id, setId] = useState(null)
    const [images, setImages] = useState([])
    //inputs
    
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    //outputs
    const [product, setProduct] = useState([])
    const [autoRefresh, setAutoRefresh] = useState(true)

    const imageLink = Conn.image.name + "/img"
    const [username, setUsername] = useState()
    const [userType, setUserType] = useState()
    const [pageLoaded, setPageLoaded] = useState(false);

    const [modalShow, setModalShow] = useState(false);
    const [chosenProdName, setChosenProdName] = useState(false);
    const [ChosenprodDescription, setChosenProdDescription] = useState(false);


    /* #endregion */
    //onSubmit
    /* #region ------------------------------------------Functions----------------------------------------------- */
    const UpdateById = (id) => {
        setId(id)
        setHeight('auto')
    }
    const handleChangle = (e) => {
        imagesIn.push(e.target.files)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()

        var formData = new FormData();
        formData.append('name', name)
        formData.append("description", desc)
        imagesIn.forEach((imageFiles) => {
            Array.from(imageFiles).forEach((file) => {
                formData.append("file", file);
            });
        });
        if (id) {
            axios.put(Conn.product.name + "update/" + id, "productInserting", { headers: Conn.GetToken }, authHeader).then((res) => {
                alert(res.data)
                setId(null)
                setAutoRefresh(!autoRefresh)
                // setHeight(0)
            })

        } else {
            const existingHeader={
                "Content-Type": "multipart/form-data"
            }
            axios.post( StockConn.wholePath.name + "/check/files", formData, {
                headers: {
                   ... existingHeader
                }
            }, authHeader).then((res) => {
                alert(res.data.resp);
                setAutoRefresh(!autoRefresh)
                formData = new FormData()
                images = []
                setName('')
                setDesc('')
            })

        }
    }
    const clearHandle = () => {

    }

    const DeleteById = (id) => {

        axios.delete(Conn.product.name + "product/" + id, { headers: Conn.GetToken }).then((result) => {
            alert(result.data)
            setAutoRefresh(!autoRefresh)
        })
    }

    const getImage = () => {
        fetch(Repository.findImages())
            .then(response => response.json())
            .then(imageNames => {
                const imageListDiv = document.getElementById('imageList');
                imageNames.forEach(imageName => {
                    const imageElement = document.createElement('img');
                    imageElement.src = `${Repository.server}/images/images/display?imageName=${imageName}`;
                    imageElement.alt = imageName;
                    imageElement.width = 200;
                    imageElement.height = 150;
                    imageListDiv.appendChild(imageElement);
                });
            }).catch(error => console.error('Error fetching images:', error));
    }
    const [chosenImages, setChosenImages] = useState([])
    const getProductDetails = (prodId, prodName, prodDescription, images) => {
        setModalShow(true)
        setChosenProdName(prodName)
        setChosenProdDescription(prodDescription)
        setChosenImages(images)
    }
    /* #endregion */
    // multiple accept="image/*"
    return <>
        <div className="form-div">

            {/* <Zoom>
                <div className="proDetails d-flex align-items-start">
                    <div className="row d-flex justify-content-center border ">
                        <Col md={6} className="text-center">
                            <h1> Product details </h1>
                        </Col>
                    </div>
                </div>
            </Zoom> */}

            {/* <ProdDetailsModal images={chosenImages} prodName={chosenProdName} description={ChosenprodDescription} show={modalShow} onHide={() => setModalShow(false)} /> */}

           
                <ContainerRowBtwn clearBtn={clearBtn} form="Product" showLoader={showLoader}>
                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                    <FormInnerRightPaneFile onSubmitHandler={(e) => { onSubmitHandler(e) }}>
                        <div className="row">
                            <label htmlFor="name" className="col-sm-3 mb-2 p">product name:</label>
                            <div className="col-sm-9 mb-2">
                                <input type="text" id="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="description" className="col-sm-3 p">description:</label>
                            <div className="col-sm-9">
                                <textarea type="text" id="description" value={desc} onChange={(e) => { setDesc(e.target.value) }} className="form-control" />
                            </div>
                           

                        </div>
                        <div className="row mt-2">
                            <label htmlFor="description" className="col-sm-3 p">Image:</label>
                            <div className="col-sm-9">
                                <input type="file" name="file" className="form-control" multiple onChange={(e) => { handleChangle(e) }} />
                            </div>

                        </div>

                        <div className="row">
                            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
                        </div>
                    </FormInnerRightPaneFile>
                </ContainerRowBtwn>
            
            <div className="body">
                <div className="container">
                   

                        <div id="imageList" className="row justify-content-sm-center imageList d-flex justify-items-around">
                            {
                                images.map((img) => (
                                    <div className="col-md-3 col-sm-6 mt-2 " >
                                        <div className="card prodCard mt-3" style={{ position: 'relative', width: "200px" }}>
                                            <span className="fw-bold p-1" style={{ fontSize: '12px', position: 'absolute', top: '0px', right: '-10px', color: '#fff', backgroundColor: 'red' }}>
                                                -27%
                                            </span>
                                            {/* <img className="card-img-top" width={190} height={150} key={img.id} src={`data:image/png;base64,${img.path}`} alt="images" /> */}
                                            <img className="card-img-top" width={190} height={150} key={img.id} src={`${Conn.server.name+Conn.port.val}images/${img.path}`} alt="images" />
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold text-capitalize" style={{ color: '#e64a07e8' }}>{img.name}</h5>
                                                <h6 className="fw-bold">RWF 300</h6>
                                                <p className="card-text ellipsis" style={{ color: '#0062ffe8' }}>
                                                    {img.description}
                                                </p>
                                                {userType !== null && (userType === 'admin' || userType === 'doctor') && <>
                                                    <a onClick={(e) => getProductDetails(img.product_id, img.name, img.description, img.images)} className="btn btn-primary prodCardBtn p-1 fs-6" style={{ borderRadius: '2px' }}>Details</a>
                                                    <a onClick={(e) => getProductDetails(img.product_id, img.name, img.description, img.images)} className="btn mx-2 btn-primary prodCardBtn p-1 fs-6" style={{ borderRadius: '2px' }}>Delete</a>
                                                </>
                                                }

                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    
                </div>
            </div>

        </div>
    </>
}

export default OrderForm