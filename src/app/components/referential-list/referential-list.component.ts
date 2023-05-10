import { Component, OnInit } from '@angular/core';
import {ReferentialService} from "../../services/referential.service";

@Component({
  selector: 'app-referential-list',
  templateUrl: './referential-list.component.html',
  styleUrls: ['./referential-list.component.scss']
})
export class ReferentialListComponent implements OnInit {

  constructor(private service:ReferentialService) { }
  public types: any [] = [
    { id: 'references-type-equipement', name: 'references-type-equipement' },
    { id: 'references-messagerie', name: 'references-messagerie' },
    { id: 'references-impact-equipement', name: 'references-impact-equipement' },
    { id: 'references-correspondanceRefEquipement', name: 'references-correspondanceRefEquipement' },
    { id: 'references-correspondanceRefMixElec', name: 'references-correspondanceRefMixElec' },

  ];
  public selectedRef: any = null;

  public reqResult: any = null;

  ngOnInit(): void {
  }

  onSelectType(type:any) {
    this.service.getPosts() .subscribe(response => {
      this.reqResult = response;
      console.log(response);
    });
    this.selectedRef = type;
  }

  protected readonly JSON = JSON;
}
