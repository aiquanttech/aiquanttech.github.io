$(function() {
	var width = $(window).width();

	if(width<720) {
		$('.slogan').css({'margin-top': "5px"});
	}
		$.scrollify({
			section: '.panel',
			scrollbars: false,
		    interstitialSection : "",
		    easing: "easeOutExpo",
		    scrollSpeed: 1100,
		    offset : 0,
		    scrollbars: true,
		    standardScrollElements: "",
		    setHeights: true,
		    overflowScroll: true,
		    updateHash: false,
		    touchScroll:false,
		    before:function() {},
		    after:function() {},
		    afterResize:function() {},
		    afterRender:function() {}
		});

		var height = $(window).height();
		var sloganHeight = $(".slogan").height();
		var sliderHeight = width/3.2;
		var sloganMargin = (height-sloganHeight-sliderHeight)/2;
		if(sloganMargin>0) {
			$('.slogan').css({'margin-top': sloganMargin});
		}
});

$(window).resize(function () {
	var width = $(window).width();
	if(width>720) {
		var height = $(window).height();
		var sloganHeight = $(".slogan").height();
		var sliderHeight = width/3.2;;
		var sloganMargin = (height-sloganHeight-sliderHeight)/2;
		if(sloganMargin>0) {
			$('.slogan').css({'margin-top': sloganMargin});
		}
	}else{
		$('.slogan').css({'margin-top': "5px"});
	}

});

$('.gallery-box').click(function(){
		var path = $(this).attr("data-src");
		$('#galleryImage').attr('src', path);
});

// map
function initMap(){
	createMap();//创建地图
	setMapEvent();//设置地图事件
	addMapControl();//向地图添加控件
	addMapOverlay();//向地图添加覆盖物
}

function createMap(){ 
	map = new BMap.Map("map"); 
	map.centerAndZoom(new BMap.Point(120.131899,30.26923),17);
}

function setMapEvent(){
	map.enableKeyboard();
	map.enableDragging();
	map.enableDoubleClickZoom()
}

function addClickHandler(target,window){
	target.addEventListener("click",function(){
	target.openInfoWindow(window);
	});
}

function addMapOverlay(){
	var markers = [
	{content:"",title:"AIQuant",imageOffset: {width:-46,height:-21},position:{lat:30.26921,lng:120.131787}}
	];
	for(var index = 0; index < markers.length; index++ ){
	var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
	var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
		imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
	})});
	var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
	var opts = {
		width: 200,
		title: markers[index].title,
		enableMessage: false
	};
	var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
	marker.setLabel(label);
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); 
	addClickHandler(marker,infoWindow);
	map.addOverlay(marker);

	};
}

function addMapControl(){
	var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:1});
	map.addControl(navControl);
	var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
	map.addControl(overviewControl);
}

var map;
initMap();