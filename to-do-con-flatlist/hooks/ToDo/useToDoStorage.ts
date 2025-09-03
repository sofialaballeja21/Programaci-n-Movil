//Hook de persistencia
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { ToDo } from '../../Types/ToDo';

export const useToDoStorage = () => {


const saveToDo = useCallback(async (todosToSave: ToDo[]) => {
  try {
    const jsonValue = JSON.stringify(todosToSave);
    await AsyncStorage.setItem('@todos', jsonValue);
  } catch (error) {
    console.error('Error saving todos');
  }
}, []); 

  const loadToDo = useCallback(async (): Promise<ToDo[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem('@todos');
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading todos');
      return [];
    }
  }, []);

    return { saveToDo, loadToDo}
}