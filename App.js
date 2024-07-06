import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from './firebase';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const fetchedTasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTasks(fetchedTasks);
  };

  const addTask = async () => {
    if (taskTitle.trim()) {
      const docRef = await addDoc(collection(db, 'tasks'), {
        title: taskTitle,
        status: false
      });
      setTasks([...tasks, { id: docRef.id, title: taskTitle, status: false }]);
      setTaskTitle('');
    }
  };

  const toggleTaskStatus = async (id) => {
    const task = tasks.find(task => task.id === id);
    await updateDoc(doc(db, 'tasks', id), {
      status: !task.status
    });
    setTasks(tasks.map(task => task.id === id ? { ...task, status: !task.status } : task));
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>ToDo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask} disabled={!taskTitle.trim()}>
          <Text style={styles.addButtonText}>ADD TASK</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={[styles.taskTitle, item.status ? styles.taskDone : styles.taskDue]}>{item.title}</Text>
            <TouchableOpacity onPress={() => toggleTaskStatus(item.id)}>
              <Text style={[styles.statusButton, item.status ? styles.statusDone : styles.statusDue]}>
                {item.status ? 'Done' : 'Due'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B95CF4',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  addButton: {
    backgroundColor: 'purple',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 10,
  },
  taskTitle: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  taskDue: {
    textDecorationLine: 'none',
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  statusButton: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    textAlign: 'center',
  },
  statusDue: {
    color: '#007BFF',
    backgroundColor: '#D1ECF1',
  },
  statusDone: {
    color: 'green',
    backgroundColor: '#DFF0D8',
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
});

export default App;
