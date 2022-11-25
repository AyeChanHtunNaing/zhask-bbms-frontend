import {Component, Input, OnInit,ViewChild} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import {BsModalService,BsModalRef} from "ngx-bootstrap/modal";
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskService } from '../services/task.service';

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
  events:any=[];
  calendarOptions!: CalendarOptions;
  title!:string;
  taskDate!:string;
  
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
  
  constructor(private spinner: NgxSpinnerService,private modalService:BsModalService,private taskService:TaskService) {

   }
  ngOnInit(): void {
    setTimeout(() => {
    this.taskService.selectTaskByUserId(this.getUserId() as number).subscribe(data=>{
      data.forEach(e => {
        let calendarevent = {  
          title: "Start:"+e.description,
          date:e.startDate,
          color:'#406595',
          name:e.description
        };
        let calendareventend = {
          title: "End:"+e.description,
          date:e.endDate,
          color:'#FF0000',
          name:e.description
        };
        this.events.push(calendarevent);
        this.events.push(calendareventend)
       // console.log(calendarevent);
        
      });
      console.log(this.calendarOptions);
      
    });}, 900);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events:this.events,
         eventClick:this.handleDateClick.bind(this),
      };
    }, 1000);
  
     
  }

  handleDateClick(arg:any){
    console.log(arg);
    console.log(arg.event._def.title);
    this.title=arg.event._def.title;
    this.taskDate=arg.event.start;
    this.modalRef=this.modalService.show(this.template,this.config);

  }

  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;

  }
}
