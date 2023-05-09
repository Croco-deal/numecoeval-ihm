import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-referencial',
  templateUrl: './referencial.component.html',
  styleUrls: ['./referencial.component.scss']
})
export class ReferencialComponent implements OnInit {


  constructor(private router:Router) { }

  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;
  files: any[] = [];
  public types: any [] = [
    { id: 'references-type-equipement', name: 'references-type-equipement' },
      { id: 'references-messagerie', name: 'references-messagerie' },
      { id: 'references-impact-equipement', name: 'references-impact-equipement' },
      { id: 'references-correspondanceRefEquipement', name: 'references-correspondanceRefEquipement' },
      { id: 'references-correspondanceRefMixElec', name: 'references-correspondanceRefMixElec' },

  ];
  public selectedRef: any = null;

  /**
   * on file drop handler
   */
  onFileDropped($event:any) {
    this.prepareFilesList($event);
    console.log($event);

  }

  upload() {
    console.log();

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
    debugger;
    this.selectedRef = type;
  }
  closePopup() {
    this.displayStyle = "none";
  }

  goToIndex() {
    this.router.navigateByUrl('');
  }

}

