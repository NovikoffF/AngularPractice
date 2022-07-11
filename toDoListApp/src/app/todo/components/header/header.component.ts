import { Component } from "@angular/core";
import { TodoService } from "../../services/todo.service";

@Component({
    selector: 'app-todo-header',
    templateUrl:'./header.component.html',
})

export class HeaderComponent{
    text: string = "";
    constructor(private todoService: TodoService)
    {
        
    }
 changeText(event: Event)
 {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    
 }
 addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
 }
}