import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'https://jsonplaceholder.typicode.com';

export interface RequestOptions {
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getTodos(options ?: RequestOptions): Observable<any[]> {
    let params = new HttpParams();

    if (options?.sort && options.sort.field) {
      params = params.set('_sort', options.sort.field);
      params = params.set('_order', options.sort.order);
    }

    console.log(params);

    return this.http.get<any[]>(`${URL}/todos`, { params });
  }
}
