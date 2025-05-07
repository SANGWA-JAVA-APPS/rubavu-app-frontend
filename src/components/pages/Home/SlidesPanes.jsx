import React from 'react'
import { motion } from 'framer-motion'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function SlidesPanes() {
  const staggerVariants = {
    hidden: {
      opacity: 0, x: '-100vw',
    },
    visible: {
      opacity: 1, x: 0, transition: {
        staggerChildren: 7, // Stagger the children by 0.5 seconds         
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, x: '-100vw', },
    visible: {
      opacity: 1, x: 0,
      transition: {
        duration: 2, // Duration for the slide-in animation
        repeat: Infinity, // Repeat infinitely
        repeatType: 'reverse', // Reverse the animation when it repeats (slide back and forth)
        repeatDelay: 10, // Add a delay before repeating the animation
      },
    },
    fadeOut: {
      opacity: 0, // Fade out effect
      x: '-100vw', // Slide out to the left
      transition: {
        duration: 2, // Duration for fade-out and slide-out animation
      },
    },
  };

  return (
    <>
      <Container>
        <Row className='d-flex justify-content-center'>
          <Col md={8}>

            <motion.div
              initial="hidden" animate="visible" variants={staggerVariants}
              style={{
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
              <motion.div
                variants={childVariants}
                className='slidepane padd' >
                <h3>  Ship abroad with ease using our reliable and cost-effective port services.</h3>
              </motion.div>
              <motion.div
                variants={childVariants}
                 className='slidepane padd'  >
                <h3> Our modern port ensures timely and secure delivery of your cargo</h3>
              </motion.div>
              <motion.div
                variants={childVariants}
                className='slidepane padd'
                
              >
                <h3>  Enjoy smooth customs and competitive rates for your shipments. </h3>
              </motion.div>
            </motion.div>
          
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default SlidesPanes