
var blob = document.getElementById('blob');

var navColor = document.getElementById('color');
var navShape = document.getElementById('shape');
var navSticker = document.getElementById('sticker');
var navSave = document.getElementById('save');

var colorSlider = document.getElementById('slider-color-picker');
var shapeSlider = document.getElementById('slider-shape-picker');

//////////////////////////////////
// this controls the BLOB COLOR //
//////////////////////////////////

// ------>>> Color picker

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
    .attr('width', 600)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(30,30)');

  var box = gColorPicker
    .append('rect')
    .attr('width', 100)
    .attr('height', 100)
    .attr('transform', 'translate(400,0)')
    .attr('fill', `#${num2hex(rgb)}`);

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
        box.attr('fill', `#${num2hex(rgb)}`);
        d3.select('p#value-color-picker').text(`#${num2hex(rgb)}`);
        blob.style.fill = `#${num2hex(rgb)}`;
      });

    gColorPicker
      .append('g')
      .attr('transform', `translate(30,${60 * i})`)
      .call(slider);
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

////////////////////////////////////
// this controls the SHAPE SLIDER //
////////////////////////////////////

// var data = [.8, .9, 1.0, 1.1, 1.2];
// var shapeVar
// var shapeSlider = d3
//     .sliderBottom()
//     .min(d3.min(data))
//     .max(d3.max(data))
//     .width(300)
//     .tickFormat(d3.format('.0%'))
//     .ticks(5)
//     .default(1.0)
//     .handle(
//         d3
//             .symbol()
//             .type(d3.symbolCircle)
//             .size(200)()
//     )
//     .on('onchange', val => {
//         shapeVar = val;

//         var blobPath = "M100.2,-72.7" + "C128.7,-8.3,150.1,45.3," + (132.2*shapeVar) + "," + (103.7*shapeVar) + "C114.3,162,57.2,225," + (-13.1*shapeVar) + "," + (232.6*shapeVar) + "C-83.4,240.2,-166.9,192.3," + (-207.6*shapeVar) + "," + (120.8*shapeVar) + "C-248.3,49.3,-246.2,-45.8," + (-204.5*shapeVar) + "," + (-117.7*shapeVar) + "C-162.8,-189.7,-81.4,-238.3," + (-22.8*shapeVar) + "," + (-225.2*shapeVar) + "C35.8,-212,71.6,-137,100.2,-72.7Z";

//         console.log("shape slider moved, shapeVar is " + shapeVar);
//         blob.setAttribute("d", blobPath);
//     });

// var gShape = d3
//     .select('div#slider-shape')
//     .append('svg')
//     .attr('width', 375)
//     .attr('height', 100)
//     .append('g')
//     .attr('transform', 'translate(60,50)');

// gShape.call(shapeSlider);

// d3.select('p#value-shape').text(d3.format('.0%')(shapeSlider.value()));

// ////////////////////////////////////////////////
// // this controls the inline blob SHAPE BUTTON //
// ////////////////////////////////////////////////

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

// navShape.addEventListener("click", () => {
//     var x = Math.floor(Math.random() * 40);
//     var y = Math.floor(Math.random() * 40);

//     var blobPath = "M100.2,-72.7" + "C128.7,-8.3,150.1,45.3," + (132.2*shapeVar) + "," + (103.7 + y) + "C114.3,162,57.2,225,-13.1," + (232.6 + y) + "C-83.4,240.2,-166.9,192.3,-207.6," + (120.8+y) + "C-248.3,49.3,-246.2,-45.8,-204.5,-117.7C-162.8,-189.7,-81.4,-238.3,-22.8, -225.2C35.8,-212,71.6,-137,100.2,-72.7Z";

//     console.log("shape button clicked, shapeVar is " + shapeVar);
//     blob.setAttribute("d", blobPath);
// });


console.log("Not game over yet.");