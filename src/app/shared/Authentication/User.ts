/// <reference path="../../tsd.d.ts" />

'use strict';

class User {
    constructor(public AccountUserId: number,
                public AccountTx: string,
                public FirstName: string,
                public LastName: string,
                public AccountAdmin: boolean,
                public SystemAdmin: boolean) {
    }
}

export = User;

