import React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colors from '../theme/colors';

const TaskCard = ({task, onPress}) => {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}>
      <View style={styles.topRow}>
        <Text style={styles.taskId}>
          Task #{task.id}
        </Text>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: task.completed
                ? '#DCFCE7'
                : '#FEF3C7',
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              {
                color: task.completed
                  ? '#15803D'
                  : '#B45309',
              },
            ]}>
            {task.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>

      <Text
        style={styles.title}
        numberOfLines={2}>
        {task.title}
      </Text>

      <Text style={styles.userText}>
        Assigned User: {task.userId}
      </Text>

      <Text style={styles.detailsText}>
        View Details →
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  taskId: {
    fontSize: 12,
    color: colors.secondaryText,
    fontWeight: '700',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },

  title: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '700',
    marginTop: 14,
    lineHeight: 23,
    textTransform: 'capitalize',
  },

  userText: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 10,
  },

  detailsText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '800',
    marginTop: 14,
  },
});

export default TaskCard;