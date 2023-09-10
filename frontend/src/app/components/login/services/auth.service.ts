import { Injectable } from '@angular/core';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginModel } from '../models/login.model';
import { LoginResponseModel } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: GenericHttpService) {}

  login(model: LoginModel, callBack: (res: LoginResponseModel) => void) {
    this._http.post<LoginResponseModel>('auth/login', model, (res) =>
      callBack(res)
    );
  }
}
