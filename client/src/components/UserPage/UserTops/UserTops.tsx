import React from 'react';
import './UserTops.scss';
import TopItem from './TopItem/TopItem';
import { ITopItem } from './TopItem/TopItem'

export interface IUserTopsState {
    topList: ITopItem[];
}

const topItemsMock: ITopItem[] = [
    { id: "1", title: "My Top 1", moviesList: [{ title: "The Avengers", id: "1",comment:"Nice" }, { title: "Spider-Man", id: "2",comment:"Nice" }, { title: "Batman", id: "3",comment:"Nice" }] },
    { id: "2", title: "My Top 2", moviesList: [{ title: "The Avengers", id: "1",comment:"Nice" }, { title: "Spider-Man", id: "2",comment:"Nice" }, { title: "Batman", id: "3",comment:"Nice" }] },
    { id: "3", title: "My Top 3", moviesList: [{ title: "The Avengers", id: "1",comment:"Nice" }, { title: "Spider-Man", id: "2",comment:"Nice" }, { title: "Batman", id: "3",comment:"Nice" }] },
]

const newTop = (): ITopItem => {
    return { id: Date.now().toString(), title: "", moviesList: [] }
}

class UserTops extends React.Component<{}, IUserTopsState> {
    constructor(props) {
        super(props);
        this.state = {
            topList: topItemsMock
        }
    }

    deleteTop = (topId: string) => {
        const topList = this.state.topList.filter((topItem: ITopItem) => topItem.id !== topId);
        this.setState({ topList });
    }

    createTop = () => {
        const { topList } = this.state;
        this.setState({ topList: [...topList, newTop()] })
    }

    saveUserTop = (updatedTopItem: ITopItem) => {
        const topList = this.state.topList.map(topItem => topItem.id === updatedTopItem.id ? updatedTopItem : topItem);
        console.log('updated topitem',updatedTopItem)
        this.setState({ topList });
    }

    render() {
        const topList = this.state.topList;
        return (
            <div>
                <div className="create-top-button hover" onClick={this.createTop}> Create Top </div>
                {topList.map((topItem: ITopItem) => <TopItem key={topItem.id} saveUserTop={this.saveUserTop} topItem={topItem} deleteTop={this.deleteTop} />)}
            </div>
        )
    }
}

export default UserTops;