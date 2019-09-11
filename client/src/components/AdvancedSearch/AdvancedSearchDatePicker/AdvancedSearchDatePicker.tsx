import React from 'react';
import './AdvancedSearchDatePicker.scss';

interface IAdvancedSearchDatePickerProps {
	header: string;
	onDateChange: (dateRange: object) => any;
}

interface IAdvancedSearchDatePickerState {
	dateRange: {
		startDate: string | undefined;
		endDate: string | undefined;
	};
	startInputVal: string;
	endInputVal: string;
}

class AdvancedSearchDatePicker extends React.Component<
	IAdvancedSearchDatePickerProps,
	IAdvancedSearchDatePickerState
> {
	constructor(props) {
		super(props);
		this.state = {
			dateRange: {
				startDate: undefined,
				endDate: undefined
			},
			startInputVal: '1900',
			endInputVal: '2019'
		};
		this.onChangeStartDate = this.onChangeStartDate.bind(this);
		this.onChangeEndDate = this.onChangeEndDate.bind(this);
	}

	onChangeStartDate(e) {
		const value = e.target.value === '' ? '1900' : e.target.value;
		const dateRange = {
			startDate: value,
			endDate: this.state.dateRange.endDate
		};
		this.setState(
			{
				...this.state,
				startInputVal: value,
				dateRange
			},
			() => this.props.onDateChange(dateRange)
		);
	}

	onChangeEndDate(e) {
		const value = e.target.value === '' ? '2019' : e.target.value;
		const dateRange = {
			startDate: this.state.dateRange.startDate,
			endDate: value
		};
		this.setState(
			{
				...this.state,
				endInputVal: value,
				dateRange
			},
			() => this.props.onDateChange(dateRange)
		);
	}

	render() {
		return (
			<div className="advanced-movie-search-block">
				<div className="input-header">{this.props.header}</div>
				<div className="date-picker-block">
					<input
						type="number"
						max={this.state.endInputVal}
						onChange={this.onChangeStartDate}
						placeholder="Start year"
					/>
					<input
						type="number"
						min={this.state.startInputVal}
						onChange={this.onChangeEndDate}
						placeholder="End year"
					/>
				</div>
			</div>
		);
	}
}

export default AdvancedSearchDatePicker;
