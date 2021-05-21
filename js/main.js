// search is the user input, matchList is an empty div where autocomplete suggestions will be shown
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search the books.json file and filter it
const searchbooks = async searchText => {
    const res = await fetch('../data/books.json');
    const books = await res.json();

    if(searchText.length > 3) {
        // Get matches to current text input
        let matches = books.filter(book => {
            const regex = new RegExp(`${searchText}`, 'gi');
            return book.title.match(regex) || book.author.match(regex);
        });

        if(searchText.length === 0) {
            matches = [];
            matchList.innerHTML = '';
        }

        outputHtml(matches);
    }
}

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
        if(matches.length > 5){
            matches.length = 5
        }
        const html = matches.map(match => `
            <div class="card card-body mb-4">
            <a href="${match.link}" style="text-decoration: none" target="_blank">
                <h4>${match.title} <span class="text-primary">(${match.author})</span></h4>
            </a>
                <small>${match.number_of_pages} pages</small>
                <small>Goodreads Rating: ${match.average_rating}/5</small>
            
            </div>
        `).join('');
    
        matchList.innerHTML = html;
    }
}


search.addEventListener('input', () => searchbooks(search.value));