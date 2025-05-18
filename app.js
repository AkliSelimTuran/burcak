function burcHesapla(tarih) {
  const date = new Date(tarih);
  const gun = date.getDate();
  const ay = date.getMonth() + 1;

  if ((ay == 1 && gun >= 20) || (ay == 2 && gun <= 18)) return "Kova";
  if ((ay == 2 && gun >= 19) || (ay == 3 && gun <= 20)) return "Balık";
  if ((ay == 3 && gun >= 21) || (ay == 4 && gun <= 20)) return "Koç";
  if ((ay == 4 && gun >= 21) || (ay == 5 && gun <= 20)) return "Boğa";
  if ((ay == 5 && gun >= 21) || (ay == 6 && gun <= 21)) return "İkizler";
  if ((ay == 6 && gun >= 22) || (ay == 7 && gun <= 22)) return "Yengeç";
  if ((ay == 7 && gun >= 23) || (ay == 8 && gun <= 22)) return "Aslan";
  if ((ay == 8 && gun >= 23) || (ay == 9 && gun <= 22)) return "Başak";
  if ((ay == 9 && gun >= 23) || (ay == 10 && gun <= 22)) return "Terazi";
  if ((ay == 10 && gun >= 23) || (ay == 11 && gun <= 21)) return "Akrep";
  if ((ay == 11 && gun >= 22) || (ay == 12 && gun <= 21)) return "Yay";
  if ((ay == 12 && gun >= 22) || (ay == 1 && gun <= 19)) return "Oğlak";

  return "Bilinmiyor";
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

const ogrenciler = [];

function guncelleListe() {
  const sonucDiv = document.getElementById("sonuc");
  if (!sonucDiv) return;

  let html = "<h3>Kayıtlı Öğrenciler</h3><ul class='list-group'>";
  ogrenciler.forEach(o => {
    html += `<li class='list-group-item'>👤 ${o.isim} | ${o.dogumTarihi} | ${o.burc} | ${o.cinsiyet}</li>`;
  });
  html += "</ul>";

  sonucDiv.innerHTML = html;
}

document.getElementById("kayitFormu").addEventListener("submit", function(e) {
  e.preventDefault();

  const isim = document.getElementById("isim").value.trim();
  const dogumTarihi = document.getElementById("dogumTarihi").value;
  const cinsiyet = document.getElementById("cinsiyet").value;
  const burc = burcHesapla(dogumTarihi);

  if (isim && dogumTarihi && cinsiyet) {
    ogrenciler.push({ isim, dogumTarihi, burc, cinsiyet });
    guncelleListe();
    this.reset();
  }
});

function pdfOlustur() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const veri = ogrenciler.map(o => [o.isim, o.dogumTarihi, o.burc, o.cinsiyet]);
  doc.autoTable({
    head: [["Ad", "Doğum Tarihi", "Burç", "Cinsiyet"]],
    body: veri,
  });
  doc.save("ogrenciler.pdf");
}

function excelOlustur() {
  const ws = XLSX.utils.json_to_sheet(ogrenciler);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Ogrenciler");
  XLSX.writeFile(wb, "ogrenciler.xlsx");
}
