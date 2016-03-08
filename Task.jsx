Task = React.createClass({
    handleDelete() {
        Tasks.remove(this.props.task._id)
    },
    
    toggleChecked() {
        Tasks.update(this.props.task._id, {$set: {checked: !this.props.task.checked}})
    },
    
    render() {
        var check = this.props.task.checked ? "checked" : "";
        
        return (
            <li className={check}>
                <button className="delete" onClick={this.handleDelete}>&times;</button>
                <input type="checkbox" checked={this.props.task.checked} onClick={this.toggleChecked}  readOnly={true} />
                <span className="text">{this.props.task.text}</span>
                <span> (by <strong>{this.props.task.createdBy})</strong></span>
            </li>
        )
    }
});