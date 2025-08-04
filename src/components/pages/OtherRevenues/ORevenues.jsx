import React, { useState, useEffect, useContext, useRef } from 'react';
import PagesWapper from '../../Global/PagesWapper';
import { useReactToPrint } from 'react-to-print';
import AnimateHeight from 'react-animate-height';
import { useAuthHeader } from 'react-auth-kit';
import PrintCompanyInfo from '../../Global/PrintCompanyInfo';
import { DataListLoading } from '../../Global/Loader';
import TableHead from '../../Global/TableHead';
import SearchBox from '../../Global/SearchBox';
import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwn, FormInnerRightPane, SaveUpdateBtns } from '../../Global/ContainerRow';
import { InputRow, DropDownInput, LongTextINputRow } from '../../Global/Forms/InputRow';
import FormTools from '../../Global/Forms/PubFnx';
import ListToolBar, { SearchformAnimation } from '../../Global/ListToolBar';
import ListOptioncol, { TableOpen } from '../../Global/ListTable';
import Utils, { usertoEditprint } from '../../Global/Utils';
import { ColItemContext } from '../../Global/GlobalDataContentx';
import StockRepository from '../../services/StockServices/StockRepository';
import StockCommons from '../../services/StockServices/StockCommons';
import StockDelete from '../../services/StockServices/StockDelete';
import CurrentDate from '../../Global/CurrentDate';

export const ORevenues = () => {
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [revenues, setRevenues] = useState([]);
    const [categories, setCategories] = useState([]);
    const [clients, setClients] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [clearBtn, setClearBtn] = useState(false);
    const [height, setHeight] = useState(0);
    const [searchHeight, setSearchHeight] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const authHeader = useAuthHeader()();
    const { userType } = useContext(ColItemContext);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setShowLoader(true);
        const otherRevenue = { id, name, amount: parseFloat(amount), description, clientId, categoryId };

        if (id) {
            StockCommons.updateOtherRevenue(otherRevenue, id, authHeader).then(() => resetAfterSave());
        } else {
            StockCommons.saveOtherRevenue(otherRevenue, authHeader).then(() => resetAfterSave())
                .catch(() => alert('Error occurred'));
        }
    };

    const getAllRevenues = () => {
        StockRepository.getAllOtherRevenues(authHeader).then((res) => {
            setRevenues(res.data.filter(item => !item.is_deleted));
        });
    };

    const getAllClients = () => {
        StockRepository.findAccountOfTypeClient(authHeader).then(res => setClients(res.data));
    };

    const getAllCategories = () => {
        StockRepository.getAllOtherRevCategories(authHeader).then(res => setCategories(res.data));
    };

    useEffect(() => {
        getAllRevenues();
        getAllClients();
        getAllCategories();
    }, [refresh]);

    const getRevenueById = (id) => {
        StockRepository.findOtherRevenueById(id, authHeader).then((res) => {
            const rev = res.data;
            setId(rev.id);
            setName(rev.name);
            setAmount(rev.amount);
            setDescription(rev.description);
            setCategoryId(rev.mdl_other_revenue?.id || '');
            setClientId(rev.client?.id || '');
            setClearBtn(true);
            setHeight('auto');
        });
    };

    const delRevenueById = (id) => {
        Utils.Submit(() => {
            StockDelete.deleteOtherRevenueById(id).then(() => setRefresh(!refresh));
        }, () => { });
    };

    const resetAfterSave = () => {
        document.getElementById("Form").reset();
        getAllRevenues();
        setShowLoader(false);
        setShowAlert(true);
        setHeight(0);
        setId(null);
        setName('');
        setAmount('');
        setDescription('');
        setCategoryId('');
        setClientId('');
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({ content: () => componentRef.current });

    return (
        <>
        
            <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
                <ContainerRowBtwn clearBtn={clearBtn} form={'Other Revenue'} showLoader={showLoader}>
                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                    <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
                        <InputRow name='Name' val={name} handle={(e) => setName(e.target.value)} label='Name' />
                        <InputRow name='Amount' val={amount} handle={(e) => setAmount(e.target.value)} label='Amount' num={true} />
                        <DropDownInput name='Category' val={categoryId} handle={(e) => setCategoryId(e.target.value)}>
                            
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </DropDownInput>
                        <DropDownInput name='Client' val={clientId} handle={(e) => setClientId(e.target.value)}>
                            
                            {clients.map(cli => <option title="Ordered by name " key={cli.id} value={cli.id}>{cli.mdl_client.name}  ------------------  {cli.tin_number}  </option>)}
                        </DropDownInput>
                        <LongTextINputRow name='Description' val={description} handle={(e) => setDescription(e.target.value)} label='Description' />
                        <SaveUpdateBtns clearBtn={clearBtn} clearHandle={() => resetAfterSave()} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
                    </FormInnerRightPane>
                </ContainerRowBtwn>
            </AnimateHeight>

            <ContainerRow mt='3'>
                <ListToolBar listTitle='Other Revenues'  role='addotherrevenue' entity='Other Revenue' height={height} changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} />
                <SearchformAnimation searchHeight={searchHeight}><SearchBox /></SearchformAnimation>
                <div ref={componentRef} className="dataTableBox">
                    <PrintCompanyInfo />
                    <TableOpen>
                        <TableHead>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Amount</td>
                            <td>Client</td>
                            
                            <td>Description</td>
                            <td>Option</td>
                        </TableHead>
                        <tbody>
                            {revenues.map(rev => (
                                <tr key={rev.id} style={{height:'40px'}}>
                                    <td style={{ padding:'5px'}}>{rev.id}</td>
                                    <td style={{ padding:'5px'}}>{rev.name}</td>
                                    <td style={{ padding:'5px'}}>{Number(rev.amount).toLocaleString()}</td>
                                    <td style={{padding:'5px'}}>{rev?.client?.mdl_client?.name}</td>
                                    {/* <td>{rev.mdl_other_revenue?.name}</td> */}
                                    <td>{rev.description}</td>
                                    <td>
                                        <ListOptioncol print={false} editRole="updateOtherRevenue"
                                        editRole="updateotherrevenue" deleteRole="deleteotherrevenue"  deleteRole="deleteOtherRevenue" getEntityById={() => getRevenueById(rev.id)} delEntityById={() => delRevenueById(rev.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </TableOpen>
                </div>
            </ContainerRow>
            {!revenues.length && <DataListLoading />}
        </>
    );
}


