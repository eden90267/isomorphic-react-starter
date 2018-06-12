import React from 'react'

const Detail = ({match}) =>
  <div className="detail">
    <h1>Detail</h1>
    {match.params.id}
  </div>

export default Detail