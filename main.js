// import blobs from "blobs";

var navColor = document.getElementById('color');
var navShape = document.getElementById('shape');
var navSticker = document.getElementById('sticker');
var navSave = document.getElementById('save');

var colorSlider = document.getElementById('slider-color-picker');
var shapeSlider = document.getElementById('slider-shape-picker');
var stickerDrawer = document.getElementById('sticker-picker');

//////////////////////////////////
// this creates the BLOB  //
//////////////////////////////////

var size = 375;
var complexity = 0.1;
var contrast = 0.1;
var blobColor = "#7bdcb5";

var options = '{size: ' + size + ', complexity: ' + complexity + ', contrast: ' + contrast + ', color: "' + blobColor + '", stroke: { width: 0, color: "black",}, guides: false, seed: "1234",}';

var parsedOptions = eval("(" + options + ")");
var svg = blobs(parsedOptions);   

mood.innerHTML = svg;

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

  var rgb = [123, 220, 181];
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
        blobColor = `#${num2hex(rgb)}`;

        options = '{size: ' + size + ', complexity: ' + complexity + ', contrast: ' + contrast + ', color: "' + blobColor + '", stroke: { width: 0, color: "black",}, guides: false, seed: "1234",}';

        parsedOptions = eval("(" + options + ")");
        svg = blobs(parsedOptions);   
        
        mood.innerHTML = svg;

        console.log("color slider moved, color is now " + blobColor);
      });

    gColorPicker
      .append('g')
      .attr('transform', `translate(30,${60 * i})`)
      .call(slider);
  });
  

//////////////////////////////////
// this controls the COMPLEXITY //
//////////////////////////////////

var complexityData = [0, 1];
var gComplexityPicker = d3
    .sliderBottom()
    .min(d3.min(complexityData))
    .max(d3.max(complexityData))
    .width(300)
    .ticks(0)
    .default(0.1)
    .handle(
        d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
    )
    .on('onchange', val => {
        complexity = val;

        options = '{size: ' + size + ', complexity: ' + complexity + ', contrast: ' + contrast + ', color: "' + blobColor + '", stroke: { width: 0, color: "black",}, guides: false, seed: "1234",}';

        parsedOptions = eval("(" + options + ")");
        svg = blobs(parsedOptions);   
        
        mood.innerHTML = svg;

        console.log("complexity slider moved, it is now " + val);
    });

var gComplexity = d3
    .select('div#slider-shape-picker')
    .append('svg')
    .attr('width', 375)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(60,50)');

gComplexity.call(gComplexityPicker);

//////////////////////////////////
// this controls the CONTRAST //
//////////////////////////////////

var contrastData = [0, 1];
var gContrastPicker = d3
    .sliderBottom()
    .min(d3.min(contrastData))
    .max(d3.max(contrastData))
    .width(300)
    .ticks(0)
    .default(0.1)
    .handle(
        d3
            .symbol()
            .type(d3.symbolCircle)
            .size(200)()
    )
    .on('onchange', val => {
        contrast = val;

        options = '{size: ' + size + ', complexity: ' + complexity + ', contrast: ' + contrast + ', color: "' + blobColor + '", stroke: { width: 0, color: "black",}, guides: false, seed: "1234",}';

        parsedOptions = eval("(" + options + ")");
        svg = blobs(parsedOptions);   
        
        mood.innerHTML = svg;

        console.log("contrast slider moved, it is now " + val);
    });

var gContrast = d3
    .select('div#slider-shape-picker')
    .append('svg')
    .attr('width', 375)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(60,50)');

    gContrast.call(gContrastPicker);


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
//   }


// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
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
    accept: '.draggable',
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
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')
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