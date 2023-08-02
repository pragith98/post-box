import { Router } from '@angular/router';
import { 
  Component, 
  OnInit 
} from '@angular/core';
import { PostState } from 'src/app/post-management';
import { UserState } from 'src/app/user-management/store.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(
    public postState: PostState,
    private router: Router,
    public userState: UserState
  ) { }

  ngOnInit(): void {
    this.postState.getAllPosts()
  }

  navigateToCreatePost() {
    this.router.navigate(['create']);
  }
}
