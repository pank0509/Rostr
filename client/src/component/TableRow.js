import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class Table extends React.Component {
  render() {
    console.log('This is props in table', this.props.data);
    const arrayOfItemOriginalPrice = this.props.data.map(keys => (keys.itemoriginalprice));
    let totalAmoutOfOriginalPrice = 0;
    for (let i = 0; i < arrayOfItemOriginalPrice.length; i++) {
      totalAmoutOfOriginalPrice = totalAmoutOfOriginalPrice + arrayOfItemOriginalPrice[i];
    }
    const arrayOfItemGstPrice = this.props.data.map(keys => (keys.priceaftergst));
    let totalAmoutOfAfterGst = 0;
    for (let i = 0; i < arrayOfItemGstPrice.length; i++) {
      totalAmoutOfAfterGst = totalAmoutOfAfterGst + arrayOfItemGstPrice[i];
    }
    return (
      <div>
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn dataField='itemname' isKey>ITEM NAME</TableHeaderColumn>
          <TableHeaderColumn dataField='timestamp'>ITEM TIME STAMP</TableHeaderColumn>
          <TableHeaderColumn dataField='itemoriginalprice'>ORIGINAL PRICE</TableHeaderColumn>
          <TableHeaderColumn dataField='gstonitem'>GST IN %</TableHeaderColumn>
          <TableHeaderColumn dataField='priceaftergst'>PRICE WITH GST</TableHeaderColumn>
        </BootstrapTable>
        <Row>
          <Col lg={6} sm={6} md={6} xs={6} className="text-align-right">
            <span>Total Amount Without GST : </span><span>{totalAmoutOfOriginalPrice}</span>
          </Col>
          <Col lg={6} sm={6} md={6} xs={6} className="text-align-right">
            <span>Total Amount With GST : </span><span>{totalAmoutOfAfterGst}</span>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Table;