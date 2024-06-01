import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GridDTO } from 'src/app/models/gridDTO.interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() dataSource = new MatTableDataSource<GridDTO>;
  @Input() columnsToDisplay: string[] = [];
}
