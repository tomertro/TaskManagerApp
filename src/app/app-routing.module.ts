import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskAddComponent } from '../TaskView/task-add.component';

import { MainNavigationComponent } from '../MainNavigation/main-navigation.component';
import { TaskListComponent } from 'src/TasksList/task-list.component';
import { TaskEditComponent } from 'src/TaskEdit/task-edit.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'add-task', component: TaskAddComponent },
  { path: 'edit-task/:id', component: TaskEditComponent },
  { path: 'app-task-list', component: TaskListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
