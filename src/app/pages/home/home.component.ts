import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'


import { Task } from './../../models/task.model';

export enum Filters {
  All = 'all',
  Completed = 'completed',
  Pending = 'pending'
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  tasks = signal<Task[]>([
    {
      id: uuidv4(),
      title: 'Crear proyecto',
      completed: true
    },
    {
      id: uuidv4(),
      title: 'Crear componenentes',
      completed: false
    }
  ]);

  //filter = signal<'all' | 'pending' | 'completed'>('all');

  Filters = Filters

  filter = signal<Filters>(Filters.All)

  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  })
  // changeHandler(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const newTask = input.value;
  //   this.addTask(newTask);
  // }

  // addTask(title: string) {
  //   this.tasks.update(prevState => [...prevState, title]);
  // }

  // deleteTask(id: number) {
  //   this.tasks.update((tasks) => tasks.filter((_, i) => i !== id));
  // }

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^(?!\s*$).+/),
      Validators.minLength(3),
    ]
  });

  // changeHandler(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const newTask = input.value;
  //   this.addTask(newTask);


  // }

  changeHandler(): void {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }


  // addTask(title: string) {
  //   const newTask = {
  //     id: Date.now(),
  //     title,
  //     completed: false
  //   }
  //   this.tasks.update(prevState => [...prevState, newTask]);
  // }

  addTask(title: string) {
    const newTask = {
      id: uuidv4(), // Usa uuid para generar un id único
      title,
      completed: false
    };
    this.tasks.update(prevState => [...prevState, newTask]);
  }

  // deleteTask(id: number) {
  //     this.tasks.update((tasks) => tasks.filter((_, i) => i !== id));
  //    }

  deleteTask(id: string) { // Cambia el tipo de number a string
    this.tasks.update((tasks) => tasks.filter(task => task.id !== id));
  }

  // updateTask(id: number) {

  //   this.tasks.update(prevState => {
  //     return prevState.map((task, position) => {
  //       if (position === id) {
  //         return {
  //           ...task,
  //           completed: !task.completed
  //         }
  //       }
  //       return task;
  //     })
  //   });

  //   // this.tasks.mutate(state => {
  //   //   const currentTask = state[id];
  //   //   state[id] = {
  //   //     ...currentTask,
  //   //     completed: !currentTask.completed
  //   //   }
  //   // })
  // }

  updateTask(id: string) { // Cambia el tipo de number a string
    this.tasks.update(prevState => {
      return prevState.map(task => {
        if (task.id === id) { // Compara con id en lugar de index
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      });
    });
  }

  // updateTaskEditingMode(id: number) {
  //   this.tasks.update(prevState => {
  //     return prevState.map((task, position) => {
  //       if (position === id) {
  //         return {
  //           ...task,
  //           editing: true
  //         }
  //       }
  //       return {
  //         ...task,
  //         editing: false
  //       };
  //     })
  //   });
  // }

  updateTaskEditingMode(id: string) { // Cambia el tipo de number a string
    this.tasks.update(prevState => {
      return prevState.map(task => {
        if (task.id === id) { // Compara con id en lugar de index
          return {
            ...task,
            editing: true
          };
        }
        return {
          ...task,
          editing: false
        };
      });
    });
  }

  // updateTaskText(id: number, event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   this.tasks.update(prevState => {
  //     return prevState.map((task, position) => {
  //       if (position === id) {
  //         return {
  //           ...task,
  //           title: input.value,
  //           editing: false
  //         }
  //       }
  //       return task;
  //     })
  //   });
  // }

  // changeFilter(filter: 'all' | 'pending' | 'completed') {
  //   this.filter.set(filter);
  // }

  updateTaskText(id: string, event: Event) { // Cambia el tipo de number a string
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map(task => {
        if (task.id === id) { // Compara con id en lugar de index
          return {
            ...task,
            title: input.value,
            editing: false
          };
        }
        return task;
      });
    });
  }

  changeFilter(filter: Filters) {
    this.filter.set(filter);
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
