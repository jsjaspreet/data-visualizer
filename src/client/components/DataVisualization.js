import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { isEmpty, times } from 'lodash'

class DataVisualization extends Component {
  componentWillReceiveProps(nextProps) {
    console.log("next props are", nextProps)
  }

  render() {
    const { dataViz } = this.props
    if (isEmpty(dataViz)) {
      return <div/>
    }
    const numRanges = dataViz.rangeAdditions.length + 1
    const domain = JSON.parse(dataViz.domain)
    const ranges = []
    times(numRanges, (index) => {
      ranges.push(JSON.parse(dataViz[`range${index}`]))
    })

    const data = domain.map((domainDatum, index) => {
      const entry = { domain: domainDatum }
      times(numRanges, (rangeIndex) => {
        const rangeKey = `range${rangeIndex}`
        entry[rangeKey] = ranges[rangeIndex][index]
      })
      return entry
    })

    const Lines = []
    _.times(numRanges, (index) => Lines.push(<Line key={index} type="monotone" dataKey={`range${index}`}
                                                   stroke="green"/>))

    return (
      <LineChart width={600} height={300} data={data}
                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="domain"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        {
          Lines
        }

      </LineChart>
    )
  }
}

const mapStateToProps = ({ dataViz }) => ({ dataViz })

export default connect(mapStateToProps)(DataVisualization)
