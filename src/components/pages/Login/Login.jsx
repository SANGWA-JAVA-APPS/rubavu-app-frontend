import React, { useContext, useEffect, useState } from 'react'
import { Alert, Col, Container, Form, Row } from 'react-bootstrap'

import Repository from '../../services/Repository';
import Conn from '../../services/Conn';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { ic_facebook } from 'react-icons-kit/md/ic_facebook'
import { motion } from "framer-motion";
import StockRepository from '../../services/StockServices/StockRepository';
import { BrandContext } from '../../Global/BrandContext';
import StockConn from '../../services/StockServices/StockConn';

import loginbg from '../../images/login/loginbg.jpg'
import { Fade } from 'react-reveal';
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc';

function Login() {

  const [userName, setUsername] = useState()
  const [password, setPassword] = useState()
  const [loginStatus, setLoginStatus] = useState(false)
  const [loginClick, setLoginClick] = useState(false)
  const signIn = useSignIn()
  const navigate = useNavigate()

  const { brandName } = useContext(BrandContext);  // Access item1 and its setter
  useEffect(() => {
    document.body.style.backgroundColor = '#fff'

    if (StockConn.server.name === '//hahandiinn.codeguru-pro.com:') {
      document.body.classList.remove('loginBgEbeulah')
      document.body.classList.add('loginBg')
    } else {
      document.body.classList.remove('loginBg')
      document.body.classList.add('loginBgEbeulah')

    }
  })

  const loginHandler = (e) => {
    e.preventDefault()
    const AuthRequest = {
      userName: userName,
      password: password
    }

    try {
      const response = StockRepository.Login(AuthRequest).then((res) => {
        console.log('Login status below')
        setLoginClick(true)
        if (res.data.stat !== 'fail') {
          console.log('---------------------user ---------------------')
          console.log(res.data.token)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userid', res.data.userDetails.id)
          localStorage.setItem('catname', res.data.userDetails.catname)
          // localStorage.setItem('userid', res.data.userDetails.id)
          localStorage.setItem('catname', res.data.userDetails.catname)
          localStorage.setItem('name', res.data.userDetails.name)
          localStorage.setItem('surname', res.data.userDetails.surname)

          setLoginStatus(true)
          signIn({
            token: res.data,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: { username: AuthRequest.userName }
          })
          const token = localStorage.getItem('token');
          if (token) {
            window.location.replace('/dashboard')
          }
        } else {
          setLoginStatus(false)

        }
      })
    } catch (err) {
      setLoginStatus(false)

    }

  }


  const loginNg = {
    // background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', 
    background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 25%, #d05b11 100%)',
    borderRadius: '1rem', maxWidth: '400px',
    boxShadow: '0px 0px 5px #000',
    border: '1px solid #fff'
  }
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Container fluid>
        
        <Row className='d-flex   justify-content-around  ' >
          <Col md={12} className='p-3'> </Col>
          <Col md={4} className="">
            <Fade duration={2000}>
              <div className="imgrounded d-none d-sm-none d-md-block  ">

              </div>
            </Fade>
          </Col>

          <Col md={5} className="pt-3 col-sm-10 ps-5 pt-5" style={{borderLeft:'1px solid orange'}}>
            <TitleSmallDesc title="Login" />
            <Row>
              <Col md={8} style={{ width: '30rem' }}>
                {!loginStatus && loginClick &&
                  <Alert variant='danger'>
                    Login Failed
                  </Alert>
                }
              </Col>
            </Row>
            <Form >
              <Form.Label htmlFor="username">Username</Form.Label>

              <Form.Control
                type="text" className='p-2' aria-describedby="passwordHelpBlock" onChange={(e) => setUsername(e.target.value)} id='username' />

              <Form.Label htmlFor="passsword" className='mt-3'>Password</Form.Label>
              <Form.Control className='p-2 '
                aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)} id='passsword' type={showPassword ? 'text' : 'password'} />
            </Form>
            <Row className='d-flex justify-content-center'>
              <Col className='col-12'>
                <Row >
                  <Col className="col-1"><input id='chkPswd' type="checkbox" checked={showPassword}
                    onChange={togglePasswordVisibility} /> </Col>
                  <Col className="col-4"> <label for="chkPswd" className='cursor-pointer'> Show Password </label></Col>
                </Row>
              </Col>
              <Col md={12} className='  d-flex justify-content-end pt-5'>
                <button type="submit" className="btn btn-primary  align-self-right" onClick={loginHandler} style={{ color: 'white' }}  >Login</button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

    </>
  );
}
export default Login

export const Bouncing = () => {
  const bounceTransition = {
    duration: 0.6,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop",
  };

  return <motion.div
    className="bouncing-ball" // Apply the class
    animate={{
      y: [0, -100, 0], // Keyframes for bouncing
    }}
    transition={bounceTransition} // Use the transition object
  >
    has to ounce
  </motion.div>
}