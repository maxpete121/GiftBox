import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { giftService } from "../services/GiftService.js"

function _drawGifts(){
    const gift = AppState.Gifts
    let content = ''
    gift.forEach(gifts => content += gifts.giftTemplate)
    document.getElementById('gift-view').innerHTML = content
}

export class GiftController{
    constructor(){
        console.log('gift controller loaded')
        AppState.on('user', this.getGifts)
        // AppState.on('user', _drawGifts)
    }


    async getGifts(){
        await giftService.getGifts()
        _drawGifts()
    }

    async openGift(giftId){
       await giftService.openGift(giftId) 
    }


}