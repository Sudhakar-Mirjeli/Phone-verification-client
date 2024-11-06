import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  phone: string = '';
  otp: string = '';
  otpSent: boolean = false;
  timeRemaining: number = 120; // 2 minutes = 120 seconds
  timer: any;
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  // Send OTP to the phone number
  sendOtp() {
    if (!this.phone || this.phone.length < 10) {
      this.errorMessage = 'Please enter a valid phone number.';
      return;
    }
    let body = {
      phone: parseInt(this.phone)
    }
    this.authService.sendOtp(body).subscribe((res: any) => {
      this.errorMessage = '';
      alert('OTP sent successfully!');
      this.otpSent = true;
      this.startTimer();  // Start the countdown timer
    },
      (error) => {
        this.errorMessage = 'Error sending OTP. Please try again later.';
      }
    );
  }

  // Start the countdown timer for OTP verification
  startTimer() {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(this.timer);
        this.otpSent = false;
      }
    }, 1000);
  }

  // Verify the entered OTP
  verifyOtp() {
    if (!this.otp || this.otp.length !== 6) {
      this.errorMessage = 'Please enter a valid OTP.';
      return;
    }
    let body = {
      phone: parseInt(this.phone),
      code: parseInt(this.otp)
    }
    this.authService.verifyOtp(body).subscribe((res: any) => {
      this.errorMessage = '';
      alert('OTP verified successfully!');
    },
      (error) => {
        this.errorMessage = 'Invalid OTP or OTP has expired.';
      }
    );
  }
}
