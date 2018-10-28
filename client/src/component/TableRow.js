/* eslint-disable no-restricted-globals */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
class Table extends React.Component {
  render() {
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
    const options = {
      onRowClick: (row) => {
        if (confirm('Do you wanna delete !!')) {
          this.props.deleterequest(row._id);
          this.props.getlistofstoreditem();
          this.props.getvalueforpichart();
        } return null;
      },
    };
    return (
      <div>
        <div className="text-align-center margin-top-bottom-10 font14 font-bold">Click on row to delete ! </div>
        <BootstrapTable data={this.props.data} options={options}>
          <TableHeaderColumn dataField='itemname' isKey>NAME</TableHeaderColumn>
          <TableHeaderColumn dataField='timestamp'>TIME</TableHeaderColumn>
          <TableHeaderColumn dataField='itemoriginalprice'>PRICE</TableHeaderColumn>
          <TableHeaderColumn dataField='gstonitem'>GST %</TableHeaderColumn>
          <TableHeaderColumn dataField='priceaftergst'>PRICE WITH GST</TableHeaderColumn>
        </BootstrapTable>
        <Row className="margin-top-bottom-20">
          <Col lg={6} sm={6} md={6} xs={6} className="text-align-right">
            <span className="font-bold">Total Amount Without GST : </span><span className="font-bold">{totalAmoutOfOriginalPrice}</span>
          </Col>
          <Col lg={6} sm={6} md={6} xs={6} className="text-align-right">
            <span className="font-bold">Total Amount With GST : </span><span className="font-bold">{totalAmoutOfAfterGst}</span>
          </Col>
        </Row>
      </div>
    );
  }
}
Table.propTypes = {
  deleterequest: PropTypes.func,
  getlistofstoreditem: PropTypes.func,
  getvalueforpichart: PropTypes.func,
}
Table.defaultProps = {
  deleterequest: () => { },
  getlistofstoreditem: () => { },
  getvalueforpichart: () => { },
}
export default Table;