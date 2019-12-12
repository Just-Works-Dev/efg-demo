import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { LanguageService } from 'app/language/language.service';
import { fuseAnimations } from '@fuse/animations';
import { RegisterService } from './register.service';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OtpModalComponent } from './otp-modal/otp-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isOTPVerified = false;
  isOTPSend = false;

  constructor(
    private fuseConfigService: FuseConfigService,
    private languageService: LanguageService,
    private registerService: RegisterService,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    public matDialog: MatDialog,
  ) {
    this.fuseConfigService.config = {
      layout: {
        navbar   : {
          hidden: true
        },
        toolbar  : {
          hidden: true
        },
        footer   : {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      phoneNo: new FormControl('', Validators.required),
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
      connectionType: new FormControl('',Validators.required),
      language: new FormControl('',Validators.required),
      otp: new FormControl()
    });
    this.setLanguage();
  }

  async setLanguage() {
    const language = await this.languageService.getLanguage();
    this.registerForm.patchValue({ language });
  }

  submit() {
    const valid = this.registerForm.valid;
    if (valid) {
      const userData = this.registerForm.value;
      this.registerService.register({userData}).subscribe((res: any) => {
        // navigate to next page. DO this when next ticket
        // this.router.navigate(['']);
        this.authService.saveToken(res.data.token);
      });
    }
  }

  requestOTP() {
    const valid = this.registerForm.valid;
    if (valid) {
      const phoneNumber = this.registerForm.value['phoneNo'];
      this.registerService.requestOTP(phoneNumber).subscribe((res: any) => {
        this.isOTPVerified = true;
        this.openOTPModal(phoneNumber);
      });
    }
  }

  openOTPModal(phoneNumber: string) {
    const dialogRef = this.matDialog.open(OtpModalComponent, {
      data: phoneNumber
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res.verified) {
        this.isOTPVerified = true;
        this.registerForm.patchValue({ otp: res.otp });
      }
    });
  }
}