import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchId: number | null = null;

  constructor(private userService: UserService, private router: Router) { }

  onSearch() {
    if (!this.searchId || this.searchId < 1) return;

    this.userService.getUserById(this.searchId).subscribe({
      next: res => {
        if (res.data) {
          this.router.navigate(['/user', this.searchId]);
        } else {
          alert('User not found');
        }
      },
      error: () => {
        alert('User not found');
      }
    });
  }
}
