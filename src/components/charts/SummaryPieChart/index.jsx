import {
  PieChart, Pie, Tooltip, Cell,
} from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';
import LockedContent from '../LockedContent';
import helper from '../helper';
import './SummaryPieChart.css';

class SummaryPieChart extends React.Component {
  getItemColor(index) {
    const useTwoColors = this.props.data.length === 2;
    if (useTwoColors) {
      return helper.getCategoryColorFrom2Colors(index);
    }
    if (this.props.useCustomizedColorMap) {
      return this.props.customizedColorMap[index % this.props.customizedColorMap.length];
    }
    return helper.getCategoryColor(index);
  }

  render() {
    const pieChartData = helper.calculateChartData(
      this.props.data,
      this.props.showPercentage,
      this.props.percentageFixedPoint,
    );
    const dataKey = helper.getDataKey(this.props.showPercentage);

    return (
      <div className='summary-pie-chart'>
        <div className='summary-pie-chart__title-box'>
          <p className='summary-pie-chart__title h4-typo'>{this.props.title}</p>
        </div>
        {
          helper.shouldHideChart(this.props.data, this.props.lockValue)
            ? <LockedContent lockMessage={this.props.lockMessage} /> : (
              <div className='summary-pie-chart__body'>
                <div className='summary-pie-chart__legend'>
                  {
                    pieChartData.map(entry => (
                      <div className='summary-pie-chart__legend-item' key={'text'.concat(entry.name)}>
                        <div className='summary-pie-chart__legend-item-name'>
                          {entry.name}
                        </div>
                        <div className='summary-pie-chart__legend-item-value form-special-number'>
                          {
                            helper.percentageFormatter(this.props.showPercentage)(entry[dataKey])
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
                <PieChart
                  width={this.props.outerRadius * 2}
                  height={this.props.outerRadius * 2}
                  style={this.props.pieChartStyle}
                >
                  <Pie
                    dataKey={dataKey}
                    isAnimationActive={false}
                    data={pieChartData}
                    innerRadius={this.props.innerRadius}
                    outerRadius={this.props.outerRadius}
                    fill={this.props.pieChartStyle.fill}
                  >
                    {
                      pieChartData.map((entry, index) => (
                        <Cell
                          key={dataKey}
                          dataKey={dataKey}
                          fill={this.getItemColor(index)}
                        />
                      ))
                    }
                  </Pie>
                  <Tooltip formatter={helper.percentageFormatter(this.props.showPercentage)} />
                </PieChart>
              </div>
            )
        }
      </div>
    );
  }
}

const ChartDataShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

SummaryPieChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ChartDataShape).isRequired,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  showPercentage: PropTypes.bool,
  percentageFixedPoint: PropTypes.number,
  pieChartStyle: PropTypes.object,
  lockValue: PropTypes.number, // if one of the value is equal to `lockValue`, lock the chart
  lockMessage: PropTypes.string,
  useCustomizedColorMap: PropTypes.bool,
  customizedColorMap: PropTypes.arrayOf(PropTypes.string),
};

SummaryPieChart.defaultProps = {
  innerRadius: 31.5,
  outerRadius: 43,
  showPercentage: true,
  percentageFixedPoint: 2,
  pieChartStyle: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '22px',
    fill: '#8884d8',
  },
  lockValue: -1,
  lockMessage: 'This chart is hidden because it contains fewer than 1000 subjects',
  useCustomizedColorMap: false,
  customizedColorMap: ['#3283c8'],
};

export default SummaryPieChart;
