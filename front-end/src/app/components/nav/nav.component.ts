import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitter';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/actions/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false
  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  ngOnInit(): void{
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated=auth
    })
  }

  logout(): void{
    this.store.dispatch(AuthActions.clearJwt());
    this.authenticated=false
  }
}
