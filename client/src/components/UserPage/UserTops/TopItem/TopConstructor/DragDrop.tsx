import React,{useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FilmInput from './FilmInput';
import { IMovie } from '../TopItem';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: 0,
    margin: `0 0 ${grid}px 0`,
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    padding: grid,
});

export interface IDragDropProps {
    moviesList: IMovie[];
    onDragEnd: (result: any) => void;
    deleteFilmInput: (movieId: string) => void;
    saveMovie: (movie: IMovie) => void;
}

const DragDrop: React.FC<IDragDropProps> = ({ saveMovie, moviesList, onDragEnd, deleteFilmInput }) => {
    return (<DragDropContext onDragEnd={onDragEnd}>
        <Droppable className="user-tops" droppableId="droppable">
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                >
                    {moviesList.map((movie, index) => (
                        <Draggable className="film-input-item" key={movie.id} draggableId={movie.id} index={index}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}

                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}>
                                    <div className="film-input-wrap">
                                        <div className="numeration">{index + 1}</div>
                                        <FilmInput
                                            movie={movie}
                                            saveMovie={saveMovie}
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
    </DragDropContext>)
}

export default DragDrop;