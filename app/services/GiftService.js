import { AppState } from "../AppState.js"
import { baseURL } from "../env.js"



const newGifts = axios.create({
    baseURL: 'https://sandbox.codeworksacademy.com/api/'
})



class GiftService{


    async getGifts(){
        const response = await newGifts.get('gifts')
    }
}

export const giftService = new GiftService()