import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { isEmpty } from 'lodash'

class DataVisualization extends Component {
  componentWillReceiveProps(nextProps) {
    console.log("next props are", nextProps)
  }

  render() {
    const { dataViz } = this.props
    if (isEmpty(dataViz)) {
      return <div/>
    }
    const domain = JSON.parse(dataViz.domain)
    const range = JSON.parse(dataViz.range)
    const data = domain.map((domainDatum, index) => {
      return { domain: domainDatum, range: range[index] }
    })

    return (
      <LineChart width={600} height={300} data={data}
                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="domain"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="range" stroke="green"/>
      </LineChart>
    )
  }
}

const mapStateToProps = ({ dataViz }) => ({ dataViz })

export default connect(mapStateToProps)(DataVisualization)
