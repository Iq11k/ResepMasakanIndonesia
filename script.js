document.addEventListener("DOMContentLoaded", function () {
    const labelNama = document.querySelector(".content .nama");
    let list = document.querySelector(".list");
    let active = 1;
    fetch("https://iq11k.github.io/ResepAPI/resep.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            realData = data;
            data.map((menu) => {
                const { nama, deskripsi, bahan, cara, image } = menu;
                let menuDiv = document.createElement("div");
                menuDiv.className = "menu";
                let imgDiv = document.createElement("img");
                imgDiv.src = image;
                menuDiv.appendChild(imgDiv);
                list.appendChild(menuDiv);
            });
            menus = document.querySelectorAll(".list .menu");
            labelNama.innerHTML = data[active].nama;
        })
        .then(() => {
            menus = document.querySelectorAll(".list .menu");
            count = menus.length;
            if (count != 0) {
                widhth_item = menus[active].offsetWidth;
            }
            runCarousel();
        });
});

let body = document.querySelector("body");
let menus = document.querySelectorAll(".list .menu");
const labelNama = document.querySelector(".content .nama");
let list = document.querySelector(".list");
let count = menus.length;
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const resepPage = document.querySelector(".resep");
let xButton = document.querySelector(".xBTN");
let leftTransform = 0;
let active = 1;
let widhth_item = 1;
let realData = {};

next.onclick = () => {
    active = active >= count - 1 ? count - 1 : active + 1;
    runCarousel();
};

prev.onclick = () => {
    active = active <= 0 ? 0 : active - 1;
    runCarousel();
};
function runCarousel() {
    prev.style.opacity = active == 0 ? "0" : "1";
    next.style.opacity = active == count - 1 ? "0" : "1";
    let old_active = document.querySelector(".menu.active");
    if (old_active) old_active.classList.remove("active");
    menus[active].classList.add("active");
    leftTransform = widhth_item * (active - 1) * -1;
    list.style.transform = `translateX(${leftTransform}px)`;
    labelNama.innerHTML = realData[active].nama;
    resepOutput();
}

window.addEventListener("scroll", () => {
    const isInResepPage = isScrolledIntoView(resepPage);

    if (isInResepPage) {
        xButton.style.position = "fixed";
    } else {
        xButton.style.position = "absolute";
    }
});

function isScrolledIntoView(e) {
    const rect = e.getBoundingClientRect();
    const elemBottom = rect.bottom;
    const elemTop = rect.top;

    const isVisible = elemTop <= 0 && window.innerHeight - 1 <= elemBottom;
    return isVisible;
}

function resepOutput() {
    let cara = "";
    let bahan = "";
    for (let item of realData[active].bahan) {
        if (item[0] == "<") {
            bahan += `<p style="margin-left:-20px;">${item}</p>\n`;
        } else {
            bahan += `<li>${item}</li>\n`;
        }
    }
    for (let item of realData[active].cara) {
        if (item[0] == "<") {
            cara += `<p style="margin-left:-20px;">${item}</p>\n`;
        } else {
            cara += `<li>${item}</li>\n`;
        }
    }
    output = `
    <h1 class="nama">${realData[active].nama}</h1>
        <p class="desc">${realData[active].deskripsi}
        </p>
        <h3 class="bahantitle">Bahan :</h3>
        <div class="bahan">
            <ul>
                ${bahan}
            </ul>
        </div>
        <h3 class="caratitle">Cara Pembuatan :</h3>
        <div class="cara">
            <ul>
                ${cara}
            </ul>
        </div>
    `;

    let isiResep = document.createElement("div");
    resepPage.appendChild(isiResep);
    resepPage.removeChild(resepPage.children[1]);
    isiResep.innerHTML = output;
    resepPage.appendChild(isiResep);
}
