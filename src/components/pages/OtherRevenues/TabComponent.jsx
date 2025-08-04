import REact from 'react'
import { Tabs, Tab, Card } from 'react-bootstrap';

export default function TabComponent({content1, content2}) {
  return (
    <Tabs defaultActiveKey="tab1" id="two-tabs-example" className="mb-3">
        
      <Tab eventKey="tab1" title="Categories" style={{backgroundColor:'black'}}>
        <Card className="mt-3">
          {/* <Card.Header>Categries</Card.Header> */}
          <Card.Body>
            {content1}
          </Card.Body>
        </Card>
      </Tab>
      <Tab eventKey="tab2" title="Revenues">
        <Card className="mt-3">
          {/* <Card.Header> </Card.Header> */}
          <Card.Body>
             {content2}
          </Card.Body>
        </Card>
      </Tab>
    </Tabs>
  );
}