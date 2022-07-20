import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  usuario:string = '';
  senha:string = '';

  token:string = '';

  httpOptions:any;

  ufs:any;

  constructor(
    private http : HttpClient
  ){}

  limpar(){
    this.usuario = '';
    this.senha = '';
  }

  login(){
    console.log('logando!');

    this.http.post(
      'http://localhost:8080/api/authenticate',
      {
        username: this.usuario,
        password: this.senha,
        rememberMe: true
      }
    ).toPromise().then( (data:any) => {    
      this.token = data.id_token;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${this.token}`
        })
      };
      this.limpar();
    }).catch(err => {
      console.log(err);
    });
        
  }

  listarUfs(){
    this.http.get(
      'http://localhost:3000/ufs',
      this.httpOptions
    ).toPromise().then( (data:any) => {
      console.log(data[0].sigla);
      this.ufs = data;
    }).catch( err => {
      console.log(err);
    });
  }

}
