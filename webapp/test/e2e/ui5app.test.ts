/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { wdi5Selector } from "wdio-ui5-service";
import Input from "sap/m/Input";
import Text from "sap/m/Text";
const sTextPlace = "Stockholm";


describe("Testing the default location name: Waldorf", () => {
	it("Check default value for location field", async (): Promise<void> => {
		const oTextSelector: wdi5Selector = {
			selector: {
				controlType: "sap.m.Text",
				viewName: "com.my.myappintypscript.view.Main",
				labelFor: {
					text: "Place",
				},
			},
		};
		const sDefaultTextControl: unknown = await browser.asControl(oTextSelector);
		const sValue: string = await (sDefaultTextControl as Text).getText();
		expect(sValue).toEqual("Walldorf");
	});

	it("Change the default value and check for country Stockholm", async (): Promise<void> => {
		const oInputSelector: wdi5Selector = {
			selector: {
				id: "location",
				viewName: "com.my.myappintypscript.view.Main",
				interaction: {
					idSuffix: "inner",
				},
			},
		};
		const oInputControl: unknown = await browser.asControl(oInputSelector);
		oInputControl.enterText(sTextPlace);

		const oTextSelector: wdi5Selector = {
			selector: {
				controlType: "sap.m.Text",
				viewName: "com.my.myappintypscript.view.Main",
				labelFor: {
					text: "Place",
				},
			},
		};
		const sDefaultTextControl: unknown = await browser.asControl(oTextSelector);
		const sValue: string = await sDefaultTextControl.getText();
		expect(sValue).toHaveValueContaining(sTextPlace);
	});
});

// it("should log", async () => {
//     const logger = wdi5.getLogger();
//     logger.log("Testing UI5 TypeScript app");
// });

// it("Check default value for location", async () => {
//     const oTextSelector : wdi5Selector = {
//         selector: {
//             controlType: "sap.m.Text",
//             viewName: "com.my.myappintypscript.view.Main",
//             labelFor: {
//                 text: "Place"
//             }
//         }
//     };
//     const sDefaultTextControl = await browser.asControl<Text>(oTextSelector);
//     const sValue: string = await sDefaultTextControl.getText();
//     expect(sValue).toEqual("Walldorf");
// })

// it("Change the default value and check", async () => {
//     const oInputSelector : wdi5Selector = {
//         selector: {
//             id: "location",
//             viewName: "com.my.myappintypscript.view.Main",
//             interaction: {
//                 idSuffix: "inner"
//             }
//         }
//     }
//     const oInputControl = await browser.asControl<Input>(oInputSelector);
//     oInputControl.enterText("Sweden");

//     const oTextSelector : wdi5Selector = {
//         selector: {
//             controlType: "sap.m.Text",
//             viewName: "com.my.myappintypscript.view.Main",
//             labelFor: {
//                 text: "Place"
//             }
//         }
//     };
//     const sDefaultTextControl = await browser.asControl<Text>(oTextSelector);
//     const sValue: string = await sDefaultTextControl.getText();
//     expect(sValue).toEqual("Sweden");
// })
