//Interfaz base 

export interface ToDo {
    id: string;
    text: string;
    completed: boolean;
    createDate: Date;
    
}

export type ToDoFilter = 'all' | 'active' | 'completed'