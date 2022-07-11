import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from "./components/main/main.component";
import { TodoComponent } from "./components/todo.component";
import { TodoService } from "./services/todo.service";
import { CommonModule } from "@angular/common";
import { ItemComponent } from "./components/item/item.component";
import { FooterComponent } from "./components/footer/footer.component";

 
const routes: Routes = [
    {
        path:'',
        component: TodoComponent,
    }
];

@NgModule({
    declarations: [TodoComponent, HeaderComponent, MainComponent, ItemComponent, FooterComponent],
    imports:[CommonModule, RouterModule.forChild(routes)],
    providers: [TodoService],
})
export class TodoModule {}