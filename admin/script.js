// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHZ11E5Mq0NlqFuN09xzFJhMgfqMhU-Aw",
  authDomain: "konter-e465d.firebaseapp.com",
  projectId: "konter-e465d",
  storageBucket: "konter-e465d.appspot.com",
  messagingSenderId: "1033277565037",
  appId: "1:1033277565037:web:8e4f9560b1e70a13c57764",
  measurementId: "G-VYPRYTSB81"
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
  const hargaAsli = document.getElementById('hargaAsli').value;
  const hargaDiskon = document.getElementById('hargaDiskon').value;

  if (kategoriGame) {
    try {
      // Kirim data ke Firestore di koleksi sesuai kategori game
      await db.collection(kategoriGame).add({
        namaBarang: namaBarang,
        hargaAsli: parseFloat(hargaAsli),
        hargaDiskon: parseFloat(hargaDiskon),
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
