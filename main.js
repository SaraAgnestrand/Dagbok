//Deklarerar variabler från html
const titleInput = document.querySelector(".title_input");
const entryInput = document.querySelector("textarea");
const btn = document.querySelector(".date_input");
const entryContainer = document.querySelector(".entries_container");


const dateInput = document.querySelector(".date_input");//Deklarerar variabel från html
dateInput.valueAsDate = new Date(); //Default på dagens datum
//vid klick på knappen ska...
btn.addEventListener("click", () => {
//skapar ett dagboksinlägg
    const entry = {
        date: dateInput.value,
        title: titleInput.value,
        text: entryInput.value,
    };

//Kolla om det finns tidigare sparade inlägg i localStorage,
// eller finnst det inte inlägg i lokalStorage är det denna kod frågar
    if (!localStorage.getItem("entries")){
        localStorage.setItem("entries", JSON.stringify([entry]));

//om det finns inlägg ska detta hända
//då ska tidigare inlägg +nytt inlägg skrivas över i localstorage
    } else {
        const entries = JSON.parse(localStorage.getItem("entries"));
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
    }
//Sedan ska inputfälten bli tomma
titleInput.value = "";
entryInput.value = "";
renderEntries();

});

function renderEntries() {
    const entries = JSON.parse(localStorage.getItem("entries"));

    entryContainer.innerHTML = "";

    entries.forEach((entry) =>{
        const div = document.createElement("div")
        const h6 = document.createElement("h6")
        const h4 = document.createElement("h4")
        const p = document.createElement("p")

        h6.innerText = entry.date
        h4.innerText = entry.title
        p.innerText = entry.text

        entryContainer.appendChild(div);

    });

}
renderEntries();

