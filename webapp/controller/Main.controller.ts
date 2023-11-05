import { InputBase$ChangeEvent } from "sap/m/InputBase";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import * as Nominatim from "nominatim-client";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace com.my.myappintypscript.controller
 */
export default class Main extends BaseController {
	onInit(): void {
		const model = new JSONModel();
		this.setModel(model);
		void this.loadWeatherData();
	}

	async loadWeatherData(lat = "49.31", lon = "8.64", placeName = "Walldorf") : Promise<void> {
		type WeatherInfo = {
			current_weather : {
				temperature: number,
				windspeed: number,
				winddirection: number
			},
			placeName: string
		}
		const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
		const jsonData = await response.json() as WeatherInfo;
		jsonData.placeName = placeName;
		(this.getModel() as JSONModel).setData(jsonData);
	}
	
	locationChange(evt: InputBase$ChangeEvent) :void {
		const location = evt.getParameters().value;
		Nominatim.createClient({
			useragent: "UI5 TypeScript TutorialApp",
			referer: "https://localhost"
		}).search({q: location}).then((results) => {
			if (results.length > 0) {
				return this.loadWeatherData(results[0].lat, results[0].lon, results[0].display_name);
			} else {
				MessageBox.alert(`Location ${location} not found`, {
					actions: MessageBox.Action.CLOSE
				});
			}
		}).catch(() => {
			MessageBox.alert(`Failure while searching ${location}`, {
				actions: MessageBox.Action.CLOSE
			});
		});

	}
}
