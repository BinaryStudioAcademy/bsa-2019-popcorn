export default (rateInfo: any, prevUserRate: any, userRate: any) => {
	const prevSumOfRates = rateInfo.count * rateInfo.average;
	const newSumOfRates = prevSumOfRates - (prevUserRate || 0) + (userRate || 0);
	if (!prevUserRate && userRate) {
		rateInfo.count = rateInfo.count + 1;
	} else if (prevUserRate && !userRate) {
		rateInfo.count = rateInfo.count - 1;
	}
	rateInfo.average = (newSumOfRates / rateInfo.count).toFixed(1);
	return rateInfo;
};
