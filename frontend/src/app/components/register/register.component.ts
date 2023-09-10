import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  register(form: NgForm) {
    
  }
}
