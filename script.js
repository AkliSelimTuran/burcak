<script>
const ogrenciler = [];

document.getElementById('kayitFormu').addEventListener('submit', function(e) {
    e.preventDefault();

    const isim = document.getElementById('isim').value;
    const dogumTarihi = new Date(document.getElementById('dogumTarihi').value);
    const cinsiyet = document.getElementById('cinsiyet').value;

    const burc = burcHesapla(dogumTarihi);
    const grup = burcGrubu(burc);

    const yeniOgrenci = { isim, cinsiyet, burc, grup };
    ogrenciler.push(yeniOgrenci);

    // Listeyi güncelle
    guncelleListe();

    // Eğer 50 kişi olduysa sınıfları oluştur
    if (ogrenciler.length === 50) {
        siniflariOlustur();
    }

    document.getElementById('kayitFormu').reset();
});

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
        "Ateş": "🔥",
        "Su": "💧",
        "Hava": "🌬️",
        "Toprak": "🪨"
    };
    return semboller[grup] || "";
}

function guncelleListe() {
    const gruplar = { Ateş: [], Su: [], Hava: [], Toprak: [] };

    ogrenciler.forEach(o => {
        gruplar[o.grup].push(o);
    });

    let listeHTML = `<h3>📝 Kayıtlı Öğrenciler (${ogrenciler.length})</h3>`;

    for (const grup in gruplar) {
        listeHTML += `<h4>${grupSembol(grup)} ${grup} Grubu (${gruplar[grup].length})</h4><ul>`;
        gruplar[grup].forEach(o => {
            listeHTML += `<li>${o.isim} (${o.cinsiyet}) - ${burcSembol(o.burc)} ${o.burc} / ${grupSembol(o.grup)} ${o.grup}</li>`;
        });
        listeHTML += `</ul>`;
    }

    document.getElementById('sonuc').innerHTML = listeHTML;
}

function siniflariOlustur() {
    const siniflar = { Ateş: [], Su: [], Hava: [], Toprak: [] };

    for (const ogr of ogrenciler) {
        siniflar[ogr.grup].push(ogr);
    }

    let atesHava = [...siniflar["Ateş"], ...siniflar["Hava"]];
    let suToprak = [...siniflar["Su"], ...siniflar["Toprak"]];

    const sinifA = atesHava.slice(0, 25);
    const sinifB = suToprak.slice(0, 25);

    let html = `<h2>📘 Sınıf A (Ateş + Hava)</h2><ul>`;
    sinifA.forEach(o => {
        html += `<li>${o.isim} (${burcSembol(o.burc)} ${o.burc} - ${grupSembol(o.grup)} ${o.grup})</li>`;
    });

    html += `</ul><h2>📗 Sınıf B (Su + Toprak)</h2><ul>`;
    sinifB.forEach(o => {
        html += `<li>${o.isim} (${burcSembol(o.burc)} ${o.burc} - ${grupSembol(o.grup)} ${o.grup})</li>`;
    });

    html += `</ul>`;
    document.getElementById('sonuc').innerHTML = html;
}
</script>


