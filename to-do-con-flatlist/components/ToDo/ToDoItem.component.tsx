import { ToDo } from "@/Types/ToDo";
import { Pressable, Text, View } from "react-native";

export interface ToDoItemsProps {
    todo: ToDo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit?: (id: string, newText: string) => void;
}

const ToDoItem : React.FC<ToDoItemsProps> = ({todo, onToggle, onDelete}) => {
  return (
    <Pressable
    onPress={() => onToggle(todo.id)}
    onLongPress={() => onDelete(todo.id)}
    delayLongPress={500}
    style={({pressed}) => [
      {opacity: pressed ? 0.6 : 1},
      { backgroundColor: todo.completed ? '#f0f0f0' : '#fff'}
      ]}
      >
       
       <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
       <View
          style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: todo.completed ? '#4CAF50' : '#ccc',
          backgroundColor: todo.completed ? '#4CAF50' : 'transparent',
          marginRight: 12,
          justifyContent: 'center',
          alignItems: 'center'
          }}
          >
            {todo.completed && (
              <Text style={{color: '#fff', fontWeight: 'bold'}}>✓</Text>
            )}
        </View>

        <Text
          style={{
            fontSize: 16,
            textDecorationLine: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#888' : '#000'
          }}
        >
          {todo.text}
        </Text>
      </View>

    </Pressable>
  )
}

export default ToDoItem;
