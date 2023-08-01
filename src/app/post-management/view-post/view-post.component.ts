import { MatDialog } from '@angular/material/dialog';
import { ViewPostService } from './view-post.service';
import { 
  Component, 
  OnInit 
} from '@angular/core';
import { 
  ActivatedRoute, 
  Router 
} from '@angular/router';
import { DeletePostComponent } from 'src/app/post-management';
import { UserState } from 'src/app/user-management/store.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit{

  postID = 0;

  constructor(
    private service: ViewPostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public userState: UserState
  ) { }

  post = {
    id: 0,
    title: '',
    body: ''
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postID = Number(params['id']);
    
      this.post = this.service.showPost(this.postID);
    });
  }

  navigateToPostList() {
    this.router.navigate(['list']);
  }

  navigateToUpdatePost() {
    this.router.navigate([this.postID,'update']);
  }

  openDeleteConfirmation() {
    this.dialog.open(DeletePostComponent,{
      data:this.post
    })
  }

}
