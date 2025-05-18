const ogrenciler = [];
let sinifA = [];
let sinifB = [];
let ogrenciler = [];

document.getElementById("kayitFormu").addEventListener("submit", function (e) {
  e.preventDefault();

  const isim = document.getElementById("isim").value.trim();
  const dogumTarihi = document.getElementById("dogumTarihi").value;
  const cinsiyet = document.getElementById("cinsiyet").value;

  if (!isim || !dogumTarihi || !cinsiyet) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  const burc = burcHesapla(dogumTarihi);
  const grup = grupAta(burc);

  ogrenciler.push({ isim, dogumTarihi, cinsiyet, burc, grup });

  listeyiGuncelle();
  this.reset(); // Formu temizle
});

// Burç hesaplama
function burcHesapla(tarih) {
  const gun = new Date(tarih).getDate();
  const ay = new Date(tarih).getMonth() + 1;

  if ((ay == 3 && gun >= 21) || (ay == 4 && gun <= 20)) return "Koç";
  if ((ay == 4 && gun >= 21) || (ay == 5 && gun <= 21)) return "Boğa";
  if ((ay == 5 && gun >= 22) || (ay == 6 && gun <= 22)) return "İkizler";
  if ((ay == 6 && gun >= 23) || (ay == 7 && gun <= 22)) return "Yengeç";
  if ((ay == 7 && gun >= 23) || (ay == 8 && gun <= 22)) return "Aslan";
  if ((ay == 8 && gun >= 23) || (ay == 9 && gun <= 22)) return "Başak";
  if ((ay == 9 && gun >= 23) || (ay == 10 && gun <= 22)) return "Terazi";
  if ((ay == 10 && gun >= 23) || (ay == 11 && gun <= 21)) return "Akrep";
  if ((ay == 11 && gun >= 22) || (ay == 12 && gun <= 21)) return "Yay";
  if ((ay == 12 && gun >= 22) || (ay == 1 && gun <= 21)) return "Oğlak";
  if ((ay == 1 && gun >= 22) || (ay == 2 && gun <= 19)) return "Kova";
  if ((ay == 2 && gun >= 20) || (ay == 3 && gun <= 20)) return "Balık";
}

// Burç grubuna göre atama
function grupAta(burc) {
  const ates = ["Koç", "Aslan", "Yay"];
  const toprak = ["Boğa", "Başak", "Oğlak"];
  const hava = ["İkizler", "Terazi", "Kova"];
  const su = ["Yengeç", "Akrep", "Balık"];

  if (ates.includes(burc)) return "Ateş";
  if (toprak.includes(burc)) return "Toprak";
  if (hava.includes(burc)) return "Hava";
  if (su.includes(burc)) return "Su";
}

// Listeyi ekrana yaz
function listeyiGuncelle() {
  const sonucDiv = document.getElementById("sonuc");
  sonucDiv.innerHTML = ""; // Önce temizle

  if (ogrenciler.length === 0) {
    sonucDiv.innerHTML = "<p>Henüz öğrenci eklenmedi.</p>";
    return;
  }

  const grupListesi = {};

  // Gruplara göre ayır
  ogrenciler.forEach(o => {
    if (!grupListesi[o.grup]) {
      grupListesi[o.grup] = [];
    }
    grupListesi[o.grup].push(o);
  });

  // Her grup için listele
  for (const grup in grupListesi) {
    const grupOgrencileri = grupListesi[grup];
    const baslik = document.createElement("h3");
    baslik.textContent = `${grup} Grubu (${grupOgrencileri.length} kişi)`;
    sonucDiv.appendChild(baslik);

    const liste = document.createElement("ul");

    grupOgrencileri.forEach(o => {
      const li = document.createElement("li");
      li.textContent = `${o.isim} - ${o.burc} - ${o.cinsiyet}`;
      liste.appendChild(li);
    });

    sonucDiv.appendChild(liste);
  }
}

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
        "Ateş": "🔥",
        "Su": "💧",
        "Hava": "🌬️",
        "Toprak": "🪨"
    };
    return semboller[grup] || "";
}

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

function guncelleListe() {
    const gruplar = { Ateş: [], Su: [], Hava: [], Toprak: [] };

    ogrenciler.forEach(o => {
        gruplar[o.grup].push(o);
    });

    let listeHTML = `<h3>📝 Kayıtlı Öğrenciler (${ogrenciler.length})</h3>`;

    for (const grup in gruplar) {
        listeHTML += `<h4>${grupSembol(grup)} ${grup} Grubu (${gruplar[grup].length})</h4><ul>`;
        gruplar[grup].forEach(o => {
            listeHTML += `<li style="color:${grupRenk(grup)}">${o.isim} (${o.cinsiyet}) - ${burcSembol(o.burc)} ${o.burc} / ${grupSembol(o.grup)} ${o.grup}</li>`;
        });
        listeHTML += `</ul>`;
    }

    document.getElementById('sonuc').innerHTML = listeHTML;
}

function siniflariOlustur() {
    const siniflar = {
        A: { kizlar: [], erkekler: [] },
        B: { kizlar: [], erkekler: [] }
    };

    const gruplar = {
        Ateş: [], Hava: [], Su: [], Toprak: []
    };
    ogrenciler.forEach(o => {
        gruplar[o.grup].push(o);
    });

    const aListesi = [...gruplar["Ateş"], ...gruplar["Hava"]];
    const bListesi = [...gruplar["Su"], ...gruplar["Toprak"]];

    aListesi.forEach(o => {
        if (o.cinsiyet === "Kadın") siniflar.A.kizlar.push(o);
        else siniflar.A.erkekler.push(o);
    });
    bListesi.forEach(o => {
        if (o.cinsiyet === "Kadın") siniflar.B.kizlar.push(o);
        else siniflar.B.erkekler.push(o);
    });

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

document.getElementById('kayitFormu').addEventListener('submit', function (e) {
    e.preventDefault();

    const isim = document.getElementById('isim').value.trim();
    const dogumTarihiRaw = document.getElementById('dogumTarihi').value;
    const cinsiyet = document.getElementById('cinsiyet').value;

    if (!isim || !dogumTarihiRaw || !cinsiyet) {
        alert("Lütfen tüm alanları eksiksiz doldurun.");
        return;
    }

    const dogumTarihi = new Date(dogumTarihiRaw);
    const burc = burcHesapla(dogumTarihi);
    const grup = burcGrubu(burc);

    const yeniOgrenci = { isim, cinsiyet, burc, grup };
    ogrenciler.push(yeniOgrenci);

    guncelleListe();

    if (ogrenciler.length >= 50) {
        siniflariOlustur();
    }

    document.getElementById('kayitFormu').reset();
});

function pdfOlustur() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("📘 Sınıf A (Ateş + Hava)", 10, 10);
    doc.autoTable({
        startY: 15,
        head: [["İsim", "Cinsiyet", "Burç", "Grup"]],
        body: sinifA.map(o => [o.isim, o.cinsiyet, o.burc, o.grup])
    });

    doc.text("📗 Sınıf B (Su + Toprak)", 10, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 15,
        head: [["İsim", "Cinsiyet", "Burç", "Grup"]],
        body: sinifB.map(o => [o.isim, o.cinsiyet, o.burc, o.grup])
    });

    doc.save("ogrenci_listesi.pdf");
}

function excelOlustur() {
    const data = [
        ["Sınıf", "İsim", "Cinsiyet", "Burç", "Grup"],
        ...sinifA.map(o => ["A", o.isim, o.cinsiyet, o.burc, o.grup]),
        ...sinifB.map(o => ["B", o.isim, o.cinsiyet, o.burc, o.grup])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ogrenciler");
    XLSX.writeFile(wb, "ogrenci_listesi.xlsx");
}
