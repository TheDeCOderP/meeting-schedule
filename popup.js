document.addEventListener('DOMContentLoaded', function() {
    const scheduleButton = document.getElementById('scheduleMeeting');
    const meetingForm = document.getElementById('meetingForm');
    const meetingTitleInput = document.getElementById('meetingTitle');
    const meetingDateTimeInput = document.getElementById('meetingDateTime');
    const participantsInput = document.getElementById('participants');
    const locationInput = document.getElementById('location');
    const messageDiv = document.getElementById('message');
    const meetingsList = document.getElementById('meetingsList');
    const confirmRemoveButton = document.getElementById('confirmRemove');
  
    scheduleButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default form submission
      if (meetingForm.checkValidity()) { // Check if form is valid
        const meetingDateTime = meetingDateTimeInput.value;
        const meetingTitle = meetingTitleInput.value;
        const participants = participantsInput.value;
        const location = locationInput.value;
        
        // Save meeting details
        saveMeeting(meetingDateTime, meetingTitle, participants, location);
        messageDiv.textContent = 'Meeting scheduled for ' + meetingDateTime;
        
        // Add meeting to the list
        addMeetingToList(meetingDateTime, meetingTitle, participants, location);
        meetingsList.style.display = 'block'; // Show the meetings list
      } else {
        messageDiv.textContent = 'Please fill out all fields.';
        meetingsList.style.display = 'none'; // Hide the meetings list
      }
    });
  
    // Load scheduled meetings from storage
    loadMeetingsFromStorage();
  
    // Event listener for checkboxes
    meetingsList.addEventListener('change', function(event) {
      const checkbox = event.target;
      if (checkbox.classList.contains('meetingCheckbox')) {
        confirmRemoveButton.style.display = 'block';
      }
    });
  
    // Event listener for confirm button
    confirmRemoveButton.addEventListener('click', function() {
      const checkboxes = document.querySelectorAll('.meetingCheckbox');
      checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
          const li = checkbox.parentElement;
          const key = checkbox.id;
          li.remove();
          localStorage.removeItem(key);
        }
      });
      this.style.display = 'none'; // Hide the confirm button after removing meetings
    });
  
    // Schedule meeting reminder after 2 minutes
    setTimeout(function() {
      alert('Meeting reminder: Meeting for employees!');
    }, 120000); // 2 minutes in milliseconds
  
    function saveMeeting(dateTime, title, participants, location) {
      const meeting = {
        dateTime: dateTime,
        title: title,
        participants: participants,
        location: location
      };
      // Save meeting to local storage
      localStorage.setItem('scheduledMeeting_' + Date.now(), JSON.stringify(meeting));
    }
  
    function loadMeetingsFromStorage() {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('scheduledMeeting_')) {
          const meeting = JSON.parse(localStorage.getItem(key));
          addMeetingToList(meeting.dateTime, meeting.title, meeting.participants, meeting.location, key);
          meetingsList.style.display = 'block'; // Show the meetings list
        }
      }
    }
  
    function addMeetingToList(dateTime, title, participants, location, key) {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" id="${key}" class="meetingCheckbox">
        <label for="${key}">${title} - ${dateTime}</label>
      `;
      meetingsList.appendChild(li);
    }
  });