import React, {useState} from 'react';

import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useDispatch} from 'react-redux';

import colors from '../theme/colors';

import {updateTaskStatus} from '../redux/slices/tasksSlice';

const TaskDetailsScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  const {task} = route.params;

  const [completed, setCompleted] = useState(
    task.completed,
  );

  const handleStatusUpdate = nextStatus => {
    dispatch(
      updateTaskStatus({
        taskId: task.id,
        completed: nextStatus,
      }),
    );

    setCompleted(nextStatus);

    Alert.alert(
      'Status Updated',
      nextStatus
        ? 'Task marked as completed.'
        : 'Task marked as pending.',
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>
              Back
            </Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            Task Details
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.label}>
            Task ID
          </Text>

          <Text style={styles.value}>
            #{task.id}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>
            Task Title
          </Text>

          <Text style={styles.title}>
            {task.title}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>
            Assigned User
          </Text>

          <Text style={styles.value}>
            User {task.userId}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>
            Current Status
          </Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: completed
                  ? '#DCFCE7'
                  : '#FEF3C7',
              },
            ]}>
            <Text
              style={[
                styles.statusText,
                {
                  color: completed
                    ? '#15803D'
                    : '#B45309',
                },
              ]}>
              {completed ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>
            Update Task Status
          </Text>

          <Pressable
            style={[
              styles.completeButton,
              completed && styles.disabledButton,
            ]}
            disabled={completed}
            onPress={() => handleStatusUpdate(true)}>
            <Text style={styles.completeButtonText}>
              Mark as Completed
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.pendingButton,
              !completed && styles.disabledPendingButton,
            ]}
            disabled={!completed}
            onPress={() => handleStatusUpdate(false)}>
            <Text style={styles.pendingButtonText}>
              Mark as Pending
            </Text>
          </Pressable>
        </View>
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
    alignItems: 'center',
    marginBottom: 24,
  },

  backButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },

  backButtonText: {
    color: colors.primary,
    fontWeight: '700',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 70,
    fontSize: 21,
    fontWeight: '800',
    color: colors.black,
  },

  detailsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  label: {
    fontSize: 13,
    color: colors.secondaryText,
    fontWeight: '600',
    marginBottom: 8,
  },

  value: {
    fontSize: 17,
    color: colors.black,
    fontWeight: '700',
  },

  title: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.black,
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 18,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 13,
    fontWeight: '800',
  },

  actionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  actionTitle: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '800',
    marginBottom: 18,
  },

  completeButton: {
    backgroundColor: colors.success,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  completeButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },

  disabledButton: {
    opacity: 0.45,
  },

  pendingButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  pendingButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },

  disabledPendingButton: {
    opacity: 0.45,
  },
});

export default TaskDetailsScreen;