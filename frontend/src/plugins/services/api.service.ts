
import { HttpClient } from '@aurelia/fetch-client';
import { newInstanceOf } from '@aurelia/kernel';
import {IHttpClient} from 'aurelia'

export class ApiService {
	constructor(@newInstanceOf(HttpClient) readonly http: HttpClient) {
				http.configure(config =>
					config
						.withBaseUrl('http://localhost:3000/api/rdm')
						.withDefaults({
							credentials: 'same-origin',
							headers: {
								'Accept': 'application/json',
								'X-Requested-With': 'Fetch'
							}
						})
						.withInterceptor({
							request(request) {
								console.log(`Requesting ${request.method} ${request.url}`);
								return request;
							},
							response(response) {
								console.log(`Received ${response.status} ${response.url}`);
								return response;
							}
						})
				);
	}

	async AddDevices(count: number) {
		return new Promise(async (resolve, reject) => {
			try {
				const request = await this.http.fetch(`/add/${count}`,{method: 'GET'});
				const response = await request.json();
				resolve(response);
			} catch (e) {
				reject(e);
			}
		})
	}

	async get(url: string) {
		return new Promise(async (resolve, reject) => {
			try {
				const request = await this.http.fetch(url,{method: 'GET'});
				const response = await request.json();
				resolve(response);
			} catch (e) {
				reject(e);
			}
		})
	}

	async put(url: string) {
		return new Promise(async (resolve, reject) => {
			try {
				const request = await this.http.fetch(url,{method: 'PUT'});
				const response = await request.json();
				resolve(response);
			} catch (e) {
				reject(e);
			}
		})
	}
}
