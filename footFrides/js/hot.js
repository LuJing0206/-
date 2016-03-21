//swiper插件


//上啦刷新
var num =0;
var myscroll1,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
function pullDownAction () {
		
 setTimeout(function(){
 	   hotLive();
		myscroll1.refresh();
 },1000)
			// Remember to refresh when contents are loaded (ie: on ajax completion)
	// <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		hotLive()
		myscroll1.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;	
	myscroll1 = new iScroll('scroll_warp', {		
		lockDirection:true,
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
			}
		},
		onScrollMove: function () {
			document.title = this.y
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
				num +=8
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';	
				num +=8;
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
//	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}


// 下拉刷新ajax
var thisnum = 0;
function hotLive(){
	var oFtlive = $('#thelist');
	$.ajax({
		type:"get",
		url:"http://localhost:8080/Proxy/FootBall/tweet/json/query/hotspot.do",
		async:true,
		data:{'category':1},
		success:function(data){
			var data = JSON.parse(data);
			var str = data.data.tweetlist;
		  for(var i=num;i<num+8;i++){
		  	 if(num+8>str.length){
		  	 	  if(2*str.length>=(num+8)){
		  	 	   thisnum = num;
		  	 	  	num =thisnum;
		  	 	  	return false
		  	 	  }else{
			  	 	  	for(var i = 2*str.length -(num+8);i<str.length;i++ ){
			  	 	  	  var dl = '<dl><dt><img data-id='+str[i].id+' src="http://101.200.173.217:8080/FootBall'+str[i].defaultFilePath+str[i].thumbnailname+'"/></dt><dd>'+str[i].content+'</dd></dl>';
			  	 	  	  oFtlive.append(dl);
			  	 	  	  dl.onload = function(){
			  	 	  	  	myScroll.refresh();
			  	 	  	  };
			  	 	  }
		  	 	  }  
		  	 }else{
		  	 	 var dl = '<dl><dt><img data-id='+str[i].id+' src="http://101.200.173.217:8080/FootBall'+str[i].defaultFilePath+str[i].thumbnailname+'"/></dt><dd>'+str[i].content+'</dd></dl>';
			  	  oFtlive.append(dl);
			  	   dl.onload = function(){
			  	 	  	  	myScroll.refresh();
			  	 	  	  };
		  	 }
		  }
		  
		}
	});
}
window.addEventListener('load',hotLive,false)
	
//足球生活加载

var myscroll2 ;
  function scroll2(){
  	myscroll2=new iScroll('scroller2');
  }	;
var myscroll3 ;
  function scroll3(){
  	myscroll3=new iScroll('scroller3');
  }	; 
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(scroll2, 200); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(scroll3, 200); }, false);



var currArr= [0,0,0]
$(function(){
var $nav = $('.hot_nav>ul li');
var oFtlife = $('#scroller2_warp');
 var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: false,
    onTransitionStart: function(swiper){
    	var index = swiper.activeIndex     //提示Swiper的当前索引
     $nav.eq(index).addClass('on').siblings().removeClass('on')
    },
   onSlideChangeEnd:function(swiper){
   	  var index = swiper.activeIndex;
   	  $nav.eq(index).addClass('on').siblings().removeClass('on');	
  		comFresh(index)
   }
  });
 
   $nav.on('tap',function(){	
   	var index = $(this).index()
// 	$('.swiper-wrapper').get(0).style.webkitTransition = 'all 0.3s ease-out'
// 	$('.swiper-wrapper').get(0).style.webkitTransform = 'translate3d('+-$(window).width()*$(this).index()+'px'+', 0px, 0px)';
		mySwiper.slideTo(index,500,null)
   	$(this).addClass('on').siblings().removeClass('on');
   	comFresh(index)
  })   
});

 function comFresh(index){
   	 $.ajax({
			type:"get",
			url:"http://localhost:8080/Proxy/FootBall/tweet/json/query/hotspot.do",
			async:true,
			data:{'category':(index+1)},
			success:function(data){
//				console.log(data)
				var data = JSON.parse(data);
				var str = data.data.tweetlist;
				if(currArr[index] == 0){
					for(var i = 0;i<str.length;i++ ){
		 	  	  var dl = '<dl><dt><img data-id='+str[i].id+' src="http://101.200.173.217:8080/FootBall'+str[i].defaultFilePath+str[i].thumbnailname+'"/></dt><dd>'+str[i].content+'</dd></dl>';
		 	  	  dl.onload = function (){
		 	  	  if(index ==0){
		 	  	  	myscroll1.refresh()
		 	  	  }else if(index ==1){
		 	  	  	$('#scroller2_warp').append(dl)
		 	  	  	myscroll2.refresh()
		 	  	  }else if( index ==2){
		 	  	  	$('#scroller3_warp').append(dl)
		 	  	  	myscroll3.refresh()
		 	  	  }
		 	  	 }();
			 	  }
				}
		 	 currArr[index] = 1;
			 	}  
		});   	
  }


