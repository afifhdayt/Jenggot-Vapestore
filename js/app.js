
"use strict";

console.log("P09 JavaScript aktif");

// Data produk Jenggot Vapestore
const produkUmkm = [
  {
    nama: "Foom Ice Strawberry",
    kategori: "Foom Ice",
    harga: 100000,
    stok: 10
  },
  {
    nama: "Foom Ice Mango",
    kategori: "Foom Ice",
    harga: 100000,
    stok: 3
  },
  {
    nama: "Takis Strawberry Guava",
    kategori: "Takis",
    harga: 80000,
    stok: 0
  }
];

// Format harga ke Rupiah
const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

// Menentukan status stok
function statusStok(stok) {
  if (stok === 0) {
    return "Habis";
  } else if (stok <= 5) {
    return "Stok terbatas";
  } else {
    return "Tersedia";
  }
}

// Menentukan label kategori
function labelKategori(kategori) {
  switch (kategori) {
    case "Foom Ice":
      return "Foom Ice";
    case "Takis":
      return "Takis";
    default:
      return "Produk lainnya";
  }
}

// Target tempat produk ditampilkan
const tempatProduk = document.querySelector("#produk-dinamis");
const ringkasanProduk = document.querySelector("#produk-ringkasan");

// Jalankan hanya jika elemen tersedia di halaman
if (tempatProduk && ringkasanProduk) {
  let jumlahTersedia = 0;

  for (const produk of produkUmkm) {
    if (produk.stok > 0) {
      jumlahTersedia++;
    }

    tempatProduk.innerHTML += `
      <article class="js-product-card">
        <p class="eyebrow">${labelKategori(produk.kategori)}</p>
        <h3>${produk.nama}</h3>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <p class="stock-badge">${statusStok(produk.stok)}</p>
      </article>
    `;
  }

  ringkasanProduk.textContent =
    `${produkUmkm.length} produk ditampilkan, ${jumlahTersedia} produk memiliki stok.`;
}
