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

    document.getElementById('sonuc').innerHTML = `
        <p><strong>${isim}</strong> (${cinsiyet}) - Burcu: <strong>${burc}</strong> (${grup})</p>
        <p>${ogrenciler.length} öğrenci kayıtlı.</p>
    `;

    if (ogrenciler.length === 50) {
        siniflariOlustur();
    }
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

function siniflariOlustur() {
    const siniflar = { Ateş: [], Su: [], Hava: [], Toprak: [] };

    for (const ogr of ogrenciler) {
        siniflar[ogr.grup].push(ogr);
    }

    // Grup eksikliklerine göre birleşme
    let atesHava = [...siniflar["Ateş"], ...siniflar["Hava"]];
    let suToprak = [...siniflar["Su"], ...siniflar["Toprak"]];

    const sinifA = atesHava.slice(0, 25);
    const sinifB = suToprak.slice(0, 25);

    // HTML çıktısı
    let html = `<h2>Sınıf A (Ateş + Hava)</h2><ul>`;
    sinifA.forEach(o => html += `<li>${o.isim} (${o.burc} - ${o.grup})</li>`);
    html += `</ul><h2>Sınıf B (Su + Toprak)</h2><ul>`;
    sinifB.forEach(o => html += `<li>${o.isim} (${o.burc} - ${o.grup})</li>`);
    html += `</ul>`;

    document.getElementById('sonuc').innerHTML = html;
}

