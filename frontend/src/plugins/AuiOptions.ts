import { IContainer } from '@aurelia/kernel';
import { AppTask, DI, Registration } from 'aurelia';
import {UiService} from './services/ui.service'


export interface IAuiOptions {
	useWave: boolean;
}
export const defaultAuiOptions: IAuiOptions = {
	useWave: true
};


function configure(container: IContainer, config: IAuiOptions = defaultAuiOptions) {
	return container.register(
			AppTask.hydrating(IContainer, async container => {
				Registration.instance(AuiOptions, config).register(container);
			}),
			Registration.instance(UiService, UiService)
	);
}
export const AuiOptions = DI.createInterface<IAuiOptions>('IAuiOptions');

export const IAuiConfiguration = {
	register(container: IContainer) {
		return configure(container);
	},
	customize(config: IAuiOptions) {
		return {
			register(container: IContainer) {
				return configure(container, config);
			},
		};
	},
};
