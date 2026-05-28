import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskAddComponent } from '../TaskView/task-add.component';
import { TaskListComponent } from '../TasksList/task-list.component';
import { AppRoutingModule } from './app-routing.module';
import { taskReducer } from '../store/task.reducer';
import { TaskEffects } from '../store/task.effects';

@NgModule({
  declarations: [
    TaskAddComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppComponent,
    AppRoutingModule,
    StoreModule.forRoot({
      tasks: taskReducer
    }),
    EffectsModule.forRoot([TaskEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
