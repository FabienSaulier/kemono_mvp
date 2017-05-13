import React from 'react';
import {Table } from 'react-bootstrap';
import moment from 'moment';

export class Account extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.transactionsList);
  }

  render() {
    return(
      <div>
        <h3>Historique des paiements</h3>
        <Table >
          <thead>
            <tr>
              <th>N° de transaction</th>
              <th>Débité</th>
              <th>Date</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {renderTransactionRow(this.props.transactionsList)}
          </tbody>
        </Table>
      </div>
    )
  }
};

const renderTransactionRow = (transactionsList) => {
  if(!transactionsList) return null;

  return transactionsList.map(function(transaction,i){
    return (
      <tr  key={i}>
        <td>{transaction.Id}</td>
        <td>{transaction.DebitedFunds.Amount/100} €</td>
        <td>{moment.unix(transaction.ExecutionDate).format('DD - MM - YYYY HH:mm')}</td>
        <td>{transaction.Status}</td>
      </tr>
    )
  })
}
