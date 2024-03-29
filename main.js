//Deklarerar variabler från html
const titleInput = document.querySelector(".title_input");
const entryInput = document.querySelector("textarea");
const btn = document.querySelector("button");
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
//Spara inlägg i localstorage
    if (!localStorage.getItem("entries")){
        localStorage.setItem("entries", JSON.stringify([entry]));

//om det finns inlägg sparade i en lista i localStorage ska detta hända
//Då vill vi plocka ut den listan och parsea då det är an array med objekt
    } else {
        const entries = JSON.parse(localStorage.getItem("entries"));
    //Vi vill då pusha in det inlägget vi har skrivit
        entries.push(entry);
    //Sedan sparas det ner i localStorage som en ny JSONstring med både gamla och nya inlägg
        localStorage.setItem("entries", JSON.stringify(entries));
    }
//Sedan ska inputfälten bli tomma
titleInput.value = "";
entryInput.value = "";
//kallar på renderEntries
renderEntries();

});
//Funktion för att hämta och bygga html för alla inlägg
//Likt när vi sparar produkter i kundkorg
function renderEntries() {
    const entries = JSON.parse(localStorage.getItem("entries"));

    entries.sort((a, b) => new Date(b.date) - new Date(a.date));
//Om det inte finns några inlägg avlutas denna funktion här (return)
    if (entries === null) return
    entryContainer.innerHTML = "";

    entries.forEach((entry) =>{
        const div = document.createElement("div")
        const h6 = document.createElement("h6")
        const h4 = document.createElement("h4")
        const p = document.createElement("p")

        h6.innerText = entry.date
        h4.innerText = entry.title
        p.innerText = entry.text

        div.appendChild(h6);
        div.appendChild(h4);
        div.appendChild(p);


        entryContainer.appendChild(div);

    });

}
renderEntries();

