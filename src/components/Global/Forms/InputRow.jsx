import React from 'react'
import OtherStyles from '../../Styles/OtherStyles'
import { search } from 'react-icons-kit/icomoon/search'
import { Icon } from 'react-icons-kit'
import DatePicker from "react-datepicker";
import { FloatingLabel, Form } from 'react-bootstrap';


export const DropDownInputNoLabel = (props) => {
    return (<>
     
            <select required value={props.val} style={OtherStyles.txt()} onChange={props.handle} className="form-select" id={props.label} >
                <option value=""></option>
                {props.children}
            </select>
    </>)
}
export const InputOnly = (props) => {
    return (
        <>
                <FloatingLabel   label={props.name}>
                    <Form.Control type={props.num ? 'number' : 'text'} autoComplete='false' required
                        value={props.val} 
                        placeholder={props.placeholder}
                        onChange={props.handle} onFocus={props.handleFocus} onBlur={props.handleBlur}
                        className={`form-control  w-75 ${props.moreclass} `}
                        min={props.num ? 1 : undefined}  />
                    {props.additionalelement}
                </FloatingLabel>


        </>
    )
}
export const InputOnlyReadOnly = (props) => {
    return (
        <>
            <input type="text" readonly autoComplete='false' style={OtherStyles.txt()}
                value={props.val} placeholder={props.placeholder}
                onChange={props.handle} disabled className={`form-control w-50  ${props.moreclass} `}
                id={props.label} />
            {props.additionalelement}
        </>
    )
}
export const InputOnlyEditable = (props) => {
    return (
        <> 
         
            <input type="text"  autoComplete='false' style={OtherStyles.txt()} value={props.val} placeholder={props.placeholder}
                onChange={props.handle}   className={`form-control   ${props.moreclass} `} id={props.label} />
            {props.additionalelement}
       
        </>
    )
}
export const InputReadOnly = (props) => {
    return (
        <>  <GenIputRow name={props.name} label={props.label}>
            <input type="text" readonly autoComplete='false' style={OtherStyles.txt()}
                value={props.val} placeholder={props.placeholder}
                onChange={props.handle} disabled className={`form-control   ${props.moreclass} `}
                id={props.label} />
            {props.additionalelement}
        </GenIputRow>
        </>
    )
}
export const FileInputRow = (props) => {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="file" multiple name={props.name}
                    onChange={props.handle} id={props.label} />
                {props.additionalelement}
            </GenIputRow>
        </>
    )
}
function InputRow(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label} moreclass={props.moreclass}>
                <input type={props.num ? "number" : "text"} autoComplete='off' required style={OtherStyles.txt()}
                    value={props.val} onChange={props.handle} className={`form-control `}
                    id={props.label} placeholder={props.placeholder} />
                {props.additionalelement}
            </GenIputRow>
        </>
    )
}

export const  TimeInputRow=(props)=> {
    return (
        <>
            {/* <GenIputRow name={props.name} label={props.label} moreclass={props.moreclass}> */}
                <input type='time' autoComplete='off' required style={OtherStyles.txt()}
                    value={props.val} onChange={props.handle} className={`form-control `}
                    id={props.label} placeholder={props.placeholder} />
                {props.additionalelement}
            {/* </GenIputRow> */}
        </>
    )
}




export const LongTextINputRow = (props) => {
    return <>
        <GenIputRow name={props.name} label={props.label}>
            <textarea style={{ ...OtherStyles.txt(), resize: 'none', minHeight: '100px' }}
                value={props.val} onChange={props.handle} required className="form-control"
                id={props.label} placeholder={props.placeholder}></textarea>

        </GenIputRow>
    </>
}
export const DateInputRow = (props) => {
    const [startDate, date_time] = useState();
    const [endDate, setEndDate] = useState();
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <DatePicker className="form-control" autoComplete="off" selected={props.startDate} title="Pick the Start date"
                    onChange={(date) => setDate_time(date)}
                    monthsShown={2} format='yyyy-MM-dd'
                    showYearDropdown />

                <input type="text" autoComplete='off' required style={OtherStyles.txt()}
                    value={props.val}
                    onChange={props.handle} className="form-control"
                    id={props.label} />
            </GenIputRow>
        </>
    )
}

export const InputRowNumber = (props) => {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="number" autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
                {props.additionalelement}
            </GenIputRow>
        </>
    )
}

export const InputRowDate = (props) => {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <DatePicker id="date" className={`form-control ${props.moreclass}`} style={{ width: '100% !important' }}
                    selected={props.nDate} format='yyyy-MM-dd' title="Pick the date"
                    onChange={props.handle} showYearDropdown />
                {props.additionalelement}
            </GenIputRow>
        </>
    )
}

export const InputRowDateNoLabel = (props) => {
    return (
        <>
            <DatePicker  id="date" className={`form-control   ${props.moreclass}`} style={{ width: '100% !important' }}
                selected={props.nDate} format='yyyy-MM-dd' title="Pick the date" autoComplete="off" required
                onChange={props.handle} showYearDropdown />
            {props.additionalelement}
        </>
    )
}
export function DesabledInputRow(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="text" disabled autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}
export function InputRowPsw(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="password" autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}

export const BtnInputRow = (props) => {
    return (
        <div class="form-group row m-1">
            <button className='btn  col-sm-3 col-form-label' onClick={props.handle} style={{ color: "#000", fontWeight: "bolder", backgroundColor: "#b4c7f2da" }}> {props.name} </button>
            <div class="col-sm-9">
                <span className='p-2 mt-3'>
                    {props.status}
                </span>

            </div>
        </div>
    )
}

export const GenIputRow = (props) => {
    return (
        <div className={`form-group row m-1 ${props.moreclass}`}>
            <label for={props.label} class="col-sm-3 col-form-label">{props.name}</label>
            <div class="col-sm-9 customDatePickerWidth">
                {props.children}

            </div>
        </div>
    )
}
export const InputAndSearch = (props) => {
    return (
        <>
            <GenIputRow name={props.name} label={props.labe}>
                <div className="input-group flex-nowrap">
                    <input type="text" className="form-control" onChange={props.changedContent}
                        onBlur={props.blurhandler} placeholder="Type item name"
                        aria-label="Username" aria-describedby="addon-wrapping" />
                    <span className=" input-group-text" id="addon-wrapping" onClick={props.handle}>
                        <Icon style={{ color: '#230d02', marginRight: "10px" }} icon={search} />
                    </span>
                </div>

            </GenIputRow>
            <div className='row'>
                {props.children}
            </div>
        </>

    )
}

export const DropDownInputWithLoader = (props) => {
    return (<>

        <GenIputRow name={props.name} label={props.label}>
            <select required style={OtherStyles.txt()} onChange={props.handle} className="form-select" id={props.label} >
                <option></option>

                {props.children}
            </select>
        </GenIputRow>
    </>)

}

export const DropDownInput = (props) => {
    return (<>

        <GenIputRow name={props.name} label={props.label} moreclass={props.moreclass}>
            {props.showmoreload &&
                <div className='row'>
                    <div className='unitsLoading' style={{ backgroundColor: '#fff', position: 'relative', overflow: 'hidden', width: '380px', height: '40px' }}>
                    </div>
                </div>}
            <select required style={OtherStyles.txt()}   value={props.val} onChange={props.handle} className="form-select" id={props.label} >
                <option value=""></option>
                {props.children}
            </select>
        </GenIputRow>
    </>)
}

export const LoadSub = (props) => {
    return (
        <>
            {props.showmoreload &&
                <div className='row'>
                    <div className='unitsLoading' style={{ backgroundColor: '#fff', position: 'relative', overflow: 'hidden', width: '380px', height: '40px' }}>
                    </div>
                </div>
            }
        </>
    )
}
export const EmptyInputRow = (props) => {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="text" autoComplete='false' style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />

            </GenIputRow>
        </>
    )
}



export default InputRow