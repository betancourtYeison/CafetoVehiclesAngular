import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-modal-remove",
  templateUrl: "./modal-remove.component.html",
  styles: []
})
export class ModalRemoveComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
