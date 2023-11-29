import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public api: HttpClient) { }
  Url="https://localhost:7078/api/"
   

  public async Get(controller: string){
    let result:any;
    await this.api.get(this.Url+controller).toPromise().then((data)=>{
      result=data;
    })
    return result;
  }

  public async Post(controller: string, body:any){
    let result:any;
    await this.api.post(this.Url+controller, body).toPromise().then((data)=>{
      result=data;
    });
    return result;
  }

  public async Put(controller: string, id:number, user:any){
    let result:any;
    await this.api.put(this.Url+controller+"/"+id, user ).toPromise().then((data)=>{
      result=data;
    });
    return result;
  }

  public async Delete(controller: string,id:string){
    let result:any;
    await this.api.delete(this.Url+controller+"/"+id).toPromise().then((data)=>{
      result=data;
    });
    return result;
  }

  public async GetParams(controller:string,url:string){
    let result:any;
    await this.api.get(this.Url+controller+'?'+url).toPromise().then((data)=>{
      result=data;
    });

    return result;
  }
}
