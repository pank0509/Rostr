import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomCheckbox extends Component {
  handleCheckboxClicked = (label) => {
    if (!this.props.ischecked) {
      this.props.collectData(label);
      if (this.props.clothOption) {
        this.props.addCheckForTheSelectedCityValue(label);
      }
      if (this.props.rangeOption) {
        this.props.addCheckForTheSelectedValue(label);
      }
    } else {
      // this.props.removeData(index);
      if (this.props.clothOption) {
        this.props.removeCheckedForTheUnselectedCityOption(label);
      }
      if (this.props.rangeOption) {
        this.props.removeCheckedForTheUnselectedOption(label);
      }
    }
  }
  render() {
    return (
      <div onClick={() => this.handleCheckboxClicked(this.props.label, this.props.index)} className="font18 custom-checkbox-style">
        {this.props.ischecked ?
          <i className="fa fa-check-square" aria-hidden="true" />
          :
          <i className="fa fa-square-o" aria-hidden="true" />
        }
      </div>
    );
  }
}
CustomCheckbox.propTypes = {
  ischecked: PropTypes.bool,
  rangeOption: PropTypes.bool,
  clothOption: PropTypes.bool,
  label: PropTypes.string,
  index: PropTypes.number,
  collectData: PropTypes.func,
  removeCheckedForTheUnselectedOption: PropTypes.func,
  addCheckForTheSelectedValue: PropTypes.func,
  addCheckForTheSelectedCityValue: PropTypes.func,
  removeCheckedForTheUnselectedCityOption: PropTypes.func,
};