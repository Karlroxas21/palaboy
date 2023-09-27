import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
        providedIn:'root'
})

export class AdminRescueService {

        private urlAPI = "http://localhost:80/admin-rescue";

        constructor(private http: HttpClient){}

        getData(): Observable<any>{
                return this.http.get<any>(this.urlAPI);
        }

        updateData(data:any): Observable<any>{
                const _id = data._id;
                const json = {
                        title: data.title,
                        box_1: data.box_1,
                        box_2: data.box_2,
                        box_3: data.box_3,
                        box_4: data.box_4,
                        box_5: data.box_5,
                        box_6: data.box_6,
                }
                return this.http.put<any>(`${this.urlAPI}/${_id}`, json);
        }

}