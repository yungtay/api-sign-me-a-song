import connection from '../database'
export async function addRecommendation(name: string, youtubeLink: string){
    const result = await connection.query(`INSERT INTO recommendations (name, "youtubeLink") 
    VALUES ($1, $2) RETURNING *`, 
    [name, youtubeLink])
    if(result.rows[0]) return true
}
