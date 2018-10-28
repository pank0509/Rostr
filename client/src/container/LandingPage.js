import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RadialChart } from 'react-vis';
import {
  ItemName,
  ItemOriginalPrice,
  gstOnItem,
  onitemsubmit,
  getlistofstoreditem,
  getvalueforpichart
} from '../Redux/modules/addingitem';
import Table from '../component/TableRow';
// const myData = [{ angle: 1, label: 'first' }, { angle: 5, label: 'second' }, { angle: 2, label: 'third' }]
const gstOption = [{ value: 5, label: '5 %' }, { value: 12, label: '12 %' }, { value: 18, label: '18 %' }, { value: 28, label: '28 %' }];
function mapStateToProps(state) {
  return {
    addingitem: state.addingitem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ItemName: (value) => dispatch(ItemName(value)),
    ItemOriginalPrice: (value) => dispatch(ItemOriginalPrice(value)),
    gstOnItem: (value) => dispatch(gstOnItem(value)),
    onitemsubmit: (value) => dispatch(onitemsubmit(value)),
    getlistofstoreditem: (value) => dispatch(getlistofstoreditem(value)),
    getvalueforpichart: (value) => dispatch(getvalueforpichart(value))
  }
}
class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getlistofstoreditem();
    this.props.getvalueforpichart();
  }
  handleItemName = (event) => {
    this.props.ItemName(event.target.value);
  }
  handleItemPrice = (event) => {
    this.props.ItemOriginalPrice(event.target.value)
  }
  handleGst = (event) => {
    this.props.gstOnItem(event.target.value)
  }
  handleAddItemButtonClicked = () => {
    this.props.onitemsubmit(this.props.addingitem);
    this.props.getlistofstoreditem();
    this.props.getvalueforpichart();
  }
  render() {
    console.log('This is in landing page', this.props.addingitem);
    const { itemname, itemoriginalprice, gstonitem } = this.props.addingitem;
    const data = this.props.addingitem.chartdataresponse ? this.props.addingitem.chartdataresponse : [];
    return (
      <div>
        <div className="card-style">
          <input
            type="text"
            required
            placeholder="Enter Item"
            value={itemname ? itemname : ''}
            className="form-control margin-top-bottom-10"
            onChange={this.handleItemName}
          />
          <input
            type="number"
            required
            value={itemoriginalprice ? itemoriginalprice : ''}
            placeholder="Enter Price"
            className="form-control margin-top-bottom-10"
            onChange={this.handleItemPrice}
          />
          <select
            className="form-control"
            value={gstonitem}
            onChange={this.handleGst}>
            {gstOption.map(keys => (
              <option key={keys.value}>{keys.value}</option>
            ))
            }
          </select>
          <div>
            <button onClick={this.handleAddItemButtonClicked}>
              Add Item to List
            </button>
          </div>
          <div>
            <RadialChart
              data={data}
              width={300}
              showLabels={true}
              height={300}
            />
          </div>
          <div>
            <Table
              data={this.props.addingitem.tabledataresponse ? this.props.addingitem.tabledataresponse : []}
            />
          </div>
        </div>
      </div>
    );
  }
}
LandingPage.propTypes = {
  ItemName: PropTypes.func,
  ItemOriginalPrice: PropTypes.func,
  gstOnItem: PropTypes.func,
  onitemsubmit: PropTypes.func,
  getlistofstoreditem: PropTypes.func,
  getvalueforpichart: PropTypes.func,
  addingitem: PropTypes.object,
}
LandingPage.defaultProps = {
  ItemName: () => { },
  ItemOriginalPrice: () => { },
  gstOnItem: () => { },
  onitemsubmit: () => { },
  getlistofstoreditem: () => { },
  getvalueforpichart: () => { },
  addingitem: {},
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);