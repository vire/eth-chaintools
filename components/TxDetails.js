import React from 'react'

const TxDetails = ({ details }) => (
  <div>
    <h3 className="u-centered">Transaction</h3>
    <pre>{JSON.stringify(details, null, 2)}</pre>
  </div>
)

export default TxDetails
