//////////// drag the annotation across the document ///////////
/// Inspired largely from - https://stackoverflow.com/questions/38405569/jquery-calling-function-to-parent-element
function handle_mousedown(e){
      e.preventDefault() // stops the text selection

      window.my_dragging = {};
      my_dragging.pageX0 = e.pageX;
      my_dragging.pageY0 = e.pageY;
      my_dragging.elem = this;
      my_dragging.offset0 = $(this).offset();
      // console.log(my_dragging.elem.id);

      function handle_dragging(e){
        if(my_dragging.elem.id.includes("mover")){ //check if element is a note and only move if so
              //get parent element and move that
              var parentElem = my_dragging.elem.parentElement;

              var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
              var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);

              $(parentElem)
              .offset({top: top, left: left});
      }
      }

      function handle_mouseup(e){
            $('body')
            .off('mousemove', handle_dragging)
            .off('mouseup', handle_mouseup);
      }

      $('body')
          .on('mouseup', handle_mouseup)
          .on('mousemove', handle_dragging);
}
