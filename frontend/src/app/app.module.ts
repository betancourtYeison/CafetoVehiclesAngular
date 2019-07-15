import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatRadioModule } from "@angular/material/radio";

import { AppRoutingModule } from "./app-routing.module";

import { VehiclesService } from "./services/vehicles.service";

import { AppComponent } from "./app.component";
import { VehiclesComponent } from "./components/vehicles/vehicles.component";
import { EditVehicleComponent } from "./components/edit-vehicle/edit-vehicle.component";
import { EditVehicleResolver } from "./components/edit-vehicle/edit-vehicle.resolver";
import { LoadingComponent } from "./components/shared/loading/loading.component";
import { ModalRemoveComponent } from "./components/shared/modal-remove/modal-remove.component";

@NgModule({
  entryComponents: [ModalRemoveComponent],
  declarations: [
    AppComponent,
    VehiclesComponent,
    EditVehicleComponent,
    LoadingComponent,
    ModalRemoveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRadioModule,
    AppRoutingModule
  ],
  providers: [VehiclesService, EditVehicleResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
