import React  from "react";
import { Container, Row, Col, Form, Button,Navbar } from 'react-bootstrap';
interface Props {
  src?: any
  // any props that come into the component
}
const AllProps =({src}:Props)=>
    <div>
{
    Object.keys(src).map((key) => {
      return ( 
      <Row key={key}>
        <Col>{key}</Col>
        <Col>{
          (typeof src[key]  === 'object' || src[key] == null)
          ?"---":src[key]
        }
        </Col>

        </Row>
        )
    })
}
</div>
export default AllProps