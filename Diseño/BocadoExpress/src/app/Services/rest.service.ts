import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  
  constructor(public api: HttpClient) { }
Url="https://localhost:7173/api/"
  public async Get(controller: string){
    await this.api.get(this.Url+controller).toPromise().then((res)=>{
      console.log(res)
    });
  }
}
