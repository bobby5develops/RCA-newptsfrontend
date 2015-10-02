class ChangePassword {
    constructor(public oldPassword : string,
                public newPassword: string,
                public confirmPassword: string) {
    }

    public get ConfirmMatches() : boolean {
        return this.newPassword === this.confirmPassword;
    }

    /**
     * Convenience method. This is coupled to the DAL but we can change this if we create a more abstracted persistence
     * layer later.
     */
    public toDAL() : DAL {
        var json : DAL = {
            "oldPassword" : this.oldPassword,
            "newPassword" : this.newPassword
        };
        return json;
    }
}

interface DAL {
    "oldPassword" : string,
    "newPassword" : string
}

export = ChangePassword;
