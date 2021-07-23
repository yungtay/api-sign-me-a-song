import connection from '../../database'
export async function addRecommendation(){
    await connection.query(`INSERT INTO recommendations (name, "youtubeLink", votes) 
    VALUES 
        ('Falamansa - Xote dos Milagres', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 0),
        ('Charlie Brown Jr. - Só os Loucos Sabem', 'https://www.youtube.com/watch?v=JRJj4z-prvM', 5),
        ('Charlie Brown Jr - Céu Azul', 'https://www.youtube.com/watch?v=0dLX40UMUKo', 10),
        ('Charlie Brown Jr - Me encontra & Dias de Luta, Dias de Glória', 'https://www.youtube.com/watch?v=61HE1kdavXk', 27),
        ('Seu Jorge - Tive Razão', 'https://www.youtube.com/watch?v=8m6wrCCRvm8', 3),
        ('Natiruts - Sorri, Sou Rei', 'https://www.youtube.com/watch?v=tRmtL8yxcSA', 2),
        ('Hozier - Take Me To Church', 'https://www.youtube.com/watch?v=PVjiKRfKpPI', 15),
        ('Lady Gaga, Bradley Cooper - Shallow', 'https://www.youtube.com/watch?v=JPJjwHAIny4', 33),
        ('Clean Bandit - Symphony', 'https://www.youtube.com/watch?v=aatr_2MstrI', -5)`)
}

export async function restartTable(){
    await connection.query(`TRUNCATE recommendations RESTART IDENTITY`)
}

export const body = {
    name: "2Pac - Hit 'Em Up (Dirty)",
    youtubeLink: "https://www.youtube.com/watch?v=41qC3w3UUkU",
};

export async function checkRecommendationVotes(){
    const result = await connection.query(`SELECT votes FROM recommendations WHERE id = 1`)
    if(result.rows[0]) return result.rows[0]
}


