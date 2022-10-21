import { Component, Input, OnInit } from "@angular/core";
import { Card } from "../models/Task";
@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  constructor() {}
  ngOnInit() {}
  dragStart(ev:any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
}
