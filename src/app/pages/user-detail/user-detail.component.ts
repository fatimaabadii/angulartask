import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user?: User;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.userService.getUserById(+id).subscribe({
        next: res => {
          this.user = res.data;
          this.loading = false;
        },
        error: err => {
          alert('User not found.');
          this.router.navigate(['/']);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
