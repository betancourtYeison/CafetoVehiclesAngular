import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material";
import { ModalRemoveComponent } from "../shared/modal-remove/modal-remove.component";
import { VehiclesService } from "src/app/services/vehicles.service";
import { Vehicle } from "src/app/interfaces/vehicle.interface";

@Component({
  selector: "app-edit-vehicle",
  templateUrl: "./edit-vehicle.component.html",
  styles: []
})
export class EditVehicleComponent implements OnInit {
  formData: FormGroup;
  vehicle: Vehicle;
  newVehicle: boolean = true;
  id: string;
  loading: boolean = false;

  constructor(
    private _vehiclesService: VehiclesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this._activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id === "new") {
        this.newVehicle = true;
      } else {
        this.newVehicle = false;
      }
    });

    this.formData = new FormGroup({
      id: new FormControl("", Validators.required),
      brand: new FormControl("", Validators.required),
      line: new FormControl("", Validators.required),
      model: new FormControl("", Validators.required),
      color: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe(routeData => {
      let data = routeData["data"];
      if (data) {
        this.vehicle = data;
        this.id = this.vehicle.id;
        this.formData.setValue(this.vehicle);
      }
    });
  }

  newHereo() {
    this.formData.reset({
      id: "",
      name: "",
      house: "",
      biography: ""
    });
    this._router.navigate(["/vehicle", "new"]);
  }

  save() {
    this.loading = true;
    if (this.newVehicle) {
      this._vehiclesService.createVehicle(this.formData.value).subscribe(
        result => {
          this._router.navigate(["/vehicle", result]);
          this.loading = false;
          this._snackBar.open("Car has been created", null, {
            duration: 3000
          });
        },
        () => {
          this._snackBar.open("Error creating", null, {
            duration: 3000
          });
          this.loading = false;
        }
      );
    } else {
      this._vehiclesService.updateVehicle(this.formData.value).subscribe(
        () => {
          this._router.navigate(["/"]);
          this.loading = false;
          this._snackBar.open("Car has been updated", null, {
            duration: 3000
          });
        },
        () => {
          this._snackBar.open("Error updating", null, {
            duration: 3000
          });
          this.loading = false;
        }
      );
    }
  }

  delete(): void {
    this.loading = true;
    const dialogRef = this.dialog.open(ModalRemoveComponent, {
      width: "230px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._vehiclesService.removeVehicle(this.id).subscribe(
          () => {
            this._router.navigate(["/"]);
            this.loading = false;
            this._snackBar.open("Car has been deleted", null, {
              duration: 3000
            });
          },
          () => {
            this._snackBar.open("Error deleting", null, {
              duration: 3000
            });
            this.loading = false;
          }
        );
      } else {
        this.loading = false;
      }
    });
  }

  resetObj(toHome) {
    if (toHome) {
      this._router.navigate(["/"]);
    }
  }
}
