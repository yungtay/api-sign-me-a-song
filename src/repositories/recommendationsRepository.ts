import connection from '../database'

export async function addRecommendation(name: string, youtubeLink: string){
    const result = await connection.query(`INSERT INTO recommendations (name, "youtubeLink", votes) 
    VALUES ($1, $2, 0) RETURNING *`, 
    [name, youtubeLink])
    if(result.rows[0]) return true
}

export async function positiveVote(id: number){
    const result = await connection.query(`UPDATE recommendations 
    SET votes = votes + 1 WHERE id = $1 RETURNING *`, [id])
    if(result.rows[0]) return true
}

export async function negativeVote(id: number){
    const result = await connection.query(`UPDATE recommendations 
    SET votes = votes - 1 WHERE id = $1 RETURNING *`, [id])
    if(result.rows[0]) return result.rows[0].votes
}

export async function deleteRecommendation(id: number){
    await connection.query(`DELETE FROM recommendations WHERE id = $1 RETURNING *`, [id])
}

export async function randomRecommendation(randomSelection: string){
    const result = await connection.query(`SELECT * FROM recommendations 
    WHERE ${randomSelection} ORDER BY random()`)
    if(result.rows[0]) return result.rows[0]
}

export async function topRecommendations(amount: number){
    const result = await connection.query(`SELECT * FROM recommendations 
    ORDER BY votes DESC LIMIT $1`, [amount])
    if(result.rows) return result.rows
}
