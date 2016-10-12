import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Link Shortener"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </div>
    )
  }
}

export default App
