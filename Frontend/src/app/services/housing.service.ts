import { Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../model/property';
import { Ipropertybase } from '../model/ipropertybase';
import { Observable } from 'rxjs';
import { Iproperty } from '../model/iproperty';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HousingService
{
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getAllCities(): Observable<string[]>
  {
    return this.http.get<string[]>("http://localhost:5298/api/city");
  }

  getProperty(id: number)
  {
    return this.getAllProperties().pipe(
      map(propertiesArray =>
      {
        // throw new Error('Some error');
        return propertiesArray.find(p => p.id === id);
      }));
  }

  // getProperty(id: number)
  // {
  //   return this.http.get<Property>(this.baseUrl +'/property/detail/'+id.toString());
  // }

  // getAllProperties(SellRent: number): Observable<Property[]>
  // {
  //   return this.http.get<Property[]>(this.baseUrl +'/property/list/'+SellRent.toString());
  // }



  getAllProperties(SellRent?: number): Observable<Property[]>
  {
    return this.http.get('data/properties.json').pipe(
      map(data =>
      {
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp')!);
        if(localProperties)
        {
          for (const id in localProperties)
          {
            if(SellRent)
            {
              if (localProperties.hasOwnProperty(id) && localProperties[id].sellRent === SellRent)
              {
                propertiesArray.push(localProperties[id]);
              }
            }
            else
            {
              propertiesArray.push(localProperties[id]);
            }
          }
        }

        const dataWithIndexSignature = data as { [key: string]: any} ;

        for (const id in dataWithIndexSignature)
        {
          if(SellRent)
          {
            if(dataWithIndexSignature.hasOwnProperty(id) && dataWithIndexSignature[id].sellRent === SellRent)
            {
              propertiesArray.push(dataWithIndexSignature[id]);
            }
          }
          else
          {
            propertiesArray.push(dataWithIndexSignature[id]);
          }
        }
        return propertiesArray;
      })
    );
    return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property: Property)
  {
    let newProp = [property];

    // Add new property in array if newProp alreay exists in local storage
    if (localStorage.getItem('newProp'))
    {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp')!)];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID()
  {
    if(localStorage.getItem('PID'))
    {
      localStorage.setItem('PID',String(+localStorage.getItem('PID')! + 1));
      return +localStorage.getItem('PID')!;
    }
    else
    {
      localStorage.setItem('PID','101');
      return 101;
    }
  }
  getPropertyAge(dateofEstablishment: string): string
  {
      const today = new Date();
      const estDate = new Date(dateofEstablishment);
      let age = today.getFullYear() - estDate.getFullYear();
      const m = today.getMonth() - estDate.getMonth();

      // Current month smaller than establishment month or
      // Same month but current date smaller than establishment date
      if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
          age --;
      }

      // Establshment date is future date
      if(today < estDate) {
          return '0';
      }

      // Age is less than a year
      if(age === 0) {
          return 'Less than a year';
      }

      return age.toString();
  }
}
