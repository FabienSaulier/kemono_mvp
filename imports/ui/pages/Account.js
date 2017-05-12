import React from 'react';

export class Account extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.transactionsList);
  }

  render() {
    return(
      <div>
        Print la list des transactions
      </div>
    )
  }
};
