import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FilmInput from './FilmInput';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: 'none',
	padding: 0,
	margin: `0 0 ${grid}px 0`,
	...draggableStyle
});

const getListStyle = isDraggingOver => ({
	padding: grid
});

interface IDragDropProps {
	inputMovies: Array<{ id: number; title: string }>;
	onDragEnd: (result: any) => void;
	deleteFilmInput: (movieId: number) => void;
}

const DragDrop: React.FC<IDragDropProps> = ({
	inputMovies,
	onDragEnd,
	deleteFilmInput
}) => {
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable className="user-tops" droppableId="droppable">
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
					>
						{inputMovies.map((movie, index) => (
							<Draggable
								className="film-input-item"
								key={movie.id}
								draggableId={movie.id}
								index={index}
							>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style
										)}
									>
										<div>
											<FilmInput
												movie={movie}
												deleteFilmInput={deleteFilmInput}
											/>
										</div>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default DragDrop;
