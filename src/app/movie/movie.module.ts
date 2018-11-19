import { UiModule } from './../shared/ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { ListComponent } from './containers/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    UiModule
  ]
})
export class MovieModule { }
