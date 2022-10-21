import {Component, Input, OnInit} from '@angular/core';
import {CardStore} from '../models/CardStore';
import {List} from '../models/List';
import {FormGroup} from "@angular/forms";
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  //form
  registerForm!: FormGroup;
  //board UI layout
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
  // board starts
  cardStore!: CardStore;
  lists!: List[] ;
  listName!: string;
  constructor() { }
  setMockData(): void {
    this.cardStore = new CardStore();
    this.lists = [
      {
        name: 'To Do',
        cards: []
      },
      {
        name: 'Doing',
        cards: []
      },
      {
        name: 'Done',
        cards: []
      }
    ];
  }

  ngOnInit() {
    this.setMockData();
  }

  addList(listName: string) {
    this.lists.push({name:listName,cards:[]});
    this.listName="";
  }
}
