import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home-page/home-page.component'),
        title: 'Home',
    },
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
    {
        path: 'recipes',
        loadComponent: () => import('./pages/recipes-page/recipes-page.component'),
        /* title will be set dynamically */
    },
    {
        path: 'recipes/:id',
        loadComponent: () => import('./pages/recipe-page/recipe-page.component'),
        /* title will be set dynamically */
    },
];
