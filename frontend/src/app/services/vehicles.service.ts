import { Injectable } from "@angular/core";
import { Vehicle } from "../interfaces/vehicle.interface";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class VehiclesService {
  constructor(private _http: HttpClient) {}

  readVehicles() {
    let url = `http://localhost:1010/vehicle`;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this._http
      .get(url, { headers })
      .pipe(map((response: any) => (response.succes ? response.data : [])));
  }

  filterVehicles(filterType, filterValue) {
    let url = `http://localhost:1010/vehicle/filterVehicle`;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new HttpParams()
      .set("filterType", filterType)
      .set("filterValue", filterValue);

    return this._http
      .get(url, { headers, params })
      .pipe(map((response: any) => (response.succes ? response.data : [])));
  }

  readVehicle(id: string) {
    let url = `http://localhost:1010/vehicle/filterVehicle`;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new HttpParams()
      .set("filterType", "id")
      .set("filterValue", id);

    return this._http
      .get(url, { headers, params })
      .pipe(map((response: any) => (response.succes ? response.data[0] : [])));
  }

  createVehicle(heroe: Vehicle) {
    let url = `http://localhost:1010/vehicle/create`;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let body = heroe;

    return this._http
      .post(url, body, { headers })
      .pipe(map((response: any) => (response.succes ? body.id : null)));
  }

  updateVehicle(id, heroe: Vehicle) {
    let url = `http://localhost:1010/vehicle/update`;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let body = heroe;
    body["id"] = id;

    return this._http
      .post(url, body, { headers })
      .pipe(map((response: any) => response.succes));
  }

  removeVehicle(id: string) {
    let url = `http://localhost:1010/vehicle/delete`;
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let body = {
      id
    };

    return this._http
      .post(url, body, { headers })
      .pipe(map((response: any) => response.succes));
  }
}
