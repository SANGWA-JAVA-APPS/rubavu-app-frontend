import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BeerColsTitleDesc from './BeerColsTitleDesc'
import MostSoldBeer, { Overstayed } from './MostSoldBeer'
import StockRepository from '../../services/StockServices/StockRepository'
import { RandomItemContext, RandomItemsDescriptionProvider } from './RandomItemsDescriptionProvider'


function Beer() {

  const [itemss, setItemss] = useState([]) //Data List
  const [item_categorys, setItem_categorys] = useState([]) //Data List
  const [itemsCategoryId, setItemsCategoryId] = useState() //this is the item category
  const [startPoint, setStartPoint] = useState(0)
  const [nextset, setNextset] = useState(50) // number of record

  const [items, setItems] = useState(['Apple', 'Banana', 'Orange', 'Grapes', 'Mango']);

  const [selectedItem, setSelectedItem] = useState(null);




  const getAllItemss = (startPoint, nextset) => {
    StockRepository.findItems(startPoint, nextset, authHeader).then((res) => {
      console.log(res)
      setItemss(res.data.itemss);

      // setDataLoad(true)
    });
  }
  const getAllItem_categorys = (page, size) => {
    StockRepository.findItem_category(page, size, authHeader).then((res) => {
      setItem_categorys(res.data.data);
      // setDataLoad(true)
    });
  }
  useEffect(() => {
    // getAllItemss(startPoint, nextset)
    getAllItem_categorys(0, 2)
  }, [])
  return (
    <Container fluid className='p-2' style={{ backgroundColor: '#b6dde4 ' }}>

      {item_categorys.map((res) => {
        const randomItem = RandomItemsDescriptionProvider(); // Get a random item for each iteration

        return (
          <MostSoldBeer mdl_items={res.items} key={res.id} Title={randomItem} SmallTitle={res.item_name} />

        )
      })

      }


      {/* <Overstayed Title="OverStayed" SmallTitle="Non-Alcoolic" /> */}






    </Container>

  )
}

export default Beer