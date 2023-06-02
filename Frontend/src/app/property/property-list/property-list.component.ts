import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ipropertybase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit{

  properties!: Ipropertybase[];
  SellRent = 1;
  Today = new Date();
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute , private housingService:HousingService) { }

  ngOnInit(): void
  {
    if((this.route.snapshot.url.toString()))
    {
       this.SellRent = 2;   //means we are on rent-property URL else we are on base URL
    }

    this.housingService.getAllProperties(this.SellRent).subscribe(
    data =>
    {
      this.properties = data;
      console.log(data);
    },
    error =>
    {
      console.log('httperror:');
      console.log(error);
    });
  }

  onCityFilter()
  {
    this.SearchCity = this.City;
  }

  onCityFilterClear()
  {
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection()
  {
    if (this.SortDirection === 'desc')
    {
      this.SortDirection = 'asc';
    }
    else
    {
      this.SortDirection = 'desc';
    }
  }
}
