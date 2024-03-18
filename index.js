const quoteText = document.getElementById('quoteText');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const tweetBtn = document.getElementById('tweetBtn');

function fetchRandomQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            return response.json();
        })
        .then(data => {
            quoteText.textContent = `${data.content} - ${data.author}`;
            document.body.style.backgroundColor = getRandomColor();
            tweetBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.content + ' - ' + data.author)}`; // Set tweet button href
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
            quoteText.textContent = 'Failed to fetch quote. Please try again later.';
        });
}

function copyQuoteToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = quoteText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Quote copied to clipboard!');
}

generateBtn.addEventListener('click', fetchRandomQuote);
copyBtn.addEventListener('click', copyQuoteToClipboard);

fetchRandomQuote();

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

