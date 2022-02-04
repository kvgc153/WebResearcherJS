
// following code injects the following js and css code when button in popup.html is clicked

var jsFiles = ["ext_libs/jquery.min.js",
"ext_libs/jquery-ui.min.js",
"ext_libs/jquery.cookie.min.js",
"ext_libs/popper.js",
"ext_libs/pell.min.js",
"ext_libs/notify.min.js",
"webresearcher/init.js",
"webresearcher/webresearcher.js",
"ext_libs/bootstrap.min.js",
"webresearcher/sidebar.js",
"webresearcher/export.js",
];

var cssFiles = ["ext_libs/pell.css",
"ext_libs/jquery-ui.min.css",
"ext_libs/bootstrap.min.css"];

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('go');

    link.addEventListener('click', function() {

					for(var i=0;i<jsFiles.length;i++){
							const executing = browser.tabs.executeScript({
							file: jsFiles[i]
					  });
					 }

					for(var i=0;i<cssFiles.length;i++){
						 const executing = browser.tabs.insertCSS({
						 file: cssFiles[i]
					 });
					link.setAttribute("style","background-color:#4CAF50; border: none; color: white; padding: 15px 32px; text-align: center;");
					link.innerHTML = "<h3> Extension active on webpage </h3>";
		}








    });
});
