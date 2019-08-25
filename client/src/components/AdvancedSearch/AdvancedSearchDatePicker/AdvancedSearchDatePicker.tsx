import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AdvancedSearchDatePicker.scss';

interface IAdvancedSearchDatePickerProps {
	header: string;
	onDateChange: (dateRange: object) => any;
}

interface IAdvancedSearchDatePickerState {
	dateRange: {
		startDate: Date | undefined;
		endDate: Date | undefined;
	};
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
			}
		};
	}

	onChangeDate(newDate) {
		const dateRange = { ...this.state.dateRange, ...newDate };
		this.setState(
			{
				...this.state,
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
					<DatePicker
						selected={this.state.dateRange.startDate}
						selectsStart
						startDate={this.state.dateRange.startDate}
						endDate={this.state.dateRange.endDate}
						onChange={date => {
							this.onChangeDate({ startDate: date });
						}}
						dateFormat="yyyy/MM/dd"
					/>

					<DatePicker
						selected={this.state.dateRange.endDate}
						selectsEnd
						startDate={this.state.dateRange.startDate}
						endDate={this.state.dateRange.endDate}
						minDate={this.state.dateRange.startDate}
						onChange={date => this.onChangeDate({ endDate: date })}
						dateFormat="yyyy/MM/dd"
					/>
				</div>
			</div>
		);
	}
}

export default AdvancedSearchDatePicker;
