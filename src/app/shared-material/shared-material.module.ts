import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';

const MaterialModules = [MatButtonModule, MatButtonToggleModule, MatTableModule];

@NgModule({
  imports: [...MaterialModules],
  exports: [...MaterialModules]
})
export class SharedMaterialModule { }
