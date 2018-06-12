import React from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

const Master = ({data}) =>
  <div className="master">
    <h1>Master</h1>
    <ul>
      {
        data.map((item, idx) =>
          <li key={idx}>
            <Link to={item.id}>
              {item.title}
            </Link>
          </li>
        )
      }
    </ul>
  </div>

export default connect(
  ({data}) => ({
    data
  })
)(Master)