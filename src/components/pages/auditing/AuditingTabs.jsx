import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Berthinginvoice from './Berthinginvoice';
import AccountAudit from './AccountAudit';
import TruckAudit from './TruckAudit';
import VesselAudit from './VesselAudit';
import PagesWapper from '../../Global/PagesWapper';
import { Splitter } from '../../globalcomponents/Splitter';
import { TitleSmallDesc } from '../../globalcomponents/TitleSmallDesc';

function parseDateString(dateStr) {
    // Expects 'dd/MM/yyyy'
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}T00:00:00`);
}

function AuditingTabs() {
    const [key, setKey] = useState('invoices');

    return (
        <PagesWapper>
            <Splitter />
            <TitleSmallDesc title="Audit Logs" />
            <Tabs
                id="audit-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="invoices" title="Invoices">
                    <Berthinginvoice />
                </Tab>
                <Tab eventKey="accounts" title="Accounts">
                    <AccountAudit />
                </Tab>
                <Tab eventKey="trucks" title="Trucks">
                    <TruckAudit />
                </Tab>
                <Tab eventKey="vessels" title="Vessels">
                    <VesselAudit />
                </Tab>
            </Tabs>
        </PagesWapper>
    );
}

export default AuditingTabs; 