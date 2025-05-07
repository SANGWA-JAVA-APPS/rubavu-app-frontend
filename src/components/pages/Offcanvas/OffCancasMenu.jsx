import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ColItemContext } from '../../Global/GlobalDataContentx';

function OffCancasMenu({show, onHide} ) {
 const {showcanvaOne, setshowcanvaOne} = useContext(ColItemContext)

  


  return (
    <>
      <Offcanvas show={show} onHide={ onHide}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas One</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCancasMenu;