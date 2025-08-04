import React, { useState, useRef, useEffect, useContext } from "react";
import PagesWapper from "../Global/PagesWapper";
import { useReactToPrint } from "react-to-print";
import AnimateHeight from "react-animate-height";
import { useAuthHeader } from "react-auth-kit";
import TableHead from "../Global/TableHead";
import SearchBox from "../Global/SearchBox";
import { DropDownInput, InputRow } from "../Global/Forms/InputRow";
import {
  ClearBtnSaveStatus,
  ContainerRowBtwn,
  FormInnerRightPane,
  SaveUpdateBtns
} from "../Global/ContainerRow";
import ListToolBar, { SearchformAnimation } from "../Global/ListToolBar";
import PrintCompanyInfo from "../Global/PrintCompanyInfo";
import { ColItemContext } from "../Global/GlobalDataContentx";
import StockCommons from "../services/StockServices/StockCommons";
import Loader from "../Global/Loader";
import { TableOpen } from "../Global/ListTable";
import StockRepository from "../services/StockServices/StockRepository";

export const ClientReg = () => {
  // Form states
  const [tin_number, setTin_number] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [telephone, setTelephone] = useState("");
  // UI states
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [clearBtn, setClearBtn] = useState(false);
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // List & context
  const [clients, setClients] = useState([]);
  const [limit] = useState(20); // Change from 5 to 20
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoad, setDataLoad] = useState(false);
  const { userMenuType } = useContext(ColItemContext);

  const authHeader = useAuthHeader()();
  const componentRef = useRef();

  // Fetch clients
  const fetchClients = (currentPage = 0) => {
    setShowLoader(true);
    StockRepository.findClient(limit, currentPage, authHeader)
      .then((res) => {
        const data = res.data;
        setClients(data.content || []);
        setTotalPages(data.totalPages || 1);
        setDataLoad(true);
      })
      .catch(() => setError("Failed to load clients."))
      .finally(() => setShowLoader(false));
  };

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line
  }, []);

  // Registration submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setShowLoader(true);
    setError("");
    setSuccess(false);

    if (!tin_number || !name) {
      setError("TIN Number and Name are required.");
      setShowLoader(false);
      return;
    }

    const clientDTO = { tin_number, name, surname, gender, telephone };
    StockCommons.saveClient(clientDTO, authHeader)
      .then((res) => {
        if (res && res.status === 409) {
          setError("Client with this TIN already exists.");
        } else {
          setSuccess(true);
          fetchClients(0);
          resetAfterSave();
        }
      })
      .catch(() => setError("Registration failed."))
      .finally(() => setShowLoader(false));
  };

  // Helpers
  const resetAfterSave = () => {
    setTin_number("");
    setName("");
    setSurname("");
    setGender("");
    setTelephone("");
    setClearBtn(false);
    setShowAlert(true);
    setHeight(0);
  };

  function showheight(type) {
    setHeight(type);
  }

  // Printing
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "clients-data"
  });

  // Pagination
  const goToPage = (p) => {
    setPage(p);
    fetchClients(p);
  };

  // Pagination logic
  const maxButtons = 10;
  const startPage = Math.floor(page / maxButtons) * maxButtons;
  const endPage = Math.min(startPage + maxButtons, totalPages);

  // Pagination rendering function
  function renderPagination() {
    return (
      <div style={{ marginTop: 16 }}>
        <button
          disabled={page === 0}
          onClick={() => goToPage(page - 1)}
          style={{ margin: "0 2px" }}
        >
          Prev
        </button>
        {Array.from({ length: endPage - startPage }).map((_, i) => {
          const pageNum = startPage + i;
          return (
            <button className="btn btn-primary p-1 border-0" style={{fontSize:'12px'}}
              key={pageNum}
              disabled={pageNum === page}
              onClick={() => goToPage(pageNum)}
              style={{ margin: "0 2px" }}
            >
              {pageNum + 1}
            </button>
          );
        })}
        <button
          disabled={page === totalPages - 1 || totalPages === 0}
          onClick={() => goToPage(page + 1)} 
          style={{ margin: "0 2px" }}
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <PagesWapper>
      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form={userMenuType} showLoader={showLoader}>
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <InputRow
              name="Tin Number"
              val={tin_number}
              handle={(e) => setTin_number(e.target.value)}
              label="tin_number"
            />
            <InputRow
              name="Name"
              val={name}
              handle={(e) => setName(e.target.value)}
              label="name"
            />
            <InputRow
              name="Surname"
              val={surname}
              handle={(e) => setSurname(e.target.value)}
              label="surname"
            />
            <InputRow
              name="Gender"
              val={gender}
              handle={(e) => setGender(e.target.value)}
              label="gender"
            />
            <InputRow
              name="Telephone"
              val={telephone}
              handle={(e) => setTelephone(e.target.value)}
              label="telephone"
            />
            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={resetAfterSave} saveOrUpdate="Register" />
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>Registration successful!</div>}
          </FormInnerRightPane>
        </ContainerRowBtwn>
      </AnimateHeight>

      <div>
        <ListToolBar
          listTitle="Clients"
          role="addclient"
          height={height}
          entity={userMenuType}
          changeFormHeightClick={() => setHeight(height === 0 ? "auto" : 0)}
          changeSearchheight={() => setSearchHeight(searchHeight === 0 ? "auto" : 0)}
          handlePrint={handlePrint}
          searchHeight={searchHeight}
        >
          {/* Add toolbar buttons here if needed */}
        </ListToolBar>
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox />
        </SearchformAnimation>
        <h3>All Clients</h3>
        <div ref={componentRef} className="dataTableBox">
          <PrintCompanyInfo />
          {showLoader ? (
            <Loader />
          ) : (
            <TableOpen>
              <TableHead>
                <td>TIN</td>
                <td>Name</td>
                
                <td>Gender</td>
                <td>Telephone</td>
              </TableHead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.tin_number}</td>
                    <td>{client.name}</td>
                    
                    <td>{client.gender}</td>
                    <td>{client.telephone}</td>
                  </tr>
                ))}
              </tbody>
            </TableOpen>
          )}
          {renderPagination()}
        </div>
      </div>
    </PagesWapper>
  );
};
