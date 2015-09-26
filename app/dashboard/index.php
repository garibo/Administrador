<?php 
    session_start();
    if(!isset($_SESSION['username']))
    {
      header("Location: ../../login");
    }
?>
<!DOCTYPE html>
<html lang="en" ng-app="dashApp">
<head>
    <meta charset="utf-8">
    <meta name="theme-color" content="#1fb5ad">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="ThemeBucket">
    <link rel="shortcut icon" href="../../assets/images/cheese-burger.ico">

    <title>Dashboard</title>

    <link href="../../assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <!--Core CSS -->
    <link rel="stylesheet" href="css/app.min.css">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]>
    <script src="js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>

<body ng-controller="dashCtrl">

<section id="container" >
<!--header start-->
<header class="header fixed-top clearfix">
<!--logo start-->
<div class="brand">

    <a href="index.html" class="logo">
        <!-- <img src="../../assets/images/logo.png" alt=""> -->
    </a>
    <div class="sidebar-toggle-box">
        <div class="fa fa-bars"></div>
    </div>
</div>
<!--logo end-->

<div class="nav notify-row" id="top_menu">
    <!--  notification start -->
   
    <!--  notification end -->
</div>
<div class="top-nav clearfix">
    <!--search & user info start-->
    <ul class="nav pull-right top-menu">
        
        <!-- user login dropdown start-->
        <li class="dropdown" ng-controller="perfilCtrl">
            <a data-toggle="dropdown" class="dropdown-toggle" href="">
                <img alt="" ng-src="../../assets/images/avatars/avatarmain">
                <span class="username">{{nombrePerfil}}</span>
                <b class="caret"></b>
            </a>
            <ul class="dropdown-menu extended logout">
                <li><a href="../ajustes"><i class="fa fa-cog"></i> Ajustes</a></li>
                <li><a href="../ajustes/php/atnt/log/salir.php"><i class="fa fa-key"></i>Salir </a></li>
            </ul>
        </li>
    </ul>
    <!--search & user info end-->
</div>
</header>
<!--header end-->
<aside>
    <div id="sidebar" class="nav-collapse">
        <!-- sidebar menu start-->            
        <div class="leftside-navigation">
            <ul class="sidebar-menu" id="nav-accordion">
            <li>
                <a href="index.html" class="active">
                    <i class="fa fa-dashboard"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            
            <li>
                <a href="../pedidos">
                    <i class="fa fa-cart-plus"></i>
                    <span>Pedidos</span>
                </a>
            </li>
             
             <li class="sub-menu">
                <a href="javascript:;">
                    <i class="fa fa-database"></i>
                    <span>Productos</span>
                </a>
                <ul class="sub">
                    <li><a href="../productos/pizzas">Pizzas</a></li>
                    <li><a href="../productos/otros">Otros platillos</a></li>
                    <li><a href="../productos/refrescos">Refrescos</a></li>
                </ul>
            </li>

            <li>
                <a href="../repartidores">
                    <i class="fa fa-motorcycle"></i>
                    <span>Repartidores</span>
                </a>
            </li>

            <li>
                <a href="../clientes" >
                    <i class="fa fa-users"></i>
                    <span>Clientes</span>
                </a>
            </li>

            <li>
                <a href="../ajustes" >
                    <i class="fa fa-gears"></i>
                    <span>Ajustes</span>
                </a>
            </li>
            
            <li>
                <a href="../estadistica">
                    <i class="fa fa-bar-chart"></i>
                    <span>Estadisticas</span>
                </a>
            </li>

            <li>
                <a href="../ayuda">
                    <i class="fa fa-question-circle"></i>
                    <span>Ayuda</span>
                </a>
            </li>

        </ul>
    </div>        
<!-- sidebar menu end-->
    </div>
</aside>
<!--sidebar end-->
    <!--main content start-->
    <section id="main-content">
        <section class="wrapper">
        <!-- page start-->

        <div class="row">
            <div class="col-sm-12">

                <div class="row">
                    <div class="col-sm-6">
                        <div class="profile-nav alt">
                            <section class="panel">
                                <div class="user-heading alt clock-row terques-bg">
                                <h1 id="year"></h1>
                                <p class="text-left" id="month"></p>
                                <p class="text-left" id="clockDisplay"></p>
                                </div>
                                <ul id="clock">
                                <li id="sec"></li>
                                <li id="hour"></li>
                                <li id="min"></li>
                                </ul>

                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>

                            </section>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="profile-nav alt">
                            <section class="panel text-center">
                                <div class="user-heading alt wdgt-row terques-bg">
                                    <i class="fa fa-user"></i>
                                </div>

                                <div class="panel-body">
                                    <div class="wdgt-value">
                                        <h1 class="count">{{usuarios.length}}</h1>
                                        <p>Usuarios</p>
                                    </div>
                                </div>

                            </section>
                        </div>

                                      <div class="profile-nav alt">
                            <section class="panel text-center">
                                <div class="user-heading alt wdgt-row red-bg">
                                    <i class="fa fa-tags"></i>
                                </div>

                                <div class="panel-body">
                                    <div class="wdgt-value">
                                        <h1 class="count">{{pedidos.length}}</h1>
                                        <p>Pedidos</p>
                                    </div>
                                </div>

                            </section>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- page end-->
        </section>
    </section>
    <!--main content end-->
<!--right sidebar start-->
<!--right sidebar end-->

</section>



<!-- Placed js at the end of the document so the pages load faster -->

<!--Core js-->
<script src="js/app.min.js"></script>


</body>
</html>
