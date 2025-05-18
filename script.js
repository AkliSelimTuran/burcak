// === Global Değişkenler ===
let ogrenciler = [];
let sinifA = [];
let sinifB = [];

// === Grup Renk ve Sembol Fonksiyonları ===
function grupRenk(grup) {
    const renkler = {
        "Ateş": "#e74c3c",
        "Su": "#3498db",
        "Hava": "#9b59b6",
        "Toprak": "#27ae60"
    };
    return renkler[grup] || "#000";
}

function burcSembol(burc) {
    const semboller = {
        "Koç": "♈", "Boğa": "♉", "İkizler": "♊", "Yengeç": "♋",
        "Aslan": "♌", "Başak": "♍", "Terazi": "♎", "Akrep": "♏",
        "Yay": "♐", "Oğlak": "♑", "Kova": "♒", "Balık": "♓"
    };
    return semboller[burc] || "";
}

function grupSembol(grup) {
    const semboller = {
        "Ateş": "🔥", "Su": "💧", "Hava": "🌬️", "Toprak": "🪨"
    };
    return semboller[grup] || "";
}

// === Burç ve Grup Hesaplama ===
function burcHesapla(tarih) {
    const gun = tarih.getDate();
    const ay = tarih.getMonth() + 1;
    if ((ay == 1 && gun >= 20) || (ay == 2 && gun <= 18)) return "Kova";
    if ((ay == 2 && gun >= 19) || (ay == 3 && gun <= 20)) return "Balık";
    if ((ay == 3 && gun >= 21) || (ay == 4 && gun <= 19)) return "Koç";
    if ((ay == 4 && gun >= 20) || (ay == 5 && gun <= 20)) return "Boğa";
    if ((ay == 5 && gun >= 21) || (ay == 6 && gun <= 20)) return "İkizler";
    if ((ay == 6 && gun >= 21) || (ay == 7 && gun <= 22)) return "Yengeç";
    if ((ay == 7 && gun >= 23) || (ay == 8 && gun <= 22)) return "Aslan";
    if ((ay == 8 && gun >= 23) || (ay == 9 && gun <= 22)) return "Başak";
    if ((ay == 9 && gun >= 23) || (ay == 10 && gun <= 22)) return "Terazi";
    if ((ay == 10 && gun >= 23) || (ay == 11 && gun <= 21)) return "Akrep";
    if ((ay == 11 && gun >= 22) || (ay == 12 && gun <= 21)) return "Yay";
    return "Oğlak";
}

function burcGrubu(burc) {
    const ates = ["Koç", "Aslan", "Yay"];
    const toprak = ["Boğa", "Başak", "Oğlak"];
    const hava = ["İkizler", "Terazi", "Kova"];
    const su = ["Yengeç", "Akrep", "Balık"];
    if (ates.includes(burc)) return "Ateş";
    if (toprak.includes(burc)) return "Toprak";
    if (hava.includes(burc)) return "Hava";
    if (su.includes(burc)) return "Su";
    return "Bilinmiyor";
}

// === Kayıt ve Listeleme ===
document.getElementById('kayitFormu').addEventListener('submit', function(e) {
    e.preventDefault();
    const isim = document.getElementById('isim').value;
    const dogumTarihi = new Date(document.getElementById('dogumTarihi').value);
    const cinsiyet = document.getElementById('cinsiyet').value;
    const burc = burcHesapla(dogumTarihi);
    const grup = burcGrubu(burc);
    ogrenciler.push({ isim, cinsiyet, burc, grup });
    guncelleListe();
    if (ogrenciler.length === 50) {
        siniflariOlustur();
    }
    document.getElementById('kayitFormu').reset();
});

function guncelleListe() {
    const gruplar = { Ateş: [], Su: [], Hava: [], Toprak: [] };
    ogrenciler.forEach(o => gruplar[o.grup].push(o));
    let listeHTML = `<h3>📝 Kayıtlı Öğrenciler (${ogrenciler.length})</h3>`;
    for (const grup in gruplar) {
        listeHTML += `<h4>${grupSembol(grup)} ${grup} (${gruplar[grup].length})</h4><ul>`;
        gruplar[grup].forEach(o => {
            listeHTML += `<li style="color:${grupRenk(grup)}">${o.isim} (${o.cinsiyet}) - ${burcSembol(o.burc)} ${o.burc}</li>`;
        });
        listeHTML += `</ul>`;
    }
    document.getElementById('sonuc').innerHTML = listeHTML;
}

// === Sınıf Oluşturma ve Dengeleme ===
function siniflariOlustur() {
    const siniflar = { A: { kizlar: [], erkekler: [] }, B: { kizlar: [], erkekler: [] } };
    const gruplar = { Ateş: [], Hava: [], Su: [], Toprak: [] };
    ogrenciler.forEach(o => gruplar[o.grup].push(o));
    const aListesi = [...gruplar["Ateş"], ...gruplar["Hava"]];
    const bListesi = [...gruplar["Su"], ...gruplar["Toprak"]];

    aListesi.forEach(o => (o.cinsiyet === "Kadın" ? siniflar.A.kizlar.push(o) : siniflar.A.erkekler.push(o)));
    bListesi.forEach(o => (o.cinsiyet === "Kadın" ? siniflar.B.kizlar.push(o) : siniflar.B.erkekler.push(o)));

    function dengeOlustur(kizlar, erkekler) {
        const sonuc = [];
        let i = 0, j = 0;
        while (sonuc.length < 25 && (i < kizlar.length || j < erkekler.length)) {
            if (i < kizlar.length) sonuc.push(kizlar[i++]);
            if (j < erkekler.length && sonuc.length < 25) sonuc.push(erkekler[j++]);
        }
        return sonuc;
    }

    sinifA = dengeOlustur(siniflar.A.kizlar, siniflar.A.erkekler);
    sinifB = dengeOlustur(siniflar.B.kizlar, siniflar.B.erkekler);

    let html = `<h2>📘 Sınıf A (Ateş + Hava)</h2><ul>`;
    sinifA.forEach(o => html += `<li>${o.isim} (${o.cinsiyet} - ${o.burc} ${burcSembol(o.burc)} / ${grupSembol(o.grup)} ${o.grup})</li>`);
    html += `</ul><h2>📗 Sınıf B (Su + Toprak)</h2><ul>`;
    sinifB.forEach(o => html += `<li>${o.isim} (${o.cinsiyet} - ${o.burc} ${burcSembol(o.burc)} / ${grupSembol(o.grup)} ${o.grup})</li>`);
    html += `</ul>`;

    document.getElementById('sonuc').innerHTML = html;
}

// === PDF ve Excel Çıktısı ===
document.getElementById("pdfBtn").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Sınıf A (Ateş + Hava)", 10, 10);
    sinifA.forEach((o, i) => {
        doc.text(`${i + 1}. ${o.isim} (${o.cinsiyet}, ${o.burc}, ${o.grup})`, 10, 20 + i * 7);
    });
    let yOffset = 30 + sinifA.length * 7;
    doc.text("Sınıf B (Su + Toprak)", 10, yOffset);
    sinifB.forEach((o, i) => {
        doc.text(`${i + 1}. ${o.isim} (${o.cinsiyet}, ${o.burc}, ${o.grup})`, 10, yOffset + 10 + i * 7);
    });
    doc.save("sinif_listesi.pdf");
});

document.getElementById("excelBtn").addEventListener("click", function() {
    const wb = XLSX.utils.book_new();
    const veriA = sinifA.map(o => ({ İsim: o.isim, Cinsiyet: o.cinsiyet, Burç: o.burc, Grup: o.grup }));
    const veriB = sinifB.map(o => ({ İsim: o.isim, Cinsiyet: o.cinsiyet, Burç: o.burc, Grup: o.grup }));
    const wsA = XLSX.utils.json_to_sheet(veriA);
    const wsB = XLSX.utils.json_to_sheet(veriB);
    XLSX.utils.book_append_sheet(wb, wsA, "Sınıf A");
    XLSX.utils.book_append_sheet(wb, wsB, "Sınıf B");
    XLSX.writeFile(wb, "sinif_listesi.xlsx");
});
