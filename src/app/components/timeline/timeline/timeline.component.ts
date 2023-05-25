import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(private router:Router,private ngxService: NgxUiLoaderService) { }
  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;
  files: any[] = [];

  public progression = 0;
  public timeline = [
    {
      title : "Initialisation",
      id : 0
    },
    {
      title : "Data center",
      id : 1
    },
    {
      title : "équipements physiques",
      id : 2
    },
    {
      title : "équipements virtuels",
      id : 3
    },
    {
      title : "applications",
      id : 4
    },
    {
      title : "messageries",
      id : 5
    },
  ]

  /**
   * on file drop handler
   */
  onFileDropped($event:any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files:any) {
    this.prepareFilesList(files.target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes:any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  next(){
    this.progression ++;
    if(this.progression > this.timeline.length){
      this.router.navigate(['/result'], { replaceUrl: true }).then();
    }
  }
  ngOnInit() {}

}
