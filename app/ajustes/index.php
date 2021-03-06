<?php 
    session_start();
    if(!isset($_SESSION['username']))
    {
      header("Location: ../../login");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="theme-color" content="#1fb5ad">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="ThemeBucket">
    <link rel="shortcut icon" href="../../assets/images/cheese-burger.ico">

    <title>Ajustes</title>

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

<body ng-app="ajustesApp">

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
                <li><a href="php/atnt/log/salir.php"><i class="fa fa-key"></i>Salir </a></li>
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
                <a href="../dashboard">
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
                <a href="" class="active">
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


        <aside class="profile-nav alt"  ng-controller="preciosCtrl">
            <section class="panel">
                <div class="user-heading alt gray-bg">
                    <a href="#">
                        <img alt="" src="../../assets/images/productos/pizza.png">
                    </a>
                    <h1>Pizzas</h1>
                    <p>Configurar precios de pizzas</p>
                </div>
                <ul class="nav nav-pills nav-stacked">
                    <li ng-repeat="precio in precios" ng-click="editar(precio)">
                        <a href="" data-toggle="modal" data-target="#myModal"> 
                            {{precio.nombre | capitalize}} <span class="badge label-success pull-right r-activity"
                            ng-class="{ 'label-warning' : precio.id > 3, 'label-danger' : precio.id > 5}">{{precio.precio | currency}}</span>
                        </a>
                    </li>
                </ul>

            </section>

                        <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Cambiar precio</h4>
                  </div>
                  <div class="modal-body">
                    <div class="form-group ">
                        <label for="cname" class="control-label col-lg-3">{{mNombre | capitalize}} : </label>
                        <div class="col-lg-6">
                            <input class=" form-control" id="cname" name="name" minlength="2" type="text" required ng-model="mPrecio"/>
                        </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" ng-click="cambiar()" ng-disabled="mPrecio == aux">Guardar cambios</button>
                  </div>
                </div>
              </div>
            </div>
        </aside>

        <section class="panel">
            <div class="twt-feed blue-bg" ng-controller="perfilCtrl">
                <a href="#">
                    <img alt="" ng-src="../../assets/images/avatars/avatarmain">
                </a>
                <h1>{{nombrePerfil}}</h1>
                <p>admin@pizzeriayes.com</p>

            </div>
            <div class=" form" style="padding-left:35px; padding-right:35px; margin-top:35px" ng-controller="contraCtrl">
                <form class="cmxform form-horizontal " name="passwordForm" ng-submit="cambiarContra()">
                    <div class="form-group " ng-class="{ 'has-error': passwordForm.contraActual.$touched && passwordForm.contraActual.$invalid }">
                        <label for="cname" class="control-label col-lg-3">Contraseña actual</label>
                        <div class="col-lg-6">
                            <input class="form-control " type="password"
                            name="contraActual"
                            ng-model="contra" 
                            ng-maxlength="15" 
                            required />
                            <div class="help-block" ng-messages="passwordForm.contraActual.$error" ng-if="passwordForm.contraActual.$touched">
                              <p ng-message="maxlength">El campo es muy largo.</p>
                              <p ng-message="required">El campo es requerido.</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group " ng-class="{ 'has-error': passwordForm.contraNueva.$touched && passwordForm.contraNueva.$invalid }">
                        <label for="cemail" class="control-label col-lg-3">Nueva contrseña</label>
                        <div class="col-lg-6">
                            <input class="form-control " type="password" 
                            name="contraNueva"
                            ng-model="contran"
                            ng-maxlength="15" 
                            required />
                            <div class="help-block" ng-messages="passwordForm.contraNueva.$error" ng-if="passwordForm.contraNueva.$touched">
                              <p ng-message="maxlength">El campo es muy largo.</p>
                              <p ng-message="required">El campo es requerido.</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group " ng-class="{ 'has-error': passwordForm.contraNuevaOtra.$touched && passwordForm.contraNuevaOtra.$invalid }">
                        <label for="curl" class="control-label col-lg-3">Repetir contraseña</label>
                        <div class="col-lg-6">
                            <input class="form-control " type="password"
                            name="contraNuevaOtra"
                            ng-model="contrann"
                            ng-maxlength="15" 
                            required/>
                            <div class="help-block" ng-messages="passwordForm.contraNuevaOtra.$error" ng-if="passwordForm.contraNuevaOtra.$touched">
                              <p ng-message="maxlength">El campo es muy largo.</p>
                              <p ng-message="required">El campo es requerido.</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-offset-3 col-lg-6">
                            <button class="btn btn-primary" type="submit" ng-disabled="passwordForm.$invalid">Cambiar contraseña</button>
                            <button class="btn btn-default" type="button" ng-click="cancelar()">Cancelar</button>
                        </div>
                    </div>
                </form>

                <br>
            </div>

    
        </section >

        <section class="panel" flow-init flow-file-added="!!{png:1,gif:1,jpg:1,jpeg:1}[$file.getExtension()]" flow-files-submitted="$flow.upload()">
            <div id="contenido-imagen">
            <h1>Cambiar imagen  de perfil</h1>
              <hr class="soften"/>
              <center>
              <div>
                <div class="thumbnail" ng-hide="$flow.files.length">
                  <img src="../../assets/images/no_pic.png" />
                </div>
                <div class="thumbnail" ng-show="$flow.files.length">
                  <img flow-img="$flow.files[0]" width="120px" heigh="200px"/>
                </div>
                <div>
                  <button class="btn btn-danger" ng-hide="$flow.files.length" flow-btn flow-attrs="{accept:'image/*'}">Seleccionar imagen</button>
                  <button class="btn btn-success" ng-show="$flow.files.length" flow-btn flow-attrs="{accept:'image/*'}">Cambiar</button>
                  <button  class="btn btn-info" ng-show="$flow.files.length"
                     ng-click="$flow.cancel()">
                    Remover
                  </button>
                </div>
                <p>
                  Solo PNG,GIF,JPG formatos permitidos.
                </p>
              </div>
              </center>
              </div>
        </section>

        <section class="panel">
            <div class="twt-feed blue-bg" ng-controller="perfilCtrl">
                <a href="#">
                    <img alt="" ng-src="../../assets/images/avatars/avatarmain">
                </a>
                <h1>{{nombrePerfil}}</h1>
                <p>admin@pizzeriayes.com</p>

            </div>
            <div class=" form" style="padding-left:35px; padding-right:35px; margin-top:35px" ng-controller="userCtrl">
                <form class="cmxform form-horizontal " name="userForm" ng-submit="cambiarNombre()">
                    <div class="form-group " ng-class="{ 'has-error': userForm.nombre.$touched && userForm.nombre.$invalid }">
                        <label for="cname" class="control-label col-lg-3">Nuevo nombre de usuario</label>
                        <div class="col-lg-6">
                            <input class="form-control " type="text"
                            name="nombre"
                            ng-model="nombre" 
                            ng-maxlength="50" 
                            required />
                            <div class="help-block" ng-messages="userForm.nombre.$error" ng-if="userForm.nombre.$touched">
                              <p ng-message="maxlength">El campo es muy largo.</p>
                              <p ng-message="required">El campo es requerido.</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-offset-3 col-lg-6">
                            <button class="btn btn-primary" type="submit" ng-disabled="userForm.$invalid">Cambiar nombre de usuario</button>
                            <button class="btn btn-default" type="button" ng-click="cancelar()">Cancelar</button>
                        </div>
                    </div>
                </form>

                <br>
            </div>

    
        </section >

                
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
