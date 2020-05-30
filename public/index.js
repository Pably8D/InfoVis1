var width = d3.select("body").node().getBoundingClientRect().width / 10;
var height = 140;
var datasetCharnoff = undefined;
var div = undefined;
var xposition = undefined;
var rangeFace = undefined;
var rangeEyes = undefined;
var rangeNouse = undefined;
var rangeMouth = undefined;
datiMaxMin = [
    {
        "num": 0,
        "bocca": 0,
        "faccia": 0,
        "naso": 0,
        "sopracciglia":0
    },
    {
        "num": 100,
        "bocca": 100,
        "faccia": 100,
        "naso": 100,
        "sopracciglia": 100
    }

];
var columns = [
    'faccia',
    'naso',
    'sopracciglia',
    'bocca' 
];

d3.json('dataset/data.json').then(function (data) {

    datasetCharnoff = data;
    createTable(data);
    createFaces(data);
    createDescription();
});



// Create table parte 2
var createTable = function (dati) {
    div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var table = d3.select('body').select('table');
    var thead = table.append("thead").append("tr");
    var tbody = table.append("tbody");
    // append the header row
    thead.selectAll("th").data(columns).enter().append("th").attr("class", "text-center").text(function (d) { return d; });
    // create a row for each object in the data
    var rows = tbody.selectAll('tr').data(dati).enter().append('tr');
    var cells = rows.selectAll('td').data(function (row) {
        return columns.map(function (column) {
            return {
                column: column,
                value: row[column]
            };
        });
    }).enter().append('td').attr("class", "text-center").html(function (d) {
        return d.value;
    });
}

function createDescription() {
    var xposizione = d3.scaleLinear().domain([0,3]).range([0,d3.select("#descFacce").node().getBoundingClientRect().width]);
    var yposizione = d3.scaleLinear().domain([0,6]).range([0,d3.select("#descFacce").node().getBoundingClientRect().height]);
    var col=1;
   insertText(xposizione, yposizione);
    datiMaxMin.forEach(function (item) {
        var riga=0.5;
        description4Face(item, riga, col, xposizione, yposizione);
        riga=riga+1;
        description4Nose(item, riga, col, xposizione, yposizione);
        riga=riga+1;
        description4Eye(item, riga, col, xposizione, yposizione);
        riga=riga+1;
        description4Mouth(item, riga, col, xposizione, yposizione)
        col=col+1 ;
    });
}
function insertText(xposizione, yposizione) {
    var rigaText=0;
    var colText=1;
    columns.forEach(function(item){
        var textLabels = d3.select('#descFacce').append('text').attr("x",50)
        .attr("y", 30 )
        .attr("id", item.concat("Text"))
        .text(item)
        .attr("font-family", "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\"")
        .attr("font-size", "16px")
        .attr("fill", "#212529")
        .attr("font-weight", "750");

        var pathTransition = textLabels.transition();
        var translate = 'translate('+xposizione(rigaText)+', '+yposizione(colText)+')';
        pathTransition.attr("transform", translate).duration(0);
        colText=colText+1;
    });
    var textMinLabels = d3.select('#descFacce').append('text').attr("x",60)
        .attr("y", 30 )
        .text("Min")
        .attr("font-family", "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\"")
        .attr("font-size", "16px")
        .attr("fill", "#212529")
        .attr("font-weight", "750");
    textMinLabels.transition().attr("transform", 'translate('+xposizione(1)+', '+yposizione(0)+')').duration(0);
    var textMaxLabels = d3.select('#descFacce').append('text').attr("x",60)
        .attr("y", 30 )
        .text("Max")
        .attr("font-family", "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\"")
        .attr("font-size", "16px")
        .attr("fill", "#212529")
        .attr("font-weight", "750");
    textMaxLabels.transition().attr("transform", 'translate('+xposizione(2)+', '+yposizione(0)+')').duration(0);

}

function description4Face(item, riga,col, xposizione, yposizione){
    
    var face = d3.select('#descFacce').append('g').attr('width',face_x).attr('height',face_y);
    var id= 'faceD'.concat(item.num);
    createFace(face, face_x, face_y, item, id);
    var pathTransition = face.transition();
    var translate = 'translate('+xposizione(col)+', '+yposizione(riga)+')';
    pathTransition.attr("transform", translate).duration(0);
}
function description4Eye(item, riga, col, xposizione, yposizione){

    var face = d3.select('#descFacce').append('g').attr('width',face_x).attr('height',face_y);
    var id= 'eyesD'.concat(item.num);
    createEye(face, face_x, face_y, item, id);
    var pathTransition = face.transition();
    var translate = 'translate('+xposizione(col)+', '+yposizione(riga)+')';
    pathTransition.attr("transform", translate).duration(0);
}
function description4Nose(item, riga, col, xposizione, yposizione){
    
    var face = d3.select('#descFacce').append('g').attr('width',face_x).attr('height',face_y);
    var id= 'faceD'.concat(item.num);
    createNose(face, face_x, face_y, item, id);
    var pathTransition = face.transition();
    var translate = 'translate('+xposizione(col)+', '+yposizione(riga)+')';
    pathTransition.attr("transform", translate).duration(0);
}
function description4Mouth(item, riga,col, xposizione, yposizione){
    
    var face = d3.select('#descFacce').append('g').attr('width',face_x).attr('height',face_y);
    var id= 'faceD'.concat(item.num);
    createMouth(face, face_x, face_y, item, id);
    var pathTransition = face.transition();
    var translate = 'translate('+xposizione(col)+', '+yposizione(riga)+')';
    pathTransition.attr("transform", translate).duration(0);
}

function createFaces(dati) {
    xposition = d3.scaleLinear().domain([1, 11]).range([0, d3.select("#tutteLeFacce").node().getBoundingClientRect().width]);
    var i = 1;
    var face = "face";
    dati.forEach(function (item) {
        putFace(face.concat(i), item, xposition);
        i = i + 1;
    });
}

function putFace(id, item, xposition) {
    //Creo svg della faccia
    var face = d3.select('#tutteLeFacce').append('g');
    face.attr('id', "svg".concat(id)).attr("class", "float-left");
    face_x = width;
    face_y = height;
    //Creo la forma del viso
    createFace(face, face_x, face_y, item, id);
    //Creo gli occhi e sopracciglia
    createEye(face, face_x, face_y, item, id);
    //Creo il naso
    createNose(face, face_x, face_y, item, id);
    //Creo la bocca
    createMouth(face, face_x, face_y, item, id);

    face.attr("transform", 'translate('.concat(xposition(item.num)).concat(')'));
}

function createFace(face, face_x, face_y, item, id) {
    rangeFace = d3.scaleLinear().domain([0, 100]).range([-5, 10]);
    face.append('ellipse')
        .attr('cx', (face_x / 2)) //centro l'ellissi del viso nel rispettivo svg face
        .attr('cy', face_y / 2)
        .attr('rx', 50 + rangeFace(item.faccia)) // questo valore modifica la larghezza del viso
        .attr('ry', 60) //questo valore modifica l'altezza del viso
        .attr('style', 'fill:none;stroke:black;stroke-width:2')
        .attr('id', id.concat('faccia')).attr('elemento', 'faccia').attr('valore', item.faccia).on('click', sortBy)
        .on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
}

function createEye(face, face_x, face_y, item, id) {
    rangeEyes = d3.scaleLinear().domain([0, 100]).range([-8, 7]);
    // Calcolo i valori per poter inserire l'occhio nel viso
    reye_x = (face_x / 3); //punto di partenza dell' occhio destro della faccia
    leye_x = (face_x / 1.5); //punto di partenza dell' occhio sinistro
    eye_y = face_y / 2.3; //altezza dell' occhio, ovviamente uguale per entrambi
    eye_width = 12; //larghezza dell' occhio
    eye_height = 8; //altezza dell' occhio

    //Creo occhio destro
    face.append('ellipse')
        .attr('cx', reye_x)// centro x dell'elisse 
        .attr('cy', eye_y)// centro y dell'elisse 
        .attr('rx', eye_width)// raggio
        .attr('ry', eye_height)
        .attr('style', 'fill:none;stroke:black;stroke-width:2');

    face.append('circle')
        .attr('cx', reye_x)
        .attr('cy', eye_y)
        .attr('r', 3);

    //Create occhio sinistro
    face.append('ellipse')
        .attr('cx', leye_x)
        .attr('cy', eye_y)
        .attr('rx', eye_width)
        .attr('ry', eye_height)
        .attr('style', 'fill:none;stroke:black;stroke-width:2');

    face.append('circle')
        .attr('cx', leye_x)
        .attr('cy', eye_y)
        .attr('r', 3);

    //brow_y indica le alzette delle sopracciglia, all'inizio non sono inclinate ma nel momento in qui sottraggo e aggiundo il valore del dataset le inclino
    brow_y_start = face_y / 3 + rangeEyes(item.sopracciglia);
    brow_y_end = face_y / 3 - rangeEyes(item.sopracciglia);
    rbrow_x_start = reye_x - 10;// dal centro dell'occhio vado a destra o a sinistra
    rbrow_x_end = reye_x + 15;
    lbrow_x_start = leye_x - 15;
    lbrow_x_end = leye_x + 10;

    //creo sopracciglio destro
    //Il sopracciglio destro è una retta quindi gli do le cordinate di partenza e di arrivo
    face.append('path')
        .attr('d', 'M' + rbrow_x_start + ',' + brow_y_start + ' ' + rbrow_x_end + ',' + brow_y_end)
        .attr('style', 'fill:none;stroke:black;stroke-width:2')
        .attr('id', id.concat('sopraccigliadx')).attr('elemento', 'sopracciglia').attr('valore', item.sopracciglia).on('click', sortBy)
        .on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
    //creo sopracciglio sinistro
    face.append('path')
        .attr('d', 'M' + lbrow_x_start + ',' + brow_y_end + ' ' + lbrow_x_end + ',' + brow_y_start)
        .attr('style', 'fill:none;stroke:black;stroke-width:2')
        .attr('id', id.concat('sopraccigliasx')).attr('elemento', 'sopracciglia').attr('valore', item.sopracciglia).on('click', sortBy)
        .on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
}

function createNose(face, face_x, face_y, item, id) {
    rangeNouse = d3.scaleLinear().domain([0, 100]).range([-7, 12]);
    // Calcolo i valori per poter inserire il naso
    //Ho creato un triangolo con angoli smussati
    naso_val = rangeNouse(item.naso);
    face_centre_x = (face_x / 2); //centro del viso (x)
    face_centre_y = face_y / 2; //centro del viso (y)

    vertice_1_x = face_centre_x; //coordinata x del vertice alto del triangolo
    vertice_1_y = face_centre_y - 6; //coordinata y del vertice alto del triangolo
    vertice_1 = 'M' + vertice_1_x + ' ' + vertice_1_y;

    vertice_2_x = face_centre_x - 8 - naso_val; //coordinata x del vertice sinistro del triangolo
    vertice_2_y = face_centre_y + 6; //coordinata y del vertice sinistro del triangolo
    //control point per fare gli angoli smussati
    cp_1_x = vertice_1_x - 5;
    cp_1_y = vertice_1_y;
    cp_2_x = vertice_2_x - 2;
    cp_2_y = vertice_2_y - 3;
    vertice_2 = ' C' + cp_1_x + ' ' + cp_1_y + ' ' + cp_2_x + ' ' + cp_2_y + ' ' + vertice_2_x + ' ' + vertice_2_y;

    vertice_3_x = face_centre_x + 8 + naso_val; //coordinata x del vertice destro del triangolo
    vertice_3_y = vertice_2_y; //coordinata x del vertice destro del triangolo (che è uguale al destro)
    //control point per fare gli angoli smussati
    cp_1_x = vertice_2_x + 2;
    cp_1_y = vertice_2_y + 3;
    cp_2_x = vertice_3_x - 2;
    cp_2_y = vertice_3_y + 3;
    vertice_3 = ' C' + cp_1_x + ' ' + cp_1_y + ' ' + cp_2_x + ' ' + cp_2_y + ' ' + vertice_3_x + ' ' + vertice_3_y;

    //control point per fare gli angoli smussati
    cp_1_x = vertice_3_x + 2;
    cp_1_y = vertice_3_y - 3;
    cp_2_x = vertice_1_x + 5;
    cp_2_y = vertice_1_y;
    vertice_0 = ' C' + cp_1_x + ' ' + cp_1_y + ' ' + cp_2_x + ' ' + cp_2_y + ' ' + vertice_1_x + ' ' + vertice_1_y;

    face.append('path')
        .attr('d', vertice_1 + vertice_2 + vertice_3 + vertice_0)
        .attr('id', id.concat('naso')).attr('elemento', 'naso').attr('valore', item.naso).on('click', sortBy)
        .on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
}

function createMouth(face, face_x, face_y, item, id) {
    rangeMouth = d3.scaleLinear().domain([0, 100]).range([-10, 20]);
    // Calcolo i valori per poter inserire la bocca
    mouth_x_start = (face_x / 2) - 15;
    // mouth_y_start = face_y / 1.65;
    mouth_y_start = face_y / 1.45;
    happy = rangeMouth(item.bocca * 2) //questo paramentro definisce la concavità essendo presente nel dataset valori positivi la bocca sarà sempre concava
    //Create mouth
    face.append('path')
        .attr('d', 'M ' + mouth_x_start + ' ' + mouth_y_start + ' q 15 ' + happy + ' 30 0')
        .attr('style', 'fill:none;stroke:black;stroke-width:2')
        .attr('id', id.concat('bocca')).attr('elemento', 'bocca').attr('valore', item.bocca).on('click', sortBy)
        .on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);

}

function handleMouseOver(d) {
    div.transition()
        .duration(200)
        .style("opacity", .9);
    div.html(this.getAttribute('valore'))
        .style("left", (d3.event.pageX) + "px");
    if (this.getAttribute('elemento') != 'naso')
        div.style("top", (d3.event.pageY - 8) + "px");
    else
        div.style("top", (d3.event.pageY + 8) + "px");
}

function handleMouseOut(d) {
    div.transition()
        .duration(500)
        .style("opacity", 0)
}


function sortBy(d) {
    var orderedFace = undefined;
    if (this.getAttribute('elemento') == 'naso') {
        orderedFace = datasetCharnoff.sort(function (x, y) {
            return d3.ascending(x.naso, y.naso);
        });
    }
    if (this.getAttribute('elemento') == 'bocca') {
        orderedFace = datasetCharnoff.sort(function (x, y) {
            return d3.ascending(x.bocca, y.bocca);
        });
    }
    if (this.getAttribute('elemento') == 'sopracciglia') {
        orderedFace = datasetCharnoff.sort(function (x, y) {
            return d3.ascending(x.sopracciglia, y.sopracciglia);
        });
    }
    if (this.getAttribute('elemento') == 'faccia') {
        orderedFace = datasetCharnoff.sort(function (x, y) {
            return d3.ascending(x.faccia, y.faccia);
        });
    }
    ordersvg(orderedFace, this.getAttribute('elemento'));
}

function ordersvg(orderedFace, idElementSorted) {
    var i = 1;
    orderedFace.forEach(function (item) {
        var pathTransition = d3.select("#svgface".concat(item.num)).transition();
        var translate = 'translate('.concat(xposition(i)).concat(')');
        pathTransition.attr("transform", translate).duration(3000);
        i = i + 1;
    });
    d3.select("#descFacce").selectAll("text").nodes().forEach(function(item){
        item.removeAttribute("text-decoration");
    });
    d3.select("#"+idElementSorted.concat("Text")).attr("text-decoration", "underline");
}

