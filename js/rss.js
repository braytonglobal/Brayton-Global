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
        $("<div class='item'><h3>Position-"+(i+1)+"</h3></div>").appendTo(".itemGroup:first-of-type")

        var reference = itemGroup[i].getElementsByTagName('reference')[0].innerHTML
        $('.itemGroup:first-of-type .item')[i].innerHTML+="<p><span>reference</span> : " +reference+"</p>"

        var position = itemGroup[i].getElementsByTagName('position')[0].innerHTML
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
        
      })
          var footnote = itemGroup[itemGroup.length-1].getElementsByTagName('footnote')[0].innerHTML
          $('.itemGroup:first-of-type').after("<p>"+footnote+"</p>")
          sliderInit()
    }
  }
}
request.send(null); 
})
