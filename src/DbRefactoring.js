import React, { Component } from 'react'
import './App.css'

class DbRefactoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      versionValue: '',
      isFragmentName: false,
      ignoreErrors: false
    }
  }

  handleVersionChange = e => {
    this.setState({versionValue: e.target.value})
  }

  handleCheckboxChange = e => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleIgnoreErrors = e => {
    const target = e.target
    this.setState({
      ignoreErrors: target.checked
    })
  }

  handleSubmit = e => {
    alert('A name was submitted: ' + this.state.isFragmentName)
    e.preventDefault()
  }

  render() {
    return (
      <div className="db-refactoring">
        <form className="db-refactoring-form" onSubmit={this.handleSubmit}>
          <div className="db-refactor-child">
            <label htmlFor="text">Version incl.</label>
            <input
              type="number"
              className="db-version-input"
              value={this.state.versionValue}
              onChange={this.handleVersionChange} />
          </div>
          <div className="db-refactor-child">
            <label>
              <input
                className="db-checkbox"
                name="isFragmentName"
                type="checkbox"
                checked={this.state.isFragmentName}
                onChange={this.handleCheckboxChange}
              />
              <span>Is going</span>
            </label>
          </div>
          <div className="db-refactor-child">
            <label>
              <span>Ignore Errors</span>
              <input
                className="db-checkbox"
                name="errors"
                type="checkbox"
                checked={this.state.ignoreErrors}
                onChange={this.handleIgnoreErrors}
              />
            </label>
          </div>
          <div className="db-refactor-child">
            <button onClick={this.handleSubmit} className="db-submit">OK</button>
          </div>
        </form>
      </div>
    )
  }
}

export default DbRefactoring
