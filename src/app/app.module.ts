import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // a plugin!
import {ModalModule} from "ngx-bootstrap/modal";
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WorkspaceComponent } from './workspace/workspace.component';
import { BoardComponent } from './board/board.component';
import {ActivateAccountComponent} from "./activate-account/activate-account.component";
import { ListComponent } from './list/list.component';
import { CardComponent } from './task/task.component';
import { NotActivatedComponent } from './not-activated/not-activated.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestInterceptInterceptor } from './interceptors/request-intercept.interceptor';
import { ResponseInterceptInterceptor } from './interceptors/response-intercept.interceptor';
import { FavoriteComponent } from './favorite/favorite.component';
import { ChatComponent } from './chat/chat.component';
import { ActivityComponent } from './activity/activity.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { FavBoardComponent } from './fav-board/fav-board.component';
import { FavWorkspaceComponent } from './fav-workspace/fav-workspace.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    HomeComponent,
    HomeComponent,
    ReportComponent,
    CalendarComponent,
    FriendsComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    WorkspaceComponent,
    BoardComponent,
    ActivateAccountComponent,
    ListComponent,
    CardComponent,
    NotActivatedComponent,
    ResetPasswordComponent,
    FavoriteComponent,
    ChatComponent,
    ActivityComponent,
    FavBoardComponent,
    FavWorkspaceComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MdbModalModule,
    Ng2SearchPipeModule,
    FullCalendarModule,
    ModalModule.forRoot()
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS , useClass : RequestInterceptInterceptor,multi : true
    },
    {
      provide : HTTP_INTERCEPTORS , useClass : ResponseInterceptInterceptor,multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
