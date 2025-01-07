import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'about',
        loadComponent: () => import('./pages/about-page/about-page.component'),
        title: 'About Us',
    },
    {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing-page/pricing-page.component'),
        title: 'Pricing'
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact-page/contact-page.component'),
        title: 'Contact Us'
    },
];
