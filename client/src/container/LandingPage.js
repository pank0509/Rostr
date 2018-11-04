import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MenuAndSubmenu from '../component/MenuAndSubmenu';
import {
  getlistofRange,
  changeOfRangeData,
  removeRangeData,
  changeOfClothData,
  removeClothData,
  rangeLengthFunc,
  clothLengthFunc,
  handldeFilterButtonClicked
} from '../Redux/modules/addingitem';
function mapStateToProps(state) {
  return {
    addingitem: state.addingitem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handldeFilterButtonClicked: (value) => dispatch(handldeFilterButtonClicked(value)),
    getlistofRange: (value) => dispatch(getlistofRange(value)),
    changeOfRangeData: (value) => dispatch(changeOfRangeData(value)),
    removeRangeData: (value) => dispatch(removeRangeData(value)),
    changeOfClothData: (value) => dispatch(changeOfClothData(value)),
    removeClothData: (value) => dispatch(removeClothData(value)),
    rangeLengthFunc: (value) => dispatch(rangeLengthFunc(value)),
    clothLengthFunc: (value) => dispatch(clothLengthFunc(value))
  }
}
class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getlistofRange();
  }
  render() {
    return (
      <div>
        <MenuAndSubmenu
          removeRangeData={this.props.removeRangeData}
          changeOfRangeData={this.props.changeOfRangeData}
          addingitem={this.props.addingitem}
          changeOfClothData={this.props.changeOfClothData}
          removeClothData={this.props.removeClothData}
          applyCityAndSpecialtyFilter={this.props.applyCityAndSpecialtyFilter}
          handldeFilterButtonClicked={this.props.handldeFilterButtonClicked}
          clothLengthFunc={this.props.clothLengthFunc}
          rangeLengthFunc={this.props.rangeLengthFunc}
        />
      </div>
    );
  }
}
LandingPage.propTypes = {
  getlistofRange: PropTypes.func,
  addingitem: PropTypes.object,
  changeOfRangeData: PropTypes.func,
  removeRangeData: PropTypes.func,
  changeOfClothData: PropTypes.func,
  removeClothData: PropTypes.func,
  rangeLengthFunc: PropTypes.func,
  clothLengthFunc: PropTypes.func,
  handldeFilterButtonClicked: PropTypes.func
}
LandingPage.defaultProps = {
  getlistofRange: () => { },
  addingitem: {},
  changeOfRangeData: () => { },
  removeRangeData: () => { },
  changeOfClothData: () => { },
  removeClothData: () => { },
  rangeLengthFunc: () => { },
  clothLengthFunc: () => { },
  handldeFilterButtonClicked: () => { }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);