import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent {
  welcome = 'Welcome to my first app with angular';
  tasks = signal([
    'Install Angular CLI',
    'Create project',
    'Create component',
    'Create  service',
  ]);
  name = signal('Ariana');
  age = 19;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'Ariana',
    age: 19,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });
  nameCtrl = new FormControl('nicolas', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  // constructor() {
  //   this.colorCtrl.valueChanges.subscribe(value => {
  //     console.log(value);
  //   })
  // }

  clickHandler() {
    alert('Hola')
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue, 10)
      }
    });
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    });
  }
}
