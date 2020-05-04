import { Component, OnInit, Input } from '@angular/core';

import { User, Line } from "../../../classes/session";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Input() line: Line;

  constructor() { }

  ngOnInit() {
  }

}
