import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipropertybase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId!: number;
  public mainPhotoUrl!: string;
  property = new Property();
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit()
  {

    this.propertyId = +this.route.snapshot.params['id'];

    this.route.data.subscribe(
      (data) =>
      {
        this.property = data['prp'] as Property;
        console.log(this.property.photos);
      }
    );

    this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn!);

    this.galleryOptions =
    [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.getPropertyPhotos();
    // this.galleryImages =
    // [
    //   {
    //     small: 'assets/images/internal-1.jpg',
    //     medium: 'assets/images/internal-1.jpg',
    //     big: 'assets/images/internal-1.jpg'
    //   },
    //   {
    //     small: 'assets/images/internal-2.jpg',
    //     medium: 'assets/images/internal-2.jpg',
    //     big: 'assets/images/internal-2.jpg'
    //   },
    //   {
    //     small: 'assets/images/internal-3.jpg',
    //     medium: 'assets/images/internal-3.jpg',
    //     big: 'assets/images/internal-3.jpg'
    //   },
    //   {
    //     small: 'assets/images/internal-4.jpg',
    //     medium: 'assets/images/internal-4.jpg',
    //     big: 'assets/images/internal-4.jpg'
    //   },
    //   {
    //     small: 'assets/images/internal-5.jpg',
    //     medium: 'assets/images/internal-5.jpg',
    //     big: 'assets/images/internal-5.jpg'
    //   },
    // ];

    // this.route.params.subscribe(
    //   (params) => {
    //     this.propertyId = +params['id'];
    //     this.housingService.getProperty(this.propertyId).subscribe(
    //       (data) =>
    //       {
    //         this.property = data as Property;
    //       }
    //     );
    //   }
    // );
  }

  changePrimaryPhoto(mainPhotoUrl: string)
  {
    this.mainPhotoUrl = mainPhotoUrl;
  }

  getPropertyPhotos(): NgxGalleryImage[]
  {
    const photoUrls: NgxGalleryImage[] = [];
    for (const photo of this.property.photos!) {
        if(photo.isPrimary)
        {
            this.mainPhotoUrl = photo.imageUrl;
        }
        else
        {
          photoUrls.push(
            {
                small: photo.imageUrl,
                medium: photo.imageUrl,
                big: photo.imageUrl
            });
        }
    }
    return photoUrls;
 }
}
