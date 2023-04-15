import Aurelia from 'aurelia';
import { App } from './app';
import {IAuiConfiguration} from "./plugins";
import { RouterConfiguration } from '@aurelia/router';
import {ValidationHtmlConfiguration, ValidationTrigger} from '@aurelia/validation-html';
Aurelia
	.register(RouterConfiguration.customize({ useUrlFragmentHash: false }))

	.register(ValidationHtmlConfiguration.customize((options) => {
		// customization callback
		options.DefaultTrigger = ValidationTrigger.changeOrFocusout;
	}))
	.register(IAuiConfiguration)
  .app({
		component: App,
		host: document.querySelector('body')
	})
  .start();

