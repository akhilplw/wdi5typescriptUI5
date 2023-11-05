import Control from "sap/ui/core/Control";
import RenderManager from "sap/ui/core/RenderManager";
import type { MetadataOptions } from "sap/ui/core/Element";

export default class WindDirection extends Control {
    // The following three lines were generated and should remain as-is to make TypeScript aware of the constructor signatures
    constructor(idOrSettings?: string | $WindDirectionSettings);
    constructor(id?: string, settings?: $WindDirectionSettings);
    constructor(id?: string, settings?: $WindDirectionSettings) { super(id, settings); }

    static readonly metadata: MetadataOptions = {
        properties: {
            "direction": "float"
        }
    }

    renderer = {
        apiVersion: 2,
        render: (rm: RenderManager, control: WindDirection) => {
            rm.openStart("div", control);
            rm.style("font-size", "2rem");
            rm.style("height", "2rem");
            rm.style("display", "inline-block");
            rm.style("color", "blue");
            rm.style("transform-origin", "center");
            rm.style("transform", `rotate(${control.getDirection() + 90}deg)`);
            rm.openEnd();
            rm.text(">");
            rm.close("div");
        }
    }
}