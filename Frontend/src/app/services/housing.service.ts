import { Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../model/property';
import { Ipropertybase } from '../model/ipropertybase';
import { Observable } from 'rxjs';
import { Iproperty } from '../model/iproperty';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HousingService
{

  constructor(private http: HttpClient) { }

  getProperty(id: number)
  {
    return this.getAllProperties().pipe(
      map(propertiesArray =>
      {
        return propertiesArray.find(p => p.Id === id);
      }));
  }

  getAllProperties(SellRent?: number): Observable<Ipropertybase[]>
  {
    return this.http.get('data/properties.json').pipe(
      map(data =>
      {
        const propertiesArray: Array<Ipropertybase> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp')!);
        if(localProperties)
        {
          for (const id in localProperties)
          {
            if(SellRent)
            {
              if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent)
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
            if(dataWithIndexSignature.hasOwnProperty(id) && dataWithIndexSignature[id].SellRent === SellRent)
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
    return this.http.get<Iproperty[]>('data/properties.json');
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
}

// getAllProperties(SellRent: number): Observable<Ipropertybase[]>
// {
//   return this.http.get('data/properties.json').pipe(
//     map(data =>
//     {
//       const propertiesArray: Array<Ipropertybase> = [];

//       const localProperties = JSON.parse(localStorage.getItem('newProp') || '{}');

//       if(localProperties)
//       {
//         for (const id in localProperties)
//         {
//           if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent)
//           {
//             propertiesArray.push(localProperties[id]);
//           }
//         }
//       }

//       const dataWithIndexSignature = data as { [key: string]: any} ;

//       for (const id in dataWithIndexSignature)
//       {
//         if (dataWithIndexSignature.hasOwnProperty(id) && dataWithIndexSignature[id].SellRent === SellRent)
//         {
//           propertiesArray.push(dataWithIndexSignature[id]);
//         }
//       }
//       return propertiesArray;
//     })
//   );
//   return this.http.get<Iproperty[]>('data/properties.json');
// }


// addProperty(property: Property)
// {
//   localStorage.setItem('newProp', JSON.stringify(property));
// }
