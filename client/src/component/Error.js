import React from 'react';
import { FormattedMessage } from 'react-intl';

class Error extends React.Component {
  render() {
    console.log('Coming in the error');
    return (
      <div className="card-style margin-top-100">
        <div className="display-flex-justify-content-center margin-top-40"><img src={`${process.env.PUBLIC_URL}/svgIcons/sad.svg`} width="25%" height="25%" alt="" /></div>
        <h1 className="text-align-center margin-top-bottom-30">
          <FormattedMessage
            id="login.error.exp"
            defaultMessage="Please login to view this page ! "
          /> !
        </h1>
        <h3 className="text-align-center margin-bottom-30">
          <FormattedMessage
            id="login.error.msg"
            defaultMessage="Please login to view this page ! "
          /> !
        </h3>
      </div>
    );
  }
}
export default Error;
