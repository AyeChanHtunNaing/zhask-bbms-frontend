import {Component, Input, OnInit,ViewChild} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import {BsModalService,BsModalRef} from "ngx-bootstrap/modal";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  modalRef?:BsModalRef;
  // add some events
  events:any=[
    {title:'Task Start',date:'2022-11-08', color:'#406595'},
    {title:'Task Due',date:'2022-11-08', color:'#FF0000'},
    {title:'Task Start',date:'2022-11-11', color:'#406595'},
    {title:'Task Due',date:'2022-11-28', color:'#FF0000'},
  ];
  title!:string;
  taskDate!:string;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events:this.events,
    eventClick:this.handleDateClick.bind(this),
  };

  config={
    animated:true
  };

  @ViewChild('template') template !:string;
  // side nav
  isSideNavCollapsed = false;
  screenWidths = 0;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidths = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
  constructor(private modalService:BsModalService) { }

  ngOnInit(): void {
  }
  handleDateClick(arg:any){
    console.log(arg);
    console.log(arg.event._def.title);
    this.title=arg.event._def.title;
    this.taskDate=arg.event.start;
    this.modalRef=this.modalService.show(this.template,this.config);

  }
}
