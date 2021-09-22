import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'channel',
    loadChildren: () => import('../../pages/channel/channel.module').then(m => m.ChannelModule)
  }
];
