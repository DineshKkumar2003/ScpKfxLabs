import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  processColor,
  TouchableWithoutFeedback,
} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import {lineChart} from '../../data/dummyData';
console.log(lineChart);

const {width} = Dimensions.get('window');

const WaterLevelChart = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const tabs = ['Today', 'Custom'];

  // Transform data for React Native Charts Wrapper
  const chartData = {
    dataSets: [
      {
        values:
          activeTab === 'Today'
            ? lineChart.today.map(item => ({y: item.value}))
            : lineChart.custom.map(item => ({y: item.value})),
        label: 'Water Level',
        config: {
          color: processColor('rgb(104, 214, 241)'),
          lineWidth: 1.5,
          drawCircles: false,
          drawFilled: true,
          fillColor: processColor('rgba(104, 214, 241, 0.1)'),
          fillAlpha: 100,
          highlightColor: processColor('white'),
          drawHorizontalHighlightIndicator: false,
          drawVerticalHighlightIndicator: false,
          drawValues: false,
          mode: 'CUBIC_BEZIER' as any,
        },
      },
    ],
  };

  const xAxis = {
    valueFormatter:
      activeTab === 'Today'
        ? lineChart.today.map(item => item.time)
        : lineChart.custom.map(item => item.time),
    granularityEnabled: true,
    granularity: 1,
    position: 'BOTTOM' as any,
    textColor: processColor('rgba(255, 255, 255, 0.7)'),
    textSize: 11,
    gridColor: processColor('rgba(255, 255, 255, 0.2)'),
    gridLineWidth: 0.5,
    drawGridLines: true,
    drawAxisLine: false,
    avoidFirstLastClipping: true,
  };

  const yAxis = {
    left: {
      axisMinimum: 0,
      axisMaximum: 100,
      textColor: processColor('rgba(255, 255, 255, 0.7)'),
      textSize: 11,
      gridColor: processColor('rgba(255, 255, 255, 0.2)'),
      gridLineWidth: 0.75,
      drawGridLines: true,
      drawAxisLine: false,
      labelCount: 2,
    },
    right: {
      enabled: false,
    },
  };

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
        <LineChart
          style={styles.chart}
          data={chartData}
          xAxis={xAxis}
          yAxis={yAxis}
          chartDescription={{text: ''}}
          legend={{enabled: false}}
          drawGridBackground={false}
          borderColor={processColor('rgba(255, 255, 255, 0.2)')}
          borderWidth={0}
          drawBorders={false}
          touchEnabled={true}
          dragEnabled={true}
          scaleEnabled={true}
          scaleXEnabled={true}
          scaleYEnabled={false}
          pinchZoom={true}
          doubleTapToZoomEnabled={false}
          dragDecelerationEnabled={true}
          dragDecelerationFrictionCoef={0.99}
          keepPositionOnRotation={false}
          animation={{
            durationX: 1000,
            durationY: 1000,
            easingX: 'EaseInOutQuart',
            easingY: 'EaseInOutQuart',
          }}
          marker={{
            enabled: true,
            markerColor: processColor('rgba(255, 255, 255, 0.3)'),
            textColor: processColor('white'),
            textSize: 12,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1429',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    height: 260,
    marginTop: 20,
  },
  chart: {
    flex: 1,
  },
});

export default WaterLevelChart;
