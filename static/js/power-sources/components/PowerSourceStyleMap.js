class PowerSourceStyleMap {

    constructor(type) {
        this.name = '';
        this.classes = [];

        switch (type) {
            case "solar":
                this.name = "Photovoltaïque";
                this.classes += "solar"
                break;
            case "wind":
                this.name = "Éolien";
                this.classes += "wind"
                break;
            case "hydraulic":
                this.name = "Hydraulique";
                this.classes += "hydraulic"
                break;
            case "nuclear":
                this.name = "Nucléaire";
                this.classes += "nuclear"
                break;
            case "bioenergy":
                this.name = "Bioénergies";
                this.classes += "bioenergies"
                break;
            case "fossil":
                this.name = "Fossiles";
                this.classes += "fossil"
                break;
            default:
                console.warn("A unknown type of power-source has been passed (" + type + "). Defaulting values.");
                this.name = "UNKNOWN TYPE " + type;
                this.classes += "unknown"
                break;
        }


    }
}

export default PowerSourceStyleMap;