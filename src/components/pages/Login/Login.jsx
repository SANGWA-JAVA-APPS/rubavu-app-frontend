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
import { InputLabel } from '@mui/material';
import InputRow from '../../Global/InputRow';
import { InputOnly } from '../../Global/Forms/InputRow';
import { ButtonContext } from '../../globalcomponents/ButtonContext';

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
  const loginHandler = async (e) => {
    e.preventDefault();
    console.log('Login button clicked!'); // Debug log
    
    const AuthRequest = {
      userName: userName,
      password: password
    };
    console.log('Auth request:', AuthRequest); // Debug log

    try {
      console.log('Making login request...'); // Debug log
      const res = await StockRepository.Login(AuthRequest); // Use await for cleaner async handling
      setLoginClick(true);

     //-  ------------------LEFT CODE
      if (res && res.data) {
        console.log('Login response received:', res.data);
        if (res.data.stat === 'OK') {
          // Validate that required data is present
          console.log('Logni has been successful')
          if (res.data.token && res.data.userDetails && res.data.userDetailsAndProfile) {
            console.log('Login successful, token:', res.data.token);

          //   // Store additional user details if needed, but avoid duplicating token
            localStorage.setItem('userid', res.data.userDetails.id);
            localStorage.setItem('catname', res.data.userDetails.accountCategory);
            localStorage.setItem('name', res.data.userDetailsAndProfile.name);
            localStorage.setItem('surname', res.data.userDetailsAndProfile.surname);
            localStorage.setItem('token', res.data.token);

          //   // Use useSignIn correctly
            const signInSuccess = signIn({
              token: res.data.token, // Just the token string
              expiresIn: 3600,       // 60 minutes
              tokenType: "Bearer",
              authState: {
                userid: res.data.userDetails.id,
                username: res.data.userDetails.username,
                roles: res.data.userDetails.roles,
                accountCategory: res.data.userDetails.accountCategory
              }
            });

            if (signInSuccess) {
              setLoginStatus(true);
              console.log('Authentication successful, redirecting to dashboard...');
              navigate('/dashboard'); // Use navigate instead of window.location
            } else {
              setLoginStatus(false);
              console.error('React-auth-kit sign-in failed');
            }
          } else {
            setLoginStatus(false);
            console.error('Login response missing required data:', {
              hasToken: !!res.data.token,
              hasUserDetails: !!res.data.userDetails,
              hasUserProfile: !!res.data.userDetailsAndProfile
            });
          }
        } else if (res.data.stat === 'fail') {
          setLoginStatus(false);
          console.error('Login failed: Invalid credentials');
        } else {
          setLoginStatus(false);
          console.error('Login failed: Unknown status -', res.data.stat);
        }
      }
    } catch (err) {
      setLoginStatus(false);
      console.error('Login error:', err.response?.data || err.message || err);
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

  const { handleChange } = useContext(ButtonContext)

  const inputs = [
    { id: 700, arrivalNote: " 700", quantity: "300 jerycans", newquantity: "200" },
    { id: 701, arrivalNote: " 701", quantity: "300 jerycans", newquantity: "200" },
  ];
  const [plate_number, setPlate_number] = useState('')
  const handleInvoiceClick = (arrivalNote, quantity) => {
    console.log("Arrival Note:", arrivalNote, "Quantity:", quantity);
  };
  const handleEditableChange = (id, value, qty) => {
    const updatedData = inputs.map(item =>
      item.id === id ? { ...item, editableValue: value } : item
    );
    alert(qty)
    // Note: This is a simple in-memory update. For a real app, use state management.
  };

  return (
    <>
      <Container fluid className="">
        <Row className='d-flex   justify-content-around  ' >
          <Col md={12} className='p-3'> </Col>
          <Col md={4} className="">
            <Fade duration={2000}>
              <div className="imgrounded d-none d-sm-none d-md-block  ">

              </div>
            </Fade>
          </Col>

          <Col md={5} className="pt-3 col-sm-10 ps-5 pt-5" style={{ borderLeft: '1px solid orange' }}>
            <TitleSmallDesc title="Login" />
            <Row>
              <Col md={8} style={{ width: '30rem' }}>
                {loginClick && !loginStatus && (
                  <Alert variant='danger'>
                    Login Failed
                  </Alert>
                )}
                {loginClick && loginStatus && (
                  <Alert variant='success'>
                    Login Successful!
                  </Alert>
                )}
              </Col>
            </Row>
            <Form onSubmit={loginHandler}>
              <Form.Label htmlFor="username">Username</Form.Label>

              <Form.Control
                type="text" className='p-2' aria-describedby="passwordHelpBlock" onChange={(e) => setUsername(e.target.value)} id='username' />

              <Form.Label htmlFor="passsword" className='mt-3'>Password</Form.Label>
              <Form.Control className='p-2 '
                aria-describedby="passwordHelpBlock" onChange={(e) => setPassword(e.target.value)} id='passsword' type={showPassword ? 'text' : 'password'} />
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
            </Form>
          </Col>
          <Col md={12} style={{position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center', padding: '16px',fontFamily:'century gothic', fontSize:'13px', color: '#596175' }}>
                Port Management System. V.1.0, Designed and Maintained by <a target="_blank" href="#" style={{color: '#596175'}}>CODEGURU Ltd</a>
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