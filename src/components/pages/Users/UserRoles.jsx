import React, { useContext, useEffect, useRef, useState } from 'react'
import PagesWapper from '../../Global/PagesWapper'
import { ColItemContext } from '../../Global/GlobalDataContentx'
import StockCommons from '../../services/StockServices/StockCommons'
import StockRepository from '../../services/StockServices/StockRepository'
import { useReactToPrint } from 'react-to-print'
import { useAuthHeader, useAuthUser } from 'react-auth-kit'
import ContainerRow from '../../Global/ContainerRow'
import { Col } from 'react-bootstrap'
import RoleList from './RoleList'
import RoleForm from './RoleForm'
import AccountCategoryForm from './AccountCategoryForm'
import RoleAndCategoryList from './RoleAndCategoryList'
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc'
import { SmallerSplitter } from '../../globalcomponents/Splitter'

export default function UserRoles() {
    const [id, setId] = useState(null)

    /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
    const [Id_id, setId_id] = useState(null)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState(123)
    const [account_category, setAccount_category] = useState()
    const [profileId, setProfile] = useState()
    // profile
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [gender, setGender] = useState()
    //list of categories
    const [catId, setCatId] = useState([]) //Data List
    const [account_categorys, setAccount_categorys] = useState([]) //Data List
    const [tin_number, setTin_number] = useState([]) //Data List
    /*#endregion Listing data*/

    const [showLoader, setShowLoader] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [accounts, setAccounts] = useState([]) //Data List
    const [accountsAreEnabled, setAccountsAreEnabled] = useState([]) //Data List
    const [accountsAreDisabled, setAccountsAreDisabled] = useState([]) //Data List
    const [clearBtn, setClearBtn] = useState(false) //The cancel button

    const [dataLoad, setDataLoad] = useState(false)
    const [height, setHeight] = useState(0);
    const [searchHeight, setSearchHeight] = useState(0);
    const [userType, setUserType] = useState()
    const [status, setStatus] = useState('enabled')
    const [refresh, setRefresh] = useState(false)

    const reload = () => setRefresh(!refresh); // i got this from chatgpt to speed up the coding

    const { userMenuType } = useContext(ColItemContext)

    const authHeader = useAuthHeader()();
    const [roles, setRoles] = useState([])
    /*#region ---------- SAVING DATA TO DB--------------------------------------*/
    const onSubmitHandler = (e) => {
        e.preventDefault()
        setShowLoader(true)

        var usersDTO = {
            id: id,
            name: name, surname: surname, gender: gender, account_category_id: catId, username: username,
            password: password, tin_number: tin_number
        }
        if (id) {
            let account_category_id = catId
            StockCommons.updateAccount(usersDTO, id, profileId, account_category_id, authHeader).then((res) => {
                resetAfterSave()
            })
        } else {
            StockCommons.saveAccount(usersDTO, authHeader).then((res) => {
                console.log(res.data)
                if (res.data != null) {
                    resetAfterSave()
                }
            }).catch((error) => {
                console.log('-----------')
                alert('Error Occured')
            })
        }
    }
    /*#endregion Listing data*/

    /*#region ------------All Records, Deleting and By Id------------------------*/
    const getAllAccounts = () => {
        if (userMenuType === 'user') {
            StockRepository.findAccountExcludeClient(authHeader).then((res) => {
                setAccounts(res.data);
                setDataLoad(true)
            });
        } else {
            StockRepository.findAccountOfTypeClient(authHeader).then((res) => {
                setAccounts(res.data);
                setDataLoad(true)
            });

        }
    }
    const getAllAccount_categorys = () => {
        StockRepository.findAccount_category(authHeader).then((res) => {
            setAccount_categorys(res.data);
            setDataLoad(true)
        });
    }
    const getAccountsAreEnabled = () => {
        StockRepository.findAccountByStatus('enabled', authHeader).then((res) => {
            setAccountsAreEnabled(res.data);
            setDataLoad(true)
        });
    }
    const getAccountsAreDisenabled = () => {
        StockRepository.findAccountByStatus('disabled', authHeader).then((res) => {
            setAccountsAreDisabled(res.data);
            setDataLoad(true)
        });
    }
    const getAllRoles = () => {
        StockRepository.finduserRoles(authHeader).then((res) => {
            setRoles(res.data);
            setDataLoad(true)
        });
    }
    const { setupBycolor } = useContext(ColItemContext)
    useEffect(() => {
        setupBycolor()
    }, [])
    useEffect(() => {
        getAllAccounts()
        getAllRoles()
        getAllAccount_categorys()
        getAccountsAreEnabled()
        getAccountsAreDisenabled()
        console.log('----------user type-----------')
        console.log(userType)

        //Get Token and catname

        setUserType(localStorage.getItem('catname'))
    }, [refresh, userMenuType]);


    const getAccountById = (id) => {
        StockRepository.findAccountById(id, authHeader).then((res) => {
            setId(res.data.id)
            setName(res.data.mdl_profile.name)
            setSurname(res.data.mdl_profile.surname)
            setGender(res.data.mdl_profile.gender)
            setUsername(res.data.username)
            setPassword(res.data.password)
            setAccount_category(res.data.mdl_account_category.name)
            setCatId(res.data.mdl_account_category.id)

            setProfile(res.data.mdl_profile.id)
            setClearBtn(true)
            showheight('auto')
        })
    }
    const delAccountById = (id) => {
        Utils.Submit(() => StockDelete.deleteAccountByid(id)
            .then(() => {
                setRefresh(!refresh)
            })
            , () => {


            })
    }
    const DisableUserHandler = (id, status) => {
        Utils.Submit(() => {
            const stat = (status === 'Enabled' ? 'Disabled' : 'Enabled')
            //  alert(stat)
            StockRepository.disableUser(stat, id).then(res => {
                getAllAccounts()
                getAllAccounts()
                getAccountsAreEnabled()
                getAccountsAreDisenabled()
            })
        }, () => { })
    }
    const enabledHandler = (id) => {
        Utils.Submit(() => {
            Repository.disableUser('enabled', id).then(res => {
                getAllAccounts()
                getAllAccounts()
                getAccountsAreEnabled()
                getAccountsAreDisenabled()
            })
        }, () => { })
    }

    /*#endregion Listing data*/


    /*#region ---------Show Height, reset all and clear Button   ------------*/
    function showheight(type) {
        setHeight(type)
    }
    const resetAfterSave = () => {
        document.getElementById("Form").reset();
        getAllAccounts()
        setShowLoader(false)
        setShowAlert(true)
        setHeight(0)
        setId(null)
        setUsername("")
        setPassword("")
        setAccount_category("")
        setProfile("")

    }
    const clearHandle = () => {
        setId(null)
        setName("")
        setSurname("")
        setUsername("")
        setPassword("")
        setAccount_category("")
        setProfile("")
        setClearBtn(false)
    }
    /*#endregion Listing data*/


    /*#region Printing */
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data'
    });
    /*#endregion Listing data*/
    const [selectedOptionText, setSelectedOptionText] = useState()
    const selectCateoryHandler = (event, id) => {
        setCatId(event.target.value)
        const selectedOptionText = event.target.options[event.target.selectedIndex].text;
        setSelectedOptionText(selectedOptionText)
    }
    const auth = useAuthUser();
    const user = auth();
      const roless = user?.roles || [];
  const accountCategory = user?.accountCategory || '';



    let usr = ''
    useEffect(() => {
        usr = (userMenuType ?? 'user')
    }, [userMenuType])
    return (
        <PagesWapper>
            <ContainerRow mt='3'>
                <TitleSmallDesc title="User and roles" />

                 {/* <p><strong>Roles:</strong> {roless.join(", ")}</p> */}
                <Col md={4} className="border bg-light me-4 pt-2">
                    <RoleForm onCreated={reload} />
                </Col>
                <Col className="border bg-light me-4 pt-2">

                    <RoleList refreshFlag={refresh} />

                </Col>
                <Col md={4} className="border bg-light me-4 pt-2">
                    <AccountCategoryForm refreshFlag={refresh} />
                </Col>
                <SmallerSplitter />
                <Col md={5} className="border bg-light">
                    <RoleAndCategoryList />
                </Col>
            </ContainerRow>
        </PagesWapper>
    )
}
