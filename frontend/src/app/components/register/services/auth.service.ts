import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { RegisterModel } from '../models/register.model';
import { LoginResponseModel } from '../../login/models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: GenericHttpService) {}

  register(model: RegisterModel, callBack: (res: LoginResponseModel) => void) {
    this._http.post<LoginResponseModel>('auth/register', model, (res) =>
      callBack(res)
    );
  }
}
