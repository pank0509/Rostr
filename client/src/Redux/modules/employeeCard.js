const GET_EMPLOYEE_DATA_REQUEST = '@job/GET_EMPLOYEE_DATA_REQUEST';
const GET_EMPLOYEE_DATA_SUCCESS = '@job/GET_EMPLOYEE_DATA_SUCCESS';
const GET_EMPLOYEE_DATA_FAILURE = '@job/GET_EMPLOYEE_DATA_FAILURE';

const initialState = {
  loading: false,
  loaded: false,
  failed: false,
  employeeDetailResponse: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_EMPLOYEE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        failed: false,
        employeeDetailResponse: null,
      };
    case GET_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        failed: false,
        employeeDetailResponse: action.result,
      };
    case GET_EMPLOYEE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        failed: true,
        employeeDetailResponse: action.error,
      };
    default:
      return state
  }
}
export function getEmployeeDetail() {
  return {
    types: [GET_EMPLOYEE_DATA_REQUEST, GET_EMPLOYEE_DATA_SUCCESS, GET_EMPLOYEE_DATA_FAILURE],
    promise: (client) => client.get('/api/employee')
  };
}