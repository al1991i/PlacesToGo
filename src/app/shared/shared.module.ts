import { NgModule } from '@angular/core';
import { LoacationPickerComponent } from './pickers/loacation-picker/loacation-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [LoacationPickerComponent, MapModalComponent],
    imports: [IonicModule.forRoot(), CommonModule],
    exports: [LoacationPickerComponent, MapModalComponent],
    entryComponents: [MapModalComponent]
})
export class SharedModul { }
