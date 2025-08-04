import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Icon } from 'react-icons-kit';
import { printer } from 'react-icons-kit/icomoon/printer';
import PagesWapper from '../../Global/PagesWapper';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import AnimateHeight from 'react-animate-height';
import StockCommons from '../../services/StockServices/StockCommons';
import Utils, { usertoEditprint } from '../../Global/Utils';
import { ClearBtnSaveStatus, ContainerRowBtwn, FormInnerRightPane, SaveUpdateBtns } from '../../Global/ContainerRow';
import InputRow from '../../Global/Forms/InputRow';
import ListToolBar from '../../Global/ListToolBar';
import TableHead from '../../Global/TableHead';
import ListOptioncol, { TableOpen } from '../../Global/ListTable';
import StockRepository from '../../services/StockServices/StockRepository';
import { Tabs, Tab, Card } from 'react-bootstrap';
import TabComponent from './TabComponent';
import { ORevenues } from './ORevenues';

import {Row, Col} from 'react-bootstrap'

export const OtherRevenues = ( ) => {
    const authHeader = useAuthHeader()();
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [clearBtn, setClearBtn] = useState(false);
    const [height, setHeight] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [editingRowId, setEditingRowId] = useState(null);
    const [editFields, setEditFields] = useState({ name: '' });
const [userType, setUserType] = useState()
    useEffect(() => {
        StockRepository.getAllOtherRevCategories(authHeader).then((res) => {
            setCategories(res.data.filter(cat => !cat.is_deleted));
        });
        setUserType(localStorage.getItem('catname'))
    }, [refresh]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setShowLoader(true);
        const data = { name };
        const action = id
            ? StockCommons.updateOtherRevCategory(data, id, authHeader)
            : StockCommons.saveOtherRevCategory(data, authHeader);

        action.then(() => {
            resetForm();
        }).catch(() => alert("Error occurred")).finally(() => setShowLoader(false));
    };

    const resetForm = () => {
        document.getElementById("Form").reset();
        setName('');
        setId(null);
        setClearBtn(false);
        setRefresh(!refresh);
        setShowAlert(true);
        setHeight(0);
    };

    const editCategory = (cat) => {
        setId(cat.id);
        setName(cat.name);
        setClearBtn(true);
        setHeight('auto');
    };

    const delCategory = (id) => {
        Utils.Submit(() => {
            StockCommons.deleteOtherRevCategory(id, authHeader).then(() => setRefresh(!refresh));
        });
    };

    return (
        <PagesWapper>
           <Row className="d-flex justify-content-center">
                <Col md={11}>


    

        <TabComponent content1={
            <>
            <AnimateHeight duration={300} animateOpacity height={height}>
                <ContainerRowBtwn clearBtn={clearBtn} form={'Other Revenue Category'} showLoader={showLoader}>
                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                    <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
                        <InputRow name='Category Name' val={name} handle={(e) => setName(e.target.value)} />
                        <SaveUpdateBtns clearBtn={clearBtn} clearHandle={resetForm} saveOrUpdate={id ? 'Update' : 'Save'} />
                    </FormInnerRightPane>
                </ContainerRowBtwn>
            </AnimateHeight>

            <div className='mt-3'>
                <ListToolBar listTitle='Other Revenue Categories' role='addotherrevenue' height={height} entity='Category' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} />
             
                 <div className="dataTableBox">
                    <TableOpen>
                        <TableHead>
                            <td>ID</td>
                            <td>Name</td>
                            {usertoEditprint(userType) &&
                            <td>Option</td>}
                        </TableHead>
                        <tbody>
                            {Array.isArray (categories) && categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td>{cat.id}</td>
                                   <td>
                                        {                                            cat.name                                        }
                                    </td>
                                    {/*  <td>
                                        <button className="btn btn-success btn-sm me-2" onClick={() => editCategory(cat)}><FaPencilAlt /></button>
                                        <button className="btn btn-danger btn-sm" onClick={() => delCategory(cat.id)}><FaTrash /></button>
                                    </td> */}
                                      {usertoEditprint(userType) && <ListOptioncol print={true}
                                                editRole="updateotherrevenue" deleteRole="deleteotherrevenue"
                                                                            printData={() => printData(berthpayment)} getEntityById={() => getBerthpaymentById(berthpayment.id)} delEntityById={() => delBerthpaymentById(berthpayment.id)} />}
                                </tr>
                            ))}
                        </tbody>
                    </TableOpen>
                </div>
               
               
            </div></>
        } content2={
                <ORevenues/>

        }/>


 </Col>
               </Row>







        </PagesWapper>
    );
}


