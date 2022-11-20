const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//Search flats.json and filter it
const searchStates = async searchText =>{
const res = await fetch('https://amol246.github.io/jsonapi/building.json');
const building = await res.json();

//console.log(flats);

//Get matches to current text input
let matches = building.filter(state => {
    const regex = new RegExp(`^${searchText}`,`gi`);
    return state.bname.match(regex) || state.abbr.match(regex);
});

if(searchText.length === 0){
    matches = [];
    matchList.innerHTML = '';
}

outputHtml(matches);

};

//Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(
            match => `
        <div class="card card-body mb-1">
            <h4>${match.bname} <span class="text-primary">${match.type}</span></h4>
            <small>Box: ${match.boxnumber} DealingHand: ${match.employee}(${match.designation})/ ${match.ttm} </small>
        </div>
        `
        )
        .join('');

        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchStates(search.value));                                                               
