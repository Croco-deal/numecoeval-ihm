import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import {ReferentialService} from "../../services/referential.service";
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-referential',
  templateUrl: './referential.component.html',
  styleUrls: ['./referential.component.scss']
})
export class ReferentialComponent implements OnInit {


  constructor(private router:Router,private service:ReferentialService) { }

  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;
  files: any[] = [];

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
    { id: 'references-type-equipement', name: 'Type Equipement',apiSchema:'typeEquipement'},
      { id: 'references-mixelecs', name: 'Mixelecs',apiSchema:'mixelecs'},
      { id: 'references-impact-reseaux', name: 'Impact Reseaux',apiSchema:'impactreseaux'},
    { id: 'references-impact-equipements', name: 'Impact Equipement',apiSchema:'impactequipements'},
    { id: 'references-impact-Messagerie', name: 'Impact Messagerie',apiSchema:'impactMessagerie'},
    { id: 'references-hypotheses', name: 'hypotheses',apiSchema:'hypotheses'},
    { id: 'references-etapes', name: 'Etapes',apiSchema:'etapes'},
    { id: 'references-criteres', name: 'Criteres',apiSchema:'criteres'},
    { id: 'references-correspondance-RefEquipement', name: 'Correspondance Ref Equipement',apiSchema:'correspondanceRefEquipement'},

  ];
  public selectedRef: any = null;
  public showUploadDiv : boolean = false;
  /**
   * on file drop handler
   */
  onFileDropped($event:any) {
    debugger
    this.prepareFilesList($event);
    console.log($event);

  }

  upload() {
    debugger
    this.uploadFile(this.files[0])
    // return this.service.postRefs(this.files[0],"mixelecs/csv").subscribe((response:any) => {
    //   debugger
    //   console.log(response)
    // });
  }

  uploadFile(file:any) {
    const formData = new FormData();
    var reader = new FileReader();
    reader.onload = (event: any) => {
      const localUrl = event.target.value;
      debugger
    }
    reader.readAsBinaryString(file);
    formData.append('file', file);
    console.log(formData.get('file'))

    this.service.upload(formData,"mixelecs/csv").pipe(
        map((event:any) => {
          debugger
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round(event.loaded * 100 / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          debugger
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
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
    if(this.selectedRef){
      debugger
      this.service.getRefsCSVFile(this.selectedRef.apiSchema) .subscribe((response:any) => {
        debugger
        FileSaver.saveAs(response, this.selectedRef.apiSchema + '_'+ Date.now() + '.csv');
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
    const response = this.upload()
    this.displayStyle = "block";
  }

  onSelectType(type:any) {
    this.selectedRef = type;
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

}

