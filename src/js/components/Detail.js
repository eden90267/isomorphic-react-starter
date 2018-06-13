import React from 'react'
import {connect} from 'react-redux'
import {changeEditable} from '../actions'

const Detail = ({editable, onClick, match}) =>
  <div className="detail">
    <h1>Detail</h1>
    <ul className="list-group">
      <li className="list-group-item">
        id：{match.params.id}
      </li>
    </ul>
    <button type="button" className={'btn mt-2 ' + (editable ? 'btn-outline-danger' : 'btn-outline-primary')} onClick={onClick}>
      {editable ? 'Cancel': 'Edit'}
    </button>
  </div>

export default connect(
  ({editable}) => ({
    editable
  }),
  (dispatch) => ({
    onClick() {
      dispatch(changeEditable())
    }
  })
)(Detail)