import Joi from 'joi'

const schemeRecommendationName = Joi.string().min(1).required()
const schemeYoutube = Joi.string().pattern(new RegExp('^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$'))

export {schemeRecommendationName, schemeYoutube}