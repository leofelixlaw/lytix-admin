import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelRoutingModule } from './channel-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ChannelComponent } from './channel.component';
import { SmsComponent } from './sms/sms.component';


@NgModule({
  declarations: [
    SmsComponent,
    ChannelComponent
  ],
  imports: [
    CommonModule,
    ChannelRoutingModule,
    SharedModule
  ]
})
export class ChannelModule { }
