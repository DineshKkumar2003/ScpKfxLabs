import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Svg, {
  Rect,
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const {width} = Dimensions.get('window');
const chartWidth = width - 40;
const chartHeight = 220;
const paddingLeft = 50;
const paddingRight = 20;
const paddingTop = 20;
const paddingBottom = 40;
const graphWidth = chartWidth - paddingLeft - paddingRight;
const graphHeight = chartHeight - paddingTop - paddingBottom;

const data = [
  {time: '05:00', value: -7000},
  {time: '06:00', value: -2000},
  {time: '07:00', value: -1800},
  {time: '08:00', value: 5000},
  {time: '09:00', value: 8000},
  {time: '10:00', value: -2000},
];

const InflowOutflowChart = () => {
  const [activeTab, setActiveTab] = React.useState('Daily');
  const tabs = ['Today', 'Daily', 'Weekly', 'Monthly', 'Custom'];

  // Find min and max values for scaling
  const maxPositive = Math.max(
    10000,
    ...data.map(d => (d.value > 0 ? d.value : 0)),
  );
  const minNegative = Math.min(
    -10000,
    ...data.map(d => (d.value < 0 ? d.value : 0)),
  );
  const totalRange = maxPositive - minNegative;

  // Calculate midpoint for y-axis
  const zeroY = paddingTop + (maxPositive / totalRange) * graphHeight;

  // Calculate width for each bar
  const barCount = data.length;
  const barWidth = graphWidth / barCount - 10;

  // Calculate positions for each bar
  const bars = data.map((item, index) => {
    const barX = paddingLeft + index * (graphWidth / barCount) + 5;
    const value = item.value;
    const isPositive = value >= 0;

    // Calculate height and position
    const barHeight = Math.abs(value / totalRange) * graphHeight;
    const barY = isPositive ? zeroY - barHeight : zeroY;

    return {
      x: barX,
      y: barY,
      width: barWidth,
      height: barHeight,
      color: isPositive ? '#a9c8e6' : '#d89c9c',
      time: item.time,
      value,
    };
  });

  // Y-axis ticks
  const yTicks = [-10000, -5000, 0, 5000, 10000];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <LinearGradient id="posGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#a9c8e6" stopOpacity="1" />
              <Stop offset="1" stopColor="#a9c8e6" stopOpacity="0.2" />
            </LinearGradient>
            <LinearGradient id="negGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#d89c9c" stopOpacity="1" />
              <Stop offset="1" stopColor="#d89c9c" stopOpacity="0.2" />
            </LinearGradient>
          </Defs>

          {/* Horizontal grid lines and y-axis labels */}
          {yTicks.map(tick => {
            const y =
              paddingTop + ((maxPositive - tick) / totalRange) * graphHeight;
            return (
              <React.Fragment key={`y-tick-${tick}`}>
                <Line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="#333b4d"
                  strokeWidth="1"
                />
                <SvgText
                  x={paddingLeft - 10}
                  y={y + 5}
                  fontSize="12"
                  fill="#8c9db8"
                  textAnchor="end">
                  {tick === 0
                    ? '0'
                    : tick > 0
                    ? tick.toLocaleString()
                    : tick.toLocaleString()}
                </SvgText>
              </React.Fragment>
            );
          })}

          {/* Vertical grid lines */}
          {data.map((item, i) => {
            const x =
              paddingLeft + i * (graphWidth / barCount) + barWidth / 2 + 5;
            return (
              <Line
                key={`grid-${i}`}
                x1={x}
                y1={paddingTop}
                x2={x}
                y2={paddingTop + graphHeight}
                stroke="#333b4d"
                strokeWidth="1"
              />
            );
          })}

          {/* Bars */}
          {bars.map((bar, i) => (
            <React.Fragment key={`bar-${i}`}>
              <Rect
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={
                  bar.value >= 0 ? 'url(#posGradient)' : 'url(#negGradient)'
                }
                stroke={bar.color}
                strokeWidth="1"
              />

              {/* X-axis labels */}
              <SvgText
                x={bar.x + bar.width / 2}
                y={chartHeight - 10}
                fontSize="12"
                fill="#8c9db8"
                textAnchor="middle">
                {bar.time}
              </SvgText>
            </React.Fragment>
          ))}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001c5c',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4d8fff',
  },
  tabText: {
    color: '#8c9db8',
    fontSize: 12,
  },
  activeTabText: {
    color: '#fff',
  },
  chartContainer: {
    height: chartHeight,
    marginTop: 10,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

export default InflowOutflowChart;
