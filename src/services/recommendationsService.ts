import connection from '../database'
import * as schemes from '../aux/schemes'
import * as recommendationsRepository from '../repositories/recommendationsRepository'

export async function addRecommendation(name: string, youtubeLink:string): Promise<boolean>{
    try{
        try{
            const valueRecommendationName = await schemes.schemeRecommendationName.validateAsync(name)
            const valueYoutube = await schemes.schemeYoutube.validateAsync(youtubeLink)
        } catch(e){
            console.log(e)
            return false
        }
        const sucess: boolean = await recommendationsRepository.addRecommendation(name, youtubeLink)
        if(sucess) return true
    }   catch(e){
            console.log(e)
            return false
    }
}
