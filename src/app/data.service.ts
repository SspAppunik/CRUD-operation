import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IModel } from './model.config';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  postList(data: IModel[]) {
    return this.http.post<IModel[]>("http://localhost:3000/studentList/", data)
  }

  getList():Observable<IModel[]> {
    return this.http.get<IModel[]>("http://localhost:3000/studentList/");
  }

  putList(data: IModel , id: number) {
    return this.http.put<IModel[]>("http://localhost:3000/studentList/" +id,data)
  }

  deleteUser(id: number) {
    return this.http.delete<IModel[]>("http://localhost:3000/studentList/" +id)
  }
}
