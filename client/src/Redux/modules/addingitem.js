const ITEM_NAME = 'ITEM_NAME';
const ITEM_ORIGINAL_PRICE = 'ITEM_ORIGINAL_PRICE';
const GST_ON_THE_ITEM = 'GST_ON_THE_ITEM';
const ON_SUBMIT_REQUEST = 'ON_SUBMIT_REQUEST';
const ON_SUBMIT_SUCCESS = 'ON_SUBMIT_SUCCESS';
const ON_SUBMIT_FAILURE = 'ON_SUBMIT_FAILURE';
const GET_VALUE_FOR_CHART = 'GET_VALUE_FOR_CHART';
const GET_VALUE_FOR_CHART_SUCCESS = 'GET_VALUE_FOR_CHART_SUCCESS';
const GET_VALUE_FOR_CHART_FAILURE = 'GET_VALUE_FOR_CHART_FAILURE';
const GET_VALUE_FOR_TABLE = 'GET_VALUE_FOR_TABLE';
const GET_VALUE_FOR_TABLE_SUCCESS = 'GET_VALUE_FOR_TABLE_SUCCESS';
const GET_VALUE_FOR_TABLE_FAILURE = 'GET_VALUE_FOR_TABLE_FAILURE';

/* Initial State  */

const initialState = {
  itemname: null,
  itemoriginalprice: null,
  gstonitem: 5,
  submitresponse: null,
  addingitem: false,
  addeditem: false,
  failtoadd: false,
  /* Chart Data */
  chartdataresponse: null,
  chartdataloading: false,
  chartdataloaded: false,
  chartdatafailed: false,
  /* Table Data */
  tabledataresponse: null,
  tabledataloading: false,
  tabledataloaded: false,
  tabledatafailtoload: false,
};

/* These are reducer */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ITEM_NAME:
      return {
        ...state,
        itemname: action.result,
      };
    case ITEM_ORIGINAL_PRICE:
      return {
        ...state,
        itemoriginalprice: action.result,
      };
    case GST_ON_THE_ITEM:
      return {
        ...state,
        gstonitem: action.result,
      }
    case ON_SUBMIT_REQUEST:
      return {
        ...state,
        addingitem: true,
        addeditem: false,
        failtoadd: false,
      }
    case ON_SUBMIT_SUCCESS:
      return {
        ...state,
        addingitem: false,
        addeditem: true,
        failtoadd: false,
      }
    case ON_SUBMIT_FAILURE:
      return {
        ...state,
        addingitem: false,
        addeditem: false,
        failtoadd: true,
      }
    case GET_VALUE_FOR_CHART:
      return {
        ...state,
        chartdataloading: true,
        chartdataloaded: false,
        chartdatafailed: false,
      }
    case GET_VALUE_FOR_CHART_SUCCESS:
      const result = action.result.map((keys) => {
        const object = Object.assign({}, keys);
        object.label = `${keys._id} %gst`;
        return object;
      })
      return {
        ...state,
        chartdataresponse: result,
        chartdataloading: false,
        chartdataloaded: true,
        chartdatafailed: false,
      }
    case GET_VALUE_FOR_CHART_FAILURE:
      return {
        ...state,
        chartdataloading: false,
        chartdataloaded: false,
        chartdatafailed: true,
      }
    case GET_VALUE_FOR_TABLE:
      return {
        ...state,
        tabledataloading: true,
        tabledataloaded: false,
        tabledatafailtoload: false,
      }
    case GET_VALUE_FOR_TABLE_SUCCESS:
      return {
        ...state,
        tabledataresponse: action.result,
        tabledataloading: false,
        tabledataloaded: true,
        tabledatafailtoload: false,
      }
    case GET_VALUE_FOR_TABLE_FAILURE:
      return {
        ...state,
        tabledataloading: false,
        tabledataloaded: false,
        tabledatafailtoload: true,
      }
    default:
      return state;
  }
}

/* These are action */

export function ItemName(value) {
  return {
    type: ITEM_NAME,
    result: value
  }
}
export function ItemOriginalPrice(value) {
  return {
    type: ITEM_ORIGINAL_PRICE,
    result: value,
  }
}
export function gstOnItem(value) {
  return {
    type: GST_ON_THE_ITEM,
    result: value,
  }
}

export function onitemsubmit(value) {
  const itemoriginalpriceInNumber = Number(value.itemoriginalprice);
  const gstonitemInNumber = Number(value.gstonitem);
  const gstcal = (itemoriginalpriceInNumber * gstonitemInNumber) / 100;
  const priceafteraddinggst = itemoriginalpriceInNumber + gstcal;
  const currenttimestamp = new Date();
  const data = {
    itemname: value.itemname,
    itemoriginalprice: itemoriginalpriceInNumber,
    gstonitem: gstonitemInNumber,
    priceaftergst: priceafteraddinggst,
    timestamp: currenttimestamp,
  }
  return {
    types: [ON_SUBMIT_REQUEST, ON_SUBMIT_SUCCESS, ON_SUBMIT_FAILURE],
    promise: (client) => client.post('/api/store', { data })
  }
}
export function getvalueforpichart() {
  return {
    types: [GET_VALUE_FOR_CHART, GET_VALUE_FOR_CHART_SUCCESS, GET_VALUE_FOR_CHART_FAILURE],
    promise: (client) => client.get('/api/piechart')
  }
}
export function getlistofstoreditem() {
  return {
    types: [GET_VALUE_FOR_TABLE, GET_VALUE_FOR_TABLE_SUCCESS, GET_VALUE_FOR_TABLE_FAILURE],
    promise: (client) => client.get('/api/getlistofitem')
  }
}