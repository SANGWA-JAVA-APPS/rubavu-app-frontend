import React, { useState } from 'react'

import { search } from 'react-icons-kit/icomoon/search'
import { Icon } from 'react-icons-kit'
import OtherStyles from '../Styles/OtherStyles'
import DatePicker from "react-datepicker";
function InputRow(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="text" autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}
export const DateInputRow = (props) => {
    const [startDate, date_time] = useState();
    const [endDate, setEndDate] = useState();
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <DatePicker className="form-control" selected={props.startDate} title="Pick the Start date"
                    onChange={(date) => setDate_time(date)}
                    monthsShown={2} format='yyyy-MM-dd'
                    showYearDropdown />

                <input type="text" autoComplete='false' required style={OtherStyles.txt()}
                    value={props.val}
                    onChange={props.handle} className="form-control"
                    id={props.label} />
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

export const GenFullInput=(props)=>{
    return (
        <div className={`form-group row m-1 ${props.moreclass}`}>
            <label for={props.label} class="col-sm-3 col-form-label">{props.name}</label>
            <div class="col-12">
                {props.children}

            </div>
        </div>
    ) 
}


export const GenIputRow = (props) => {
    return (
        <div className={`form-group row m-1 ${props.moreclass}`}>
            <label for={props.label} class="col-sm-3 col-form-label">{props.name}</label>
            <div className={` col-sm-9 ms-0 ps-0 ${props.textboxSize}`}>
                {props.children}

            </div>
        </div>
    )
}
export const InputAndSearch = (props) => {
    return (
        <>
            <GenIputRow name={props.name} label={props.labe} >
                <div className="input-group flex-nowrap">
                    <input type="text" className="form-control"  
                    onChange={props.changedContent} placeholder={props.placeholder}
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

        <GenIputRow name={props.name} label={props.label}>
            {props.showmoreload &&
                <div className='row'>
                    <div className='unitsLoading' style={{ backgroundColor: '#fff', position: 'relative', overflow: 'hidden', width: '380px', height: '40px' }}>
                    </div>
                </div>}
            <select required style={OtherStyles.txt()} onChange={props.handle} className="form-select" id={props.label} >
                <option></option>
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