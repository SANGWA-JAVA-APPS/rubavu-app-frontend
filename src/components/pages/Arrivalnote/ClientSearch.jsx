import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { InputOnlyEditable } from "../../Global/Forms/InputRow";

const ClientSearch = ({ 
  tinNumber, 
  onTinChange, 
  onSearchClick,
  placeholder = "Enter clients TIN number",
  buttonText = "Search",
  disabled = false 
}) => {
  const [searchProgress, setSearchProgress] = useState("");

  const handleSearchClick = async () => {
    if (tinNumber && tinNumber.trim() !== '') {
      setSearchProgress("Searching for client...");
      
      try {
        // Call the parent's search function and wait for result
        if (onSearchClick) {
          const result = await onSearchClick(tinNumber);
          
          if (result && result.success) {
            setSearchProgress("Client found and details loaded");
            setTimeout(() => {
              setSearchProgress("");
            }, 2000); // Clear progress text after 2 seconds
          } else {
            setSearchProgress("The client is not found, please contact the administrator");
            setTimeout(() => {
              setSearchProgress("");
            }, 3000); // Clear progress text after 3 seconds for error message
          }
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchProgress("The client is not found, please contact the administrator");
        setTimeout(() => {
          setSearchProgress("");
        }, 3000);
      }
    } else {
      alert('Please enter a TIN number to search');
    }
  };

  return (
    <>
      <Row>
        <Col className="pe-4 me-1">
          <InputOnlyEditable 
            placeholder={placeholder}
            moreclass="w-100"
            num={true}
            val={tinNumber}
            handle={onTinChange}
            label="tin_number"
            disabled={disabled}
          />
        </Col>
        <Col className="ps-0 ms-0" style={{maxWidth: '120px'}}>
          <button 
            type="button" 
            className="btn btn-dark btn-sm" 
            style={{height: '38px'}}
            onClick={handleSearchClick}
            disabled={disabled}
          >
            {buttonText}
          </button>
        </Col>
      </Row>
      {searchProgress && (
        <Row>
          <Col className="ps-0 ms-0 text-center">
            <small className={`fst-italic  ${
              searchProgress.includes("found and details loaded") ? "text-success" :
              searchProgress.includes("not found") || searchProgress.includes("administrator") ? "text-danger" :
              "text-info"
            }`}>
              {searchProgress}
            </small>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ClientSearch;
