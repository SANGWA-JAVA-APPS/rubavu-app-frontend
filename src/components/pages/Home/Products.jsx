import React, { useEffect, useState } from 'react'
import { Button, Card, Col } from 'react-bootstrap'




import ProductCard from '../../Global/ProductCard'
import CustomModalPopup from '../../Global/CustomModalPopup'

import OrderForm from './OrderForm'
import axios from 'axios'
import Repository from '../../services/Repository'
import Conn from '../../services/Conn'
import { useSignIn } from 'react-auth-kit'




import primus from '../../images/products/primus.png'
import mutsig from '../../images/products/mutsig.png'
import amstel from '../../images/products/amstel.png'

import fiesta from '../../images/products/fiesta.png'
import coke from '../../images/products/coke.png'
import fantaorange from '../../images/products/fantaorange.png'
import StockRepository from '../../services/StockServices/StockRepository'
function Products() {

  const [modalShow, setModalShow] = useState(false);
  const [itemss, setItemss] = useState([]) //Data List in combo box
  const [modalTitle, setModalTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([])
  const [autoRefresh, setAutoRefresh] = useState(false);


  const [userName, setUsername] = useState()
  const [password, setPassword] = useState()

  const signIn = useSignIn()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nextset, setNextset] = useState(50) // number of record
  const [userType, setUserType] = useState()

  const [pageLoaded, setPageLoaded] = useState(false);
  const [hwmovements, setHwmovement] = useState([]) //Data List that comes initially

  const [startPoint, setStartPoint] = useState(0)
  const [item_categorys, setItem_categorys] = useState([])
  const OrderEvent = (id, name) => {
    // alert(id + ' , ' + name)
    setModalShow(true)
    setModalTitle("Order " + name)

  }


  const getAllHw_movements = () => {
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    StockRepository.findHw_movement(SearchByDateOnly).then((res) => {
      setHwmovement(res.data);
      //   setDataLoad(true)
    });
  }
  const getAllItemss = (startPoint, nextset) => {
    StockRepository.findItems(startPoint, nextset).then((res) => {
      console.log(res)
      setItemss(res.data.itemss);
      // setDataLoad(true)
    });
  }
  const getAllItem_categorys = () => {
    StockRepository.findItem_category().then((res) => {
      setItem_categorys(res.data.data);
      // setDataLoad(true)
    });
  }
  useEffect(() => {
    // automatically login

    setContent(<OrderForm />)
    // getAllHw_movements()
    // getAllItemss(startPoint, nextset)
    getAllItem_categorys()

    /* #endregion */
    /* #region ---------getting the products with their images from backend ----------- */

    setImages([
      { "id": 1, name: "Fant Orange", img: fantaorange },
      { "id": 2, "name": "Mutsig", "img": mutsig },
      { "id": 3, "name": "Fiesta", "img": fiesta },
      { "id": 4, "name": "Coke", "img": coke },
      { "id": 5, "name": "Primus", "img": primus },
      { "id": 6, "name": "Amstel", "img": amstel }


    ])
    // setUserType(localStorage.getItem('catname'))
    // setPageLoaded(true)
    /* #endregion */

  }, [])
  return (
    <>

      <CustomModalPopup
        title={modalTitle}
        content={content}
        show={modalShow}
        onHide={() => setModalShow(false)} />

      {item_categorys.map((product) => (
        <Col key={product.id} md={3} sm={12} xs={12} className='padd'>

          {/* Items categories */}
          <ProductCard key={product.id}
            prodName={product.name}
            prodDesc={product.description}
            img={product.img}
            orderEvent={() => OrderEvent(product.id, product.name)}
          />
        </Col>
      ))}

    </>
  )
}

export default Products