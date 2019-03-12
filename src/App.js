import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Entry from './Entry'
import DbRefactoring from './DbRefactoring'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {data: undefined}
  }

  jsonBody = {
      since: 0,
      levels: [ 'ERROR' ],
      messageSearch: '',
      thread: '',
      limit: 20,
      offset: 0
    }

    options = {
      method: 'POST',
      mode: "cors",
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.jsonBody)
    }


  getData = async() => {
    const fetchedData = await fetch('http://localhost:8080/nice2/rest/sickcon/log', this.options)
      .catch(e => {console.log('e', e)})
    const jsonData = await fetchedData.text()
    this.setState({data: jsonData})
  }

  render() {
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <code style={{fontSize: '40px'}}>sickcon</code>
        <h3>Log</h3>
        <Entry/>
        <h3>DB Refactoring</h3>
        <DbRefactoring/>
      </header>
    </div>
  }
}

export default App
