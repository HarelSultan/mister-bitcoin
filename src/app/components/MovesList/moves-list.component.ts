import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoveModel } from 'src/app/models/move.model';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss'],
})
export class MovesListComponent implements OnInit {
  @Input() moves!: MoveModel[];
  @Input() rate$!: Observable<number>;

  ngOnInit(): void {}
}
