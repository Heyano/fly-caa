import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  QueryResultModel,
  QueryResultsModel,
} from 'src/app/core/models/query-result.model';
import { URL_API } from 'src/app/core/routes/backend.root';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  /**
   * get All
   * @param params
   */
  getAll(params: any = {}, url: string): Observable<QueryResultsModel> {
    console.log('pars');
    console.log(params);

    return this.http.get<QueryResultsModel>(URL_API.baseUrl + url, { params });
  }

  /**
   * create
   * @param _object
   * @param params
   */
  create(_object: any, url: string, params = {}): Observable<QueryResultModel> {
    return this.http.post<QueryResultModel>(URL_API.baseUrl + url, _object, {
      params,
    });
  }

  /**
   * bulk
   * @param _object
   * @param params
   */
  bulk(_object: any, url: string, params = {}): Observable<QueryResultModel> {
    return this.http.post<QueryResultModel>(
      URL_API.baseUrl + url + '/bulk',
      _object,
      { params }
    );
  }

  /**
   * update
   * @param _object
   */
  update(_object: any, url: string): Observable<QueryResultModel> {
    return this.http.put<QueryResultModel>(
      URL_API.baseUrl + url + '/' + _object._id,
      _object
    );
  }

  /**
   * delete
   * @param id
   */
  delete(id: string, url: string): Observable<QueryResultModel> {
    return this.http.delete<QueryResultModel>(URL_API.baseUrl + url + '/' + id);
  }

  /**
   * get one
   * @param id
   */
  getOne(id: string, url: string): Observable<QueryResultModel> {
    return this.http.get<QueryResultModel>(URL_API.baseUrl + url + '/' + id);
  }
}
