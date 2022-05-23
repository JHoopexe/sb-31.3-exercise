
const $ranFacts = $("#ran-facts");
const $favForm = $("#fav-form");
const $favFacts = $("#fav-facts");
const $cardDiv = $("#cardDiv");
const $card = $("#card");
let deck

getDeckId();

for(let i = 0; i < 4; i++){
    let random = Math.floor(Math.random() * 10);

    getFacts("p", random, $ranFacts);
}

$("#fav-form").on("submit", function(e){
    e.preventDefault();
    $favFacts.html("");

    for(let i = 0; i < 4; i++){
        let num = $("#fav-num").val();

        getFacts("li", num, $favFacts);
    }

    $("#fav-num").val("");
});

$("#cardDiv").on("submit", async function(e){
    e.preventDefault();
    
     const response = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
     $card.attr("src", response.data.cards[0].image);
});

async function getDeckId(){
    try{
        const response = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        deck = response.data.deck_id;
    }
    catch(err){
        console.log(err.code, err.name, err.message);
    }
}

async function getFacts(node, num, div){
    let $node = document.createElement(`${node}`);
    
    try{
        const response = await axios.get(`http://numbersapi.com/${num}?json`);
        $node.innerText = response.data.text;
        div.append($node);
    }
    catch(err){
        console.log(err.code, err.name, err.message)
    }
}
