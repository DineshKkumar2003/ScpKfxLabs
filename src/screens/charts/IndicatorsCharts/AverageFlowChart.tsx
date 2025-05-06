import {processColor, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

import {outFlowData} from '../../../data/dummyData';
import {InFlowData} from '../../../data/dummyData';
const AverageFlowChart = () => {
  const [activeTab, setActiveTab] = useState('Minutes');
  const tabs = ['Minutes', 'Hours', 'Custom'];
  const chartdata = {
    dataSets: [
      {
        values:
          activeTab === 'Minutes'
            ? outFlowData.minutes.map(item => ({y: item.value}))
            : outFlowData.hours.map(item => ({y: item.value})),
        label: 'OutFlow',
        config: {
          color: processColor('red'),
          lineWidth: 2,
          // mode: 'CUBIC_BEZIER' as any,
          drawValues: false,
          drawCircles: false,
          drawHorizontalHighlightIndicator: false,
          drawVerticalHighlightIndicator: false,
        },
      },
      {
        values:
          activeTab === 'Minutes'
            ? InFlowData.minutes.map(item => ({y: item.value}))
            : InFlowData.hours.map(item => ({y: item.value})),
        label: 'Inflow',
        config: {
          color: processColor('green'),
          lineWidth: 2,
          // mode: 'CUBIC_BEZIER' as any,
          drawValues: false,
          drawCircles: false,
          drawHorizontalHighlightIndicator: false,
          drawVerticalHighlightIndicator: false,
        },
      },
    ],
  };
  const xAxis = {
    valueFormatter: outFlowData.hours.map(item => item.time),
    granularityEnabled: true,
    granularity: 1,
    position: 'BOTTOM' as any,
    textColor: processColor('black'),
    textSize: 12,
    gridColor: processColor('black'),
    gridLineWidth: 1,
    drawGridLines: false,
    drawAxisLine: false,
    avoidFirstLastClipping: true,
  };
  const yAxis = {
    left: {
      axisMinimum: 0,
      /// axisMaximum: 3000,
      textColor: processColor('black'),
      textSize: 12,
      gridColor: processColor('black'),
      gridLineWidth: 1,
      drawGridLines: true,
      drawAxisLine: false,
      labelCount: 3,
    },
    right: {
      enabled: false,
    },
  };

  return (
    <View style={styles.container}>
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
      <View style={{flex: 1, height: 220}}>
        <LineChart
          style={styles.chart}
          data={chartdata}
          xAxis={xAxis}
          yAxis={yAxis}
          chartDescription={{text: ''}}
          legend={{
            enabled: false,
          }}
          marker={{
            enabled: true,
            markerColor: processColor('white'),
            textColor: processColor('black'),
            textSize: 14,
          }}
          drawGridBackground={false}
          borderColor={processColor('rgba(255, 255, 255, 0.2)')}
          borderWidth={1}
          drawBorders={false}
          touchEnabled={true}
          dragEnabled={true}
          scaleEnabled={true}
          scaleXEnabled={true}
          scaleYEnabled={true}
          autoScaleMinMaxEnabled={true}
          pinchZoom={true}
          doubleTapToZoomEnabled={true}
          highlightPerTapEnabled={true}
          highlightPerDragEnabled={false}
          animation={{
            durationX: 1500,
            durationY: 1500,
            easingX: 'EaseInOutQuart',
            easingY: 'EaseInOutQuart',
          }}
        />
      </View>
    </View>
  );
};

export default AverageFlowChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // dark background
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10,

    zIndex: 2,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    color: '#grey',
    fontSize: 14,
    fontWeight: '400',
  },
  activeTabText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  chart: {
    flex: 1,
  },
});
