module.exports = function(grunt) {

  grunt.initConfig({
    concat: {           
      js : {
        src : [
          '../../assets/js/jquery.js',
          '../../assets/bs3/js/bootstrap.min.js',
          '../../assets/js/jquery.dcjqaccordion.2.7.js',
          '../../assets/js/jquery.scrollTo.min.js',
          '../../assets/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.js',
          '../../assets/js/jquery.nicescroll.js',
          '../../assets/js/css3clock/js/css3clock.js',
          '../../assets/js/scripts.js',
          '../../assets/js/angularjs/angular.min.js',
          '../../assets/js/angularjs/angular-resource.min.js',
          'js/ngscript.js',
          '../../assets/js/moment.min.js',
          'js/script.js'
        ],
        dest : 'js/app.js'
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


  grunt.registerTask('default', ['concat:js', 'uglify', 'processhtml:dist']);  
};