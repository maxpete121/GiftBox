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
}

export const giftService = new GiftService()