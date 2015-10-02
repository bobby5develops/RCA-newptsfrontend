class PersonalInformation {
    constructor(public email: string,
                public firstName: string,
                public lastName: string,
                public address: string,
                public country: string,
                public state: string,
                public city: string) {
    }

    /**
     * Convenience method. This is coupled to the DAL but we can change this if we create a more abstracted persistence
     * layer later.
     * Note: state is not cleared if it moves to a non-required Country (i.e.,., US and Canada)
     */
    public toDAL() : DAL {
        var json : DAL = {
            "address_tx" : this.address,
            "country_tx" : this.country,
            "city_tx" : this.city
        };
        if (this.state != null) {
            json.stateProvince_tx = this.state;
        }
        return json;
    }
}

interface DAL {
    "address_tx" : string,
    "country_tx" : string,
    "stateProvince_tx" ?: string,
    "city_tx" : string
}

export = PersonalInformation;
