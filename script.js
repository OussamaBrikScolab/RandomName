var data = {};
var firstNames=[
  "Karl",
  "Hans",
  "Jacob"
]
var lastNames=[
  "Karlsson",
  "Drageborg",
  "Iversen"
]

var randomName = function(){
  var f = data.f[Math.floor(Math.random()*data.f.length)];
  var l = data.l[Math.floor(Math.random()*data.l.length)];
  var output = f+" "+l;
  return output;
}

$(function(){
  
  if(localStorage.nameGenerator){
    data = JSON.parse(localStorage.nameGenerator);
    lastNames = data.l;
    firstNames = data.f;
     
  }else{
    data.f = [].concat(firstNames);
    data.l = [].concat(lastNames);
  }
  
  
  _.each(lastNames, function(name){
    addLastNameToDOM(name);
  },this)
  
  _.each(firstNames, function(name){
    addFirstNameToDOM(name);
  },this)
  
  function addLastNameToDOM(name){
    addNameToDOM("#lastNames .namelist", name, "l");
  }
  function addFirstNameToDOM(name){
    addNameToDOM("#firstNames .namelist", name, "f");
  }
  function addNameToDOM(selector, name, arr){
    var tmpl = $("<span>"+name+"</span>").prependTo($(selector));
    var arr = arr;
    tmpl.click(function(){
      $(this).remove();
      data[arr] = _.without(data[arr], name);
      localStorage.nameGenerator = JSON.stringify(data);
    })
  }

  $("#generate").click(function(){
    $("#name").html(randomName);  
  })
  $("#name").html(randomName);
  
  $("#addName").click(function(){
    var f = $("#addFirstName").val();
    var l = $("#addLastName").val();
    
    if(l.length>0){
      $("#addLastName").val("");
      data.l.push(l);
      addLastNameToDOM(l);
      
    }
    if(f.length>0){
      $("#addFirstName").val("");
      data.f.push(f);
      addFirstNameToDOM(f)
    }
    localStorage.nameGenerator = JSON.stringify(data);
  })
})