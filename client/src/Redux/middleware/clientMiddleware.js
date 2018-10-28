function redirect() {
  alert('error');
}
export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      const { promise, types, ...rest } = action
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => {
          // console.log('In result', client, result);
          if (typeof result === 'string') {
            if (result.toLowerCase() === 'authentication error - accesstoken invalid' ) {
              redirect();
            } else {
              next({...rest, result, type: SUCCESS});
            }
          } else if (result) {
            if (result.errorMessage) {
              if (result.errorMessage === 'Invalid Authentication.') {
                redirect();
              } else {
                next({...rest, result, type: SUCCESS});
              }
            } else {
              next({...rest, result, type: SUCCESS});
            }
          } else {
            next({...rest, result, type: SUCCESS});
          }
        },
        (error) => {
          // console.log('In error', client, error);
          if (typeof error === 'string') {
            if (error.toLowerCase() === 'authentication error - accesstoken invalid') {
              redirect();
            } else {
              next({...rest, error, type: FAILURE});
            }
          } else {
            next({...rest, error, type: FAILURE});
          }
        }
      ).catch((error)=> {
        console.error('In catch', client, error);
        if (typeof error === 'string') {
          if (error.toLowerCase() === 'authentication error - accesstoken invalid') {
            redirect();
          } else {
            next({...rest, error, type: FAILURE});
          }
        } else {
          next({...rest, error, type: FAILURE});
        }
      });
      return actionPromise;
    };
  };
}
