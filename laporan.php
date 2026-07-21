<?php

$conn = mysqli_connect("localhost","root","","rating_db");

$cari  = isset($_GET['cari']) ? $_GET['cari'] : "";
$bulan = isset($_GET['bulan']) ? $_GET['bulan'] : "";
$tahun = isset($_GET['tahun']) ? $_GET['tahun'] : "";

$sql = "SELECT rating.*, objek.nama_objek
        FROM rating
        JOIN objek ON rating.objek_id = objek.id
        WHERE 1=1";

if($cari != ""){
    $sql .= " AND (objek.nama_objek LIKE '%$cari%' OR komentar LIKE '%$cari%')";
}

if($bulan != ""){
    $sql .= " AND MONTH(tanggal)='$bulan'";
}

if($tahun != ""){
    $sql .= " AND YEAR(tanggal)='$tahun'";
}

$sql .= " ORDER BY tanggal DESC";

$query = mysqli_query($conn,$sql);

?>

<!DOCTYPE html>
<html lang="id">

<head>

<meta charset="UTF-8">

<title>Laporan Rating</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<style>

body{

background:#f5f5f5;

}

.card{

margin-top:30px;

border:none;

border-radius:15px;

box-shadow:0 5px 15px rgba(0,0,0,.1);

}

@media print{

form,
.btn{
display:none;
}

}

</style>

</head>

<body>

<div class="container">

<div class="card p-4">

<h2 class="text-center mb-4">

Laporan Rating Pelayanan

</h2>

<form method="GET">

<div class="row">

<div class="col-md-4 mb-3">

<input
type="text"
name="cari"
class="form-control"
placeholder="Cari layanan / komentar"
value="<?= $cari ?>">

</div>

<div class="col-md-3 mb-3">

<select name="bulan" class="form-select">

<option value="">Semua Bulan</option>

<?php

$namaBulan=[
1=>"Januari",
2=>"Februari",
3=>"Maret",
4=>"April",
5=>"Mei",
6=>"Juni",
7=>"Juli",
8=>"Agustus",
9=>"September",
10=>"Oktober",
11=>"November",
12=>"Desember"
];

foreach($namaBulan as $key=>$val){

$selected=($bulan==$key)?"selected":"";

echo "<option value='$key' $selected>$val</option>";

}

?>

</select>

</div>

<div class="col-md-2 mb-3">

<select name="tahun" class="form-select">

<option value="">Semua Tahun</option>

<?php

for($i=date("Y");$i>=2023;$i--){

$selected=($tahun==$i)?"selected":"";

echo "<option value='$i' $selected>$i</option>";

}

?>

</select>

</div>

<div class="col-md-3 mb-3">

<button class="btn btn-primary">

Cari

</button>

<a href="laporan.php" class="btn btn-secondary">

Reset

</a>

<button
type="button"
onclick="window.print()"
class="btn btn-success">

Cetak

</button>

</div>

</div>

</form>

<table class="table table-bordered table-hover">

<thead class="table-success">

<tr>

<th>No</th>

<th>Layanan</th>

<th>Rating</th>

<th>Komentar</th>

<th>Tanggal</th>

</tr>

</thead>

<tbody>

<?php

$no=1;

while($d=mysqli_fetch_assoc($query)){

?>

<tr>

<td><?= $no++ ?></td>

<td><?= $d['nama_objek'] ?></td>

<td>

<?php

for($i=1;$i<=$d['rating'];$i++){

echo "⭐";

}

?>

(<?= $d['rating'] ?>/5)

</td>

<td><?= $d['komentar'] ?></td>

<td><?= date("d-m-Y",strtotime($d['tanggal'])) ?></td>

</tr>

<?php

}

?>

</tbody>

</table>

</div>

</div>

</body>

</html>