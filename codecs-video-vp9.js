function getAllVP9Codecs() {
	// TODO generate all possible profiles
	// vp09.<profile>.<level>.<bitDepth>[.<chromaSubsampling>.<colourPrimaries>.<transferCharacteristics>.<matrixCoefficients>.<videoFullRangeFlag>]

	return [
		{ codec: "vp09.00.51.08.01.01.01.01.00", description: "VP9 YouTube 8K" },
		{ codec: "vp09.00.50.08", description: "VP9, Profile 0, Level 5, 8-bit"}
	];
}