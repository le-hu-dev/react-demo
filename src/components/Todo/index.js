import React from "react"
import { compose } from "recompose"

import { withAuthorization, withEmailVerification } from "../Session"
import { withFirebase } from "../Firebase"
import Todo from "./Todo"

const TodoPage = () => (
  <div class="container">
    <div class="row top-to-header">
      <div class="col-sm-11 col-md-11 col-lg-10 mx-auto">
        <h1>My Todo List</h1>
        <Todo />
      </div>
    </div>
  </div>
)

const condition = authUser => !!authUser

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition)
)(TodoPage)
