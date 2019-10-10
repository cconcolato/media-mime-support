function addAV1Checks(add,table)
{
	var PROFILES_VALUES = [ 0, 1, 2 ];
	var PROFILES_NAMES = [ 'Main', 'High', 'Professional' ];
	var LEVEL_VALUES = [  0,  1,  2,  3,
						  4,  5,  6,  7,
						  8,  9, 10, 11,
						 12, 13, 14, 15,
						 16, 17, 18, 19,
						 20, 21, 22, 23,
						 31];
	var LEVEL_NAMES = [ '2.0', '2.1', '2.2', '2.3',
						'3.0', '3.1', '3.2', '3.3',
						'4.0', '4.1', '4.2', '4.3',
						'5.0', '5.1', '5.2', '5.3',
						'6.0', '6.1', '6.2', '6.3',
						'7.0', '6.1', '7.2', '7.3',
						'Max' ];
	var TIER_VALUES = [ 'M', 'H' ];
	var TIER_NAMES = [ 'Main', 'High' ];
	var DEPTH_VALUES = [ 8, 10, 12];
	var MONOCHROME_VALUES = [ null ];//, 0, 1 ];
	var CHROMA_SUBSAMPLING_VALUES = [ '000', '001', '010', '011', '100', '101', '110', '111' ];
	var COLOR_PRIMARIES_VALUES = [ 0, 1, 2];//, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
	var TRANSER_CHARACTERISTICS_VALUES = [ 0, 1, 2];//, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
	var MATRIX_COEFFICIENT_VALUES = [ 0, 1, 2];//, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
	var VIDEO_FULL_RANGE_FLAG_VALUES = [ 0, 1 ];

	for (var profile in PROFILES_VALUES) {
		for (var level in LEVEL_VALUES) {
			var levelString = ''+LEVEL_VALUES[level];
			if (levelString.length == 1) levelString = "0"+levelString;

			for (var tier in TIER_VALUES) {
				for (var depth in DEPTH_VALUES) {
					var depthString = ''+DEPTH_VALUES[depth];
					if (depthString.length == 1) depthString = "0"+depthString;
					for (var mono in MONOCHROME_VALUES) {
						if (MONOCHROME_VALUES[mono]!= null) {
							for (var chroma in CHROMA_SUBSAMPLING_VALUES) {
								for (var colorPrimary in COLOR_PRIMARIES_VALUES) {
									for (var transfer in TRANSER_CHARACTERISTICS_VALUES) {
										for (var matrix in MATRIX_COEFFICIENT_VALUES) {
											for (var range in VIDEO_FULL_RANGE_FLAG_VALUES) {
												add(table,'video/mp4; codecs="av01.'+PROFILES_VALUES[profile]+
													'.'+levelString+
													''+TIER_VALUES[tier]+
													'.'+depthString+
													'.'+MONOCHROME_VALUES[mono]+
													'.'+CHROMA_SUBSAMPLING_VALUES[chroma]+
													'.'+COLOR_PRIMARIES_VALUES[colorPrimary]+
													'.'+TRANSER_CHARACTERISTICS_VALUES[transfer]+
													'.'+MATRIX_COEFFICIENT_VALUES[matrix]+
													'.'+VIDEO_FULL_RANGE_FLAG_VALUES[range]+'"');
											}
										}
									}
								}
							}
						} else {
							add(table,'video/mp4; codecs="av01.'+PROFILES_VALUES[profile]+
								'.'+levelString+
								''+TIER_VALUES[tier]+
								'.'+depthString+'"', 
								'AV1 '+PROFILES_NAMES[profile]+' Profile, level '+LEVEL_NAMES[level]+', '+TIER_NAMES[tier]+ ' tier, '+DEPTH_VALUES[depth]+' bits');
						}
					}
				}
			}
		}
	}
}