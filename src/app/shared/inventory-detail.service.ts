import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryDetailService {

  constructor(private http:HttpClient) { }

  AddItemToInventory(data : any){
   return this.http.post(" http://localhost:3000/posts",data).
    pipe(map((res:any) => 
      {
        return res
      }))
  }

  GetAllItems(){
    return this.http.get("http://localhost:3000/posts").
     pipe(map((res:any) => 
       {
         return res
       }))
   }

   UpdateItem(id:number,data : any){
    return this.http.put(" http://localhost:3000/posts/" + id , data).
     pipe(map((res:any) => 
       {
         return res
       }))
   }

   DeleteItem(id:number){
    return this.http.delete("http://localhost:3000/posts/" + id).
        pipe(map(res =>{
          return res;
        }))
   }
}
