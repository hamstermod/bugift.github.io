let currentPage = 1;
let isLoading = false;
const closeBuyDisplay = document.getElementById("closeBuyDisplay");
const displayBuy = document.getElementById("displayBuy");
const displayName = document.getElementById("displayName");
const displayId = document.getElementById("displayId");
const closePageBlurBuy = document.getElementById("closePageBlurBuy");
const displayImg = document.getElementById("displayImg");
const priceDisplay = document.getElementById("priceDisplay");
const modelName = document.getElementById("modelName");
const symbolName = document.getElementById("symbolName");
const symbolProcent = document.getElementById("symbolProcent");
const modelProcent = document.getElementById("modelProcent");
const backdropName = document.getElementById("backdropName");
const backdropProcent = document.getElementById("backdropProcent");
const buttonBuy = document.getElementById("buttonBuy");
const bannedNames = ["Jack-in-the-Box", "Homemade Cake"];
function f(page) {
    if (isLoading) return;
    isLoading = true;

    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("accept-language", "ru,en-US;q=0.9,en;q=0.8,hy;q=0.7");
    myHeaders.append("cache-control", "no-cache");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("origin", "https://tonnel-gift.vercel.app");
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("priority", "u=1, i");
    myHeaders.append("referer", "https://tonnel-gift.vercel.app/");
    myHeaders.append("sec-ch-ua", "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "cross-site");
    myHeaders.append("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36");

    const raw = JSON.stringify({
        "page": page,
        "limit": 30,
        "sort": "{\"message_post_time\":-1,\"gift_id\":-1}",
        "filter": "{\"price\":{\"$exists\":true},\"refunded\":{\"$ne\":true},\"buyer\":{\"$exists\":false},\"export_at\":{\"$exists\":true},\"asset\":\"TON\"}",
        "ref": 0,
        "price_range": null,
        "user_auth": ""
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://gifts2.tonnel.network/api/pageGifts", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            render(result);
            isLoading = false;
        })
        .catch((error) => {
            console.error(error);
            isLoading = false;
        });
}

function render(data) {
    const items = document.getElementById("items");

    for (let i = 0; i < data.length; i++) {
        const t = data[i];
        if (bannedNames.includes(t.name)) continue;

        const price = +((t.price + (t.price / 5)).toFixed(3));

        const contentDiv = document.createElement("div");
        contentDiv.className = "content";

        const innerDiv = document.createElement("div");
        innerDiv.style.borderRadius = "10px";
        innerDiv.style.overflow = "hidden";

        const lottie = document.createElement("lottie-player");
        lottie.setAttribute("hover", "true");
        lottie.setAttribute("mode", "normal");
        lottie.setAttribute("background", "transparent");
        lottie.style.width = "auto";
        lottie.style.height = "auto";
        const src = `https://nft.fragment.com/gift/${t.name.replaceAll(" ", "").replaceAll("-", "").replaceAll("'", "").toLowerCase()}-${t.gift_num}.lottie.json`;
        lottie.src = src;

        innerDiv.appendChild(lottie);
        contentDiv.appendChild(innerDiv);

        contentDiv.appendChild(document.createElement("br"));

        const p = document.createElement("p");
        p.style.display = "flex";
        p.style.justifyContent = "space-between";

        const spanName = document.createElement("span");
        spanName.className = "textName";
        spanName.textContent = t.name;

        const spanGiftId = document.createElement("span");
        spanGiftId.className = "giftId";
        spanGiftId.textContent = `#${t.gift_num}`;

        p.appendChild(spanName);
        p.appendChild(spanGiftId);

        contentDiv.appendChild(p);
        contentDiv.appendChild(document.createElement("br"));

        const button = document.createElement("button");
        const model = t.model.split("(");
        const symbol = t.symbol.split("(");
        const backdrop = t.backdrop.split("(");
        button.className = "buy";
        button.onclick = function () {
            priceDisplay.innerText = price;
            displayName.innerText = t.name;
            displayId.innerText = t.gift_num;
            displayImg.innerHTML = `<lottie-player
                            src="${src}"
                            background="transparent"
                            speed="1"
                            loop
                            autoplay>
                    </lottie-player>`;
            modelName.innerText = model[0];
            modelProcent.innerText = model[1].replace(")", '');
            symbolName.innerText = symbol[0];
            symbolProcent.innerText = symbol[1].replace(')', '');
            backdropName.innerText = backdrop[0];
            backdropProcent.innerText = backdrop[1].replace(')', '');
            displayBuy.classList.add("active");
            closePageBlurBuy.classList.remove("hide");
            buttonBuy.onclick = () => {
                const text = `Hello, I want to buy a gift. Gift ID: ${t.gift_id} Price: ${price}.`
                open(`https://t.me/Hayk5545?text=${text}`, '_blank')
            }
        };
        button.innerHTML = `${price} <img src="data:image/svg+xml,%3csvg%20width='32'%20height='28'%20viewBox='0%200%2032%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M31.144%205.84244L17.3468%2027.1579C17.1784%2027.4166%2016.9451%2027.6296%2016.6686%2027.7768C16.3922%2027.9241%2016.0817%2028.0009%2015.7664%2028C15.451%2027.9991%2015.141%2027.9205%2014.8655%2027.7716C14.59%2027.6227%2014.3579%2027.4084%2014.1911%2027.1487L0.664576%205.83477C0.285316%205.23695%200.0852825%204.54843%200.0869241%203.84647C0.104421%202.81116%200.544438%201.82485%201.31047%201.10385C2.0765%200.382844%203.10602%20-0.0139909%204.17322%200.000376986H27.6718C29.9143%200.000376986%2031.7391%201.71538%2031.7391%203.83879C31.7391%204.54199%2031.5333%205.23751%2031.1424%205.84244M3.98489%205.13003L14.0503%2020.1858V3.61156H5.03732C3.99597%203.61156%203.5291%204.28098%203.98647%205.13003M17.7742%2020.1858L27.8395%205.13003C28.3032%204.28098%2027.8285%203.61156%2026.7871%203.61156H17.7742V20.1858Z'%20fill='white'/%3e%3c/svg%3e" alt="">`;

        contentDiv.appendChild(button);
        items.appendChild(contentDiv);
    }

}

// Запускаем первую загрузку
f(currentPage);

// Обработка бесконечного скролла
window.addEventListener("scroll", () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100; // 100px до конца

    if (scrollPosition >= threshold && !isLoading) {
        currentPage++;
        f(currentPage);
    }
});
function closeBuyDisplayF(){
    displayBuy.classList.remove("active");
    closePageBlurBuy.classList.add("hide");
}
closeBuyDisplay.onclick = () => {
    closeBuyDisplayF();
}
closePageBlurBuy.onclick = () => {
    closeBuyDisplayF();
}
