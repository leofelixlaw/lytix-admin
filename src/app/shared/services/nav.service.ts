import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

// Menu
export interface Menu {
	headTitle1?: string,
	headTitle2?: string,
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService implements OnDestroy {

	private unsubscriber: Subject<any> = new Subject();
	public  screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

	// Search Box
	public search: boolean = false;

	// Language
	public language: boolean = false;
	
	// Mega Menu
	public megaMenu: boolean = false;
	public levelMenu: boolean = false;
	public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

	// For Horizontal Layout Mobile
	public horizontal: boolean = window.innerWidth < 991 ? false : true;

	// Collapse Sidebar
	public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

	// Full screen
	public fullScreen: boolean = false;

	constructor(private router: Router) {
		this.setScreenWidth(window.innerWidth);
		fromEvent(window, 'resize').pipe(
			debounceTime(1000),
			takeUntil(this.unsubscriber)
		).subscribe((evt: any) => {
			this.setScreenWidth(evt.target.innerWidth);
			if (evt.target.innerWidth < 991) {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			}
			if(evt.target.innerWidth < 1199) {
				this.megaMenuColapse = true;
			}
		});
		if(window.innerWidth < 991) { // Detect Route change sidebar close
			this.router.events.subscribe(event => { 
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			});
		}
	}

	ngOnDestroy() {
		this.unsubscriber.next();
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}

	MENUITEMS: Menu[] = [
		{
			path: '/home', title: 'home', icon: 'home', type: 'link', bookmark: true
		},
		{
			headTitle1: 'Engage', headTitle2: 'Ready Channel Page.',
		},
		{
			title: 'Channel', icon: 'share-2', type: 'sub', badgeType: 'secondary', badgeValue: '2', active: true, children: [
				{ path: '/channel/sms', title: 'sms', type: 'link' },
				{ path: '/channel/email', title: 'email', type: 'extLink' },
				{ path: '/channel/push', title: 'push', type: 'extLink' }
			]
		},
		{ path: '/bookmarks', title: 'Bookmarks', icon: 'heart', type: 'link', bookmark: true },
		{ path: '/contacts', title: 'Contact', icon: 'list', type: 'link', bookmark: true },
		{ path: '/tasks', title: 'Tasks', icon: 'check-square', type: 'link', bookmark: true },
		{
			headTitle1: 'Analytical', headTitle2: 'Making a big decision',
		},
		{
			title: 'Analyze', icon: 'chart', type: 'sub', children: [
				{ path: '/', title: 'Analyze1', type: 'link' },
				{ path: '/', title: 'Analyze2', type: 'extLink' },
				{ path: '/', title: 'Analyze3', type: 'extLink' }
			]
		},
		{ path: '/editor', title: 'Editor', icon: 'edit', type: 'link' },
		{ path: '/knowledgebase', title: 'Knowledgebase', icon: 'sunrise', type: 'link' },
	];

	MEGAMENUITEMS: Menu[] = [
		{
			title: 'Error Pages', type: 'sub', active: true, children: [
				{ path: '#?', title: 'Error Page 400', type: 'extLink' },
				{ path: '#?', title: 'Error Page 401', type: 'extLink' },
				{ path: '#?', title: 'Error Page 403', type: 'extLink' },
				{ path: '#?', title: 'Error Page 404', type: 'extLink' },
				{ path: '#?', title: 'Error Page 500', type: 'extLink' },
				{ path: '#?', title: 'Error Page 503', type: 'extLink' },
			]
		},
		{
			title: 'Authentication', type: 'sub', active: false, children: [
				{ path: '#?', title: 'Login Simple', type: 'extLink' },
				{ path: '#?', title: 'Login BG Image', type: 'extLink' },
				{ path: '#?', title: 'Login BG Video', type: 'extLink' },
				{ path: '#?', title: 'Simple Register', type: 'extLink' },
				{ path: '#?', title: 'Register BG Image', type: 'extLink' },
				{ path: '#?', title: 'Register BG Video', type: 'extLink' }
			]
		},
		{
			title: 'Usefull Pages', type: 'sub', active: false, children: [
				{ path: '#?', title: 'Search Pages', type: 'extLink' },
				{ path: '#?', title: 'Unlock User', type: 'extLink' },
				{ path: '#?', title: 'Forgot Password', type: 'extLink' },
				{ path: '#?', title: 'Reset Password', type: 'extLink' },
				{ path: '#?', title: 'Maintenance', type: 'extLink' }
			]
		},
		{
			title: 'Email templates', type: 'sub', active: false, children: [
				{ path: 'http://admin.pixelstrap.com/eyeraise/theme/basic-template.html', title: 'Basic Email', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/eyeraise/theme/email-header.html', title: 'Basic With Header', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/eyeraise/theme/template-email.html', title: 'Ecomerce Template', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/eyeraise/theme/template-email-2.html', title: 'Email Template 2', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/eyeraise/theme/ecommerce-templates.html', title: 'Ecommerce Email', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/eyeraise/theme/email-order-success.html', title: 'Order Success', type: 'extTabLink' }
			]
		},
		{
			title: 'Coming Soon', type: 'sub', active: false, children: [
				{ path: '#?', title: 'Coming Simple', type: 'extLink' },
				{ path: '#?', title: 'Coming BG Image', type: 'extLink' },
				{ path: '#?', title: 'Coming BG Video', type: 'extLink' }
			]
		},
	];

	LEVELMENUITEMS: Menu[] = [
		{
			path: '#?', title: 'File Manager', icon: 'git-pull-request', type: 'extLink'
		},
		{
			title: 'Users', icon: 'users', type: 'sub', active: false, children: [
				{ path: '#?', title: 'All Users', icon: 'users', type: 'extLink' },
				{ path: '#?', title: 'User Profile', icon: 'users', type: 'extLink' },
				{ path: '#?', title: 'Edit Profile', icon: 'users', type: 'extLink' },
			]
		},
		{ path: '#?', title: 'Bookmarks', icon: 'heart', type: 'extLink' },
		{ path: '#?', title: 'Calender', icon: 'calendar', type: 'extLink' },
		{ path: '#?', title: 'Social App', icon: 'zap', type: 'extLink' }
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	megaItems = new BehaviorSubject<Menu[]>(this.MEGAMENUITEMS);
	levelmenuitems = new BehaviorSubject<Menu[]>(this.LEVELMENUITEMS);

}
