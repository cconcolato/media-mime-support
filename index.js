function addMimeChecks(table,mime,desc) { 
	var video = document.createElement("video");
	var tr;
	var video_result;
	var mediasource_result;
	video_result = video.canPlayType(mime);
	try { 
		mediasource_result = MediaSource.isTypeSupported(mime); 
	} catch (e) { 
		mediasource_result = e.message; 
	}
	tr = document.createElement("tr");
	tr.innerHTML = "<td id='"+mime+"'>"+desc+"</td><td><a href='#"+mime+"'>"+mime+"</a></td><td class='"+(video_result === ""? "fail" : (video_result === "maybe" ? "maybe": "ok"))+"'>"+(video_result.length > 0 ? video_result : "no")+"</td><td class='"+(mediasource_result === true ? "ok" : "fail")+"'>"+mediasource_result+"</td>";
	table.appendChild(tr);
}

function createTableHeader(div) {
	var t = document.createElement("table");
	div.appendChild(t);
	var content = "";
	content += "<tr>";
	content += "<th>Description</th>";
	content += "<th>MIME</th>";
	content += "<th><code>HTMLMediaElement.canPlayType</code></th>";
	content += "<th><code>MediaSource.isTypeSupported</code></th>";
	content += "</tr>";
	t.innerHTML = content;
	return t;
}

function addParagraph(div, id, msg) {
	var p = document.createElement("p");
	p.setAttribute("id", id);
	p.innerHTML = msg;
	div.appendChild(p);
}

window.onload = function() {
	var results = document.getElementById("results");
	var table, i;

	addParagraph(results, "general_mimes", "Checking support for MIME types registered in <a href='https://tools.ietf.org/html/rfc6381'>RFC6381</a>");
	table = createTableHeader(results);
	for(i in MIMES) {
		addMimeChecks(table,MIMES[i], "");
	}
	addParagraph(results, "general_codecs", "Checking support for codecs registered in <a href='http://mp4ra.org/codecs.html'>MP4RA</a>");
	table = createTableHeader(results);
	for(i in CODECS) {
		var codec = CODECS[i].codec;
		addMimeChecks(table,'video/mp4; codecs="'+codec+'"', CODECS[i].description);
	}
	addParagraph(results, "audio_codecs", "Checking support for audio codecs with parameters");
	table = createTableHeader(results);
	for(i in AUDIO_CODECS) {
		var codec = AUDIO_CODECS[i].codec;
		addMimeChecks(table, 'audio/mp4; codecs="'+codec+'"', AUDIO_CODECS[i].description);
	}
	addParagraph(results, "avc_codecs", "Checking support for AVC codecs with parameters");
	table = createTableHeader(results);
	addAVCChecks(addMimeChecks, table);

	addParagraph(results, "av1_codecs", "Checking support for AV1 codecs with parameters");
	table = createTableHeader(results);
	addAV1Checks(addMimeChecks, table);

	addParagraph(results, "other_video_codecs", "Checking support for other codecs such as VP9, HEVC");
	table = createTableHeader(results);
	for(i in VIDEO_CODECS) {
		addMimeChecks(table, 'video/mp4; codecs="'+VIDEO_CODECS[i].codec+'"', VIDEO_CODECS[i].description);
	}
};

function addOwnTest(id, v) {
	var results = document.getElementById(id);
	results.innerHTML='';
	table = createTableHeader(results);
	addMimeChecks(table, 'video/mp4; codecs="'+v+'"', "");
}
