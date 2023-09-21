
import { Component, OnInit, Input } from '@angular/core';


import { MatDialogRef } from '@angular/material/dialog';


import { FetchApiDataService } from '../fetch-api-data.service';


import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @component UserRegistrationFormComponent
 * @description Component for user registration form.
 * @selector app-user-registration-form
 */

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {

   /**
   * @property userData
   * @description Object to hold user data from the registration form.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

 /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API data fetching.
   * @param {MatDialogRef} dialogRef - Reference to the dialog opened.
   * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  /**
   * @method registerUser
   * @description Registers a new user.
   */


  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {

        this.dialogRef.close();
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
