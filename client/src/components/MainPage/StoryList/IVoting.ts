export default interface IVoting {
	userId;
	header: string;
	backColor: string;
	backImage?: string;
	deltaPositionHeadX: number;
	deltaPositionHeadY: number;
	deltaPositionOptionBlockX: number;
	deltaPositionOptionBlockY: number;
	options: Array<{
		body: string;
		voted: number;
	}>;
}
