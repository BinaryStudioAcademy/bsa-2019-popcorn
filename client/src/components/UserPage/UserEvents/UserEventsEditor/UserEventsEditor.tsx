import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './UserEventsEditor.scss';
// import MapWithASearchBox from '../EventMap/EventMapSearch';
import { ReactComponent as PhotoIcon } from '../../../../assets/icons/general/photoIcon.svg';
import {
	formatToDataBase,
	IEventFormatClient,
	IEventFormatFromEditor
} from '../UserEvents.service';

interface IUserEventsEditorProps {
	id?: string;
	saveEvent: (event: any) => void;
	event?: null | IEventFormatClient;
	closeEditor: () => void;
}

interface IUserEventsEditorState {
	title: string;
	description: string;
	location:
		| {
				lat: number;
				lng: number;
		  }
		| undefined;
	dateRange: {
		startDate: Date | undefined;
		endDate: Date | undefined;
	};
	image: string;
	movieId: null | string;
	isPrivate: boolean;
	isDropDownOpen: boolean;
}

class UserEventsEditor extends React.Component<
	IUserEventsEditorProps,
	IUserEventsEditorState
> {
	constructor(props: IUserEventsEditorProps) {
		super(props);
		this.state = {
			title: '',
			movieId: null,
			description: '',
			location: undefined,
			dateRange: {
				startDate: undefined,
				endDate: undefined
			},
			image: '',
			isPrivate: false,
			isDropDownOpen: false
		};

		this.onCancel = this.onCancel.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onChangeData = this.onChangeData.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.validateDateRange = this.validateDateRange.bind(this);
		this.onToggleDropDown = this.onToggleDropDown.bind(this);
		this.onLocationChanged = this.onLocationChanged.bind(this);
	}

	componentDidMount() {
		if (this.props.event) {
			// fetch event by id
			const {
				title,
				description,
				location,
				dateRange,
				image,
				isPrivate,
				movieId
			} = this.props.event;
			if (dateRange.startDate)
				dateRange.startDate = new Date(dateRange.startDate);
			if (dateRange.endDate) dateRange.endDate = new Date(dateRange.endDate);
			this.setState({
				...this.state,
				title,
				description,
				location,
				dateRange,
				image,
				isPrivate,
				movieId
			});
		}
	}

	onChangeData(e, keyword: string) {
		const target = e.target as HTMLTextAreaElement;
		const value = target.value;
		this.setState({
			...this.state,
			[keyword]: value
		});
	}

	onLocationChanged(newCord) {
		this.setState({
			...this.state,
			location: newCord
		});
	}

	onChangeDate(newDate) {
		const dateRange = { ...this.state.dateRange, ...newDate };
		if (this.validateDateRange(dateRange)) {
			this.setState({
				...this.state,
				dateRange
			});
		}
	}

	validateDateRange({ startDate, endDate }) {
		const now = new Date();
		const isValidateDate = startDate
			? startDate > now
			: true && endDate
			? endDate > now
			: true;
		const isValidateRange = endDate > startDate || !startDate || !endDate;
		return isValidateDate && isValidateRange;
	}

	onToggleDropDown() {
		this.setState({
			isDropDownOpen: !this.state.isDropDownOpen
		});
	}

	onChangePrivacy = isPrivate => {
		this.setState({
			isPrivate
		});
	};

	onSave() {
		if (
			this.state.title.trim() === '' ||
			this.state.description.trim() === '' ||
			!this.state.location ||
			!this.state.dateRange.startDate ||
			!this.state.dateRange.endDate
		)
			return;

		if (this.props.id) {
			let {
				title,
				description,
				location,
				image,
				dateRange,
				movieId,
				isPrivate
			} = this.state;
			let eventToSend: IEventFormatFromEditor = {
				title,
				description,
				location,
				dateRange,
				image,
				movieId,
				isPrivate,
				userId: this.props.id
			};
			if (this.props.event && this.props.event.id) {
				eventToSend.id = this.props.event.id;
			}

			this.props.saveEvent(formatToDataBase(eventToSend)); //this.props.addEvent(this.state);
			this.props.closeEditor();
		}
	}

	onCancel() {
		this.setState({
			title: '',
			description: '',
			location: undefined,
			dateRange: {
				startDate: undefined,
				endDate: undefined
			},
			image: '',
			isPrivate: false
		});
		this.props.closeEditor();
	}

	render() {
		const DROPDOWN_LABEL = this.state.isPrivate ? 'Private' : 'Public';

		return (
			<div className="event-editor">
				<button className="back-btn hover" onClick={this.onCancel}>
					Back
				</button>

				<div className="inputs">
					<label className="input-wrp">
						<span className="label">Title: </span>
						<input
							type="text"
							className="text-input"
							placeholder="Enter event title here..."
							value={this.state.title}
							onChange={e => this.onChangeData(e, 'title')}
						/>
					</label>

					<label className="input-wrp">
						<span className="label">Image: </span>
						<div className="img-uploader hover">
							{this.state.image && (
								<img
									alt="event image"
									src={this.state.image}
									className="event-image"
								/>
							)}
							<PhotoIcon />
						</div>
					</label>

					<label className="input-wrp">
						<span className="label">Details: </span>
						<textarea
							value={this.state.description}
							className="text-input"
							placeholder="Add more info here..."
							onChange={e => this.onChangeData(e, 'description')}
						></textarea>
					</label>

					<div className="input-wrp">
						<span className="label">Time: </span>
						<div className="time-picker">
							<DatePicker
								selected={this.state.dateRange.startDate}
								selectsStart
								startDate={this.state.dateRange.startDate}
								endDate={this.state.dateRange.endDate}
								onChange={date => this.onChangeDate({ startDate: date })}
								minDate={new Date()}
								maxDate={this.state.dateRange.endDate}
								showDisabledMonthNavigation
								showTimeSelect
								dateFormat="MMMM d, yyyy h:mm aa"
							/>

							<DatePicker
								selected={this.state.dateRange.endDate}
								selectsEnd
								startDate={this.state.dateRange.startDate}
								endDate={this.state.dateRange.endDate}
								onChange={date => this.onChangeDate({ endDate: date })}
								minDate={this.state.dateRange.startDate || new Date()}
								showDisabledMonthNavigation
								showTimeSelect
								dateFormat="MMMM d, yyyy h:mm aa"
							/>
						</div>
					</div>

					<div className="input-wrp">
						<span className="label">Location: </span>
						{/* <MapWithASearchBox
							onLocationChanged={this.onLocationChanged}
							defaultMarkerPosition={this.state.location}
						/> */}
					</div>

					<div className="input-wrp">
						<span className="label">Privacy: </span>
						<div className="privacy">
							<div
								className={
									this.state.isDropDownOpen ? 'dropdown active' : 'dropdown'
								}
								onClick={this.onToggleDropDown}
							>
								<div className="dropdown__text">{DROPDOWN_LABEL}</div>
								<div className="dropdown__items">
									<div
										onClick={() => this.onChangePrivacy(false)}
										className="dropdown__item"
									>
										Public
									</div>
									<div
										onClick={() => this.onChangePrivacy(true)}
										className="dropdown__item"
									>
										Private
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="footer">
					<button
						className="cancel-btn hover"
						onClick={this.onCancel}
						type="button"
					>
						Cancel
					</button>
					<button
						className="save-btn hover"
						onClick={this.onSave}
						type="button"
					>
						Save
					</button>
				</div>
			</div>
		);
	}
}

export default UserEventsEditor;
