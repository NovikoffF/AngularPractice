import {Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    ElementRef,
    ViewChild,
    OnChanges,
    SimpleChanges, } from "@angular/core";
import { TodoInterface } from "../../types/todo.interface";
import { TodoService } from "../../services/todo.service";

@Component({
    selector: 'app-todo-item',
    templateUrl: './item.component.html',
})

export class ItemComponent implements OnInit, OnChanges  {
   

    @Input('item') itemProps: TodoInterface;
    @Input('isEditing') isEditingProps: boolean;
    @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();
    editingText: string = '';
    @ViewChild('textInput') textInput: ElementRef;

    constructor(private todoService: TodoService)
    {}
    ngOnInit(): void {
        this.editingText = this.itemProps.text;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('changes', changes);
        if(changes.isEditingProps.currentValue) {
            setTimeout(() => {
                this.textInput.nativeElement.focus();
            }, 0);
        }
    }

    setItemInEditMode(): void {
        console.log('setItemInEditMode');
        this.setEditingIdEvent.emit(this.itemProps.id);
    }

    removeItem(): void {
        console.log('removeItem');
        this.todoService.removeTodo(this.itemProps.id);
    }

    toggleTodo(): void {
        console.log('toggleTodo');
        this.todoService.toggleTodo(this.itemProps.id);
    }

    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.editingText = value;
        console.log('changeText');
    }

    changeItem(): void {
        console.log('change item', this.editingText);
        this.todoService.changeTodo(this.itemProps.id, this.editingText);
        this.setEditingIdEvent.emit(null);
    }
}