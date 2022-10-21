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

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'report', component: ReportComponent},
  {path: 'notification', component: NotificationComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'friend', component: FriendsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'workspace/:workspaceId', component: WorkspaceComponent},
  {path: 'board', component: BoardComponent},
  {path: 'activated-account', component: ActivateAccountComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
