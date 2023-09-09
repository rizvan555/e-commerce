import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ValidDirective } from '../directives/valid.directive';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, FormsModule, ValidDirective],
  exports: [CommonModule, RouterModule, FormsModule, ValidDirective],
})
export class SharedModule {}
