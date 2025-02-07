import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { createMeeting } from "../actions";
import LocationSearchInput from './LocationSearchInput';


class CreateMeetingForm extends Component {

  state = {
      title: '',
      hostName: '',
      description: '',
      category: '',
      date: '',
      venue: '',
      venueLatLng: { lat: '', lng: '' }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, hostName, description, category, date, venue, venueLatLng } = this.state;
    this.props.createMeeting({
        id: uuidv4(),
        title,
        hostName,
        description,
        category,
        date,
        venue,
        venueLatLng,
        timestamp: Date.now(),
        hostPhotoURL: require('../utils/images/default-user.png')
    });

    //this.props.reset();
    this.props.history.push('/meetings');
  }

  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({
        [e.target.name] : e.target.value
    })
  }

  handleVenue = (address, latLng) => {
      this.setState({
          venue: address,
          venueLatLng: latLng
      })
  }

  render () {
    console.log('Props in CreateMeetingForm', this.props);
    console.log('State in CreateMeetingForm', this.state);
    let { title, hostName, description, category, date, venue } = this.state;

    return (
      <div className="m-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-input">
            <label htmlFor="title">Title:</label><br />
            <input type="text" name="title" value={title} onChange={this.handleInput} placeholder="Enter title" required/>
          </div><br />
          <div className="form-input">
            <label htmlFor="hostName">Host:</label><br />
            <input type="text" name="hostName" value={hostName} onChange={this.handleInput} placeholder="Who is hosting?" required/>
          </div><br />
          <div className="form-input">
            <label htmlFor="description">Description:</label><br />
            <textarea type="text" name="description" rows="3" value={description} onChange={this.handleInput} placeholder="What is it about?" />
          </div><br />
          <div className="form-input">
            <label htmlFor="category">Category:</label><br />
            <select name="category" value={category} onChange={this.handleInput} required>
                  <option />
                  <option value="science">Science & Tech</option>
                  <option value="business">Business</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="sports">Sports</option>
                  <option value="fashion">Fashion</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="volunteering">Volunteering</option>
                  <option value="agegroups">Age Groups</option>
                  <option value="health">Health</option>
                  <option value="career">Career Fairs</option>
                  <option value="research">Research Groups</option>
                  <option value="conferences">Conferences</option>
            </select>
          </div><br />
          <div className="form-input">
            <label htmlFor="date">Date:</label><br />
            <input type="date" name="date" value={date} onChange={this.handleInput}/>
          </div><br />
          <div className="form-input">
            <label htmlFor="venue">Venue:</label><br />
            <LocationSearchInput value={venue} handleVenue={this.handleVenue}/>
          </div><br />
          <div className="f-buttons">
            <button className="btn-submit" type="submit">Create</button>
            <button className="btn-reset" type="reset">Reset</button>
            <button className="btn-cancel" onClick={this.handleForm}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}


export default connect(null, { createMeeting })(CreateMeetingForm);
