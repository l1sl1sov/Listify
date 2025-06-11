import TaskList from "../../components/TasksList/TaskList";
import AuthHeader from "../../components/Header/AuthHeader";

export const WorkspacePage = () => {

    return (
        <div className="container">
            <AuthHeader/>
            <TaskList/>
        </div>
    )
}