import { Component, OnInit } from '@angular/core'; // Add OnInit
import { Router, NavigationEnd } from '@angular/router'; // Import Router and NavigationEnd
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from './movie-card/movie-card.component';

/**
 * @component AppComponent
 * @description The root component of the application.
 * @selector app-root
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * @property title
   * @description The title of the application.
   */

  title = 'myFlix-Angular-client';

  /**
   * @property isMainPage
   * @description A boolean value indicating whether the current page is the main page.
   */
  isMainPage: boolean = true;

  /**
   * @constructor
   * @param {MatDialog} dialog - Injects MatDialog for opening dialog boxes.
   * @param {Router} router - Injects Router for navigation-related operations.
   */

  constructor(public dialog: MatDialog, private router: Router) {}

  /**
   * @method ngOnInit
   * @description A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMainPage = event.url === '/' || event.url === '/login';
      }
    });
  }
  /**
   * @method openUserRegistrationDialog
   * @description Opens the user registration dialog box.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  /**
   * @method openUserLoginDialog
   * @description Opens the user login box
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
