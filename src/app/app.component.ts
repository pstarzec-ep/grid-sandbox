import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  public columnDefs = [
    { field: 'userId' },
    { field: 'id' },
    { field: 'title' },
    { field: 'completed' },
  ];

  public rowData: any[];

  constructor(private api: ApiService,
              private cdRef: ChangeDetectorRef) {}

  public gridReady($event: any): void {
    this.api.getTodos().subscribe(data => {
      this.rowData = data;
      this.cdRef.markForCheck();
    });
  }
}
