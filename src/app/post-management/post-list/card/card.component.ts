import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  navigateToShowPost() {
    this.router.navigate([this.post.id,'view'])
  }
}
