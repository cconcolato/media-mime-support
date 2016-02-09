var AVC_PROFILES_DESC = [
	//{ constrained_set0_flag: true },
	//{ constrained_set1_flag: true },
	//{ constrained_set2_flag: true },
	{ profile_idc: 66, description: "Baseline" },
	{ profile_idc: 66, description: "Constrained Baseline", constrained_set1_flag: true},
	{ profile_idc: 77, description: "Main" },
	{ profile_idc: 88, description: "Extended" },
	{ profile_idc: 100, description: "High", constrained_set4_flag: false },
	{ profile_idc: 100, description: "High Progressive", constrained_set4_flag: true },
	{ profile_idc: 100, description: "Constrained High", constrained_set4_flag: true, constrained_set5_flag: true },
	{ profile_idc: 110, description: "High 10" },
	{ profile_idc: 110, description: "High 10 Intra", constrained_set3_flag: true },
	{ profile_idc: 122, description: "High 4:2:2" },
	{ profile_idc: 122, description: "High 4:2:2 Intra", constrained_set3_flag: true },
	{ profile_idc: 244, description: "High 4:4:4 Predictive" },
	{ profile_idc: 244, description: "High 4:4:4 Intra", constrained_set3_flag: true },
	{ profile_idc: 44, description: "CAVLC 4:4:4 Intra" },
];

var AVC_PROFILES_IDC = [ 66, 77, 88, 100, 110, 122, 244, 44];
var AVC_CONSTRAINTS = [ 0, 4, 8, 16, 32, 64, 128 ];
var AVC_LEVELS = [ 10, 11, 12, 13, 20, 21, 22, 30, 31, 32, 40, 41, 42, 50, 51, 52];