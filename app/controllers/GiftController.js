import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { giftService } from "../services/GiftService.js"
import { getFormData } from "../utils/FormHandler.js"

function _drawGifts(){
    const gift = AppState.Gifts
    let content = ''
    gift.forEach(gifts => content += gifts.giftTemplate)
    document.getElementById('gift-view').innerHTML = content
    console.log('draw')
}

function _drawSearched(){
    const sGifts = AppState.SearchedGifts
    let content = ''
    sGifts.forEach(gift => content += gift.giftTemplate)
    document.getElementById('searched-gifts').innerHTML = content
}

export class GiftController{
    constructor(){
        console.log('gift controller loaded')
        AppState.on('user', this.getGifts)
        // AppState.on('', this.getGifts)
        AppState.on('Gifts', _drawGifts)
        // AppState.on('user', _drawGifts)
    }


    async getGifts(){
        await giftService.getGifts()
        _drawGifts()
    }

    async openGift(giftId){
       await giftService.openGift(giftId)
       _drawGifts()
       if(AppState.SearchedGifts != null){
        _drawSearched()
       } 
    }

    async createGift(){
        event.preventDefault()
        let form = event.target
        let formData = getFormData(form)
        await giftService.createGift(formData)
        form.reset() 
    }

    async searchGift(){
        event.preventDefault()
        let form = event.target
        let formData = getFormData(form)
        await giftService.searchGift(formData)
        _drawSearched()
    }


}