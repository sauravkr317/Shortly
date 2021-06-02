let hamburger = document.querySelector('.hamburger');
let nav = document.querySelector('nav');
let navlist = document.querySelector('.navlist-wrapper');
let api_button = document.getElementById('api-button');
let get_url = document.getElementById('url-input');

hamburger.addEventListener('click', navPopulate);

api_button.addEventListener('click', fetchurl);

function navPopulate(e) {
    if (!navlist.className.includes('show')) {
        navlist.classList.add('show');
    } else {
        navlist.classList.remove('show');
    }
}

window.addEventListener('scroll', () => {
    nav.classList.toggle('show', window.scrollY > 100);
})

async function fetchurl() {
    let url = get_url.value;
    let trimurl = url.trim();
    if (validate(url)) {
        let obj = {
            url: trimurl
        }
        try {
            const data = await fetch('http://localhost:3000/api/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            let result = await data.json();
            console.log(result);
            populateDom(result);
        } catch (error) {
            get_url.value = "";
            get_url.placeholder = "Server is not connected";
            console.log('Error');
        }
    }

}

function validate(url) {
    let isValidUrl = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    let trimurl = url.trim();
    let result = isValidUrl.test(trimurl)
    console.log(result)
    if (!url || !result) {
        let input_url = document.querySelector('.input-url');
        input_url.style.borderRadius = '8px';
        input_url.style.border = '4px solid hsl(0, 87%, 67%)';
        get_url.value = "";
        get_url.placeholder = "Enter a valid url";
        return false
    }
    else {
        let input_url = document.querySelector('.input-url');
        input_url.style.border = '4px solid transparent';
        input_url.style.borderRadius = '8px';
        return true

    }
}

function populateDom(result) {
    let uistring = `<div class="result-url-wrapper">
                        <div class="long-url">
                            <h5>${result.long_url.slice(0, 35)}.....</h5>
                            <hr>
                        </div>
                        <div class="short-url-wrapper">
                            <div class="short_link">
                            <a href="${result.short_url}" target="_blank">${result.short_url}</a>
                            </div>
                            <div class="button">
                                <button>copy</button>
                            </div>
                        </div>
                    </div>`

    let url_populatel = document.querySelector('.url-populate');
    url_populatel.innerHTML = uistring;
}