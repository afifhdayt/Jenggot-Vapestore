"use strict";

console.log("P11 JavaScript aktif");

// Data produk contoh
const produkUmkm = [
  {
    nama: "Oxva Xlim Go 2",
    kategori: "Oxva",
    harga: 204000,
    stok: 3,
    unggulan: false
  },
  {
    nama: "Oxva Xlim Pro 3",
    kategori: "Oxva",
    harga: 300000,
    stok: 0,
    unggulan: false
  },
  {
    nama: "Oxva Artio Pod Kit",
    kategori: "Oxva",
    harga: 250000,
    stok: 1,
    unggulan: false
  },
  {
    nama: "Vaporesso XROS 5 Nano",
    kategori: "Vaporesso",
    harga: 299000,
    stok: 4,
    unggulan: false
  },
  {
    nama: "Vaporesso XROS Pro 2",
    kategori: "Vaporesso",
    harga: 350000,
    stok: 2,
    unggulan: false
  },
  {
    nama: "Foom Ice Strawberry",
    kategori: "Foom",
    harga: 100000,
    stok: 0,
    unggulan: true
  },
  {
    nama: "Foom Ice Mango",
    kategori: "Foom",
    harga: 100000,
    stok: 6,
    unggulan: false
  },
  {
    nama: "Foom Ice Lychee",
    kategori: "Foom",
    harga: 100000,
    stok: 2,
    unggulan: false
  },
  {
    nama: "Foom Ice Apple",
    kategori: "Foom",
    harga: 100000,
    stok: 9,
    unggulan: false
  },
  {
    nama: "Takis Strawberry Guava",
    kategori: "Takis",
    harga: 80000,
    stok: 0,
    unggulan: false
  },
  {
    nama: "Takis Grape Apple",
    kategori: "Takis",
    harga: 80000,
    stok: 15,
    unggulan: false
  },
  {
    nama: "BuaQita Strawberry",
    kategori: "BuaQita",
    harga: 100000,
    stok: 2,
    unggulan: false
  },
  {
    nama: "BuaQita Mango",
    kategori: "BuaQita",
    harga: 100000,
    stok: 8,
    unggulan: false
  }
];

// Format harga rupiah
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

// DOM Selection
const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

// Membuat elemen kartu produk
function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);

  stock.classList.add("stock-badge");

  if (status.className) {
    stock.classList.add(status.className);
  }

  stock.textContent = status.label;

  card.append(title, category, price, stock);

  return card;
}

// Membuat pesan ketika produk kosong
function buatEmptyState(kategori) {
  const empty = document.createElement("p");

  empty.classList.add("empty-state");
  empty.textContent =
    `Belum ada produk pada kategori ${kategori}.`;

  return empty;
}

// Function rendering produk
function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter(
        (produk) => produk.kategori === kategoriAktif
      );

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent =
    `${produkTampil.length} produk ditampilkan.`;
}

// Menampilkan produk pertama kali
renderProduk();

// Event listener tombol filter
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => {
      item.classList.remove("is-active");
    });

    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

// Pengaturan hamburger menu
const navMenu = document.querySelector(".nav-menu");

if (navMenu) {
  const desktopView = window.matchMedia("(min-width: 48rem)");

  function aturNavigasi() {
    navMenu.open = desktopView.matches;
  }

  aturNavigasi();

  desktopView.addEventListener("change", aturNavigasi);
}