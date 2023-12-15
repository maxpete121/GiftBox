

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
        <button onclick="app.GiftController.openGift('${this.id}')">Open</button>
        ${this.creatorDelete}
        </span>
        </div>
        `
    }

    get creatorDelete(){
        if(this.creatorId == '6578c7d1c66a9dfc602590f2'){
            return`<button onclick="app.GiftController.deleteGift('${this.id}')">Delete</button>`
        }else{
            return ``
        }
    }
}