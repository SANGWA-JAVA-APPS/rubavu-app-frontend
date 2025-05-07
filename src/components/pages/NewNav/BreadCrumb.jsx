import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const BreadCrumb = () => {
  return (
    <div>Berth/</div>
  )
}

export const PathBreadCrumb = ({prevPath, prevTxt, currentPath, currentTxt, children}) => {
  return (
    <Col md={12} className="ps-1 m-0 border border-danger">
      <Row className="ps-0 m-0">
        <Col className="col-auto ps-1 m-0 ms-5  ">
          <Link to={prevPath}>{prevTxt}</Link>
        </Col>
        <Col className="col-auto p-0 m-0 ms-1 ">
          <Link to={currentPath}>{currentTxt}</Link>
        </Col>
        {children}
      </Row>
    </Col>
  )
}

 
export const PathOpsHome = ({ children }) => {
  return (

    <Col md={12} className="ps-1 m-0 ">
      <Row className="ps-0 m-0 ">
        <Col className="col-auto ps-1 m-0 ms-5 ">
          <Link style={{ color: '#000', fontWeight: 'bolder', fontSize: '14px' }} to="/">Home/</Link></Col>
        <Col className="col-auto p-0 m-0 ms-2  ">
          <Link style={{ color: '#000', fontWeight: 'bolder', fontSize: '14px' }} to="/ops">Ops/</Link>
        </Col>
        {children}
      </Row>
    </Col>
  )
}