import {IEventAggregator,ILogger } from "aurelia";

export enum UiFontSizes {
	SM,
	MD,
	LG,
	XL
}

export enum UiThemeMode {
	Light,
	Dark
}
export enum UIExpandCollapse {
	expanded,
	collapsed
}


export class UiService {

	constructor(@IEventAggregator readonly ea: IEventAggregator,
							@ILogger private readonly logger: ILogger) {
		this.logger = logger.scopeTo('UiService');
	}
}
