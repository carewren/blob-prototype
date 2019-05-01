
var blob = document.getElementById('blob');

var navColor = document.getElementById('color');
var navShape = document.getElementById('shape');
var navSticker = document.getElementById('sticker');
var navSave = document.getElementById('save');

var colorSlider = document.getElementById('slider-color-picker');
var shapeSlider = document.getElementById('slider-shape-picker');
var stickerDrawer = document.getElementById('sticker-picker');


//////////////////////////////////
// this controls the BLOB COLOR //
//////////////////////////////////

var num2hex = rgb => {
    return rgb
      .map(color => {
        let str = color.toString(16);

        if (str.length === 1) {
          str = '0' + str;
        }

        return str;
      })
      .join('');
  };

  var rgb = [100, 0, 0];
  var colors = ['red', 'green', 'blue'];

  var gColorPicker = d3
    .select('div#slider-color-picker')
    .append('svg')
    .attr('width', 375)
    .attr('height', 200)
    .append('g')
    .attr('transform', 'translate(30,30)');

  rgb.forEach((color, i) => {
    var slider = d3
      .sliderBottom()
      .min(0)
      .max(255)
      .step(1)
      .width(300)
      .ticks(0)
      .default(rgb[i])
      .displayValue(false)
      .fill(colors[i])
      .handle(
        d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
      )
      .on('onchange', num => {
        rgb[i] = num;
        blob.style.fill = `#${num2hex(rgb)}`;
      });

    gColorPicker
      .append('g')
      .attr('transform', `translate(30,${60 * i})`)
      .call(slider);
  });
  

//////////////////////////////////
// this controls the BLOB SHAPE //
//////////////////////////////////

var data = [.8, .9, 1.0, 1.1, 1.2];
var shapeVar
var gShapePicker = d3
    .sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat(d3.format('.0%'))
    .ticks(5)
    .default(1.0)
    .handle(
        d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
    )
    .on('onchange', val => {
        shapeVar = val;

        var blobPath = "M100.2,-72.7" + "C128.7,-8.3,150.1,45.3," + (132.2*shapeVar) + "," + (103.7*shapeVar) + "C114.3,162,57.2,225," + (-13.1*shapeVar) + "," + (232.6*shapeVar) + "C-83.4,240.2,-166.9,192.3," + (-207.6*shapeVar) + "," + (120.8*shapeVar) + "C-248.3,49.3,-246.2,-45.8," + (-204.5*shapeVar) + "," + (-117.7*shapeVar) + "C-162.8,-189.7,-81.4,-238.3," + (-22.8*shapeVar) + "," + (-225.2*shapeVar) + "C35.8,-212,71.6,-137,100.2,-72.7Z";

        console.log("shape slider moved, shapeVar is " + shapeVar);
        blob.setAttribute("d", blobPath);
    });

var gShape = d3
    .select('div#slider-shape-picker')
    .append('svg')
    .attr('width', 375)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(60,50)');

gShape.call(gShapePicker);

d3.select('p#value-shape').text(d3.format('.0%')(gShapePicker.value()));

//////////////////////////////////////
// this controls the STICKER DRAWER //
//////////////////////////////////////

// function allowDrop(ev) {
//     ev.preventDefault();
//   }
  
//   function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
//   }
  
//   function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
//     document.getElementById(data).style.top = (ev.target.offsetTop - ev.clientY) + "px";
//     document.getElementById(data).style.left = (ev.target.offsetLeft - ev.clientX) + "px";
//   }


// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrict({
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      }),
    ],
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '#yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,
  
    // listen for drop related events:
  
    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget;
      var dropzoneElement = event.target;
  
      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target')
      draggableElement.classList.add('can-drop')
      draggableElement.textContent = 'Dragged in'
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')
      event.relatedTarget.textContent = 'Dragged out'
    },
    ondrop: function (event) {
      event.relatedTarget.textContent = 'Dropped'
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')
    }
  });
  
  interact('.drag-drop')
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrict({
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        })
      ],
      autoScroll: true,
      // dragMoveListener from the dragging demo above
      onmove: dragMoveListener
    });

//////////////////////////////////////////
// this controls the NAVIGATION BUTTONS //
//////////////////////////////////////////

navShape.addEventListener("click", () => {
    if (navColor.style.display === "none") {
        navColor.style.display = "block";
    } else {
        navColor.style.display = "none";
    };

    if (navSticker.style.display === "none") {
        navSticker.style.display = "block";
    } else {
        navSticker.style.display = "none";
    };

    if (navSave.style.display === "none") {
        navSave.style.display = "block";
    } else {
        navSave.style.display = "none";
    };

    if (shapeSlider.style.display === "block") {
        shapeSlider.style.display = "none";
    } else {
        shapeSlider.style.display = "block";
    };

    console.log("shape icon was clicked");
    
});

navColor.addEventListener("click", () => {
    if (navShape.style.display === "none") {
        navShape.style.display = "block";
    } else {
        navShape.style.display = "none";
    };

    if (navSticker.style.display === "none") {
        navSticker.style.display = "block";
    } else {
        navSticker.style.display = "none";
    };

    if (navSave.style.display === "none") {
        navSave.style.display = "block";
    } else {
        navSave.style.display = "none";
    };

    if (colorSlider.style.display === "block") {
        colorSlider.style.display = "none";
    } else {
        colorSlider.style.display = "block";
    };

    console.log("color icon was clicked");
    
});

navSticker.addEventListener("click", () => {
    if (navColor.style.display === "none") {
        navColor.style.display = "block";
    } else {
        navColor.style.display = "none";
    };

    if (navShape.style.display === "none") {
        navShape.style.display = "block";
    } else {
        navShape.style.display = "none";
    };

    if (navSave.style.display === "none") {
        navSave.style.display = "block";
    } else {
        navSave.style.display = "none";
    };

    if (stickerDrawer.style.display === "block") {
        stickerDrawer.style.display = "none";
    } else {
        stickerDrawer.style.display = "block";
    };

    console.log("sticker icon was clicked");
    
});

console.log("Not game over yet.");