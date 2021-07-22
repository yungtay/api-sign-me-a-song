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
        res.sendStatus(500)
    }
}

export async function positiveVote(req: Request, res: Response){
    try{
        const { id } = req.params
        if(!id) res.sendStatus(400)

        const sucess: boolean = await recommendationsService.positiveVote(parseInt(id))
        const code: number = sucess ? 200 : 401
        return res.sendStatus(code)
    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function negativeVote(req: Request, res: Response){
    try{
        const { id } = req.params
        if(!id) res.sendStatus(400)

        const sucess: boolean = await recommendationsService.negativeVote(parseInt(id))
        const code: number = sucess ? 200 : 401
        return res.sendStatus(code)
    } catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}