function getAllHEVCCodecs()
{
	var HEVC_PROFILES_DESC = [
		{ profile_idc: 1, description: "Main" },
		{ profile_idc: 2, description: "Main 10"},
		{ profile_idc: 3, description: "Main Still Picture" },
        { profile_idc: 4, description: "Range extensions profiles" },
		{ profile_idc: 5, description: "High throughput profiles" },
		{ profile_idc: 6, description: "Multiview Main profile" },
		{ profile_idc: 7, description: "Scalable Main profile" },
		{ profile_idc: 8, description: "3D Main profile" },
		{ profile_idc: 9, description: "Screen content coding extensions profiles" },
		{ profile_idc: 10, description: "Scalable format range extensions profile" },
	];

	var HEVC_LEVELS = [ 10, 20, 21, 30, 31, 40, 41, 50, 51, 52, 60, 61, 62 ];

	// TODO generate profiles

	return [
		{ codec: "hev1.1.6.L93.B0", description: "HEVC progressive, non-packed stream, Main Profile, Main Tier, Level 3.1"},
		{ codec: "hev1.2.4.L120.B0", description: "HEVC Main10 Profile, Main Tier, Level 4.0"}
	];
}