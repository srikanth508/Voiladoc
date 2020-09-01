import { Component, OnInit } from '@angular/core';
import { Translator } from 'angular-translator';

@Component({
  selector: 'app-language-check',
  templateUrl: './language-check.component.html',
  styleUrls: ['./language-check.component.css']
})
export class LanguageCheckComponent implements OnInit {

  constructor(translator: Translator) { }

  ngOnInit() {
  }

}
