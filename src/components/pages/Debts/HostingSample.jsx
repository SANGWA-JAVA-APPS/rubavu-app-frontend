import React from 'react'
import { Card, Badge, Button } from 'react-bootstrap'
import './HostingSample.css'

function HostingSample() {
  return (
    <div className="hosting-container">
      <Card className="hosting-card shadow-lg">
        <Card.Header className="hosting-header text-center">
          <h4 className="mb-0 text-white">Web Hosting Plans</h4>
        </Card.Header>
        
        <Card.Body className="p-4">
          {/* Plan Title */}
          <div className="text-center mb-4">
            <h3 className="plan-title text-primary mb-2">Starter Linux Hosting</h3>
            <Badge bg="success" className="plan-badge">Most Popular</Badge>
          </div>

          {/* Price Display */}
          <div className="price-section text-center mb-4">
            <div className="main-price">
              <span className="currency">$</span>
              <span className="amount">55.00</span>
              <span className="period">USD</span>
            </div>
            <p className="billing-cycle text-muted">Billed Annually</p>
          </div>

          {/* Features List */}
          <div className="features-section mb-4">
            <div className="feature-item d-flex justify-content-between align-items-center mb-3">
              <div className="feature-info">
                <strong>Starter Linux Hosting</strong>
                <small className="text-muted d-block">Core hosting package</small>
              </div>
              <span className="feature-price text-success">$55.00 USD</span>
            </div>

            <div className="feature-item d-flex justify-content-between align-items-center mb-3">
              <div className="feature-info">
                <span>» Dedicated IP Address</span>
                <small className="text-muted d-block">None included</small>
              </div>
              <span className="feature-price text-muted">$0.00 USD</span>
            </div>

            <div className="feature-item d-flex justify-content-between align-items-center mb-3">
              <div className="feature-info">
                <span>» Advanced Email Deliverability</span>
                <small className="text-muted d-block">None included</small>
              </div>
              <span className="feature-price text-muted">$0.00 USD</span>
            </div>

            <hr className="my-3" />

            <div className="feature-item d-flex justify-content-between align-items-center mb-3">
              <strong>Setup Fees:</strong>
              <span className="feature-price text-success">$0.00 USD</span>
            </div>
          </div>

          {/* Total Section */}
          <div className="total-section">
            <hr className="mb-3" />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <strong className="fs-5">Annually:</strong>
              <strong className="fs-5 text-primary">$55.00 USD</strong>
            </div>
            
            <div className="final-total text-center p-3 bg-light rounded">
              <h4 className="mb-0 text-success">
                <strong>Total: $55.00 USD</strong>
              </h4>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-4">
            <Button variant="primary" size="lg" className="px-5 py-2">
              Get Started Now
            </Button>
            <p className="small text-muted mt-2 mb-0">
              30-day money-back guarantee
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default HostingSample