const fetch = require('node-fetch');
module.exports = class Login {
    constructor(url , credential) {
        this.url = url;
        this.credential = credential;
        this.passwordToken = null;
        this.actionToken = null;
    }

    async makeRequestWithFetch(options){
        try {
            return await fetch(options.url, {
                method: options.method,
                body: JSON.stringify(options.data),
                headers: options.headers
            }).then(res => res.json())
                .then(json => {
                    console.log("JSON", json)
                    return json
                });
        } catch (error) {
            console.log("Make Request ERROR :",error);
            return null
        }

    }

    async getPasswordToken() {
        const options =  {
            headers : {
                "Content-Type": "application/json",
            } ,
            data : {
                username : this.credential.username,
                password : this.credential.password
            },
            method:"POST",
            url : this.url.passwordTokenUrl
        };
        const retVal = await this.makeRequestWithFetch(options);
        console.log({retVal});
        this.passwordToken =  retVal.success ?  retVal.result.password_token  : null ;
    }

    async getActionToken() {
        await this.getPasswordToken();
        if(this.passwordToken !== null){
            const options = {
                headers : {
                    "X-Action-Token" : this.passwordToken,
                    "Content-Type": "application/json",
                },
                data : {
                    "verification_type": "password",
                    "token": this.passwordToken,
                    "code": this.credential.cipher
                },
                method : "POST",
                url : this.url.actionTokenUrl
            };
            const retVal = await this.makeRequestWithFetch(options);
            this.actionToken =  retVal.success ?  retVal.result.action_token  : null ;
            return this.actionToken;
        }
    }

}

