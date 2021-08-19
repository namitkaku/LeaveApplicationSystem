import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
     this.username = localStorage.getItem('email');
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
