<?php
$conn = mysqli_connect("localhost","root","","rating_db");

$query = mysqli_query($conn,"
SELECT
MONTH(tanggal) AS bulan,
COUNT(*) AS total
FROM rating
WHERE YEAR(tanggal)=YEAR(CURDATE())
GROUP BY MONTH(tanggal)
ORDER BY MONTH(tanggal)
");

$namaBulan=[
1=>"Jan",
2=>"Feb",
3=>"Mar",
4=>"Apr",
5=>"Mei",
6=>"Jun",
7=>"Jul",
8=>"Ags",
9=>"Sep",
10=>"Okt",
11=>"Nov",
12=>"Des"
];

$label=[];
$data=[];

while($row=mysqli_fetch_assoc($query)){

$label[]=$namaBulan[$row['bulan']];
$data[]=$row['total'];

}
?>

<!DOCTYPE html>
<html lang="id">

<head>

<meta charset="UTF-8">

<title>Grafik Rating</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>

body{

background:#f5f5f5;

}

.card{

margin-top:40px;

border:none;

border-radius:15px;

box-shadow:0 5px 15px rgba(0,0,0,.1);

}

</style>

</head>

<body>

<div class="container">

<div class="card p-4">

<h3 class="text-center mb-4">

Grafik Rating Per Bulan

</h3>

<canvas id="grafik"></canvas>

</div>

</div>

<script>

new Chart(document.getElementById("grafik"),{

type:"line",

data:{

labels:<?= json_encode($label); ?>,

datasets:[{

label:"Jumlah Rating",

data:<?= json_encode($data); ?>,

fill:false,

borderWidth:3,

tension:0.3

}]

},

options:{

responsive:true,

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