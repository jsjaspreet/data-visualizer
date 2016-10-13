import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'


class DataInputForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.state = { domain: '[  ]', range: '[  ]' }
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

  render() {
    const { isFetching } = this.props
    const VisualizeButton = <RaisedButton type="submit" label="Visualize" primary={true} style={{ margin: 12 }}/>
    const LoadingComponent = <CircularProgress />
    return (
      <form onSubmit={this.handleSubmit} style={{ paddingLeft: 20 }}>
        <div>
          <TextField onChange={(event)=>this.handleTextChange(event, 'domain')}
                     value={this.state.domain}
                     fullWidth
                     floatingLabelText={"Domain"}/>
        </div>
        <div>
          <TextField onChange={(event)=>this.handleTextChange(event, 'range')}
                     value={this.state.range}
                     fullWidth
                     floatingLabelText={"Range"}/>
        </div>
        <div style={{ textAlign: 'center' }}>
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
