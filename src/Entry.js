import React, { Component } from 'react'
import moment from 'moment'
import './App.css'

class Entry extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: undefined,
      autoScroll: true,
      flags: {
        trace: false,
        debug: false,
        info: false,
        warning: false,
        error: false,
      },
      message: '',
      thread: ''
    }
  }

  setLevels = state => {

  }

 // Todo: fill in values onValueChange
  jsonBody = {
    levels: [ 'ERROR' ],
    messageSearch: this.state ? this.state.message : '',
    thread: '',
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
    const jsonData = await fetchedData.json()
    const logEntries = jsonData.logEntries
    const lastTimeStamp = this.getLastTimeStamp(logEntries)
    this.setState({
      data: logEntries,
      lastTimeStamp
    })
  }

  getLastTimeStamp = entries => {
    const timeStamps = entries.map(entry => entry.timestamp)
    return timeStamps[timeStamps.length -1]
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" })
  }

  updateInterval = setInterval(() => {
    if (this.state.data) {
      return this.setState({})
    }
  }, 1000)

  updateFetch = setInterval(() => {
    if (this.getData) {
      return this.getData().catch(e => {console.log('e', e)})
    }
  }, 1000)

  componentDidMount() {
    this.scrollToBottom()
    this.interval = this.updateInterval
    this.fetchUpdate = this.updateFetch
  }

  componentDidUpdate(prevProps) {
    if (this.state.autoScroll) {
      this.scrollToBottom()
    }
  }

  handleAutoScroll = e => {
    this.setState({autoScroll: e.target.checked})
  }

  handleMessageChange = e => {
    this.setState({message: e.target.value})
  }

  handleThreadChange = e => {
    this.setState({tread: e.target.value})
  }

  handleCheckboxChange = e => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  render() {
    const entries = this.state.data
    return (
      <>
        <div className="entry">
          {entries && entries.map(entry => (
            <div className="entry-left" key={`${Math.random()}`}>
              <div><b>{moment(entry.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</b> <b>{entry.level}</b></div>
              <div>{entry.logger}</div>
              <div>{entry.threadName}</div>
              <div>{entry.message}</div>
            </div>
          ))}
          <div className="entry-bottom" ref={(el) => { this.messagesEnd = el }}></div>
        </div>
        <div className="log-config">
          <label>
            <input
              className="db-checkbox"
              type="checkbox"
              checked={this.state.autoScroll}
              onChange={this.handleAutoScroll}
            />
            <span>Auto Scroll</span>
          </label>
          <div className="log-config-flags">
            <label>
              <input
                name="trace"
                className="db-checkbox"
                type="checkbox"
                checked={this.state.autoScroll}
                onChange={this.handleAutoScroll}
              />
              <span>TRACE</span>
            </label>
            <label>
              <input
                name="debug"
                className="db-checkbox"
                type="checkbox"
                checked={this.state.autoScroll}
                onChange={this.handleAutoScroll}
              />
              <span>DEBUG</span>
            </label>
            <label>
              <input
                name="info"
                className="db-checkbox"
                type="checkbox"
                checked={this.state.autoScroll}
                onChange={this.handleAutoScroll}
              />
              <span>INFO</span>
            </label>
            <label>
              <input
                name="warning"
                className="db-checkbox"
                type="checkbox"
                checked={this.state.autoScroll}
                onChange={this.handleAutoScroll}
              />
              <span>WARNING</span>
            </label>
            <label>
              <input
                name="error"
                className="db-checkbox"
                type="checkbox"
                checked={this.state.autoScroll}
                onChange={this.handleAutoScroll}
              />
              <span>ERROR</span>
            </label>
          </div>
          <label>
            <span>Message</span>
            <input
              name="message"
              type="text"
              value={this.state.message}
              onChange={this.handleMessageChange}
            />
          </label>
          <label>
            <span>Thread</span>
            <input
              name="thread"
              type="text"
              value={this.state.thread}
              onChange={this.handleThreadChange}
            />
          </label>
        </div>
      </>
    )
  }
}

export default Entry
