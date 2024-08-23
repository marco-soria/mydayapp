import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


import { Task } from './../../models/task.model';


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
      id: Date.now(),
      title: 'Crear proyecto',
      completed: true
    },
    {
      id: Date.now(),
      title: 'Crear componenentes',
      completed: false
    }
  ]);
  // changeHandler(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const newTask = input.value;
  //   this.addTask(newTask);
  // }

  // addTask(title: string) {
  //   this.tasks.update(prevState => [...prevState, title]);
  // }

  // deleteTask(index: number) {
  //   this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
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


  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update(prevState => [...prevState, newTask]);
  }

  deleteTask(index: number) {
      this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
     }

  updateTask(index: number) {

    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    });

  }

  updateTaskEditingMode(index: number) {
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    });
  }
}
