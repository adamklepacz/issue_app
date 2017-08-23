document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
	var issueDesc = document.getElementById('issueDescInput').value,
			issueSeverity = document.getElementById('issueSeverityInput').value,
			issueAssignedTo = document.getElementById('issueAssignedToInput').value,
			issueId = chance.guid(),
			issueStatus = 'Open';
	
	var issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus
	}
	
	if(localStorage.getItem('issues') == null) {
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	} else {
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}
	
	document.getElementById('issueInputForm').reset();
	
	fetchIssues();
		
	e.preventDefault();
}

function setStatusClosed(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));
	
	for(var i = 0; i < issues.length; i++) {
		if(issues[i].id === id) {
			issues[i].status = "Closed";
		} 
	}
	
	localStorage.setItem('issues', JSON.stringify(issues));
	
	fetchIssues();
}

function deleteIssue(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));
	
	for(var i = 0; i <= issues.length; i++) {
		if(issues[i].id === id) {
			issues.splice(i,1);
		}
	}
	
	localStorage.setItem('issues', JSON.stringify(issues));
	
	fetchIssues();
}

function fetchIssues() {
	"use strict";
	var	issues = JSON.parse(localStorage.getItem('issues')) || [],
			issueList = document.getElementById('issueList');
	
	issueList.innerHTML = '';
	
	for(var i = 0; i < issues.length; i++) {
		var id = issues[i].id,
				desc = issues[i].description,
				severity = issues[i].severity,
				assignedTo = issues[i].assignedTo,
				status = issues[i].status;
		
		issueList.innerHTML += '<div class="well">' +
													 '<h6>Issue ID:' + id + '</h6>' +
													 '<p><span class="label label-info">' + status + '</p>' +
													 '<h3>' + desc + '</h3>' +
													 '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
													 '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
													 '<div class="btn-group">' +
													 '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
													 '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
													 '</div>' +
													 '</div>';
	}
}

