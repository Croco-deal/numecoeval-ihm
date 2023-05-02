import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private router: Router) { }

  public resultPage(id:number){
    // Create Book logic
    this.router.navigate(['/result/'+id]);
  }

  public history = [
    {
      id:1,
      title : 'Lot 1',
      date :'15/04/2023'
    },{
      id:2,
      title : 'Lot 2',
      date :'15/04/2023'
    },{
      id:3,
      title : 'Lot 3',
      date :'15/04/2023'
    },{
      id:4,
      title : 'Lot 4',
      date :'15/04/2023'
    },{
      id:5,
      title : 'Lot 5',
      date :'15/04/2023'
    },{
      id:6,
      title : 'Lot 6',
      date :'15/04/2023'
    },{
      id:7,
      title : 'Lot 7',
      date :'15/04/2023'
    },{
      id:8,
      title : 'Lot 8',
      date :'15/04/2023'
    },{
      id:9,
      title : 'Lot 9',
      date :'15/04/2023'
    },{
      id:10,
      title : 'Lot 10',
      date :'15/04/2023'
    },{
      id:11,
      title : 'Lot 11',
      date :'15/04/2023'
    },{
      id:12,
      title : 'Lot 12',
      date :'15/04/2023'
    },
]
  ngOnInit(): void {
  }

}
