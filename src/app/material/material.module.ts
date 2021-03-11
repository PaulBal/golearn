import { NgModule } from '@angular/core';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

const components = [
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
]

@NgModule({
    imports: [components],
    exports: [components]
})
export class MaterialModule {}