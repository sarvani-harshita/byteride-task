import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
// imported these for angular material table
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { Audit, User } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit, AfterViewInit 
{
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    selectedOption: number = 12
    audits = [];
    pageSize= 10;
    currentUser: User;
    displayedColumns: string[] = ['id', 'user', 'loginTime', 'logoutTime', 'ip'];
    ELEMENT_DATA: Audit[] = [];
    dataSource = new MatTableDataSource<Audit>(this.ELEMENT_DATA);
    
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    )
    {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit()
    {
        this.loadAllAudits();
    }

 /* @purpose: To assign the values to the datasource
  * @created: 28 september 2020
  * @returns:  nothing
  * @author:Sarvani Harshita*/
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
 /* @purpose: Filter the data according th the value entered
  * @created: 28 september 2020
  * @returns:  nothing
  * @author:Sarvani Harshita*/
      applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
    
    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe((audits) => {
                this.audits = audits;
                this.dataSource.data = audits
            });
    }
}