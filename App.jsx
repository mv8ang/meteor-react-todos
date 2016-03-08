App = React.createClass({
    mixins: [ReactMeteorData],
    
    getMeteorData() {
        var query = {};
        
        if (this.state.hideCompleted) {
            query = {checked: {$ne: true}};
        };
        
        return {
            tasks: Tasks.find(query).fetch(),
            numCompleted: Tasks.find({checked: {$ne: false}}).count(),
            numNotCompleted: Tasks.find({checked: {$ne: true}}).count(),
            currentUser: Meteor.user()
        }
    },
    
    renderTasks() {
        return this.data.tasks.map((task) => {
            return <Task key={task._id} task={task} />
        })
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        var text = ReactDOM.findDOMNode(this.refs.newTaskInput).value.trim();
        
        Tasks.insert({
            text: text,
            createdAt: new Date(),
            checked: false,
            owner: Meteor.userId(),
            createdBy: Meteor.user().username
        });
        
        ReactDOM.findDOMNode(this.refs.newTaskInput).value = "";
    },
    
    getInitialState() {
        return {
            hideCompleted: false
        }
    },
    
    toggleHideCompleted() {
        this.setState({hideCompleted: !this.state.hideCompleted})
    },
    
    render() {
        return (
            <div className="container">
                <header>
                    <h1>List of tasks</h1>
                    <label className="hide-completed">
                        <input type="checkbox" readOnly={true} checked={this.state.hideCompleted} onClick={this.toggleHideCompleted} />
                        Only show unfinished tasks ({this.data.numNotCompleted})
                    </label>
                    
                    <AccountsUIWrapper />
                    
                    { this.data.currentUser ? 
                    <form className="new-task" onSubmit={this.handleSubmit}>
                        <input type="text" ref="newTaskInput" placeholder="New task" />
                    </form>
                    : "" }
                    
                </header>
                <main>
                    <ul>
                        {this.renderTasks()}
                    </ul>
                </main>
            </div>
        )
    }
});