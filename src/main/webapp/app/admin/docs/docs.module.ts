import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogBootswatchSharedModule } from 'app/shared/shared.module';

import { DocsComponent } from './docs.component';

import { docsRoute } from './docs.route';

@NgModule({
  imports: [BlogBootswatchSharedModule, RouterModule.forChild([docsRoute])],
  declarations: [DocsComponent],
})
export class DocsModule {}
