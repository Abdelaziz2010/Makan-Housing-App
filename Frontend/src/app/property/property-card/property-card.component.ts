import { Component, Input } from "@angular/core";
import { Ipropertybase } from "src/app/model/ipropertybase";


@Component({
  selector: 'app-property-card',
  // template: '<h1>I am a card</h1>',
  templateUrl: 'property-card.component.html',
  // styles: ['h1 {font-weight: normal;}']
  styleUrls: ['property-card.component.scss']
})

export class PropertyCardComponent{
  @Input() property!: Ipropertybase;
  @Input() hideIcons!: boolean;

}
