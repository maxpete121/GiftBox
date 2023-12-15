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
        AppState.on('Gifts', _drawGifts)
        AppState.on('SearchedGifts', _drawSearched) //Search wont redraw when things are opened or deleted so this is needed
        // AppState.on('user', _drawGifts)
    }


    async getGifts(){
        await giftService.getGifts()
        _drawGifts()
    }

    async openGift(giftId){
       await giftService.openGift(giftId)
       _drawGifts()
       if(AppState.SearchedGifts != null){// searchGift in the appState, is null to start. Without the IF statement it will try to draw empty and throw an error
        _drawSearched()// needed incase gift is opened from search area
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
        await giftService.searchGift(formData)// Form for the search only has a name value on it. It will bring up all objects with that name.
        _drawSearched()
    }

    async deleteGift(giftId){
        await giftService.deleteGift(giftId)// Id is passed through delete button to find which gift to delete.
        _drawGifts()
        
        // if(AppState.SearchedGifts != null){
        //     _drawSearched()
        //    } 
    }


}