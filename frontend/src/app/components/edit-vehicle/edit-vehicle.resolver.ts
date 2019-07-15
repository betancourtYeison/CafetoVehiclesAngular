import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { VehiclesService } from "./../../services/vehicles.service";

@Injectable()
export class EditVehicleResolver implements Resolve<any> {
  constructor(private _vehiclesService: VehiclesService) {}

  resolve(_activatedRouteSnapshot: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
      let id = _activatedRouteSnapshot.paramMap.get("id");
      if (id === "new") {
        resolve(null);
      } else {
        this._vehiclesService.readVehicle(id).subscribe(data => resolve(data));
      }
    });
  }
}
