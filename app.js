const ogrenciler = [];

function burcHesapla(tarih) {
  const gun = new Date(tarih).getDate();
  const ay = new Date(tarih).getMonth() + 1;

  if ((ay === 3 && gun >= 21) || (ay === 4 && gun <= 20)) return "Koç";
  if ((ay === 4 && gun >= 21) || (ay === 5 && gun <= 21)) return "Boğa";
  if ((ay === 5 && gun >= 22) || (ay === 6 && gun <= 22)) return "İkizler";
  // Devamı...

  return "Bilinmiyor";
}

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
