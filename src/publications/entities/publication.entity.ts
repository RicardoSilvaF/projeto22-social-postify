
export class Publication {
    private _mediaId: number;
    private _postId: number;
    private _date: Date;

    constructor(mediaId: number, postId: number, date: Date) {
        this._mediaId = mediaId;
        this._postId = postId;
        this._date = date;
    }

    get mediaId() {
        return this._mediaId;
    }
    get postId() {
        return this._postId;
    }
    get date(){
        return this._date;
    }
}