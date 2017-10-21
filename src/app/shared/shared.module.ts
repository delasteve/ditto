import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
} from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  declarations: [
    HeaderComponent,
    ProfileMenuComponent,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class SharedModule { }
