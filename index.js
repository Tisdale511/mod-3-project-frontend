// let title = "Horizon Zero Dawn"
document.addEventListener("DOMContentLoaded", () => {
// getGameInfo()
// postGameData()
})
let titleContainer = document.querySelector('form')
titleContainer.addEventListener('submit', (e) => title(e))  // sets up button
// console.log(titleContainer)

let title = (e) =>{     
    e.preventDefault()
    // console.log(e.target[0].value)
    return unstringify(e.target[0].value) // redirects name data to unstringify
}


function unstringify(title){            //transforms the spaces of strings in the search bar 
    // console.log(title)               // into + so that it feeds correctly into the API URL
    let split = title.split(" ")
    let HTMLFormat = split.join("+")
    getGameInfo(HTMLFormat)             //redirects to getGameInfo
    

}

let getGameInfo = (e) => {                                  
    fetch(`https://api.rawg.io/api/games?search=${e}`)          //makes calls to API given the     
    .then(res => res.json())                                    //value of the variable
    .then(json => json.results.forEach(e => postGameData(e)))   //redirects to postGameData
}

let postGameData = (e) => {         //overall, makes posting available
    console.log(e)
    
    
    let div = document.createElement('div')         // creates container to store elements
    let container = document.querySelector('.card') 
    let gameTitle = e.name
    div.innerText = gameTitle

    let button = document.createElement('button')
    button.innerText = "Add Game to List"
    div.appendChild(button)
    container.appendChild(div)

    let handleClick = (game) => {
        // json.document.preventDefault()
        // game.preventDefault()
        // console.log(game)
        let data = {
            id: game.id,
            name: game.name,
            image: game.background_image,
            comments: game.comments,
        }
        console.log(data);
        fetch('http://localhost:3000/games', {
            method: "POST",
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify(data)

        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            
            let container = document.createElement('ul')
            //container.id = 'test';
            container.setAttribute('id', json.id);


            let img = document.createElement('img')
            img.setAttribute("src", json.image);
            img.setAttribute("height", "384");
            img.setAttribute("width", "600");
            
            let h4 = document.createElement('h4')
            h4.innerText = json.name
            
            
            let btn = document.createElement('button')
            btn.innerText = "Remove Game From List"
            h4.appendChild(btn)
            //container.appendChild(li)
            btn.addEventListener('click', function(event) { 
                event.preventDefault();
                deleteGame(json)
            }, false)

            let commentForm = document.createElement('form');
            let commentBtn = document.createElement('button');
            let textBox = document.createElement('input');
            textBox.setAttribute("type", "text")
            commentForm.addEventListener('submit', function(event) {
                event.preventDefault();
                // console.log(event.target)
                addComment(textBox.value, json)
                // json.comments.push(textBox.value);
                // console.log(json);
            })
            
            
            
            commentBtn.innerText = "Submit Comment"
            commentForm.appendChild(textBox)
            commentForm.appendChild(commentBtn);
            
            container.appendChild(h4);
            container.appendChild(img);
            container.appendChild(commentForm);
            
            document.body.appendChild(container)
            
            // patchData(json)
            
        })  
        
    }    
    button.addEventListener("click", () => 
    handleClick(e)
    )
    
}


let addComment = (commentValue, game) => {
    // event.preventDefault()
    
    console.log(commentValue)
    console.log(game)
    //console.log(data)


        let data = {
            text: commentValue,
            game_id: game.id
        }

        fetch('http://localhost:3000/comments', {
                method: "POST",
                headers: {
                'Content-Type':'application/json',
                },
                body: JSON.stringify(data)

            })
            .then(res => res.json())
            .then(json => {

                console.log(json)
                console.log(json.game_id);
                let container = document.getElementById(json.game_id)
                let li = document.createElement('li')
                li.setAttribute('id', json.id);
                let btn = document.createElement('button')
                li.innerText = json.text
                btn.innerText = "Edit Comment"
                li.appendChild(btn)
                container.appendChild(li)
                btn.addEventListener('click', function(event) { 
                    event.preventDefault();
                    editComment(json)
                }, false)


            })

    
    // updateComment
}

let editComment = (e) => {
    console.log(e)
    //e.preventDefault()

    let comment = prompt("Edit comment", e.text);

    let data = {
        text: comment,
        game_id: e.game_id
    }

    fetch(`http://localhost:3000/comments/${e.id}`, {
            method: "PATCH",
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify(data)

        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            console.log(e);
            let li = document.getElementById(e.id);
            li.setAttribute('id', json.id);
            li.innerText = comment;
            let btn = document.createElement('button')
            btn.innerText = "Edit Comment"
            li.appendChild(btn)
            //container.appendChild(li)
            btn.addEventListener('click', function(event) { 
                event.preventDefault();
                editEditor(json)
            }, false)
    })
}

// let editEditor = (e) => {
//     console.log(e)
    
//     let comment = prompt("Edit comment", e.text);
    
//     console.log(comment);
//     let data = {
//         text: comment,
//         game_id: e.game_id
//     }


//     fetch('http://localhost:3000/comments/${}', {
//             method: "PATCH",
//             headers: {
//             'Content-Type':'application/json',
//             },
//             body: JSON.stringify(data)

//         })
//         .then(res => res.json())
//         .then(json => {
//             console.log(json)
//             console.log(e);
//             let li = document.getElementById(e.id);
//             li.setAttribute('id', json.id);
//             li.innerText = comment;
//             let btn = document.createElement('button')
//             btn.innerText = "Edit Comment"
//             li.appendChild(btn)
//         })
// }

let deleteGame = (game) => {
    console.log(game)
    let container = document.getElementById(game.id)
    document.body.removeChild(container);
}


