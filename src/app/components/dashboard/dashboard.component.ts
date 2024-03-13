/** This is code of superset component */
/** Angular Imports */
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Resolve } from '@angular/router';

/** rxjs Imports */
import { Observable, of } from 'rxjs';

/**Importing environment */
import { environment } from '../../../environments/environment';

/** Import EmbedDashboard SDK */
import { embedDashboard } from "@superset-ui/embedded-sdk";

/** Custom Service */
import { DashboardService } from '../../services/dashboard.service'; 
import { HttpResponse } from '@angular/common/http';


/**
 * Dashboard Component
 */
@Component({
  selector: 'mifosx-superset',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /**
   * 
   * @param { ElementRef } elementRef 
   * @param { SupersetServiceService } embedService 
   */
  constructor(private elementRef: ElementRef,
    private embedService: DashboardService) { }

  ngOnInit(): void {
    this.embedSupersetDashboard();
  }

  embedSupersetDashboard(): void {
    const dashboardElement = this.elementRef.nativeElement.querySelector('#dashboard');
  
    if (dashboardElement) {
      this.embedService.embedDashboard().subscribe((response:any) => {
          // Adjust the size of the embedded iframe
          const iframe = dashboardElement.querySelector('iframe');
          if (iframe) {
            iframe.style.width = '100%'; // Set the width as needed
            iframe.style.height = '1000px'; // Set the height as needed
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}