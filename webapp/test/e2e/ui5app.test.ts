import { wdi5, wdi5Selector } from "wdio-ui5-service"
import Input from "sap/m/Input";
import Text from "sap/m/Text";
// import 

describe("Testing the default location name: Waldorf", async () => {
    it("should log", async () => {
        const logger = wdi5.getLogger();
        logger.log("Testing UI5 TypeScript app");
    });

    it("Check default value for location", async () => {
        const oTextSelector : wdi5Selector = {
            selector: {
                controlType: "sap.m.Text",
                viewName: "com.my.myappintypscript.view.Main",
                labelFor: {
                    text: "Place"
                }
            }
        };
        const sDefaultTextControl = await browser.asControl<Text>(oTextSelector);
        const sValue: string = await sDefaultTextControl.getText();
        expect(sValue).toEqual("Walldorf");
    })

    it("Change the default value and check", async () => {
        const oInputSelector : wdi5Selector = {
            selector: {
                id: "location",
                viewName: "com.my.myappintypscript.view.Main",
                interaction: {
                    idSuffix: "inner"
                }
            }
        }
        const oInputControl = await browser.asControl<Input>(oInputSelector);
        oInputControl.enterText("Sweden");

        const oTextSelector : wdi5Selector = {
            selector: {
                controlType: "sap.m.Text",
                viewName: "com.my.myappintypscript.view.Main",
                labelFor: {
                    text: "Place"
                }
            }
        };
        const sDefaultTextControl = await browser.asControl<Text>(oTextSelector);
        const sValue: string = await sDefaultTextControl.getText();
        expect(sValue).toEqual("Sweden");
    })


});



