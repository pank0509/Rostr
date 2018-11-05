
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomCheckbox from './CustomCheckbox';

export default class MenuAndSubmenu extends Component {
  state = {
    rangeOption: [],
    clothOption: [],
    filterApplied: false
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.addingitem.dataResponse !== nextProps.addingitem.dataResponse) {
      if (nextProps.addingitem.dataResponse) {
        this.setState({
          rangeOption: nextProps.addingitem.dataResponse.range,
          clothOption: nextProps.addingitem.dataResponse.cloth,
        });
      }
    }
  }

  /* Range Filter Function */

  collectSpecialtyData = (value) => {
    this.props.changeOfRangeData(value);
  }

  handleFilterSpecialty = (event) => {
    const rangeBeforeFilter = this.props.addingitem ? this.props.addingitem.dataResponse.range : [];
    const filtedSpecialty = rangeBeforeFilter.filter(keys => (
      ((keys.districtname).toLowerCase()).startsWith((event.target.value).toLowerCase())
    ));
    this.setState({
      rangeOption: filtedSpecialty,
    });
  };

  handleSeeAllClicked = () => {
    const rangeArray = this.props.addingitem ? this.props.addingitem.dataResponse.range : [];
    this.props.rangeLengthFunc(rangeArray.length);
  };

  handleSeeLessClicked = () => {
    this.props.rangeLengthFunc(5);
  };

  addCheckForTheSelectedValue = (label) => {
    const addCheckForTheSelectedObject = this.state.rangeOption.map(
      opening => {
        let retObj = opening;
        if (opening.districtname === label) {
          retObj = {
            ...opening,
            ischecked: true
          };
        }
        return retObj;
      }
    );
    this.setState({
      rangeOption: [...addCheckForTheSelectedObject],
    }, () => { });
  }

  removeCheckedForTheUnselectedOption = (label) => {
    const removeCheckedForTheUnselectedObject = this.state.rangeOption.map(
      opening => {
        let retObj = opening;
        if (opening.districtname === label) {
          retObj = {
            ...opening,
            ischecked: false
          };
        }
        return retObj;
      }
    );
    this.setState({
      rangeOption: [...removeCheckedForTheUnselectedObject],
    }, () => { });
    this.props.removeRangeData(label);
  }

  /* Cloth Filter Function */

  collectCityData = (value) => {
    this.props.changeOfClothData(value);
  }

  handleFilterCity = (event) => {
    const clothBeforeFilter = this.props.addingitem ? this.props.addingitem.dataResponse.cloth : [];
    const filtedCity = clothBeforeFilter.filter(keys => (
      ((keys.statename).toLowerCase()).startsWith((event.target.value).toLowerCase())
    ));
    this.setState({
      clothOption: filtedCity,
    });
  }

  handleSeeAllClothClicked = () => {
    const clothArray = this.props.addingitem ? this.props.addingitem.dataResponse.cloth : [];
    this.props.clothLengthFunc(clothArray.length);
  }

  handleSeeLessClothClicked = () => {
    this.props.clothLengthFunc(5);
  }

  addCheckForTheSelectedCityValue = (label) => {
    const addCheckForTheSelectedCityObject = this.state.clothOption.map(
      opening => {
        let retObj = opening;
        if (opening.statename === label) {
          retObj = {
            ...opening,
            ischecked: true
          };
        }
        return retObj;
      }
    );
    this.setState({
      clothOption: [...addCheckForTheSelectedCityObject],
    }, () => { });
  }
  removeCheckedForTheUnselectedCityOption = (label) => {
    const removeCheckedForTheUnselectedObject = this.state.clothOption.map(
      opening => {
        let retObj = opening;
        if (opening.statename === label) {
          retObj = {
            ...opening,
            ischecked: false
          };
        }
        return retObj;
      }
    );
    this.setState({
      clothOption: [...removeCheckedForTheUnselectedObject],
    }, () => { });
    this.props.removeClothData(label);
  }

  /* apply filter Button is clicked */
  handldeFilterButtonClicked = () => {
    this.props.handldeFilterButtonClicked(this.props.addingitem.checkboxresponse);
  }
  render() {
    const cloth = this.props.addingitem.dataResponse ? this.props.addingitem.dataResponse.cloth : [];
    const clothArrayLength = cloth.length;
    const pricerange = this.props.addingitem.dataResponse ? this.props.addingitem.dataResponse.range : [];
    const pricerangeArrayLength = pricerange.length;
    return (
      <div style={{ backgroundColor: '#f8f8f8' }} className="border-gray padding-20">
        <div className="margin-top-40">
          <div className="opening-teal bold margin-bottom-10">RANGE:</div>
          <div className="margin-bottom-10">
            <input
              placeholder="SEARCH..."
              style={{ backgroundColor: '#F8F8F8' }}
              type="text"
              className="border-bottom-dark-gray border-top-none border-right-none border-left-none black-placeholder full-width"
              onChange={this.handleFilterSpecialty}
            />
          </div>
          <div>
            {this.state.rangeOption.map((keys, index) => {
              if (index < this.props.addingitem.rangeLength) {
                return (
                  <div className="display-flex-only" key={keys.did}>
                    <div>
                      <CustomCheckbox
                        label={keys.districtname}
                        index={index}
                        rangeOption
                        ischecked={keys.ischecked ? keys.ischecked : false}
                        removeCheckedForTheUnselectedOption={this.removeCheckedForTheUnselectedOption}
                        addCheckForTheSelectedValue={this.addCheckForTheSelectedValue}
                        collectData={this.collectSpecialtyData}
                      />
                    </div>
                    <div className="margin-left-10">
                      {keys.districtname}
                    </div>
                  </div>
                );
              } return null;
            })}
            <div className="bold">
              {this.props.addingitem.rangeLength === pricerangeArrayLength ?
                <div onClick={this.handleSeeLessClicked}>SEE LESS...</div>
                :
                <div onClick={this.handleSeeAllClicked}>SEE ALL...</div>
              }
            </div>
          </div>
        </div>
        <div className="margin-top-40">
          <div className="opening-teal bold margin-bottom-10">CLOTH:</div>
          <div className="margin-bottom-10">
            <input
              type="text"
              style={{ backgroundColor: '#F8F8F8' }}
              placeholder="SEARCH..."
              type="text"
              className="border-bottom-dark-gray border-top-none border-right-none border-left-none black-placeholder full-width"
              onChange={this.handleFilterCity}
            />
          </div>
          <div>
            {this.state.clothOption.map((keys, index) => {
              if (index < this.props.addingitem.clothLength) {
                return (
                  <div className="display-flex-only" key={keys.sid}>
                    <div>
                      <CustomCheckbox
                        label={keys.statename}
                        index={index}
                        clothOption
                        ischecked={keys.ischecked ? keys.ischecked : false}
                        removeCheckedForTheUnselectedCityOption={this.removeCheckedForTheUnselectedCityOption}
                        addCheckForTheSelectedCityValue={this.addCheckForTheSelectedCityValue}
                        collectData={this.collectCityData}
                      />
                    </div>
                    <div className="margin-left-10">
                      {keys.statename}
                    </div>
                  </div>
                );
              } return null;
            })}
            <div className="bold">
              {this.props.addingitem.clothLength === clothArrayLength ?
                <div onClick={this.handleSeeLessClothClicked}>SEE LESS...</div>
                :
                <div onClick={this.handleSeeAllClothClicked}>SEE ALL...</div>
              }
            </div>
          </div>
        </div>
        <div className="margin-top-20">
          <button
            onClick={this.handldeFilterButtonClicked}
            style={{ boxShadow: '0 0 5px rgba(0, 0, 0, .30)' }}
            className="background-white bold full-width border-curved5 padding-top-bottom-10"
          >
            <span><i className="fa fa-filter" aria-hidden="true" /></span>
            <span className="margin-left-20">FILTER</span>
          </button>
        </div>
      </div>
    );
  }
}

MenuAndSubmenu.propTypes = {
  getlistofCloth: PropTypes.func,
  getlistofRange: PropTypes.func,
  handldeFilterButtonClicked: PropTypes.func,
  addingitem: PropTypes.object,
  changeOfRangeData: PropTypes.func,
  removeRangeData: PropTypes.func,
  changeOfClothData: PropTypes.func,
  removeClothData: PropTypes.func,
  rangeLengthFunc: PropTypes.func,
  clothLengthFunc: PropTypes.func,
};