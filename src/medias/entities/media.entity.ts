export class Media {
    private _title: string;
    private _username: string;

    constructor(title: string, username: string) {
        this._title = title;
        this._username = username;
    }

    get title() {
        return this._title;
    }
    get username() {
        return this._username;
    }
}