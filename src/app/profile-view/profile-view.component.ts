import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

/**
 * @component ProfileViewComponent
 * @description Component for viewing and editing user profile.
 * @selector app-profile-view
 */

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  /**
   * @property profileForm
   * @description Form group for the profile form.
   */

  profileForm!: FormGroup;

  /**
   * @property currentUser
   * @description Object to hold the current user's data.
   */
  currentUser: any;

  /**
   * @constructor
   * @param {FormBuilder} fb - Service for creating form controls.
   * @param {FetchApiDataService} fetchApiDataService - Service for API data fetching.
   * @param {Router} router - Service for navigation.
   */

  constructor(
    private fb: FormBuilder,
    private fetchApiDataService: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Decode the JWT to get user details
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.currentUser = decodedToken;

      // Initialize the form after setting the currentUser
      this.initializeForm();
    }
  }

  /**
   * @method formatDate
   * @description Formats the date string to 'yyyy-MM-dd'.
   * @param {string} dateString - The date string to format.
   * @returns {string} The formatted date string.
   */

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    let day: string | number = date.getDate();
    let month: string | number = date.getMonth() + 1;
    const year: number = date.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return `${year}-${month}-${day}`;
  }

  /**
   * @method initializeForm
   * @description Initializes the profile form with the current user's data.
   */

  initializeForm(): void {
    this.profileForm = this.fb.group({
      Username: [this.currentUser.Username],
      Email: [this.currentUser.Email],
      Birthday: [this.formatDate(this.currentUser.Birthday)],
    });
  }

  /**
   * @method logout
   * @description Logs out the user and navigates to the home page.
   */

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  
  /**
   * @method onSubmit
   * @description Submits the updated user data.
   */
  onSubmit(): void {
    const updatedUserData = this.profileForm.value;
    this.fetchApiDataService
      .editUser(this.currentUser.Username, updatedUserData)
      .subscribe(
        (updatedUser: any) => {
          console.log('User updated:', updatedUser);

          this.currentUser.Username = updatedUser.Username;
          this.currentUser.Email = updatedUser.Email;
          this.currentUser.Birthday = updatedUser.Birthday;
          this.currentUser._id = updatedUser._id;
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
  }
}
