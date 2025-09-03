import { ToDo, ToDoFilter } from '@/Types/ToDo';
import ToDoItem from '@/components/ToDo/ToDoItem.component';
import { useToDoStorage } from '@/hooks/ToDo/useToDoStorage';
import { Button } from '@react-navigation/elements';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [todos, setTodos] = useState<ToDo[]>([]); 
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState<ToDoFilter>('all');
  const { saveToDo, loadToDo } = useToDoStorage();

  // Cargar todos al iniciar
  useEffect(() => {
    async function inicializarToDo() {
      const loadedToDo = await loadToDo();
      console.log('Tareas cargadas:', loadedToDo);
      setTodos(loadedToDo);
    }
    inicializarToDo();
  }, [loadToDo]);
  
  // Guardar cuando cambien los todos
  useEffect(() => {
    if (todos.length > 0) {
      saveToDo(todos);
    }
  }, [todos, saveToDo]); 

  const handleAddToDo = () => {
    console.log('Input text:', inputText); 
    const trimmedText = inputText.trim();
    console.log('Trimmed text:', trimmedText); 
    
    if (!trimmedText) {
      console.log('Texto vacío, no se agrega');
      return;
    };

    const newToDo: ToDo = {
      id: Date.now().toString(),
      text: trimmedText,
      completed: false,
      createDate: new Date()
    };

    console.log('Nuevo todo:', newToDo); 
    setTodos(prev => [...prev, newToDo]);
    setInputText('');
  };

  const handleToggleToDo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo 
    ));
  };

  const handleDeleteToDo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredToDo = todos.filter(todo => { 
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  }); 

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      
      {/* Input section */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe una tarea..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            marginRight: 8
          }}
        />
        <Button title='Agregar' onPress={handleAddToDo} />
      </View>

      {/* Contadores */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <Text>Total: {todos.length}</Text>
        <Text>Activas: {todos.filter(t => !t.completed).length}</Text>
        <Text>Completadas: {todos.filter(t => t.completed).length}</Text>
      </View>

      {/* Filtros */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        {(['all', 'active', 'completed'] as ToDoFilter[]).map(f => (
          <Button
            key={f}
            title={f}
            onPress={() => setFilter(f)}
            color={filter === f ? '#007AFF' : '#ccc'}
          />
        ))}
      </View>

      {/* Lista */}
      <FlatList
        data={filteredToDo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log('Renderizando item:', item);
          return (
            <ToDoItem
              todo={item}  // ← IMPORTANTE: "todo" no "ToDo"
              onToggle={handleToggleToDo}
              onDelete={handleDeleteToDo}
            />
          );
        }}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No hay tareas. ¡Agrega una!
          </Text>
        )}
      />
    </View>
  );
}