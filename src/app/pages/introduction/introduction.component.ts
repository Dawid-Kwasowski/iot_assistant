import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  public introductionImgPath: string = '/assets/images/smart_home.svg';
  
  constructor(
    private translate: TranslateService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  public navigateTo(name: string): void {
    this.router.navigate([`/${name}`]);
  }
}
