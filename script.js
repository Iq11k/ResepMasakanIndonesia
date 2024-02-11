let circle = document.querySelector(".circle");
let menuContainer = document.querySelector(".menuContainer");
let list = document.querySelector(".list");
let menus = document.querySelectorAll(".list .menu");
let menuMobile = document.querySelectorAll(".list .menu img");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let labelNama = document.querySelector(".content .nama");
let resepPage = document.getElementById("resep");
let xButton = document.querySelector(".xBTN");
let isiResep = document.createElement("div");
let count = menus.length;
let angka = 1;
let active = 1;
let leftTransform = 0;
let widhth_item = menus[active].offsetWidth;
let widhth_itemMobile = menuMobile[active].offsetWidth;
let resep = "";
let output = "";
let bahan = "";
let cara = "";

window.addEventListener("scroll", () => {
    const isInResepPage = isScrolledIntoView(resepPage);

    if (isInResepPage) {
        xButton.style.position = "fixed";
        console.log("nih trigger");
    } else {
        xButton.style.position = "absolute";
    }
});

// buat object untuk XMLHttpRequest
let http = new XMLHttpRequest();

// buka file
http.open("get", "resep.json", true);

http.send();

http.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
        resep = JSON.parse(this.responseText);
        resepOutput(active);
        labelNama.innerHTML = resep[active].nama;
        resepPage.appendChild(isiResep);
    }
};

function resepOutput(iter) {
    cara = "";
    bahan - "";
    angka = 1;
    for (let item of resep[iter].bahan) {
        if (item[0] == "<") {
            bahan += `<p style="margin-left:-20px;">${item}</p>\n`;
        } else {
            bahan += `<li>${item}</li>\n`;
        }
        angka++;
    }
    angka = 1;
    for (let item of resep[iter].cara) {
        if (item[0] == "<") {
            cara += `<p style="margin-left:-20px;">${item}</p>\n`;
        } else {
            cara += `<li>${item}</li>\n`;
        }
        angka++;
    }
    output = `
        <h1 class="nama">${resep[iter].nama}</h1>
            <p class="desc">${resep[iter].deskripsi}
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
    isiResep.innerHTML = output;
}

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
    bahan = "";
    resepOutput(active);
    labelNama.innerHTML = resep[active].nama;
    resepPage.appendChild(isiResep);
}
runCarousel();

function isScrolledIntoView(e) {
    const rect = e.getBoundingClientRect();
    const elemBottom = rect.bottom;
    const elemTop = rect.top;
    console.log(window.innerHeight);
    console.log(elemTop);

    const isVisible = elemTop <= 0 && window.innerHeight - 1 <= elemBottom;
    return isVisible;
}
