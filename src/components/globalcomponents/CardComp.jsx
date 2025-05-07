import Card from 'react-bootstrap/Card';
// First Child =FourCards
function CardComp({ title, subtitle, description }) {
  return (
    <Card lg={3} xs={12} sm={12} className='mx-auto'>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>
          <p>
            {description}
          </p>
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default CardComp;