import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { NotificationComponent } from './notification/notification.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {WorkspaceComponent} from "./workspace/workspace.component";
import {BoardComponent} from "./board/board.component";
import {ActivateAccountComponent} from "./activate-account/activate-account.component";
import {NotActivatedComponent} from "./not-activated/not-activated.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'report', component: ReportComponent},
  {path: 'notification', component: NotificationComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'friend', component: FriendsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'workspace/:workspaceId', component: WorkspaceComponent},
  {path: 'board/:boardId', component: BoardComponent},
  {path: 'activated-account', component: ActivateAccountComponent},
  {path: 'token-expired', component: NotActivatedComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
