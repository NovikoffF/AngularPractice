import { Component } from "@angular/core";
import { combineLatest, filter, Observable } from "rxjs";
import { TodoService } from "../../services/todo.service";
import { FilterEnum } from "../../types/filter.enum";
import { TodoInterface } from "../../types/todo.interface";
import { map } from "rxjs";

@Component({
    selector: 'app-todo-main',
    templateUrl:'./main.component.html'
})

export class MainComponent {
visibleTodo$: Observable<TodoInterface[]>;
noTodoClass$: Observable<boolean>;
isAllTodoSelected$: Observable<boolean>;
editingId: string | null = null;

constructor(private todoService: TodoService) {
  this.isAllTodoSelected$ = this.todoService.todo$.pipe(
    map((todos) => todos.every((todo) => todo.isCompleted))
  );
  this.noTodoClass$ = this.todoService.todo$.pipe(
    map((todos) => todos.length ===0)
  );
  this.visibleTodo$ = combineLatest(
    this.todoService.todo$,
    this.todoService.filter$
  ).pipe(
    map(([todos, filter]: [TodoInterface[], FilterEnum]) =>{
      if (filter === FilterEnum.active){
        return todos.filter((todo) => !todo.isCompleted);
      } else if (filter === FilterEnum.completed) {
        return todos.filter((todo) => todo.isCompleted);
      }
      return todos;
    })
  );
}

toggleAllTodo(event: Event): void {
  const target = event.target as HTMLInputElement;
  this.todoService.toggleAll(target.checked);
}

setEditingId(editingId: string | null): void {
  this.editingId = editingId;
}
}
