export default (rateInfo: any, prevUserRate: any, userRate: any) => {
	const prevSumOfRates = rateInfo.count * rateInfo.average;
	const newSumOfRates = prevUserRate
		? prevSumOfRates - prevUserRate + (userRate || 0)
		: prevSumOfRates + userRate;
	if (!prevUserRate && userRate) {
		rateInfo.count = +rateInfo.count + 1;
	} else if (prevUserRate && !userRate) {
		rateInfo.count = rateInfo.count - 1;
	}
	rateInfo.average = +rateInfo.count
		? (newSumOfRates / rateInfo.count).toFixed(2)
		: 0;

	return rateInfo;
};
