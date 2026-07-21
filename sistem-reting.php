<?php
$conn = mysqli_connect("localhost","root","","rating_db");

if(isset($_POST['kirim'])){

    $objek = $_POST['objek'];
    $rating = $_POST['rating'];
    $komentar = $_POST['komentar'];

    mysqli_query($conn,"INSERT INTO rating(objek_id,rating,komentar,tanggal)
    VALUES('$objek','$rating','$komentar',NOW())");

    echo "<script>
    alert('Terima kasih, penilaian berhasil dikirim.');
    window.location='index.php';
    </script>";
}
?>

<!DOCTYPE html>
<html lang="id">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Rating Pelayanan</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<style>

body{

background:#f4f6f9;

}

.card{

margin-top:40px;

border:none;

border-radius:15px;

box-shadow:0 5px 20px rgba(0,0,0,.15);

}

.star{

display:flex;

flex-direction:row-reverse;

justify-content:center;

}

.star input{

display:none;

}

.star label{

font-size:40px;

color:#ccc;

cursor:pointer;

transition:.3s;

}

.star input:checked ~ label{

color:#ffc107;

}

.star label:hover,

.star label:hover ~ label{

color:#ffc107;

}

</style>

</head>

<body>

<div class="container">

<div class="row justify-content-center">

<div class="col-md-7">

<div class="card p-4">

<h2 class="text-center text-success mb-4">

SURVEI KEPUASAN MASYARAKAT

</h2>

<form method="POST">

<div class="mb-3">

<label class="form-label">

Layanan yang Dinilai

</label>

<select name="objek" class="form-select" required>

<option value="">-- Pilih Layanan --</option>

<?php

$data=mysqli_query($conn,"SELECT * FROM objek");

while($d=mysqli_fetch_array($data)){

?>

<option value="<?= $d['id'] ?>">

<?= $d['nama_objek'] ?>

</option>

<?php } ?>

</select>

</div>

<div class="mb-4">

<label class="form-label">

Berikan Rating

</label>

<div class="star">

<input type="radio" name="rating" value="5" id="5" required>
<label for="5">★</label>

<input type="radio" name="rating" value="4" id="4">
<label for="4">★</label>

<input type="radio" name="rating" value="3" id="3">
<label for="3">★</label>

<input type="radio" name="rating" value="2" id="2">
<label for="2">★</label>

<input type="radio" name="rating" value="1" id="1">
<label for="1">★</label>

</div>

</div>

<div class="mb-3">

<label class="form-label">

Komentar

</label>

<textarea

name="komentar"

class="form-control"

rows="4"

placeholder="Masukkan komentar..."></textarea>

</div>

<div class="d-grid">

<button

type="submit"

name="kirim"

class="btn btn-success btn-lg">

Kirim Penilaian

</button>

</div>

</form>

</div>

</div>

</div>

</div>

</body>

</html>