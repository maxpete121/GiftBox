

export class Gift{
    constructor(data){
        this.tag = data.tag || 'No tag'
        this.url = data.url
        this.id = data.id
        this.opened = data.opened
        this.creatorId = data.creatorId
        this.profileIdsOpened = data.profileIdsOpened
    }

    get giftTemplate(){
        return `
        <div class="card w-50">
        <img src="${this.url}">
        <div>${this.tag}</div>
        <span>
        <button onclick="app.GiftController.openGift('${this.id}')">Open</button
        </span>
        </div>
        `
    }
}