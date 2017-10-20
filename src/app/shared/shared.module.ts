import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
} from '@angular/material';

import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class SharedModule { }
