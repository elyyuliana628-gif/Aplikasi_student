
// Mengambil elemen dari HTML
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Menyimpan daftar tugas
let tasks = [];

// Fungsi menambahkan tugas
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const namaTugas = taskInput.value.trim();

    if (namaTugas === "") {
        alert("Nama tugas harus diisi!");
        return;
    }

    tasks.push({
        nama: namaTugas,
        selesai: false
    });

    taskInput.value = "";

    tampilkanTugas();
});

// Fungsi menampilkan tugas
function tampilkanTugas() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        if (task.selesai) {
            li.classList.add("done");
        }

        // Membuat checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.selesai;

        checkbox.addEventListener("change", function() {
            task.selesai = checkbox.checked;
            tampilkanTugas();
        });

        // Membuat nama tugas
        const span = document.createElement("span");
        span.textContent = task.nama;

        // Membuat tombol hapus
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.className = "hapus";

        tombolHapus.addEventListener("click", function() {
            tasks.splice(index, 1);
            tampilkanTugas();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(tombolHapus);

        taskList.appendChild(li);
    });

    // Menghitung jumlah tugas
    const total = tasks.length;

    const selesai = tasks.filter(function(task) {
        return task.selesai;
    }).length;

    const belum = total - selesai;

    // Menampilkan hasil perhitungan
    document.getElementById("total").textContent = total;
    document.getElementById("selesai").textContent = selesai;
    document.getElementById("belum").textContent = belum;
}

// Menjalankan tampilan awal
tampilkanTugas();
