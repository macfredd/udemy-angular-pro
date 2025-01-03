import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AboutPageComponent implements OnInit {

  private meta = inject(Meta);

  ngOnInit(): void {
    this.meta.updateTag({ name: 'description', content: 'Learn more about our company.' });
  }
}
