const CLOTH_DATA = 'CLOTH_DATA';
const REMOVE_CLOTH_DATA = 'REMOVE_CLOTH_DATA';
const RANGE_DATA = 'RANGE_DATA';
const REMOVE_RANGE_DATA = 'REMOVE_RANGE_DATA';
const CLOTH_LENGTH = 'CLOTH_LENGTH';
const RANGE_LENGTH = 'RANGE_LENGTH';
const LOAD_DATA_REQUEST = 'LOAD_DATA_REQUEST';
const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';
const FINAL_VALUE = 'FINAL_VALUE';
/* Initial State  */

const initialState = {
  clothLength: 5,
  rangeLength: 5,
  checkboxresponse: {
    clothCollectedData: [],
    priceCollectedData: [],
  },
  loading: false,
  loaded: false,
  failed: false,
  dataResponse: null,
};

/* These are reducer */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        failed: false,
      }
    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        failed: false,
        dataResponse: action.result,
      }
    case LOAD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        failed: true,
      }
    case CLOTH_DATA:
      return {
        ...state,
        checkboxresponse: {
          ...state.checkboxresponse,
          clothCollectedData: [...state.checkboxresponse.clothCollectedData, action.result],
        }
      };
    case REMOVE_CLOTH_DATA:
      const indexOfActionResultForCloth = state.checkboxresponse.clothCollectedData.indexOf(action.result);
      const updatedCloth = state.checkboxresponse.clothCollectedData;
      const removedItem = updatedCloth.splice(indexOfActionResultForCloth, 1);
      console.log(removedItem);
      return {
        ...state,
        checkboxresponse: {
          ...state.checkboxresponse,
          clothCollectedData: updatedCloth,
        }
      };
    case RANGE_DATA:
      return {
        ...state,
        checkboxresponse: {
          ...state.checkboxresponse,
          priceCollectedData: [...state.checkboxresponse.priceCollectedData, action.result]
        }
      }
    case REMOVE_RANGE_DATA:
      const indexOfActionResultForRange = state.checkboxresponse.priceCollectedData.indexOf(action.result);
      const updatedPrice = state.checkboxresponse.priceCollectedData;
      const removedItemRange = updatedPrice.splice(indexOfActionResultForRange, 1);
      console.log(removedItemRange);
      return {
        ...state,
        checkboxresponse: {
          ...state.checkboxresponse,
          priceCollectedData: updatedPrice,
        }
      };
    case CLOTH_LENGTH:
      return {
        ...state,
        clothLength: action.result,
      }
    case RANGE_LENGTH:
      return {
        ...state,
        rangeLength: action.result,
      }
    default:
      return state;
  }
}

export function changeOfRangeData(value) {
  return {
    type: RANGE_DATA,
    result: value,
  };
}
export function removeRangeData(value) {
  return {
    type: REMOVE_RANGE_DATA,
    result: value
  };
}
export function changeOfClothData(value) {
  return {
    type: CLOTH_DATA,
    result: value,
  };
}
export function removeClothData(value) {
  return {
    type: REMOVE_CLOTH_DATA,
    result: value
  };
}

export function clothLengthFunc(value) {
  return {
    type: CLOTH_LENGTH,
    result: value,
  };
}
export function rangeLengthFunc(value) {
  return {
    type: RANGE_LENGTH,
    result: value,
  };
}

export function handldeFilterButtonClicked(value) {
  console.log('This is the value of the filter after button is clicked', value);
  return {
    type: FINAL_VALUE,
    result: value
  };
}
/* These are action */

export function getlistofRange() {
  return {
    types: [LOAD_DATA_REQUEST, LOAD_DATA_SUCCESS, LOAD_DATA_FAILURE],
    promise: (client) => client.get('/api/getdistrictlist')
  }
}