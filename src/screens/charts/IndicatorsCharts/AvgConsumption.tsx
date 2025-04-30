import React, {use, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  processColor,
  TouchableOpacity,
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import {IndicatorsChartsData} from '../../../data/dummyData';
const screenWidth = Dimensions.get('window').width;

const AvgConsumptionChart = () => {
  const [activeTab, setActiveTab] = useState('Hourly');
  const tabs = ['Hourly', 'Weekly'];
  const data = {
    dataSets: [
      {
        values:
          activeTab === 'Hourly'
            ? IndicatorsChartsData.hourly
            : IndicatorsChartsData.weekly.map(item => ({y: item.value})),
        label: 'Avg Consumption',
        config: {
          color: processColor('rgba(255, 192, 203, 1)'),
          drawValues: false,
        },
      },
    ],
    config: {
      barWidth: 0.5,
    },
  };

  const xAxis = {
    valueFormatter:
      activeTab == 'Hourly'
        ? Array.from({length: 24}, (_, i) => `${i}`)
        : IndicatorsChartsData.weekly.map(item => item.day),
    granularityEnabled: true,
    granularity: 1,
    drawGridLines: false,
    position: 'BOTTOM' as any,
    textColor: processColor('white'),
  };

  const yAxis = {
    left: {
      drawGridLines: true,
      axisMinimum: 0,
      textColor: processColor('white'),
    },
    right: {
      enabled: false,
    },
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
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
      <BarChart
        style={styles.chart}
        data={data}
        xAxis={xAxis}
        yAxis={yAxis}
        chartDescription={{text: ''}}
        legend={{enabled: false}}
        animation={{durationX: 1000}}
        drawValueAboveBar={false}
        drawGridBackground={false}
        marker={{
          enabled: true,
          markerColor: processColor('rgba(255, 255, 255, 1)'),
          textColor: processColor('black'),
          textSize: 12,
        }}
      />
    </View>
  );
};

export default AvgConsumptionChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b132b', // dark background
    padding: 10,
  },
  chart: {
    height: 300,
    width: screenWidth - 25,
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
    color: 'white',
    fontSize: 12,
  },
  activeTabText: {
    color: '#ccc',
  },
});
