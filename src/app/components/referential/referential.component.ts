import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import {ReferentialService} from "../../services/referential.service";
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import * as FileSaver from 'file-saver';
import {NgxUiLoaderService} from "ngx-ui-loader";
@Component({
  selector: 'app-referential',
  templateUrl: './referential.component.html',
  styleUrls: ['./referential.component.scss']
})
export class ReferentialComponent implements OnInit {


  constructor(private router:Router,private service:ReferentialService,private ngxService: NgxUiLoaderService) { }

  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;
  files: any[] = [];
  uploadResult:any;

  /**
   * /referentiel/typeEquipement/csv
   * /referentiel/mixelecs/csv
   * /referentiel/impactreseaux/csv
   * /referentiel/impactequipements/csv
   * /referentiel/impactMessagerie/csv
   * /referentiel/hypotheses/csv
   * /referentiel/etapes/csv
   * /referentiel/criteres/csv
   * /referentiel/correspondanceRefEquipement/csv
   */
  public types: any [] = [
    { id: 'references-type-equipement', name: 'Liste des types d\'équipements',apiSchema:'typeEquipement'},
    { id: 'references-mixelecs', name: 'Mix électriques par Pays',apiSchema:'mixelecs'},
    { id: 'references-impact-reseaux', name: 'Facteurs d\'impact liés au réseau',apiSchema:'impactreseaux'},
    { id: 'references-impact-equipements', name: 'Facteurs d\'impacts des équipements',apiSchema:'impactequipements'},
    { id: 'references-impact-Messagerie', name: 'Facteurs d\'impact de la messagerie',apiSchema:'impactMessagerie'},
    { id: 'references-hypotheses', name: 'Hypothèses',apiSchema:'hypotheses'},
    { id: 'references-etapes', name: 'Etapes du cycle de vie prises en charge',apiSchema:'etapes'},
    { id: 'references-criteres', name: 'Crtières pris en charge',apiSchema:'criteres'},
    { id: 'references-correspondance-RefEquipement', name: 'Correspondances entre les modèles et les équipements de référence',apiSchema:'correspondanceRefEquipement'},

  ];

  public selectedRef: any = null;
  public showUploadDiv : boolean = false;
  /**
   * on file drop handler
   */
  onFileDropped($event:any) {
    this.prepareFilesList($event);
    console.log($event);

  }

  upload() {
    this.uploadFile(this.files[0])
  }

  uploadFile(file:any) {
    this.ngxService.start();
    this.ngxService.startLoader("loader-01");
    const formData = new FormData();
    formData.append('file', file,file.name);
    this.service.upload(formData,this.selectedRef.apiSchema + "/csv").pipe(
        map((event:any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round(event.loaded * 100 / event.total);
              break;
            case HttpEventType.Response:
              this.openPopup();
              this.ngxService.stop();
              this.ngxService.stopLoader("loader-01");
              this.uploadResult = event;
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.ngxService.stop();
          this.ngxService.stopLoader("loader-01");
          file.inProgress = false;
          return of(`${file.name} upload failed.`);
        })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    });
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files:any) {
     const test = files.target.value;
    this.prepareFilesList(files.target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
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
    this.uploadFilesSimulator(0);
  }

  downloadCSVFile(){
    this.ngxService.start();
    this.ngxService.startLoader("loader-01");
    if(this.selectedRef){
      this.service.getRefsCSVFile(this.selectedRef.apiSchema).subscribe((response:any) => {
        FileSaver.saveAs(response, this.selectedRef.apiSchema + '_'+ Date.now() + '.csv');
        this.ngxService.stop();
        this.ngxService.stopLoader("loader-01");
      });
    }

  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes:any, decimals = 2) {
    if (bytes === 0) {return "0 Bytes";}
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  public progression = 1;

  ngOnInit(): void {
  }


  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }

  onSelectType(type:any) {
    this.selectedRef = type;
    this.showUploadDiv = false;
  }
  closePopup() {
    this.selectedRef = null;
    this.files = [];
    this.showUploadDiv = false;
    this.displayStyle = "none";
  }

  goToIndex() {
    this.router.navigateByUrl('');
  }

  protected readonly JSON = JSON;
}

