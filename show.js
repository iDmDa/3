const ul = document.querySelector(".showBox ul");
if(localStorage.length == 0) ul.innerText = "Нет отзывов";

for (let i = 0; i < localStorage.length; i++) {
    const li = document.createElement("li");
    const name = localStorage.key(i);
    const contentArray = JSON.parse(localStorage.getItem(name));

    li.innerHTML = `${name} <span>(Отзывов: ${contentArray.length})</span> <span><button>Удалить</button></span>`;
    li.dataset.key = name;

    createRewiewList(contentArray, li);

    ul.appendChild(li)
}

function createRewiewList(contentArray, node, hidden = 1) {
    contentArray.forEach((item, index) => {
        const p = document.createElement("p");
        const button = document.createElement("button");
        const br = document.createElement("br");
        p.innerHTML = item;
        if(hidden == 1) p.classList.add("hidden");
        button.innerText = "Удалить";
        button.dataset.index = index;
        p.appendChild(br);
        p.appendChild(button);
        node.appendChild(p);
    });
}

ul.addEventListener("click", (e) => {
    let items = e.target.closest("li").querySelectorAll("p");
    if (e.target.localName == "li" || e.target.localName == "span") {
        items.forEach(item => {
            item.classList.toggle("hidden")
        })
    }
    
    if(e.target.localName == "button") {
        let node = e.target.closest("li");
        let key = node.dataset.key;

        if(e.target.dataset.index) {
            let index = e.target.dataset.index;
            let arr = JSON.parse(localStorage.getItem(key));
            arr.splice(index, 1);

            e.target.closest("p").remove();
            localStorage.setItem(key, JSON.stringify(arr))

            let contentArray = JSON.parse(localStorage.getItem(key));
            node.children[0].innerHTML = `(Отзывов: ${contentArray.length})`;

            node.querySelectorAll("p").forEach(item => item.remove());
            createRewiewList(contentArray, node, 0)

            if(contentArray.length == 0) {
                localStorage.removeItem(key);
                node.remove();
            }
        }

        if(!e.target.dataset.index) {
            localStorage.removeItem(key);
            node.remove();
            if(localStorage.length == 0) ul.innerText = "Нет отзывов";
        }
    }
})
