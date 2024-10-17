// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9qR6fQwVhhvOOZobTnhkmanwnyM_eN6A",
  authDomain: "ahsanstore-afd75.firebaseapp.com",
  projectId: "ahsanstore-afd75",
  storageBucket: "ahsanstore-afd75.appspot.com",
  messagingSenderId: "628733570435",
  appId: "1:628733570435:web:054af025d091f89490dab6",
  measurementId: "G-N35XLD1BMK"
};

// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Akses elemen form
const inputForm = document.getElementById('inputForm');

inputForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Ambil data dari form
  const namaBarang = document.getElementById('namaBarang').value;
  const kategoriGame = document.getElementById('kategoriGame').value;

  // Mengambil harga dan menghapus pemisah ribuan sebelum mengkonversi
  const hargaAsli = document.getElementById('hargaAsli').value.replace(/\./g, ''); // Menghapus pemisah ribuan
  const hargaDiskon = document.getElementById('hargaDiskon').value.replace(/\./g, ''); // Menghapus pemisah ribuan

  // Format harga menjadi string dengan pemisah ribuan
  const formattedHargaAsli = Number(hargaAsli).toLocaleString('id-ID');
  const formattedHargaDiskon = Number(hargaDiskon).toLocaleString('id-ID');

  if (kategoriGame) {
    try {
      // Kirim data ke Firestore di koleksi sesuai kategori game
      await db.collection(kategoriGame).add({
        namaBarang: namaBarang,
        hargaAsli: formattedHargaAsli, // Simpan sebagai string dengan pemisah ribuan
        hargaDiskon: formattedHargaDiskon, // Simpan sebagai string dengan pemisah ribuan
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert('Data berhasil dikirim ke ' + kategoriGame);
      inputForm.reset();
    } catch (error) {
      console.error("Error menambahkan dokumen: ", error);
      alert('Terjadi kesalahan saat mengirim data.');
    }
  } else {
    alert('Pilih kategori game!');
  }
});

// Fungsi untuk memformat harga
function formatCurrency(input) {
    // Menghapus semua karakter non-numerik
    let value = input.value.replace(/\D/g, '');

    // Memformat nilai sebagai mata uang (dengan pemisah ribuan)
    value = Number(value).toLocaleString('id-ID');

    // Mengatur nilai yang diformat kembali ke input
    input.value = value;
}
