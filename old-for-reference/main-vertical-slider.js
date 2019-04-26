
// this controls the d3js svg

// var magicBlobColor = "#7bdcb5"

// var svgContainer = d3.select("div").append("svg")
// .attr("width", 600)
// .attr("height", 600)
// .attr("viewBox", "0 0 600 600");

// var magicBlob = svgContainer.append("g")
// .attr("transform","translate(300,300)");

// var magicBlobPath = magicBlob.append("path")
// .attr("d", "M 134.3,-82 C 181.6,-47.8,232.7,8.5,224.6,54.2 C 216.5,99.9,149.2,135.1,86.2,157 C 23.1,179,-35.7,187.7,-88.9,168.3 C -142,149,-189.5,101.5,-205,43.8 C -220.5,-13.8,-204.1,-81.7,-164.6,-114.1 C -125.1,-146.4,-62.5,-143.2,-9.5,-135.6 C 43.5,-128,87,-116.1,134.3,-82 Z")
// .attr("fill", magicBlobColor);




// // This is not working yet
// var changeColor = document.getElementById('changeColor');
// changeColor.addEventListener("click", () => {
//     var r = Math.floor(Math.random() * 255);
//     var g = Math.floor(Math.random() * 255);
//     var b = Math.floor(Math.random() * 255);
//     console.log("magic blob color button was clicked");
//     // magicBlobColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
//     magicBlob.style.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
// });




// this controls the inline blob COLOR

var blob = document.getElementById('blob');
var buttonColor = document.getElementById('color');
var buttonShape = document.getElementById('shape');

blob.addEventListener("click", () => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    console.log("blob was clicked");
    blob.style.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
});

buttonColor.addEventListener("click", () => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    console.log("color button was clicked");
    blob.style.fill = 'rgb(' + r + ', ' + g + ', ' + b + ')';
});

// this controls the inline blob SHAPE SLIDER
var data = [.8, .9, 1.0, 1.1, 1.2];
var shapeVar
var shapeSlider = d3
    .sliderLeft()
    .min(d3.min(data))
    .max(d3.max(data))
    .height(300)
    .width(300)
    .tickFormat(d3.format('.0%'))
    .ticks(5)
    .default(1.0)
    .on('onchange', val => {
        d3.select('p#value-shape').text(d3.format('.0%')(val));
        shapeVar = val;

        var blobPath = "M100.2,-72.7" + "C128.7,-8.3,150.1,45.3," + (132.2*shapeVar) + "," + (103.7*shapeVar) + "C114.3,162,57.2,225," + (-13.1*shapeVar) + "," + (232.6*shapeVar) + "C-83.4,240.2,-166.9,192.3," + (-207.6*shapeVar) + "," + (120.8*shapeVar) + "C-248.3,49.3,-246.2,-45.8," + (-204.5*shapeVar) + "," + (-117.7*shapeVar) + "C-162.8,-189.7,-81.4,-238.3," + (-22.8*shapeVar) + "," + (-225.2*shapeVar) + "C35.8,-212,71.6,-137,100.2,-72.7Z";

        console.log("slider moved, shapeVar is " + shapeVar);
        blob.setAttribute("d", blobPath);
    });

var gShape = d3
    .select('div#slider-shape')
    .append('svg')
    .attr('width', 200)
    .attr('height', 400)
    .append('g')
    .attr('transform', 'translate(60,50)');

gShape.call(shapeSlider);

d3.select('p#value-shape').text(d3.format('.0%')(shapeSlider.value()));


// this controls the inline blob SHAPE BUTTON

buttonShape.addEventListener("click", () => {
    var x = Math.floor(Math.random() * 40);
    var y = Math.floor(Math.random() * 40);

    var blobPath = "M100.2,-72.7" + "C128.7,-8.3,150.1,45.3," + (132.2*shapeVar) + "," + (103.7 + y) + "C114.3,162,57.2,225,-13.1," + (232.6 + y) + "C-83.4,240.2,-166.9,192.3,-207.6," + (120.8+y) + "C-248.3,49.3,-246.2,-45.8,-204.5,-117.7C-162.8,-189.7,-81.4,-238.3,-22.8, -225.2C35.8,-212,71.6,-137,100.2,-72.7Z";

    console.log("shape button clicked, shapeVar is " + shapeVar);
    blob.setAttribute("d", blobPath);
});


console.log("Not game over yet.");