import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isAuthenticated$: Observable<boolean>; // Observable to track authentication state

    constructor(private oidcSecurityService: OidcSecurityService, private http: HttpClient) {
        console.log('AuthService initialized');
        this.isAuthenticated$ = this.oidcSecurityService.checkAuth().pipe(
            tap(({ isAuthenticated }) => {
                console.log('User authenticated:', isAuthenticated);
            }),
            map(({ isAuthenticated }) => isAuthenticated)
        );
    }

    public login() {
        console.log('Starting login flow');
        this.oidcSecurityService.authorize();
    }

    public logout() {
        console.log('Logging out');
        this.oidcSecurityService.logoff();
    }

    public get identityClaims() {
        const claims = this.oidcSecurityService.getUserData();
        console.log('Fetching identity claims:', claims);
        return claims;
    }

    get accessToken() {
        const token = this.oidcSecurityService.getIdToken();
        console.log('Fetching access token:', token);
        return token;
    }

    get userProfile(): Observable<any> {
        const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
        console.log('Fetching user profile from:', url);

        return this.http.get(url, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        }).pipe(
            tap((profile) => console.log('User profile fetched:', profile)),
            catchError((error) => {
                console.error('Error fetching user profile:', error);
                return of(null);
            })
        );
    }
}


