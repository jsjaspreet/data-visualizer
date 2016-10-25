import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

class App extends Component {
  render() {
    return (
      <div className="data-viz-app">
        <AppBar
          title="Data Visualizer"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </div>
    )
  }
}

export default App
