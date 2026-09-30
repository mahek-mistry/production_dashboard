import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import TaskCard from '../components/TaskCard';
import {fetchTasks} from '../redux/slices/tasksSlice';
import colors from '../theme/colors';

const TasksScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    tasks,
    loading,
    error,
  } = useSelector(state => state.tasks);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return tasks;
    }

    return tasks.filter(task =>
      task.title?.toLowerCase().includes(searchText),
    );
  }, [tasks, search]);

  const handleRefresh = () => {
    dispatch(fetchTasks());
  };

  const handleRetry = () => {
    dispatch(fetchTasks());
  };

  const renderTask = ({item}) => {
    return (
      <TaskCard
        task={item}
        onPress={() =>
          navigation.navigate('TaskDetails', {
            task: item,
          })
        }
      />
    );
  };

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
          <Text style={styles.helperText}>
            Loading tasks...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>
            Unable to load tasks
          </Text>

          <Text style={styles.errorMessage}>
            {error}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={handleRetry}>
            <Text style={styles.retryButtonText}>
              Retry
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyTitle}>
          No tasks found
        </Text>

        <Text style={styles.helperText}>
          Try searching with another task name.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>
              All Tasks
            </Text>

            <Text style={styles.subHeading}>
              Manage and track your assigned tasks
            </Text>
          </View>

          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>
              Back
            </Text>
          </Pressable>
        </View>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search tasks..."
          placeholderTextColor={colors.secondaryText}
          style={styles.searchInput}
        />

        <View style={styles.resultRow}>
          <Text style={styles.resultText}>
            {filteredTasks.length} task(s) found
          </Text>

          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Text style={styles.clearText}>
                Clear
              </Text>
            </Pressable>
          )}
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={item => String(item.id)}
          renderItem={renderTask}
          contentContainerStyle={[
            styles.listContent,
            filteredTasks.length === 0 &&
              styles.emptyListContent,
          ]}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={handleRefresh}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.black,
  },
  subHeading: {
    marginTop: 5,
    fontSize: 13,
    color: colors.secondaryText,
    maxWidth: 230,
  },
  backButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  searchInput: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.black,
    fontSize: 15,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  clearText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    minHeight: 260,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  helperText: {
    marginTop: 10,
    textAlign: 'center',
    color: colors.secondaryText,
    fontSize: 14,
  },
  errorTitle: {
    color: colors.error,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorMessage: {
    marginTop: 10,
    color: colors.secondaryText,
    fontSize: 14,
    textAlign: 'center',
  },
  emptyTitle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 10,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default TasksScreen;