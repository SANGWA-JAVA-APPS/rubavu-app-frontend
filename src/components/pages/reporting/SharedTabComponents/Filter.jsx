import React, { useState } from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";

const ReportFilter = ({ onFilter }) => {
  const [recordType, setRecordType] = useState("individual");
  const [goods, setGoods] = useState("");
  const [period, setPeriod] = useState("daily");
  const [tonnageOperator, setTonnageOperator] = useState("=");
  const [tonnage, setTonnage] = useState("");

  const handleFilter = () => {
    onFilter({
      recordType,
      goods: recordType === "individual" ? goods : null,
      period: recordType === "group" ? period : null,
      tonnageOperator,
      tonnage,
    });
  };

  return (
    <Form className="p-3 border rounded bg-light mb-3">
      <Row className="align-items-center g-2">
        {/* Record Type */}
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text style={{ backgroundColor: "#e4e8eb" }} className="">
              Record Type
            </InputGroup.Text>
            <Form.Select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
            >
              <option value="individual">Filter Individual Record</option>
              <option value="group">Goods Type Aggregate</option>
            </Form.Select>
          </InputGroup>
        </Col>

        {/* Goods or Period */}
        <Col md={4}>
          {recordType === "individual" ? (
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: "#e4e8eb" }} className="">
                Goods
              </InputGroup.Text>
              <Form.Control
              style={{ boxShadow: "none", outline: "none" }}
                type="text"
                placeholder="Enter goods..."
                value={goods}
                onChange={(e) => setGoods(e.target.value)}
              />
            </InputGroup>
          ) : (
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: "#e4e8eb" }} className="">
                Period
              </InputGroup.Text>
              <Form.Select
              style={{ boxShadow: "none", outline: "none" }}
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </InputGroup>
          )}
        </Col>

        {/* Tonnage Operator */}
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text style={{ backgroundColor: "#e4e8eb" }} className="">
              Tonnage (tons)
            </InputGroup.Text>
            <Form.Select
              value={tonnageOperator}
              onChange={(e) => setTonnageOperator(e.target.value)}
              style={{ maxWidth: "80px",boxShadow: "none", outline: "none" }}
            
            >
              <option value="=">=</option>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
            </Form.Select>
            <Form.Control
              type="number"
              placeholder="Enter tonnage..."
              value={tonnage}
              onChange={(e) => setTonnage(e.target.value)}
            />
          </InputGroup>
        </Col>

        {/* Apply Button */}
        <Col md={3}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleFilter}
          >
            Apply Filter
          </button>
        </Col>
      </Row>
    </Form>
  );
};

export default ReportFilter;
