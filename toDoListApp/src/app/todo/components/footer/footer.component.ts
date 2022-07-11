import { Component } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { FilterEnum } from "../../types/filter.enum";

@Component({
    selector: 'app-todo-footer',
    templateUrl: './footer.component.html'
})

export class FooterComponent {
 noTodosClass$: Observable<boolean>;
 activeCount$: Observable<number>;
 itemsLeftText$: Observable<string>;
 filter$: Observable<FilterEnum>;
 filterEnum = FilterEnum;
 
 constructor(private todoService: TodoService)
 {
    this.activeCount$ = this.todoService.todo$.pipe(
        map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
        map((activeCount) => `item${activeCount !==1 ? 's': ''} left`)
    );
    this.noTodosClass$ = this.todoService.todo$.pipe(
        map((todos) => todos.length === 0)
    );
    this.filter$ = this.todoService.filter$;
 }

 changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todoService.changeFilter(filterName);
 }
}