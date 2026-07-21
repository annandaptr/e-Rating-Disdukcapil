<?php
$conn = mysqli_connect("localhost","root","","rating_db");

$totalUser = mysqli_fetch_assoc(mysqli_query($conn,"SELECT COUNT(*) as total FROM users"))['total'];

$totalObjek = mysqli_fetch_assoc(mysqli_query($conn,"SELECT COUNT(*) as total FROM objek"))['total'];

$totalRating = mysqli_fetch_assoc(mysqli_query($conn,"SELECT COUNT(*) as total FROM rating"))['total'];

$rataRating = mysqli_fetch_assoc(mysqli_query($conn,"SELECT AVG(rating) as rata FROM rating"))['rata'];

$dataChart = mysqli_query($conn,"
SELECT rating, COUNT(*) as jumlah
FROM rating
GROUP BY rating
ORDER BY rating ASC
");

$label = [];
$data = [];

while($row = mysqli_fetch_assoc($dataChart)){
    $label[] = $row['rating'];
    $data[] = $row['jumlah'];
}
?>

<!DOCTYPE html>
<html lang="id">
<head>

<meta charset="UTF-8">
<title>Dashboard Rating</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>

body{
background:#f5f6fa;
}

.card{
border:none;
border-radius:15px;
box-shadow:0 5px 15px rgba(0,0,0,.1);
}

.card h2{
font-weight:bold;
}

</style>

</head>
<body>

<div class="container mt-5">

<h2 class="mb-4">Dashboard Rating</h2>

<div class="row">

<div class="col-md-3 mb-3">
<div class="card text-center p-3">
<h5>Total Pengguna</h5>
<h2><?= $totalUser ?></h2>
</div>
</div>

<div class="col-md-3 mb-3">
<div class="card text-center p-3">
<h5>Total Data</h5>
<h2><?= $totalObjek ?></h2>
</div>
</div>

<div class="col-md-3 mb-3">
<div class="card text-center p-3">
<h5>Total Penilaian</h5>
<h2><?= $totalRating ?></h2>
</div>
</div>

<div class="col-md-3 mb-3">
<div class="card text-center p-3">
<h5>Rata-rata Rating</h5>
<h2><?= number_format($rataRating,1) ?></h2>
</div>
</div>

</div>

<div class="card p-4 mt-4">

<h4>Grafik Rating</h4>

<canvas id="grafikRating"></canvas>

</div>

</div>

<script>

const ctx=document.getElementById('grafikRating');

new Chart(ctx,{

type:'bar',

data:{
labels:<?= json_encode($label); ?>,

datasets:[{

label:'Jumlah Rating',

data:<?= json_encode($data); ?>,

backgroundColor:[
'#0d6efd',
'#198754',
'#ffc107',
'#fd7e14',
'#dc3545'
]

}]
},

options:{
responsive:true,
plugins:{
legend:{
display:false
}
},
scales:{
y:{
beginAtZero:true
}
}
}

});

</script>

</body>
</html>