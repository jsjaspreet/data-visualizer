import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add';


class DataInputForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRangeAddition = this.handleRangeAddition.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.generateRangeField = this.generateRangeField.bind(this)
    this.state = { domain: '[  ]', range0: '[  ]', rangeAdditions: [] }
  }

  handleTextChange(event, stateKey) {
    let stateUpdate = {}
    stateUpdate[stateKey] = event.target.value
    this.setState(stateUpdate)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.setVizData(this.state)
  }

  handleRangeAddition() {
    const rangeKey = `range${this.state.rangeAdditions.length + 1}`
    const rangeAddition = this.generateRangeField(rangeKey)
    const stateUpdate = {}
    stateUpdate.rangeAdditions = this.state.rangeAdditions.concat(rangeAddition)
    this.setState(stateUpdate)
  }

  generateRangeField(rangeKey) {
    return (
      <div key={rangeKey}>
        <TextField onChange={(event)=>this.handleTextChange(event, rangeKey)}
                   value={this.state[rangeKey]}
                   fullWidth
                   multiLine
                   hintText={"Enter Range"}/>
      </div>
    )
  }

  render() {
    const { isFetching } = this.props
    const VisualizeButton = <RaisedButton type="submit" label="Visualize" primary={true} style={{ margin: 12 }}/>
    const LoadingComponent = <CircularProgress />
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit} style={{ paddingLeft: 20 }}>
        <div>
          <TextField onChange={(event)=>this.handleTextChange(event, 'domain')}
                     value={this.state.domain}
                     fullWidth
                     multiLine
                     floatingLabelText={"Domain"}/>
        </div>
        <div>
          <TextField onChange={(event)=>this.handleTextChange(event, 'range0')}
                     value={this.state.range0}
                     fullWidth
                     multiLine
                     floatingLabelText={"Range"}/>
        </div>
        {
          this.state.rangeAdditions
        }
        <div style={{ textAlign: 'center', paddingTop: 10 }}>
          <FloatingActionButton mini onClick={this.handleRangeAddition}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 40 }}>
          {
            isFetching ?
            LoadingComponent :
            VisualizeButton
          }
        </div>
      </form>
    )
  }
}

DataInputForm.propTypes = {
  setVizData: PropTypes.func,
  isFetching: PropTypes.bool
}

const mapStateToProps = ({ isFetching }) => ({ isFetching })

export default connect(mapStateToProps, actions)(DataInputForm)
