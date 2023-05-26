import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import {EntreeService} from "../../../services/entree.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(private router:Router,private ngxService: NgxUiLoaderService,private service: EntreeService) { }
  @ViewChild("fileDropRef", { static: false })
  protected readonly JSON = JSON;
  fileDropEl!: ElementRef;
  files: any[] = [];
  batchDate:string=''
  batchName:string='';
  batchOrgName:string='';

  batchNameAlert= false
  displayStyle = "none";
  uploadResult:any = '';


  public progression = 0;
  public blocks = [
    {
      title : "Initialisation",
      id : 0,
    },
    {
      title : "Data center",
      id : 1,
      apiSchema:"csvDataCenter"
    },
    {
      title : "Équipements physiques",
      id : 2,
      apiSchema:"csvEquipementPhysique"
    },
    {
      title : "Équipements virtuels",
      id : 3,
      apiSchema:"csvEquipementVirtuel"
    },
    {
      title : "Applications",
      id : 4,
      apiSchema:"csvApplication"
    },
    {
      title : "Messageries",
      id : 5,
      apiSchema:"csvMessagerie"
    },
    {
      title : "Entités",
      id : 6,
      apiSchema:"csvEntite"
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
    debugger
    for (const item of files) {
      item.progress = 100;
      const selectedBlock = this.blocks[this.progression]
      if(this.files.map(x=>x.id).includes(selectedBlock.id)){
        this.files.splice((selectedBlock.id-1), 1);
      }
        this.files.push({id: selectedBlock.id , title: selectedBlock.title,csvSchema : selectedBlock.apiSchema , file : item});
    }
    this.fileDropEl.nativeElement.value = "";
  }

  next(){
    if(this.progression===0){
      this.batchNameAlert = !this.batchName
    }
    if(!this.batchNameAlert ){
      this.progression ++;
      if(this.progression > this.blocks.length){
        debugger
        // this.router.navigate(['/result'], { replaceUrl: true }).then();
      }
    }
  }

  back(){
    this.progression --;
  }
  ngOnInit() {}

  uploadFiles() {
    debugger
    this.ngxService.start();
    this.ngxService.startLoader("loader-01");
    const formData = new FormData();
    formData.append("nomLot",this.batchName)
    formData.append("dateLot",this.batchDate)
    formData.append("nomOrganisation",this.batchOrgName);
    this.files.forEach(file=>{
      if(file && file.file){
        debugger
        formData.append(file.csvSchema, file.file, file.file.name);
      }
    })
    debugger
    this.service.upload(formData).pipe(
        map((event:any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              break;
            case HttpEventType.Response:
              this.openPopup();
              this.ngxService.stop();
              this.ngxService.stopLoader("loader-01");
              debugger
              this.uploadResult = JSON.stringify(event.body);
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.ngxService.stop();
          this.ngxService.stopLoader("loader-01");
          return of(`upload failed.`);
        })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    });
  }

  initScreen() {
    this.files = [];
    this.progression=0;
    this.displayStyle = "none";
  }

  openPopup() {
    this.displayStyle = "block";
  }


}
