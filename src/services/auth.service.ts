import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private https: HttpClient) { }

  // Send OTP Api service
  sendOtp(body: any) {
    return this.https.post<any>(environment.auth.url + environment.auth.sendOtp, body).pipe(
      map((res: any) => res))
  }
  
  //  Verify OTP Api service
  verifyOtp(body: any) {
    console.log("21111", body)
    return this.https.post<any>(environment.auth.url + environment.auth.verifyOtp, body).pipe(
      map((res: any) => res))
  }
}
