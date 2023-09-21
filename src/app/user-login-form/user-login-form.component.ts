import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * @component UserLoginFormComponent
 * @description Component for user login form.
 * @selector app-user-login-form
 */

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {

   /**
   * @property userData
   * @description Object to hold user data from the login form.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @event onLoggedIn
   * @description Event emitted when a user logs in.
   */

  @Output() onLoggedIn = new EventEmitter<any>();


    /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API data fetching.
   * @param {MatDialogRef} dialogRef - Reference to the dialog opened.
   * @param {MatSnackBar} snackBar - Service to dispatch Material Design snack bar messages.
   * @param {Router} router - Service for navigation.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * @method loginUser
   * @description Logs in a user.
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });
        this.onLoggedIn.emit(response);
        this.router.navigate(['/movies']);
        this.dialogRef.close();
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Invalid username or password.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
