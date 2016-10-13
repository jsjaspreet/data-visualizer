import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import DataInputForm from './DataInputForm'
import DataVisualization from './DataVisualization'

const appBodyStyle = {
  display: 'flex',
  flexWrap: 'wrap'
}

const dataFormStyle = {
  width: "30%",
  minWidth: 200,
  maxWidth: 300,
  height: '100%',
  paddingRight: 20,
  borderRight: 'thin solid lightblue'
}

const dataVizStyle = {
  paddingTop: 50
}

class App extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Data Visualizer"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div className="appBody" style={appBodyStyle}>
          <div className="dataForm"
               style={dataFormStyle}>
            <DataInputForm/>
          </div>
          <div className="dataViz" style={dataVizStyle}>
            <DataVisualization/>
          </div>
        </div>
      </div>
    )
  }
}

export default App
