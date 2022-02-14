function addCodecsGroup(select, desc, getter) {
	if(getter) {
		var group = document.createElement("optgroup");
		group.label = desc;
		select.appendChild(group);
		getter().forEach(function(e) {
			var opt = document.createElement("option");
			opt.value = e.codec;
			opt.innerHTML = e.description + " ("+e.codec+")";
			group.appendChild(opt);
		});
	}
}

window.onload = function() {
	const sourceselector = document.getElementById("source-select");
	const mimeselector = document.getElementById("mime-select");
	const codecsselector = document.getElementById("codecs-select");
	addCodecsGroup(codecsselector, "VP9 codecs", getAllVP9Codecs);
	addCodecsGroup(codecsselector, "AV1 codecs", getAllAV1Codecs);
	addCodecsGroup(codecsselector, "AVC codecs", getAllAVCCodecs);
	addCodecsGroup(codecsselector, "AVC codecs", getAllHEVCCodecs);
	const fpsselector = document.getElementById("fps-select");
	const bitrateeselector = document.getElementById("bitrate-select");
	const dimensionselector = document.getElementById("maxdimension-select");
	const hdrselector = document.getElementById("hdr-select");
	const colorselector = document.getElementById("color-select");
	const tranferselector = document.getElementById("transfer-select");
	const alphaCheckbox = document.getElementById("alpha");
	const advancedCheckbox = document.getElementById("advanced");
	advancedCheckbox.onchange = function(e) { 
		document.getElementById("advancedset").disabled = !e.target.checked;
	}
	const supportedCheckbox = document.getElementById("supported");
	const smoothCheckbox = document.getElementById("smooth");
	const powerEfficientCheckbox = document.getElementById("powerEfficient");

	const ctx = {};
	ctx.svg = document.getElementById('s');
	
	function run() {
		const sourcevalue = sourceselector.value;
		const mime = mimeselector.value;
		const codecs = codecsselector.value;
		const fps = fpsselector.value;
		const bitrate = bitrateeselector.value;
		const dimension = dimensionselector.value;
		const hdrvalue = hdrselector.value;
		const colorvalue = colorselector.value;
		const transfervalue = tranferselector.value;

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

		for (let w = ctx.stepw; w <= ctx.width_max; w+=ctx.stepw) {
			for (let h = ctx.steph; h <= ctx.height_max; h+=ctx.steph) {
				testConfig(sourcevalue, mime, codecs,
					w, h, bitrate, fps, 
					advancedCheckbox.checked, alphaCheckbox.checked,
					hdrvalue, colorvalue, transfervalue,
					ctx,
					supportedCheckbox.checked,
					powerEfficient.checked,
					smoothCheckbox.checked);
			}
		}
	}
	const runbutton = document.getElementById('runbutton');
	runbutton.onclick = run;
}

function testConfig(sourcevalue, mime, codecs, vw, vh, b, fps,
					advanced, alpha, hdr, color, transfer,
					ctx, wantsSupported, wantsPowerEfficient, wantsSmooth) {
	const fullmime = mime+';codecs='+codecs;
	//const fullmime = 'video/mp4;codecs=avc1.640028';
	let configuration = {
		type: sourcevalue,
		video: {
			contentType: fullmime,
			width: vw,
			height: vh,
			bitrate: b,
			framerate: fps,
		}
	};
	if (advanced) {
		configuration.video.hasAlphaChannel = alpha;
		configuration.video.hdrMetadataType = hdr;
		configuration.video.colorGamut = color;
		configuration.video.transferFunction = transfer;
	}

	navigator.mediaCapabilities.decodingInfo(configuration)
		    .then((result) => {
	    		drawValue(ctx, configuration, vw, vh, 
	    			result.supported && wantsSupported, 
	    			result.powerEfficient && wantsPowerEfficient, 
	    			result.smooth && wantsSmooth);
		    })
		    .catch((err) => {
		      console.error(err, ' caused decodingInfo to reject');
		    });
}

function drawValue(ctx, configuration, w, h, supported, powerEfficient, smooth) {
	const scalew = ctx.stepw*.9;
	const offsetw = ctx.stepw*.05-ctx.stepw;
	const scaleh = ctx.steph*.9;
	const offseth = ctx.steph*.05-ctx.steph;
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
	tooltipString += ("\nconfiguration:"+JSON.stringify(configuration));
	tooltip.textContent = tooltipString;
	rect.appendChild(tooltip);
	ctx.svg.appendChild(rect);
}