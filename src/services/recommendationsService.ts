import * as schemes from '../aux/schemes'
import * as recommendationsRepository from '../repositories/recommendationsRepository'
import { RecommendationData } from '../controllers/recommendationsController'

export async function addRecommendation(name: string, youtubeLink:string): Promise<boolean>{
    try{
        try{
            const valueRecommendationName:boolean = await schemes.schemeRecommendationName.validateAsync(name)
            const valueYoutube:boolean = await schemes.schemeYoutube.validateAsync(youtubeLink)
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

export async function positiveVote(id: number): Promise<boolean>{
    try{
        const sucess = await recommendationsRepository.positiveVote(id)
        if(sucess) return true
    } catch(e){
        console.log(e)
        return false
    }
}

export async function negativeVote(id: number): Promise<boolean>{
    try{
        const numberDownVotes = await recommendationsRepository.negativeVote(id)
        if(numberDownVotes < -5){
            await recommendationsRepository.deleteRecommendation(id)
        } else if(!numberDownVotes && numberDownVotes !== 0){
            return false
        }
        return true
    } catch(e){
        console.log(e)
        return false
    }
}

export async function randomRecommendation(): Promise<RecommendationData|boolean>{
    try{
        let counter = 0;
        const percentage =  Math.random()
        let randomSelection = percentage < 0.7 ? "votes > 10" : "votes <= 10"
        let recommendation: RecommendationData = await recommendationsRepository.randomRecommendation(randomSelection)
        while(!recommendation && counter < 1){
            randomSelection = percentage > 0.7 ? "votes > 10" : "votes <= 10"
            recommendation = await recommendationsRepository.randomRecommendation(randomSelection)
            counter++
        }
        return recommendation
    } catch(e){
        console.log(e)
        return false
    }
}

export async function topRecommendations(amount: number): Promise<RecommendationData[]>{
    try{
        const recommendation = await recommendationsRepository.topRecommendations(amount)
        if(recommendation) return recommendation
    } catch(e){
        console.log(e)
    }
}
