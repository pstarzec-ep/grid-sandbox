import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams } from '@ag-grid-community/core';
import { ApiService } from './api.service';

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  /**
   * Global config for all columns
   */
  public defaultColDef: ColDef = { sortable: true };

  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'userId' },
    { field: 'title' },
    { field: 'completed' },
  ];

  public dataSource: IServerSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      console.log('Getting rows');
      const request = params.request;
      console.log(request);
      this.api.getTodos({
        sort: {
          field: request.sortModel[0]?.colId,
          order: request.sortModel[0]?.sort,
        },
      }).subscribe(data => {
        params.success({ rowData: data });
      });
    },
  };

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(private api: ApiService,
              private cdRef: ChangeDetectorRef) {}

  public gridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;

    this.gridApi.setServerSideDatasource(this.dataSource);
  }
}
