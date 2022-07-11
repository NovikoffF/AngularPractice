import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoInterface } from "../types/todo.interface";
import { FilterEnum } from "../types/filter.enum";

@Injectable ()
export class TodoService
{
 todo$ = new BehaviorSubject<TodoInterface[]>([]);
 filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

 addTodo(text: string):void {
    const newTodo: TodoInterface = {
        text,
        isCompleted: false,
        id: Math.random().toString(16),
    };
    const updatedTodos = [...this.todo$.getValue(), newTodo];
    this.todo$.next(updatedTodos);
 }

 toggleAll(isCompleted: boolean): void
 {
   const updatedTodos = this.todo$.getValue().map(todo => {
    return {
        ...todo,
        isCompleted
    };
   });
   this.todo$.next(updatedTodos);
 }
 changeFilter(filterName: FilterEnum): void {
  this.filter$.next(filterName);
 }

 changeTodo(id: string, text: string): void {
  const updatedTodo = this.todo$.getValue().map((todo)=> {
    if(todo.id === id) {
      return{
        ...todo,
        text,
      };
    }
    return todo;
  });
  this.todo$.next(updatedTodo);
 }

 removeTodo(id: string): void {
  const updatedTodo = this.todo$.getValue().filter((todo) => todo.id !== id);
  this.todo$.next(updatedTodo);
 }

 toggleTodo(id: string): void {
  const updatedTodo = this.todo$.getValue().map((todo) => {
    if(todo.id === id) {
      return {
        ...todo,
        isCompleted: !todo.isCompleted,
      };
    }
    return todo;
  });
  this.todo$.next(updatedTodo);
 }
}