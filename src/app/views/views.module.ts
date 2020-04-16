import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { NavbarsModule } from './navbars/navbars.module';
import { ModalsModule } from './modals/modals.module';
import { InfoModule } from './info/info.module';
import { DscComponent } from './dsc/dsc.component';
import { TargetModule } from './target/target.module';

@NgModule({
  declarations: [
    DscComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NavbarsModule, InfoModule, TargetModule, ModalsModule,
  ],
  exports: [
    DscComponent,
  ],
})
export class ViewsModule { }
