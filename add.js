const form = document.querySelector("form");
form.addEventListener("submit", () => {
    const name = document.querySelector("form input");
    const content = document.querySelector("form textarea");
    addReview(name.value, content.value);
})

function addReview(name, content) {
    let contArr = !localStorage.getItem(name) ? [] : JSON.parse(localStorage.getItem(name));
    contArr.push(content);
    localStorage.setItem(name, JSON.stringify(contArr));
}