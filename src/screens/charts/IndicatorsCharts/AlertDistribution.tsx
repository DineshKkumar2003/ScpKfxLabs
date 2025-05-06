import React from 'react';
import {StyleSheet, View, Text, processColor} from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';

const AlertDistribution = () => {
  const pieData = {
    dataSets: [
      {
        values: [{value: 445, label: 'Overflow'}],
        label: '',
        config: {
          colors: [processColor('#5AC8FA')], // light blue
          valueTextSize: 0, // hide percentage value on slice
          sliceSpace: 0,
          selectionShift: 0,
        },
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.customText}>Custom</Text>
      </View>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <PieChart
          style={styles.chart}
          data={pieData}
          legend={{enabled: false}}
          chartDescription={{text: ''}}
          usePercentValues={false}
          holeRadius={0}
          transparentCircleRadius={0}
          rotationEnabled={false}
          drawEntryLabels={false}
        />

        {/* Label */}
        <Text style={styles.label}>
          Overflow: <Text style={styles.labelValue}>445</Text>
        </Text>
      </View>
    </View>
  );
};

export default AlertDistribution;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // dark background
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 10,
    //zIndex: 2,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  customText: {
    color: 'black',
    fontSize: 14,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    width: 200,
    height: 200,
  },
  label: {
    color: 'black',
    fontSize: 16,
    marginTop: 12,
  },
  labelValue: {
    color: 'black',
    fontWeight: '600',
  },
});
