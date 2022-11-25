import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
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
import { AuthGuard } from './guard/app-authguard';
import {FavoriteComponent} from "./favorite/favorite.component";
import {ChatComponent} from "./chat/chat.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  {path: 'report', component: ReportComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'friend', component: FriendsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'workspace/:workspaceId', component: WorkspaceComponent,canActivate:[AuthGuard]},
  {path: 'board/:boardId', component: BoardComponent},
  {path: 'activated-account', component: ActivateAccountComponent},
  {path: 'token-expired', component: NotActivatedComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path:'favorite',component:FavoriteComponent},
  {path:'chat',component:ChatComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
