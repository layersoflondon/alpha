class PinForm extends React.Component {
    render () {
        return (
            <div>
                <form>
                    <div className="form-group form-group-title">
                        <label>Pin title</label>
                        <input type="text" placeholder="What will you call this pin?" />
                    </div>
                    <div className="form-group form-group-description">
                        <label>Description</label>
                        <textarea rows="10" placeholder="Tell us your story or some details about this location. You can also describe an photograph, video or audio clip here."></textarea>
                    </div>
                    <div className="form-group">
                        <label>Link</label>
                        <input type="text" placeholder="http://www.example.com" />
                    </div>
                    <div className="form-group form-group-upload">
                        <label>Add image/audio</label>
                        <input type="file" placeholder="http://www.example.com" />
                    </div>
                    <div className="form-group">
                        <label>Add video (YouTube URL)</label>
                        <input type="text" placeholder="http://www.youtube.com/34tonu3ntu" />
                    </div>
                    <div className="dates">
                        <div className="from">
                            <div className="form-group">
                                <label>Day</label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>Month</label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>Year</label>
                                <input type="text" />
                            </div>
                        </div>
                        <p>to</p>
                        <div className="to">

                            <div className="form-group">
                                <label>Day</label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>Month</label>
                                <input type="text" />
                            </div>
                            <div className="form-group">
                                <label>Year</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>

                    <CollectionControl />

                    <div className="form-group">
                        <input type="submit" placeholder="Save my pin" />
                    </div>
                </form>
        </div>
    );
    }
}

