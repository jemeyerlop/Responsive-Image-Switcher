/*
Responsive Image Switcher
Author: Juan Enrique Meyer, 2015
License: MIT
https://github.com/jemeyerlop/responsive-image-switcher
*/
function imageSwitcher(dprExpectedForHigherResolutionImage){
	//Validate parameter or set a default value
	dprExpected=typeof(dprExpectedForHigherResolutionImage)=='number' && dprExpectedForHigherResolutionImage>=1?dprExpectedForHigherResolutionImage:2;
	//Set initial suffix status empty for each imageContainerRIS class element in a global array named containers
	containers=[];
	$('.imageContainerRIS').each(function(){
		containers[$(this).index()]='';
	});
	//console.log(containers);
	//Load the proper images for the first load of the page
	changeImages(dprExpected);
	//console.log(containers);
	//Change image in case of a resize event
	$(window).on('resize',function(){
		changeImages(dprExpected);
	});
}
function changeImages(dprExpected){
	//Obtain device pixel ratio
	var dpr=window.devicePixelRatio;
	//Iterate all imageContainerRIS class figure tags
	$('.imageContainerRIS').each(function(){
		var xs=$(this).data('xs');
		var sm=$(this).data('sm');
		var md=$(this).data('md');
		var containerWidth=$(this).width();
			  if(containerWidth<=xs){
			var suffix='xs';
			//If the device pixel ratio is >= than the expected dpr for the use of a higher resolution image, use suffix 'sm' instead of suffix 'xs' in order to load the larger image
			if(dpr>=dprExpected){suffix='sm';}
		}else if(containerWidth<=sm){
			var suffix='sm';
			//If the device pixel ratio is >= than the expected dpr for the use of a higher resolution image, use suffix 'md' instead of suffix 'sm' in order to load the larger image
			if(dpr>=dprExpected){suffix='md';}
		}else if(containerWidth<=md){
			var suffix='md';
			//If the device pixel ratio is >= than the expected dpr for the use of a higher resolution image, use suffix 'lg' instead of suffix 'md' in order to load the larger image
			if(dpr>=dprExpected){suffix='lg';}
		}else{
			var suffix='lg';
		}
		//If the suffix changes, replace the value with the new one and load the proper image in accordance with the new suffix
		if(containers[$(this).index()]!=suffix){
			containers[$(this).index()]=suffix;
			//Replace the ultra light data URI embedded image with the real one
			$image=$(this).find('.imageRIS').first();
			var path=$image.data('path');
			var format=$image.data('format');
			$image.attr("src",path+"-"+suffix+"."+format);
			//console.log(containers);
		}
	});	
}