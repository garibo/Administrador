module.exports = function(grunt) {

  grunt.initConfig({
    concat: {           
      css: {            
        src: [
          '../../../assets/bs3/css/bootstrap.min.css',
          '../../../assets/css/bootstrap-reset.css',
          '../../../assets/sweetalert/dist/sweetalert.css',
          '../../../assets/css/style.css',
          '../../../assets/css/style-responsive.css',
          'css/style.css',
          '../../../assets/js/image-picker/image-picker.css'
        ],
        dest: 'css/app.css'
      },
      js : {
        src : [
          '../../../assets/js/jquery.js',
          '../../../assets/bs3/js/bootstrap.min.js',
          '../../../assets/js/jquery.dcjqaccordion.2.7.js',
          '../../../assets/js/jquery.scrollTo.min.js',
          '../../../assets/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.js',
          '../../../assets/js/jquery.nicescroll.js',
          '../../../assets/sweetalert/dist/sweetalert.min.js',
          '../../../assets/js/image-picker/image-picker.min.js',
          '../../../assets/js/scripts.js',
          '../../../assets/js/angularjs/angular.min.js',
          '../../../assets/js/angularjs/angular-route.min.js',
          '../../../assets/js/angularjs/angular-resource.min.js',
          '../../../assets/js/angularjs/angular-messages.min.js',
          'js/ngscript.js'
        ],
        dest : 'js/app.js'
      }
    },

    cssmin : {
      css:{
        src: 'css/app.css',
        dest:'css/app.min.css'
      },
      options: {
       processImport: false
    }
    },

     uglify: {
        js: {
            files: {
                'js/app.min.js': ['js/app.js']
            }
        }
    },

    processhtml : {
      dist: {
        files : {
          'index.php' : 'index.html'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-contrib-cssmin'); 
  grunt.loadNpmTasks('grunt-contrib-uglify'); 
  grunt.loadNpmTasks('grunt-processhtml');


  grunt.registerTask('default', ['concat:css','concat:js', 'cssmin', 'uglify', 'processhtml:dist']);  
};