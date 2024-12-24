import React, { useState } from 'react'
import { ItemsContainer } from './ItemsContainer'
import { Col } from 'react-bootstrap'

export const FullImage = ({ img }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  return (
    <ItemsContainer full={true}>
      <Col className="p-0 m-0 col-12">
        {!isLoaded && (
          <h5>Loading ...</h5>
        )}
        <img onLoad={handleImageLoad}
          style={{ display: isLoaded ? "block" : "none" }}
          src={img} className='img-fluid' />
      </Col>
    </ItemsContainer>
  )
}
