document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('link');
    var iframeElement = document.getElementById('browser');
    var url = document.getElementById('urlInput');
    // onClick's logic below:
    link.addEventListener('click', function() {
      iframeElement.src=url.value;
    });
});
