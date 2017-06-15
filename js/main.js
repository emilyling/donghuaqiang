var photowall = new photoWall();
var photoSlider = new PhotoSlider();

/*
time : photo auto change time

animationType: default is random.

support type:"bounce","flash","pulse","rubberBand","shake","headShake","swing","tada","wobble","jello","bounceIn","fadeIn","flipInX",
"flipInY","rollIn","zoomIn","lightSpeedIn","slideInUp","rotateIn".

*/
$().ready(function(){
	photowall.initView();
	//init change slider time
	photoSlider.init({
		time: 2000,
		animationType: "random"
	});
});




