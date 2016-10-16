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
    // Create a state update
    let stateUpdate = {}
    stateUpdate[stateKey] = event.target.value
    // Call set update
    this.setState(stateUpdate)
  }

  handleSubmit(event) {
    // Prevent page from refreshing
    event.preventDefault()
    // Dispatch the set Data Viz action so DataVisualization component can render
    this.props.setVizData(this.state)
  }

  handleRangeAddition() {
    // Range key is a unique identifier for identifying multiple ranges
    const rangeKey = `range${this.state.rangeAdditions.length + 1}`
    // Generate an input for an additional range set
    const rangeAddition = this.generateRangeField(rangeKey)
    // Create state update
    const stateUpdate = {}
    // Concat the range addition to the current range additions
    stateUpdate.rangeAdditions = this.state.rangeAdditions.concat(rangeAddition)
    // Update component state with the state update
    this.setState(stateUpdate)
  }

  generateRangeField(rangeKey) {
    // Use the range key to create a unique input field for an additional range set
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
    // Components for fetch state
    const VisualizeButton = <RaisedButton type="submit" label="Visualize" primary={true} style={{ margin: 12 }}/>
    const LoadingComponent = <CircularProgress />

    // Return a form that allows user to input data and click a submit button to visualize that data
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
          // Render rest of the range additions being made
          this.state.rangeAdditions
        }
        <div style={{ textAlign: 'center', paddingTop: 10 }}>
          <FloatingActionButton mini onClick={this.handleRangeAddition}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 40 }}>
          {
            // If we are fetching, show the loading component, otherwise show Visualize Button
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
