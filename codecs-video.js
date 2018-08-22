var VIDEO_CODECS = [
	{ codec: "hev1.1.6.L93.B0", description: "HEVC progressive, non-packed stream, Main Profile, Main Tier, Level 3.1"},

	// vp09.<profile>.<level>.<bitDepth>[.<chromaSubsampling>.<colourPrimaries>.<transferCharacteristics>.<matrixCoefficients>.<videoFullRangeFlag>]
	{ codec: "vp09.00.50.08", description: "VP9, Profile 0, Level 5, 8-bit"},

	// <sample entry 4CC>.<profile>.<level><tier>.<bitDepth>[.<monochrome>.<chromaSubsampling>.<colorPrimaries>.<transferCharacteristics>.<matrixCoefficients>.<videoFullRangeFlag>]
	{ codec: "av01.0.08M.08", description: "AV1, Main Profile, Level 4.0 Main Tier, 8-bit"},
];