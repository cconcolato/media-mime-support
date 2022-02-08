window.onload = function() {
	const mimeselector = document.getElementById("mime-select");
	const codecsselector = document.getElementById("codecs-select");
	const fpsselector = document.getElementById("fps-select");
	const bitrateeselector = document.getElementById("bitrate-select");
	const dimensionselector = document.getElementById("maxdimension-select");

	const supportedCheckbox = document.getElementById("supported");
	const smoothCheckbox = document.getElementById("smooth");
	const powerEfficientCheckbox = document.getElementById("powerEfficient");

	const ctx = {};
	ctx.svg = document.getElementById('s');
	
	function run() {
		const mime = (mimeselector.value.length > 0 ? mimeselector.value : "video/mp4");
		const codecs = (codecsselector.value.length > 0 ? codecsselector.value : "avc1.640028");
		const fps = (fpsselector.value.length > 0 ? +fpsselector.value : 30);
		const bitrate = (bitrateeselector.value.length > 0 ? +bitrateeselector.value : 1000000);
		const dimension = (dimensionselector.value.length > 0 ? dimensionselector.value : "3840x2160");

		ctx.width_min = 0;
		ctx.height_min = 0;
		ctx.width_max = +(dimension.substring(0, dimension.indexOf('x')));
		ctx.height_max = +(dimension.substring(dimension.indexOf('x')+1, dimension.length));
		ctx.stepw = ctx.width_max >> 4;
		ctx.steph = ctx.height_max >> 4;
		ctx.svg.setAttribute("viewBox","0 0 "+ctx.width_max+" "+ctx.height_max);
		while (ctx.svg.firstChild) {
        	ctx.svg.removeChild(ctx.svg.firstChild);
    	}	

		for (let w = ctx.width_min; w < ctx.width_max; w+=ctx.stepw) {
			for (let h = ctx.height_min; h < ctx.height_max; h+=ctx.steph) {
				testConfig(mime, codecs,
					w, h, bitrate, fps, ctx,
					supportedCheckbox.checked,
					powerEfficient.checked,
					smoothCheckbox.checked);
			}
		}
	}
	const runbutton = document.getElementById('runbutton');
	runbutton.onclick = run;
}

function testConfig(mime, codecs, vw, vh, b, fps, ctx, wantsSupported, wantsPowerEfficient, wantsSmooth) {
	const fullmime = mime+';codecs='+codecs;
	//const fullmime = 'video/mp4;codecs=avc1.640028';
	const configuration = {
		type: 'media-source',
		video: {
			contentType: fullmime,
			width: vw,
			height: vh,
			bitrate: b,
			framerate: fps
		}
	};

	navigator.mediaCapabilities.decodingInfo(configuration)
		    .then((result) => {
	    		drawValue(ctx, vw, vh, 
	    			result.supported && wantsSupported, 
	    			result.powerEfficient && wantsPowerEfficient, 
	    			result.smooth && wantsSmooth);
		    })
		    .catch((err) => {
		      console.error(err, ' caused decodingInfo to reject');
		    });
}

function drawValue(ctx, w, h, supported, powerEfficient, smooth) {
	const scalew = ctx.stepw*.9;
	const offsetw = ctx.stepw*.05;
	const scaleh = ctx.steph*.9;
	const offseth = ctx.steph*.05;
	let rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
	rect.setAttribute("x",w+offsetw+"");
	rect.setAttribute("y",h+offseth+"");
	rect.setAttribute("width",scalew+"");
	rect.setAttribute("height",scaleh+"");
	rect.setAttribute("fill", "rgb("+supported*255+","+powerEfficient*255+","+smooth*255+")");
	let tooltip = document.createElementNS("http://www.w3.org/2000/svg","title");
	let tooltipString = (""+w+"x"+h+":");
	tooltipString += ("\nsupported:"+supported);
	tooltipString += ("\npowerEfficient:"+powerEfficient);
	tooltipString += ("\nsmooth:"+smooth);
	tooltip.textContent = tooltipString;
	rect.appendChild(tooltip);
	ctx.svg.appendChild(rect);
}