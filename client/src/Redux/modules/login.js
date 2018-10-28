const PHONE_NUMBER = '@login/PHONE_NUMBER';
const PASSWORD = '@login/PASSWORD';
const LOGIN_TYPE = '@login/LOGIN_TYPE';
const LOGIN_REQUEST = '@login/LOGIN_REQUEST';
const LOGIN_SUCCESS = '@login/LOGIN_SUCCESS';
const LOGIN_FAILURE = '@login/LOGIN_FAILURE';
const LOGOUT_REQUEST = '@login/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = '@login/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = '@login/LOGOUT_FAILURE';

const initialState = {
  phoneNumber: null,
  password: null,
  loginType: 'seeker',
  loading: false,
  loaded: false,
  failed: false,
  loginResponse: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.result,
      };
    case PASSWORD:
      return {
        ...state,
        password: action.result,
      };
    case LOGIN_TYPE:
      return {
        ...state,
        loginType: action.result,
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        failed: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        failed: false,
        loginResponse: action.result,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: true,
        failed: false,
        loginResponse: action.error,
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        phoneNumber: null,
        password: null,
        loginResponse: null,
      }
    case LOGOUT_FAILURE:
      return {
        phoneNumber: null,
        password: null,
        ...state,
      }
    default:
      return state;
  }
}
export function onChangeOfPhoneNumber(value) {
  return {
    type: PHONE_NUMBER,
    result: value,
  };
}
export function onChangeOfPassword(value) {
  return {
    type: PASSWORD,
    result: value,
  };
}
export function onLoginTypeChange(value) {
  return {
    type: LOGIN_TYPE,
    result: value,
  }
}
export function loginUserRequest(value) {
  const data = {
    username: value.phoneNumber,
    password: value.password,
  }
  console.log('This is data while login', data);
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: (client) => client.post('/api/login', { data })
  }
}
export function logoutUserRequest() {
  return {
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    promise: (client) => client.get('/api/logout')
  }
}
