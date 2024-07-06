import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TaskItem = ({ task, toggleTaskStatus, deleteTask }) => {
  const handleToggleStatus = () => {
    toggleTaskStatus(task.id);
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  return (
    <View style={[styles.taskContainer, task.status ? styles.taskComplete : null]}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <TouchableOpacity onPress={handleToggleStatus}>
        <Text style={[styles.statusButton, task.status ? styles.statusDone : styles.statusDue]}>
          {task.status ? 'Done' : 'Due'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteTask}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  taskComplete: {
    backgroundColor: '#C8E6C9',
  },
  taskTitle: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  statusButton: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  statusDone: {
    color: 'green',
    backgroundColor: '#DFF0D8',
  },
  statusDue: {
    color: 'blue',
    backgroundColor: '#D1ECF1',
  },
  deleteButton: {
    color: 'red',
  },
});

export default TaskItem;
