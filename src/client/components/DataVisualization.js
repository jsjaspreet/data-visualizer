import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { isEmpty, times } from 'lodash'
import chroma from 'chroma-js'

// Use a preset color scheme provided by chroma for specifically qualitative data
const colorScale = chroma.scale('Dark2')

class DataVisualization extends Component {
  render() {
    const { dataViz } = this.props
    // If we have not inputted any data, return no component for react
    if (isEmpty(dataViz)) {
      return null
    }
    // Compute number of ranges, parse domain and ranges since they are passed as strings
    const numRanges = dataViz.rangeAdditions.length + 1
    const domain = JSON.parse(dataViz.domain)
    const ranges = []
    // For each range string, parse and add to a range collection
    times(numRanges, (index) => {
      ranges.push(JSON.parse(dataViz[`range${index}`]))
    })

    // Zip up the data into a format that Recharts will handle
    const data = domain.map((domainDatum, index) => {
      // For each domain
      const entry = { domain: domainDatum }
      // Zip it with the number of ranges that it is associated with
      times(numRanges, (rangeIndex) => {
        const rangeKey = `range${rangeIndex}`
        entry[rangeKey] = ranges[rangeIndex][index]
      })
      return entry
    })

    // Construct the Line components to render multiple lines when there are multiple data inputs
    const Lines = []
    _.times(numRanges, (index) => Lines.push(<Line key={index}
                                                   type="monotone"
                                                   dataKey={`range${index}`}
                                                   strokeWidth={2}
                                                   stroke={
                                                     colorScale((1 + index) / numRanges)
                                                       .hex()
                                                   }/>))

    // Render a line chart
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
