import { Component, Input } from '@angular/core';
import { CardDTO } from 'src/app/models/cardDTO.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  
  @Input() card: CardDTO = {
    id: 'string', 
    image: 'string',
    title: 'string',
    subtitle: 'string',
    type: 'string',
    duration: 0,
    popularity: 0
  }
}
