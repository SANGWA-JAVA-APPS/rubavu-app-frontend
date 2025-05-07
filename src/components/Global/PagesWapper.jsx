import React from 'react'

function PagesWapper(props) {
    return (<>
        <div className='container-fluid  pageWrapper' ref={props.ref} >
            {props.children}
        </div>
    </>
    )
}

export default PagesWapper
