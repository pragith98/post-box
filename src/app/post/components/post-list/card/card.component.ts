import { Router } from '@angular/router';
import { 
  Component, 
  Input 
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  
  @Input('post') post = {
    title: '',
    body: '',
    id: 0
  };

  constructor(private router: Router) { }

  navigateToShowPost(): void {
    this.router.navigate([this.post.id,'view'])
  }
}
