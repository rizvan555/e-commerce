import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  api: string = 'http://localhost:8080/api';
  constructor(
    private _http: HttpClient,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService
  ) {}

  get(api: string, callback: (res: any) => void) {
    this._spinner.show();
    this._http.get(`${this.api}/${api}`).subscribe({
      next: (res: any) => {
        callback(res);
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this._toastr.error(err.error.message);
        this._spinner.hide();
      },
    });
  }

  post(api: string, model: any, callback: (res: any) => void) {
    this._http.post(`${this.api}/${api}`, model, {}).subscribe({
      next: (res: any) => {
        callback(res);
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this._spinner.hide();
      },
    });
  }
}
