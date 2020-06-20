import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AordemApiCrudService } from './aordem-api-crud.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public markdown = `# Oi`;

  title = 'a-ordem-teste';
  postForm: FormGroup;  
  submitted: boolean = false;

  user = {
      name: 'Marlos',
      id: '656456',
      moderator: true
  }

  moderators: Array<string> = ['134541','4543413','656456','9431434']

  checkMoredarators() {
    for (let i = 0; i < this.moderators.length; i++) {
      if (this.moderators[i] === this.user.id) {
        return true;
      }
    }
    return false;
  }

  constructor(private formBuilder: FormBuilder,  private zerbit: AordemApiCrudService) { }

  postArticle(article_content: string) {
    const uuid = uuidv4()
    const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const article = {
        content: article_content,
        by: this.user.name,
        id: uuid,
        original_date: utc,
        revised_date: 'null',
        tag: ['Teoria', 'Thiago Fritz', 'Original'],
        votes: 0,
        approved: this.checkMoredarators()
    }

    const routes = ["posts", `users/${this.user.name}/posts`];

    routes.map( route => {
      this.zerbit.getTask(route).subscribe( data => {
          console.log(data)
          
          const posts = data === null ? {} : data;
          posts[`${uuid}`] = article;

          this.zerbit.createTask(posts, route).subscribe( r => {
              console.log(r)
          })
      })
    })

  }

  onSubmit() {
    this.submitted = true;

    // parando aqui se o form for invalido
    if (this.postForm.invalid) {
      return;
    }

    this.postArticle(this.postForm.get('post').value)
  }

  ngOnInit() {
      this.postForm = this.formBuilder.group({
        post: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

}
