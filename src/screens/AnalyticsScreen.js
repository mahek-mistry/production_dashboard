import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../theme/colors';

const {width} = Dimensions.get('window');

const AnalyticsScreen = ({navigation}) => {
  const {tasks, loading} = useSelector(state => state.tasks);

  const analytics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      completionRate,
    };
  }, [tasks]);

  const chartData = [
    {
      label: 'Completed',
      value: analytics.completed,
    },
    {
      label: 'Pending',
      value: analytics.pending,
    },
  ];

  const maxValue = Math.max(
    analytics.completed,
    analytics.pending,
    1,
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>
            Task performance overview
          </Text>
        </View>

        <Text
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          Back
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Tasks</Text>
          <Text style={styles.metricValue}>
            {loading ? '...' : analytics.total}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Completed</Text>
          <Text style={[styles.metricValue, styles.successText]}>
            {loading ? '...' : analytics.completed}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Pending</Text>
          <Text style={[styles.metricValue, styles.pendingText]}>
            {loading ? '...' : analytics.pending}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Completion</Text>
          <Text style={styles.metricValue}>
            {loading ? '...' : `${analytics.completionRate}%`}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Completion Rate</Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {width: `${analytics.completionRate}%`},
            ]}
          />
        </View>

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            {analytics.completed} completed
          </Text>

          <Text style={styles.progressText}>
            {analytics.completionRate}%
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Task Status</Text>

        <View style={styles.chart}>
          {chartData.map(item => {
            const barHeight =
              (item.value / maxValue) * 160;

            return (
              <View style={styles.barItem} key={item.label}>
                <Text style={styles.barValue}>
                  {item.value}
                </Text>

                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {height: Math.max(barHeight, 5)},
                    ]}
                  />
                </View>

                <Text style={styles.barLabel}>
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Performance Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Total workload
          </Text>
          <Text style={styles.summaryValue}>
            {analytics.total} tasks
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Completed work
          </Text>
          <Text style={styles.summaryValue}>
            {analytics.completed} tasks
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Remaining work
          </Text>
          <Text style={styles.summaryValue}>
            {analytics.pending} tasks
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Completion rate
          </Text>
          <Text style={styles.summaryValue}>
            {analytics.completionRate}%
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.black,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: colors.secondaryText,
  },

  backButton: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
    padding: 8,
  },

  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  metricCard: {
    width: (width - 52) / 2,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  metricLabel: {
    fontSize: 13,
    color: colors.secondaryText,
    marginBottom: 8,
  },

  metricValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },

  successText: {
    color: colors.success,
  },

  pendingText: {
    color: '#F59E0B',
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.black,
    marginBottom: 20,
  },

  progressBackground: {
    height: 14,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  progressText: {
    fontSize: 13,
    color: colors.secondaryText,
    fontWeight: '600',
  },

  chart: {
    height: 230,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingTop: 10,
  },

  barItem: {
    width: 100,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  barValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.black,
    marginBottom: 6,
  },

  barContainer: {
    height: 160,
    width: 48,
    justifyContent: 'flex-end',
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    overflow: 'hidden',
  },

  bar: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },

  barLabel: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 8,
    fontWeight: '600',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  summaryLabel: {
    fontSize: 14,
    color: colors.secondaryText,
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
});

export default AnalyticsScreen;