import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MainComponent } from './main/main.component';
import { MigrateComponent } from './migrate/migrate.component';
import { SettingComponent } from './setting/setting.component';
import { NodeComponent } from './node/node.component';
import { AppQueueComponent } from './app/app.component';
import { QueuedrawerComponent } from './queuedrawer/queuedrawer.component';
import { CustomQueueDialogComponent } from './custom-queue-dialog/custom-queue-dialog.component';
import { ContentComponent } from './content/content.component';

registerLocaleData(zh);

@NgModule({
   declarations: [
      AppComponent,
      MainComponent,
      MigrateComponent,
      SettingComponent,
      NodeComponent,
      AppQueueComponent,
      QueuedrawerComponent,
      CustomQueueDialogComponent,
      ContentComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgZorroAntdModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule
   ],
   entryComponents: [ ContentComponent ],
   providers: [{ provide: NZ_I18N, useValue: zh_CN }],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
