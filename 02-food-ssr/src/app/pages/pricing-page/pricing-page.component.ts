import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent implements OnInit {

  private meta = inject(Meta);

  ngOnInit(): void {
    this.meta.updateTag({ name: 'description', content: 'Learn more about our pricing.' });
  }

}
