import React, {useMemo, useState} from 'react';

import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';

import colors from '../theme/colors';

import {clearLoginSession} from '../storage/storage';

import {logout} from '../redux/slices/authSlice';

import {fetchTasks} from '../redux/slices/tasksSlice';

const DashboardScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const email = useSelector(state => state.auth.email);

  const tasks = useSelector(state => state.tasks.tasks);

  const tasksLoading = useSelector(state => state.tasks.loading);

  const [refreshing, setRefreshing] = useState(false);

  const analytics = useMemo(() => {
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      task => task.completed === true,
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    const completionRate =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
    };
  }, [tasks]);

  const handleRefresh = async () => {
    setRefreshing(true);

    await dispatch(fetchTasks());

    setRefreshing(false);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await clearLoginSession();

            dispatch(logout());

            navigation.replace('Login');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || tasksLoading}
            onRefresh={handleRefresh}
          />
        }>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.smallText}>
              Production Dashboard
            </Text>

            <Text style={styles.title}>
              Hello, Mahek 👋
            </Text>

            <Text style={styles.email}>
              {email || 'Welcome back'}
            </Text>
          </View>

          <Pressable
            style={styles.profileButton}
            onPress={handleLogout}>
            <Text style={styles.profileText}>
              M
            </Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Overview
          </Text>

          <Text style={styles.todayText}>
            Live Data
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              Total Tasks
            </Text>

            <Text style={styles.cardValue}>
              {analytics.totalTasks}
            </Text>

            <Text style={styles.cardDescription}>
              All assigned tasks
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              Completed
            </Text>

            <Text
              style={[
                styles.cardValue,
                {color: colors.success},
              ]}>
              {analytics.completedTasks}
            </Text>

            <Text style={styles.successText}>
              Tasks finished
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              Pending
            </Text>

            <Text
              style={[
                styles.cardValue,
                {color: '#D97706'},
              ]}>
              {analytics.pendingTasks}
            </Text>

            <Text style={styles.warningText}>
              Need attention
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              Completion Rate
            </Text>

            <Text
              style={[
                styles.cardValue,
                {color: colors.primary},
              ]}>
              {analytics.completionRate}%
            </Text>

            <Text style={styles.infoText}>
              Overall progress
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.sectionTitle}>
              Task Progress
            </Text>

            <Text style={styles.progressPercent}>
              {analytics.completionRate}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${analytics.completionRate}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.progressDescription}>
            {analytics.completedTasks} of{' '}
            {analytics.totalTasks} tasks completed.
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>

          <Pressable
            style={styles.primaryActionButton}
            onPress={() => navigation.navigate('Analytics')}>
            <Text style={styles.primaryActionText}>
              View Analytics
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryActionButton}
            onPress={() => navigation.navigate('Tasks')}>
            <Text style={styles.secondaryActionText}>
              View All Tasks
            </Text>
          </Pressable>
        </View>

        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>
            Recent Activity
          </Text>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>
                ✓
              </Text>
            </View>

            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>
                Task data loaded
              </Text>

              <Text style={styles.activityDescription}>
                Tasks received from API
              </Text>
            </View>

            <Text style={styles.activityTime}>
              Live
            </Text>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>
                +
              </Text>
            </View>

            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>
                Redux state updated
              </Text>

              <Text style={styles.activityDescription}>
                Dashboard metrics recalculated
              </Text>
            </View>

            <Text style={styles.activityTime}>
              Live
            </Text>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>
                ↻
              </Text>
            </View>

            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>
                Data refresh available
              </Text>

              <Text style={styles.activityDescription}>
                Pull down to reload tasks
              </Text>
            </View>

            <Text style={styles.activityTime}>
              Now
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}>
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  headerTextContainer: {
    flex: 1,
    marginRight: 12,
  },

  smallText: {
    fontSize: 13,
    color: colors.secondaryText,
    marginBottom: 6,
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: colors.black,
  },

  email: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 6,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.black,
  },

  todayText: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '700',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  cardLabel: {
    fontSize: 13,
    color: colors.secondaryText,
  },

  cardValue: {
    fontSize: 29,
    fontWeight: '800',
    color: colors.black,
    marginTop: 12,
  },

  cardDescription: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 8,
  },

  successText: {
    fontSize: 11,
    color: colors.success,
    marginTop: 8,
  },

  warningText: {
    fontSize: 11,
    color: '#D97706',
    marginTop: 8,
  },

  infoText: {
    fontSize: 11,
    color: colors.primary,
    marginTop: 8,
  },

  progressContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 8,
    marginBottom: 24,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressPercent: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },

  progressBackground: {
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.border,
    overflow: 'hidden',
    marginTop: 16,
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },

  progressDescription: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 12,
  },

  actionContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },

  primaryActionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 18,
  },

  primaryActionText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },

  secondaryActionButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  secondaryActionText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },

  activityContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activityIconText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },

  activityContent: {
    flex: 1,
    marginLeft: 12,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },

  activityDescription: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 4,
  },

  activityTime: {
    fontSize: 11,
    color: '#94A3B8',
  },

  logoutButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },

  logoutText: {
    color: colors.error,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default DashboardScreen;