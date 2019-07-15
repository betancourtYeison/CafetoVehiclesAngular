import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material";
import { ModalRemoveComponent } from "../shared/modal-remove/modal-remove.component";
import { Vehicle } from "../../interfaces/vehicle.interface";
import { VehiclesService } from "src/app/services/vehicles.service";

@Component({
  selector: "app-vehicles",
  templateUrl: "./vehicles.component.html",
  styles: []
})
export class VehiclesComponent implements OnInit {
  filterType: string = "id";
  filterTypeOptions: string[] = ["id", "brand", "line", "model", "color"];

  displayedColumns: string[] = [
    "id",
    "brand",
    "line",
    "model",
    "color",
    "admin"
  ];
  dataSource: MatTableDataSource<Vehicle>;

  vehicles: Array<any>;
  vehicleToDelete: Object;
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _vehiclesService: VehiclesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._vehiclesService.readVehicles().subscribe(
      result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      () => {
        this._snackBar.open("Error getting data", null, {
          duration: 3000
        });
        this.loading = false;
      }
    );
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    this.loading = true;
    if (filterValue.length > 0) {
      this._vehiclesService
        .filterVehicles(this.filterType, filterValue)
        .subscribe(
          result => {
            this.dataSource = new MatTableDataSource(result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;
          },
          () => {
            this._snackBar.open("Car not found", null, {
              duration: 3000
            });
            this.loading = false;
          }
        );
    } else {
      this.getData();
    }
  }

  delete(id): void {
    const dialogRef = this.dialog.open(ModalRemoveComponent, {
      width: "230px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this._snackBar.open("Car has been deleted", null, {
          duration: 3000
        });
        this._vehiclesService.removeVehicle(id).subscribe(
          () => {
            this.getData();
          },
          () => {
            this._snackBar.open("Error deleting", null, {
              duration: 3000
            });
            this.loading = false;
          }
        );
      }
    });
  }
}
