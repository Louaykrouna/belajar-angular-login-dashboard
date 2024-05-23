import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, CommonModule ],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'] ,

})
export class NavBarComponent {
  closeResult = '';
  userRole: string | null = null; // Initialize it here
  userData: any = {};

  constructor(private router: Router,private offcanvasService: NgbOffcanvas,private http: HttpClient) { }

  open(content: any) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  ngOnInit(): void {
    const userDataStr = localStorage.getItem('userData');
    // Get user role from localStorage
    if (userDataStr) {
      this.userData = JSON.parse(userDataStr);
      this.userRole = this.userData.role; // Set userRole from userData
    }
  }
  handleLogout() {
    this.http.post<any>('http://localhost:3000/logout',{}, { withCredentials: true }).subscribe({
      next: (response) => {
        // Upon successful logout on the backend, clear local storage and navigate to login page
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userData");
        console.log('Local storage cleared');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Handle error if logout request fails
        console.error('Logout failed:', err);
        // Still proceed with logout on the frontend
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userData");
        this.router.navigate(['/login']);
      }
    });  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
