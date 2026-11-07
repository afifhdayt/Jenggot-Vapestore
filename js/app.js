"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  {
    nama: "Foom Ice Strawberry",
    kategori: "Foom Ice",
    harga: 100000,
    stok: 10,
    unggulan: true
  },
  {
    nama: "Foom Ice Mango",
    kategori: "Foom Ice",
    harga: 100000,
    stok: 3,
    unggulan: false
  },
  {
    nama: "Takis Strawberry Guava",
    kategori: "Takis",
    harga: 80000,
    stok: 0,
    unggulan: false
  }
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(nilai);
}

// Menentukan status stok
function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "warning" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card">
      <p class="eyebrow">${labelKategori(produk.kategori)}</p>
      <h3>${produk.nama}</h3>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">
        ${status.label}
      </span>
    </article>
  `;
}

// Debugging setiap produk menggunakan forEach
produkUmkm.forEach((produk) => {
  console.log(
    "Debug produk:",
    produk.nama,
    "stok:",
    produk.stok
  );
});

// Menampilkan data produk dalam bentuk tabel
console.table(produkUmkm);

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

// Function untuk menampilkan produk
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  // Memeriksa apakah elemen HTML tersedia
  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  // Mengambil produk yang memiliki stok
  const produkTersedia = produkUmkm.filter(
    (produk) => produk.stok > 0
  );

  // Mencari produk unggulan
  const produkUnggulan = produkUmkm.find(
    (produk) => produk.unggulan === true
  );

  // Mengubah data menjadi HTML
  const markupProduk = produkTersedia
    .map(buatKartuProduk)
    .join("");

  // Menampilkan produk
  grid.innerHTML = markupProduk;

  // Menampilkan ringkasan
  ringkasan.textContent =
    `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;

  // Menampilkan produk unggulan
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  // Menampilkan data untuk debugging
  console.table(produkUmkm);
}

// Menjalankan render ketika HTML selesai dimuat
document.addEventListener("DOMContentLoaded", renderProduk);


// Pengaturan hamburger menu berdasarkan ukuran layar
const navMenu = document.querySelector(".nav-menu");

if (navMenu) {
  const desktopView = window.matchMedia("(min-width: 48rem)");

  function aturNavigasi() {
    navMenu.open = desktopView.matches;
  }

  // Atur kondisi awal
  aturNavigasi();

  // Atur kembali ketika ukuran layar berubah
  desktopView.addEventListener("change", aturNavigasi);
}
