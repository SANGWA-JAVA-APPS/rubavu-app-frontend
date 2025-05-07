import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

export const Tabcomponent = ({ tablabel1, tableCon1, tabLabel2, tabCont2, tabLabel3, tabCont3, tabLabel4, tabCont4 }) => {
    return (
        <Tabs
            defaultActiveKey={tablabel1}
            id="fill-tab-example" className="mb-3" fill   >
            {tablabel1 && <Tab eventKey={tablabel1} title={tablabel1} >
                {tableCon1}
            </Tab>}
            <Tab eventKey={tabLabel2} title={tabLabel2}>
                {tabCont2}
            </Tab>
            {tabLabel3 && <Tab eventKey={tabLabel3} title={tabLabel3}>
                {tabCont3}
            </Tab>}
            {tabLabel4 && <Tab eventKey={tabCont4} title={tabCont4} disabled>
                {tabCont4}
            </Tab>}
        </Tabs>
    )
}
