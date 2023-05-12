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
    { id: 'references-type-equipement', name: 'references-type-equipement', apiSchema : "typesEquipement"},
    { id: 'references-messagerie', name: 'references-messagerie',apiSchema : "impactsMessagerie"},
    { id: 'references-impact-equipement', name: 'references-impact-equipement' , apiSchema : "mixelecs?pays=France&critere=Changement%20climatique"},
    { id: 'references-correspondanceRefEquipement', name: 'references-correspondanceRefEquipement', apiSchema : "impactsMessagerie"},
    { id: 'references-correspondanceRefMixElec', name: 'references-correspondanceRefMixElec', apiSchema : "typesEquipement"},
    { id: 'criteres', name: 'criteres' , apiSchema : "criteres"},

  ];
  public selectedRef: any = null;
  ngOnInit(): void {
  }

  tableColumnDefs = null;
  tableRowData = null;

  onSelectType(type:any) {
    this.service.getRefs(type.apiSchema) .subscribe((response:any) => {
      let keys : any = (Object.keys(response[0])).map(f => {return {'field': f}});
      this.tableColumnDefs = keys;
      this.tableRowData = response;
    });
    this.selectedRef = type;
  }

  protected readonly JSON = JSON;
}
