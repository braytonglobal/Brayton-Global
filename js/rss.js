$(document).ready(()=>{
var sliderInit =()=>{$('.itemGroup').slick({
  autoplay:true,
  autoplaySpeed: 3000,
  accessibility:true,
  draggable:true,
  // pauseOnDotsHover:true,
  swipe:true,
  zIndex: 1000,
  mobileFirst: true,
  slidesToShow: 1,
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      infinite: true}
  },{
    breakpoint: 713,
    settings:{slidesToShow:2,}
    // settings: "unslick" ,
  }]
})}
var request = new XMLHttpRequest();
request.open("GET", "https://localhost:8000/rss/open-positions", true);
request.responseType = 'document';
request.overrideMimeType('text/xml');
request.onprogress = () => {
  $("<div class='lds-hourglass'></div>").appendTo(".itemGroup:first-of-type")
}

request.onload = function () {
  if (request.readyState === request.DONE) {
    if (request.status === 200) {
      $(".itemGroup:first-of-type").html('')
      var xml = request.responseXML;
      console.log(xml)
      var itemGroup = xml.getElementsByTagName("item")
      $.each(itemGroup,(i)=>{
        if(i===itemGroup.length-1){
          return;
        }
        var position = itemGroup[i].getElementsByTagName('position')[0].innerHTML
        $("<div class='item'><h3>"+position+"</h3></div>").appendTo(".itemGroup:first-of-type")

        var reference = itemGroup[i].getElementsByTagName('reference')[0].innerHTML
        $('.itemGroup:first-of-type .item')[i].innerHTML+="<p><span>reference</span> : " +reference+"</p>"

    
        $('.itemGroup:first-of-type .item')[i].innerHTML+="<p><span>position</span> : " +position+"</p>"

        if(itemGroup[i].getElementsByTagName('languages').length){
          var languages = itemGroup[i].getElementsByTagName('languages')[0].innerHTML
          $('.itemGroup:first-of-type .item')[i].innerHTML+="<p><span>languages</span> : " +languages+"</p>"
        }
        if((itemGroup[i].getElementsByTagName('location')).length){
          var loaction = itemGroup[i].getElementsByTagName('location')[0].innerHTML
          $('.itemGroup:first-of-type .item')[i].innerHTML+="<p><span>location</span> : " +loaction+"</p>"
        }
        if((itemGroup[i].getElementsByTagName('deadline').length)){
          var deadline = itemGroup[i].getElementsByTagName('deadline')[0].innerHTML
          $('.itemGroup:first-of-type .item')[i].innerHTML+="<p><span>deadline</span> : " +deadline+"</p>"
        } 
       const emailAddress = "cv@braytonglobal.com"
       const mailBody = `Dear Brayton Global,
       %0D%0A
       %0D%0AI want to submit a candidacy for the position ${position}. 
       %0D%0A
       %0D%0APlease find my resume attached. (Please add your resume)
       %0D%0A
       %0D%0AHere are my coordinates: (Please fill your coordinates)
       %0D%0A
       %0D%0AKind regards,`
  
      $('.itemGroup:first-of-type .item')[i].innerHTML+=`<a class="positionMailto" href="mailto:${emailAddress}?subject=${reference} ${position}&body=${mailBody}">Apply Now</a>`
        
      })
          var footnote = itemGroup[itemGroup.length-1].getElementsByTagName('footnote')[0].innerHTML
          $('.itemGroup:first-of-type').after("<p>"+footnote+"</p>")
          sliderInit()
    }
  }
}

/*
request.onload = function () {
  if (request.readyState === request.DONE) {
    if (request.status === 200) {
      $(".itemTable:first-of-type").html('')
      var xml = request.responseXML;
      console.log(xml)
      var itemTable = xml.getElementsByTagName("item")
      var htmlOk = ` 
  <thead>
      <tr>
          <th>Postion</th>
          <th>Reference</th>
          <th>Languages</th>
          <th>Loacation</th>
          <th>Deadline</th>
          <th></th>
         </tr>
  </thead>
 <tbody id="bd"></tbody>
`
      $(htmlOk).appendTo(".itemTable:first-of-type")
      $.each(itemTable,(i)=>{
        if(i===itemTable.length-1){
          return;
        }
  
        $("<tr class='itemTr'>  </tr>").appendTo(".itemTable:first-of-type #bd")

        var position = itemTable[i].getElementsByTagName('position')[0].innerHTML
        $('.itemTable:first-of-type #bd .itemTr')[i].innerHTML+="<td>"+position+"</td>"

        var reference = itemTable[i].getElementsByTagName('reference')[0].innerHTML
        $('.itemTable:first-of-type #bd .itemTr')[i].innerHTML+="<td>"+reference+"</td>"
        
        var exists = itemTable[i].getElementsByTagName('languages').length 
        var languages = exists ? itemTable[i].getElementsByTagName('languages')[0].innerHTML : "/"
        $('.itemTable:first-of-type #bd .itemTr')[i].innerHTML+="<td>" +languages+"</td>"
 
        exists = itemTable[i].getElementsByTagName('location').length
        var location = exists ? itemTable[i].getElementsByTagName('location')[0].innerHTML : "/"
        $('.itemTable:first-of-type #bd .itemTr')[i].innerHTML+="<td>" +location+"</td>"
       
        exists = itemTable[i].getElementsByTagName('deadline').length
        var deadline = exists ? itemTable[i].getElementsByTagName('deadline')[0].innerHTML : "/"
        $('.itemTable:first-of-type #bd .itemTr')[i].innerHTML+="<td>"+deadline+"</td>"
       
       const emailAddress = "cv@braytonglobal.com"
       const mailBody = `Dear Brayton Global,
       %0D%0A
       %0D%0AI want to submit a candidacy for the position ${position}. 
       %0D%0A
       %0D%0APlease find my resume attached. (Please add your resume)
       %0D%0A
       %0D%0AHere are my coordinates: (Please fill your coordinates)
       %0D%0A
       %0D%0AKind regards,`
      $('.itemTable:first-of-type #bd .itemTr')[i].innerHTML+=`<td><a class="positionMailto2" href="mailto:${emailAddress}?subject=${reference}-${position}&body=${mailBody}">Apply Now</a></td>`
        
      });
         var footnote = itemTable[itemTable.length-1].getElementsByTagName('footnote')[0].innerHTML
          $('.itemTable:first-of-type').after("<p>"+footnote+"</p>")
    $("#positionsTable").DataTable({
      info:false,
      pageLength:5,
      lengthChange:false,
    })
    }
  }
  }*/
request.send(null); 

})
