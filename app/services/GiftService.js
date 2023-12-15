import { AppState } from "../AppState.js"
import { baseURL } from "../env.js"
import { GiftController } from "../controllers/GiftController.js"
import { api } from "./AxiosService.js"
import { Gift } from "../models/Gift.js"




class GiftService{


    async getGifts(){
        const response = await api.get('api/gifts')
        console.log(response)
        const gifts = response.data.map(gift => new Gift(gift))
        AppState.Gifts = gifts
        console.log(AppState.Gifts)
    }

    async openGift(giftId){
        let grabGift = AppState.Gifts
        let activeGift = grabGift.find(gift => gift.id == giftId)
        activeGift.opened = true
        console.log('gift opened',activeGift)
        const response = await api.put(`api/gifts/${activeGift.id}`, activeGift)
        console.log('sandbox response',response)
        activeGift.url = response.data.url
        AppState.emit('Gifts')
    }


    async createGift(formData){
        const response = await api.post('api/gifts', formData)
        const newGift = new Gift(response.data)
        AppState.Gifts.push(newGift)
    }


    async searchGift(formData){
        console.log(formData.tag)
        let gifts = AppState.Gifts
        let searchedGifts = gifts.filter(gift => gift.tag == formData.tag)//Form data only passed through the items tag. This matches the tag to the items we are searching
        console.log('gifts with name', searchedGifts)
        AppState.SearchedGifts = searchedGifts//puts gifts that we found in our filter above into the SearchedGifts array in the appState
        console.log(AppState.SearchedGifts)

    }

    async deleteGift(giftId){
        const response = await api.delete(`api/gifts/${giftId}`)// deletes the gift in the api
        const indexToRemove = AppState.Gifts.findIndex(gift => gift.id == giftId)//grabs the gift we want to delete from our appState
        console.log('delete', indexToRemove)
        AppState.Gifts.splice(indexToRemove, 1)// removes the gift from our appState to trigger our listeners redraw
        if(AppState.SearchedGifts != null){
            const removeIndex = AppState.SearchedGifts.findIndex(gifts => gifts.id == giftId)
            AppState.SearchedGifts.splice(removeIndex, 1)//Removes item from the search array if the item that is getting deleted is in the search view
        }
    }
}

export const giftService = new GiftService()