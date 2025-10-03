// components/TabHeader.tsx
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaSyncAlt } from "react-icons/fa";
import ReportFilter from "./Filter";
export default function TabHeader({ onSearch, title }) {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchClick = () => {
    setShowFilters(!showFilters);
    onSearch();
  };

  return (
    <div className="mb-3">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="pb-2"
        >
          <h4 className="font-bold mb-2">{title} Report</h4>
          <div
            style={{ backgroundColor: "#ffa301", height: "5px", width: "20%" }}
          ></div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 mb-1">
        <Button variant="dark">
          <i className="bi bi-printer"></i> Print
        </Button>
        <Button className="mx-2" variant="success" onClick={handleSearchClick}>
          <i className="bi bi-search"></i> Search
        </Button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: "#e4e8eb" }}
            className="p-3  rounded-2"
          >
            <Row
              
              className="mb-2 py-2  rounded-3 align-items-center"
            >
              <Col md={3}>
                <Form.Select>
                  <option>Select Option</option>
                  <option>Option 1</option>
                </Form.Select>
              </Col>

              <Col md={2}>
                <Form.Control placeholder="Value" />
              </Col>

              <Col md={2}>
                <Form.Control placeholder="Filter by goods..." />
              </Col>

              <Col md={2}>
                <Form.Control placeholder="Enter tonnage..." />
              </Col>

              <Col md={3} className="d-flex gap-2">
                <Button variant="success"><i className="bi bi-search"></i> Enter</Button>
                <Button variant="warning"><FaSyncAlt style={{ marginRight: 5 }} /> </Button>
              </Col>
            </Row>
            <ReportFilter onFilter={(filters) => console.log(filters)} />
          </motion.div>

        )}

      </AnimatePresence>
    </div>
  );
}
