import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  page: number = 1;
  totalUsers: number = 0;
  perPage: number = 6; // Matches API default
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers(this.page);
  }

  fetchUsers(page: number) {
    this.loading = true;
    this.userService.getUsers(page).subscribe(res => {
      this.users = res.data;
      this.totalUsers = res.total;
      this.perPage = res.per_page;
      this.page = res.page;
      this.loading = false;
    });
  }

  onPageChange(event: any) {
    this.fetchUsers(event.pageIndex + 1);
  }

  goToUserDetail(id: number) {
    this.router.navigate(['/user', id]);
  }
}

