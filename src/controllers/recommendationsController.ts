import { Request, Response } from 'express'
import * as recommendationsService from '../services/recommendationsService'

export async function addRecommendation(req: Request, res: Response) {
    try{
        const {name, youtubeLink } = req.body
        if(!name || !youtubeLink) return res.sendStatus(400)
        
        const sucess: boolean = await recommendationsService.addRecommendation(name, youtubeLink)
        const code: number = sucess ? 200 : 401
        return res.sendStatus(code)
    } catch(e){
        console.log(e)
        return res.sendStatus(500)
    }
}

export async function positiveVote(req: Request, res: Response){
    try{
        const { id } = req.params
        if(!id) return res.sendStatus(400)

        const sucess: boolean = await recommendationsService.positiveVote(parseInt(id))
        const code: number = sucess ? 200 : 404
        return res.sendStatus(code)
    } catch(e){
        console.log(e)
        return res.sendStatus(500)
    }
}

export async function negativeVote(req: Request, res: Response){
    try{
        const { id } = req.params
        if(!id) return res.sendStatus(400)

        const sucess: boolean = await recommendationsService.negativeVote(parseInt(id))
        const code: number = sucess ? 200 : 404
        return res.sendStatus(code)
    } catch(e){
        console.log(e)
        return res.sendStatus(500)
    }
}

export async function randomRecommendation(req: Request, res: Response){
    try{
        const recommendation: {id: number, name: string, youtubeLink: string, score: number}|boolean = await recommendationsService.randomRecommendation()
        if(recommendation){
            return res.send(recommendation)
        } else {
            return res.sendStatus(404)
        }
    } catch(e){
        console.log(e)
        return res.sendStatus(500)
    }

}

export async function topRecommendations(req: Request, res: Response){
    try{
        const { amount } = req.params
        if(parseInt(amount) < 1) return res.sendStatus(400)
        const recommendation: {id: number, name: string, youtubeLink: string, score: number}[] = await recommendationsService.topRecommendations(parseInt(amount))
        if(recommendation.length > 0){
            return res.send(recommendation)
        } else {
            return res.sendStatus(404)
        }
    } catch(e){
        console.log(e)
        return res.sendStatus(500)
    }

}