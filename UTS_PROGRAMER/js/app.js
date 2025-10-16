// CURRENCY CONVERTER JS SEDERHANA
const rates = {
  IDR: 1,
  USD: 15500,
  EUR: 17000
};

// Ambil elemen dari HTML
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const resultDiv = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const swapBtn = document.getElementById('swapBtn');

// Fungsi utama konversi
function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  // Validasi input
  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerHTML = `<p style="color:red">Masukkan jumlah yang valid!</p>`;
    return;
  }

  if (from === to) {
    resultDiv.innerHTML = `<p style="color:red">Pilih mata uang yang berbeda.</p>`;
    return;
  }

  // Konversi logika dasar
  const inIDR = amount * rates[from];     // ubah ke IDR dulu
  const result = inIDR / rates[to];       // lalu ke target

  // Format hasil agar lebih rapi
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: to,
    maximumFractionDigits: to === 'IDR' ? 0 : 2
  }).format(result);

  // Tampilkan hasil
  resultDiv.innerHTML = `
    <p><strong>${amount} ${from}</strong> = <strong>${formatted}</strong></p>
    <p style="color:#6b7280; font-size:13px;">(Kurs: USD=15.500, EUR=17.000)</p>
  `;
}

// Tukar posisi From ↔ To
function swapCurrency() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  if (amountInput.value) convertCurrency();
}

// Reset semua input
function clearForm() {
  amountInput.value = '';
  fromSelect.value = 'IDR';
  toSelect.value = 'USD';
  resultDiv.innerHTML = `<p class="muted">Hasil akan muncul di sini setelah kamu tekan <strong>Konversi</strong>.</p>`;
}

// Tambahkan event listener
convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrency);
clearBtn.addEventListener('click', clearForm);

// Jalankan pertama kali
clearForm();
console.log("JS Converter aktif dan terhubung!");
