var id_bbox;
var datasetCharnoff=undefined;
d3.json('dataset/data.json').then(function(data) {
    datasetCharnoff=data;
    createTable(data);
    createFace(data);
    scalaFaccie(data);
 });
var columns = [
      'barba', 
      'capelli',  
      'baffi',  
      'occhi'];

// Create table parte 2
var createTable = function(dati){
    var table=d3.select('body').select('table');
    var thead = table.append("thead").append("tr");
    var tbody = table.append("tbody");
    // append the header row
    thead.selectAll("th").data(columns).enter().append("th").attr("class","text-center").text(function(d) {return d;});
    // create a row for each object in the data
    var rows = tbody.selectAll('tr').data(dati).enter().append('tr');
    var cells = rows.selectAll('td').data(function(row) {
      return columns.map(function(column) {
        return {
          column: column,
          value: row[column]
        };
      });
    }).enter().append('td').attr("class","text-center").html(function(d) {
      return d.value;
    });
}

var createFace = function(dati){
  var i = 0;
  var face="face";
  dati.forEach(function(item){
    putFace(face.concat(i), item);
    i=i+1;
  })
}

function putFace(id, item){
  d3.xml('resources/svg/volto3.svg')
        .then(data => {
            d3.select('body').select('#divCont').append('div').attr("id",id).attr("class", "float-left").node().append(data.documentElement);
    
  });

} 

var scalaFaccie= function(data){
  var i=0;
  var face="face";
  datasetCharnoff.forEach(function(item){
    scale(face.concat(i),item);
    i=i+1;
  });

}

function scale(id,item){
  d3.select('#'.concat(id)).selectAll('path').transition().duration(2000).attrTween("transform", function(d, i, a) {
    var bbox = this.getBBox();
    var y = item[this.id]/10;

    if(this.id=='sopraccigliaSx'||this.id=='occhioSx'||this.id=='sopraccigliaDx'||this.id=='occhioDx'){
      y= item['occhi']/10;
      var x=y;
      return d3.interpolateString(a, 'scale('.concat(x).concat(', ').concat(y).concat(')'));
    }else{
      x=y;
      return d3.interpolateString(a, 'scale('.concat(x).concat(', ').concat(y).concat(')'));
    }
});
} 



/******************************************************************************************************************** */
/*
function getSvgOffsetToCenterPoint( pointX, svgWidth, svgScale ) {
  var initialPositionScaled = svgScale * pointX;
  var desiredPosition = svgWidth / 2;
  return desiredPosition - initialPositionScaled;
}


function centraFaccie(){
  var i=0;
  var face="face";
  datasetCharnoff.forEach(function(item){
    centra(face.concat(i),item);
    i=i+1;
  });

}

function centra(id){
  d3.select('#'.concat(id)).selectAll('path').transition().duration(2000).attrTween("transform", function(d, i, a) {
    var bbox = this.getBBox();
    var trasformazioniPre= this.getAttribute('transform');
    console.log(this.id+"  "+bbox.width);
    var centreX =  bbox.width/2;
    var scala= trasformazioniPre.replace("scale(", "").replace(")","");
    var centreTraslato = getSvgOffsetToCenterPoint(centreX,141, scala)+bbox.width*scala;
    transforms= trasformazioniPre.concat(', translate( ')
    return    d3.interpolateString(a,   transforms + centreTraslato + ")");
});
} 

function centra1(id){
  d3.select('#'.concat(id)).selectAll('path').transition().duration(2000).attrTween("transform", function(d, i, a) {
    var bbox = this.getBBox();
    var trasformazioniPre= this.getAttribute('transform');
    console.log(this.id+"  "+bbox.width);
    var centreX =  (141-bbox.width)/2;
    var centreY = 0; //bbox.y + bbox.height/2;
    transforms= trasformazioniPre.concat(', translate( ')
    return    d3.interpolateString(a,   transforms + centreX + "," + centreY + ")");
});
} 


function centra2(id){
  var path= d3.select('#'.concat(id)).selectAll('path');
  var bbox = path.getBBox();
  var centreX = bbox.x + bbox.width/2;
  var centreY = bbox.y + bbox.height/2;
  path.attr("transform", "translate(" + centreX + "," + centreY + ")");
} 



 function putElementFace(item, i){
  console.log(item);
  d3.select('body').select('#contentDiv').append('div').attr("id",i).attr("class", "float-left");
  putEle(i, "CAPELLI");
  //modifyEle(item, i,"CAPELLI");
  putEle(i, "OCCHI");
  //modifyEle(item, i,"OCCHI");
  putEle(i, "BAFFI");
  //modifyEle(item, i,"BAFFI");
  putEle(i, "BARBA");
  modifyEle(item, i, "BARBA");
}

function putEle(id, svgName ){
  d3.xml('resources/svg/1_'.concat(svgName).concat('.svg'))
  .then(data => {
    //d3.select('body').select('#contentDiv').select(id).append(data.documentElement);
    document.getElementById(id).appendChild(data.documentElement);
  });

}
function modifyEle(faccia,idFaccia,idElemento){
  d3.select("contentDiv.".concat(idFaccia).concat(".").concat(idElemento)).attr("transform",  "scale(".concat(faccia[idElemento]).concat(")"));
}
 */

/* function getConteiner(idConteiner){
  return d3.select('body').select(('#').concat(idConteiner)).select('svg');
}
*/



