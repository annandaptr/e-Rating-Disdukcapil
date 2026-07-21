<?php

$conn = mysqli_connect("localhost","root","","rating_db");

header("Content-Type: application/vnd-ms-excel");
header("Content-Disposition: attachment; filename=Laporan_Rating_".date("Ymd").".xls");

?>

<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

</head>

<body>

<h2 align="center">

LAPORAN RATING LAYANAN MASYARAKAT

</h2>

<table border="1">

<tr style="background:#28a745;color:white;">

<th>No</th>

<th>Layanan</th>

<th>Rating</th>

<th>Komentar</th>

<th>Tanggal</th>

</tr>

<?php

$no=1;

$query=mysqli_query($conn,"
SELECT
rating.*,
objek.nama_objek
FROM rating
JOIN objek
ON rating.objek_id=objek.id
ORDER BY rating.tanggal DESC
");

while($d=mysqli_fetch_assoc($query)){

?>

<tr>

<td><?= $no++ ?></td>

<td><?= $d['nama_objek'] ?></td>

<td><?= $d['rating'] ?></td>

<td><?= $d['komentar'] ?></td>

<td><?= date('d-m-Y',strtotime($d['tanggal'])) ?></td>

</tr>

<?php } ?>

</table>

</body>

</html>