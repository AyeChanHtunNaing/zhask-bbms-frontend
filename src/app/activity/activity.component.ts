import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  title: string | null = null;
  constructor(public modalRef: MdbModalRef<ActivityComponent>) {}

  ngOnInit(): void {
  }
  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

}
