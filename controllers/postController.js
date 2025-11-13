const posts = require('../data/post')
//Vado ad importare connection 
const connection = require('../data/db')

//index 
function index(req, res) {
    //creo la variabile con la query SQL
    const sql = 'SELECT * FROM blog.posts;'
    //chiamo il metodo query sull'oggetto connection
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        //console.log(err);
        //console.log(results);
        res.json(results);
    })

}


//show
function show(req, res) {

    const { id } = req.params
    console.log(id);
    //creo la variabile con la query SQL 
    const sql = 'SELECT * FROM posts WHERE id=?'
    const tagSql = 'SELECT tags.label FROM tags JOIN post_tag ON post_tag.tag_id=tags.id WHERE post_id=?'
    console.log(sql);
    connection.query(sql, [id], (err, results) => {
        //gestire errore lato server
        if (err) return res.status(500).json({ error: err.message })
        // 3.1 gestire un eventuale errore 404 se il post con l'id fornito non viene trovata 
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' })
        //console.log(results);

        //chiama il metodo query sull'oggetto connection una seconda volta per la sql di ricerca dei tag
        connection.query(tagSql, [id], (err, tagsResults) => {
            //gestire errore lato server
            if (err) return res.status(500).json({ error: err.message })

            //Crea un nuovo oggetto post con tutto il contenuto dell'oggetto dal db, piu la lista dei tag
            const postObj = { ...results[0], tags: tagsResults.map(tag => tag.label) }


            // 👉 Send the response back to the user
            // pizza object
            res.json(postObj)

        })
    })

}

//store 
const store = (req, res) => {
    console.log(req.body);
    //genero un nuovo id per il nuovo item
    const newId = posts[posts.length - 1].id + 1;
    //create a new object to add
    const { titolo, contenuto, immagine, tags } = req.body
    const newPost = {
        id: newId,
        titolo,
        contenuto,
        immagine,
        tags

    }
    console.log(newPost);
    //push into array
    posts.push(newPost)
    console.log(posts)
    //return response
    res.status(201);
    res.json(newPost)
    //res.send('Create a new post')
}

//update 
const update = (req, res) => {
    //recupero l'id 
    const id = parseInt(req.params.id)
    //cerco l'item tramite id 
    const post = posts.find(post => post.id == id);
    if (!post) {
        res.status(404);
        return res.json({
            error: "Non found",
            message: "post non trovato"
        })
    }
    //aggiorno il post 
    const { titolo, contenuto, immagine, tags } = req.body
    post.titolo = titolo;
    post.contenuto = contenuto;
    post.immagine = immagine;
    post.tags = tags;
    //controllo
    console.log(posts);
    //restituisco la risposta 
    res.json(posts);

    //res.send('Update the entire single post with ID:' + req.params.id)
}

//modify 
const modify = (req, res) => {
    res.send('Partial update for the single post with ID:' + req.params.id)
}

//destroy
function destroy(req, res) {
    const { id } = req.params
    console.log(id);
    const sql = 'DELETE FROM posts WHERE id=?'
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message })
        res.sendStatus(204)
    })

}




//esporto le azioni 
module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}
//fare le prove con Postman per vedere se funziona
//Con Postman funziona! 