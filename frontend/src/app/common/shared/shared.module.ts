import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidDirective } from '../directives/valid.directive';
import { BlankComponent } from '../components/blank/blank.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ValidDirective,
    BlankComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ValidDirective,
    BlankComponent,
  ],
})
export class SharedModule {}
