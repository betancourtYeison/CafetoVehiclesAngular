import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VehiclesComponent } from "./components/vehicles/vehicles.component";
import { EditVehicleComponent } from "./components/edit-vehicle/edit-vehicle.component";
import { EditVehicleResolver } from "./components/edit-vehicle/edit-vehicle.resolver";

const routes: Routes = [
  { path: "vehicles", component: VehiclesComponent },
  {
    path: "vehicle/:id",
    component: EditVehicleComponent,
    resolve: { data: EditVehicleResolver }
  },
  { path: "**", component: VehiclesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
